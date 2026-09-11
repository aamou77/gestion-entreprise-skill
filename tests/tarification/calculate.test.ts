import assert from "node:assert/strict";
import test from "node:test";
import { calculatePricing } from "../../skills/tarification/engine/index.ts";
import type { CalculationMode, ErrorCode, PricingInput } from "../../skills/tarification/engine/index.ts";

function input(overrides: Partial<PricingInput> = {}): PricingInput {
  return {
    mode_analyse: "reel", mode_calcul: "analyse_prix", periode: { type: "mensuelle" },
    devise: "EUR", base_montants: "HT", cout: 60, prix_vente: 100, ...overrides,
  };
}
function approx(actual: number | undefined, expected: number): void {
  assert.ok(actual !== undefined && Math.abs(actual - expected) <= 1e-10 * Math.max(1, Math.abs(expected)));
}
function rejected(candidate: unknown, code: ErrorCode): void {
  const result = calculatePricing(candidate as PricingInput);
  assert.equal(result.status, "unavailable");
  assert.ok(result.errors.some(error => error.code === code));
  assert.deepEqual(result.resultats, {});
  assert.deepEqual(result.provenance, {});
  assert.deepEqual(result.indisponibles, []);
}

test("analyse nominale et provenance de chaque résultat", () => {
  const result = calculatePricing(input());
  assert.equal(result.status, "ok");
  assert.equal(result.resultats.marge, 40);
  assert.equal(result.resultats.taux_marque, 0.4);
  approx(result.resultats.taux_marge, 2 / 3);
  assert.deepEqual(result.provenance, {
    marge: { formula_id: "MARGIN", inputs_used: ["prix_vente", "cout"] },
    taux_marque: { formula_id: "MARK_RATE", inputs_used: ["marge", "prix_vente"] },
    taux_marge: { formula_id: "MARGIN_RATE", inputs_used: ["marge", "cout"] },
  });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(result.indisponibles, []);
});

test("prix égal au coût : marge et taux nuls", () => {
  const result = calculatePricing(input({ prix_vente: 60 }));
  assert.equal(result.status, "ok");
  assert.deepEqual(result.resultats, { marge: 0, taux_marque: 0, taux_marge: 0 });
});
test("prix inférieur au coût : résultats négatifs valides", () => {
  const result = calculatePricing(input({ prix_vente: 30 }));
  assert.equal(result.status, "ok");
  assert.deepEqual(result.resultats, { marge: -30, taux_marque: -1, taux_marge: -0.5 });
});

for (const [cost, price, expected, unavailable] of [
  [60, 0, { marge: -60, taux_marge: -1 }, [
    { resultat: "taux_marque", code: "ZERO_SELLING_PRICE" },
  ]],
  [0, 100, { marge: 100, taux_marque: 1 }, [
    { resultat: "taux_marge", code: "ZERO_COST" },
  ]],
  [0, 0, { marge: 0 }, [
    { resultat: "taux_marque", code: "ZERO_SELLING_PRICE" },
    { resultat: "taux_marge", code: "ZERO_COST" },
  ]],
] as const) {
  test(`analyse coût=${cost}, prix=${price} : sorties et indisponibilités exactes`, () => {
    const result = calculatePricing(input({ cout: cost, prix_vente: price }));
    assert.equal(result.status, "partial");
    assert.deepEqual(result.resultats, expected);
    assert.deepEqual(result.indisponibles.map(({ resultat, code }) => ({ resultat, code })), unavailable);
    assert.deepEqual(Object.keys(result.provenance).sort(), Object.keys(expected).sort());
    assert.deepEqual(result.errors, []);
  });
}

test("prix minimum économique égal au coût et provenance", () => {
  for (const cost of [0, 0.125, 80, 10000]) {
    const result = calculatePricing(input({ mode_calcul: "prix_minimum_economique", cout: cost }));
    assert.equal(result.status, "ok");
    assert.deepEqual(result.resultats, { prix_minimum_economique: cost });
    assert.deepEqual(result.provenance, {
      prix_minimum_economique: { formula_id: "ECONOMIC_MINIMUM_PRICE", inputs_used: ["cout"] },
    });
  }
});

for (const [mode, field, rate, formula] of [
  ["prix_cible_taux_marque", "taux_marque_cible", 0.2, "TARGET_PRICE_FROM_MARK_RATE"],
  ["prix_cible_taux_marge", "taux_marge_cible", 0.25, "TARGET_PRICE_FROM_MARGIN_RATE"],
] as const) {
  test(`${mode} : nominal, taux nul, coût nul et provenance`, () => {
    for (const [cost, targetRate, expected] of [[80, rate, 100], [80, 0, 80], [0, rate, 0]]) {
      const result = calculatePricing(input({ mode_calcul: mode, cout: cost, [field]: targetRate }));
      assert.equal(result.status, "ok");
      approx(result.resultats.prix_cible, expected);
      assert.deepEqual(result.provenance, {
        prix_cible: { formula_id: formula, inputs_used: ["cout", field] },
      });
    }
  });
}
test("taux de marque proche de 1 sans arrondi", () => {
  const result = calculatePricing(input({ mode_calcul: "prix_cible_taux_marque", cout: 80, taux_marque_cible: 0.9999 }));
  assert.equal(result.status, "ok");
  approx(result.resultats.prix_cible, 800000);
});
test("taux de marge supérieur à 1 : convention décimale sans conversion", () => {
  assert.equal(calculatePricing(input({ mode_calcul: "prix_cible_taux_marge", cout: 80, taux_marge_cible: 25 })).resultats.prix_cible, 2080);
});

for (const rate of [0, 0.2, 1]) {
  test(`remise ${rate} : deux résultats et deux provenances`, () => {
    const result = calculatePricing(input({ mode_calcul: "remise", prix_initial: 100, taux_remise: rate }));
    assert.equal(result.status, "ok");
    assert.deepEqual(result.resultats, { montant_remise: 100 * rate, prix_apres_remise: 100 * (1 - rate) });
    assert.deepEqual(result.provenance, {
      montant_remise: { formula_id: "DISCOUNT_AMOUNT", inputs_used: ["prix_initial", "taux_remise"] },
      prix_apres_remise: { formula_id: "PRICE_AFTER_DISCOUNT", inputs_used: ["prix_initial", "taux_remise"] },
    });
  });
}
test("prix initial nul et remise fractionnaire", () => {
  assert.deepEqual(calculatePricing(input({ mode_calcul: "remise", prix_initial: 0, taux_remise: 0.3 })).resultats,
    { montant_remise: 0, prix_apres_remise: 0 });
  const result = calculatePricing(input({ mode_calcul: "remise", prix_initial: 10.1, taux_remise: 0.123 }));
  approx(result.resultats.montant_remise, 1.2423);
  approx(result.resultats.prix_apres_remise, 8.8577);
});

for (const [overrides, code] of [
  [{ cout: -1 }, "NEGATIVE_COST"],
  [{ prix_vente: -1 }, "INVALID_SELLING_PRICE"],
  ...[-1, 1, 1.1, 20].map(rate => [
    { mode_calcul: "prix_cible_taux_marque", taux_marque_cible: rate }, "INVALID_MARKUP_RATE",
  ]),
  [{ mode_calcul: "prix_cible_taux_marge", taux_marge_cible: -0.1 }, "INVALID_MARGIN_RATE"],
  ...[-0.1, 1.1, 20].map(rate => [
    { mode_calcul: "remise", prix_initial: 100, taux_remise: rate }, "INVALID_DISCOUNT_RATE",
  ]),
  [{ mode_calcul: "remise", prix_initial: -1, taux_remise: 0.2 }, "INVALID_INITIAL_PRICE"],
] as [Partial<PricingInput>, ErrorCode][]) {
  test(`rejette le domaine ${JSON.stringify(overrides)}`, () => rejected(input(overrides), code));
}

const modes: [CalculationMode, Partial<PricingInput>, string[]][] = [
  ["analyse_prix", {}, ["cout", "prix_vente"]],
  ["prix_minimum_economique", {}, ["cout"]],
  ["prix_cible_taux_marque", { taux_marque_cible: 0.2 }, ["cout", "taux_marque_cible"]],
  ["prix_cible_taux_marge", { taux_marge_cible: 0.25 }, ["cout", "taux_marge_cible"]],
  ["remise", { prix_initial: 100, taux_remise: 0.2 }, ["prix_initial", "taux_remise"]],
];
for (const [mode, overrides, fields] of modes) {
  test(`${mode} : chaque nombre obligatoire absent ou invalide`, () => {
    for (const field of fields) {
      const candidate = { ...input({ ...overrides, mode_calcul: mode }) } as Record<string, unknown>;
      delete candidate[field];
      rejected(candidate, "MISSING_REQUIRED_INPUT");
      rejected({ ...candidate, [field]: undefined }, "MISSING_REQUIRED_INPUT");
      for (const value of [null, "25", NaN, Infinity, -Infinity, true, {}, []]) {
        rejected({ ...candidate, [field]: value }, "INVALID_NUMBER");
      }
    }
  });
  test(`${mode} : copie des seules entrées pertinentes, déterminisme et non-mutation`, () => {
    const candidate = input({
      cout: 80, prix_vente: 100, taux_marque_cible: 0.2, taux_marge_cible: 0.25,
      prix_initial: 100, taux_remise: 0.2, unite: "prestation", perimetre_cout: "coût fourni",
      ...overrides, mode_calcul: mode, mode_analyse: "scenario",
    });
    const snapshot = structuredClone(candidate);
    Object.freeze(candidate.periode);
    Object.freeze(candidate);
    const first = calculatePricing(candidate);
    assert.equal(first.status, "ok");
    assert.equal(first.mode_analyse, "scenario");
    assert.deepEqual(first, calculatePricing(candidate));
    assert.deepEqual(candidate, snapshot);
    assert.deepEqual(Object.keys(first.inputs_retenus).sort(), [
      "mode_analyse", "mode_calcul", "periode", "devise", "base_montants", "unite",
      ...(mode === "remise" ? [] : ["perimetre_cout"]), ...fields,
    ].sort());
    assert.notEqual(first.inputs_retenus.periode, candidate.periode);
    first.inputs_retenus.periode!.type = "annuelle";
    assert.deepEqual(candidate, snapshot);
  });
}

test("contexte invalide et champs communs absents", () => {
  for (const [field, code] of [
    ["mode_analyse", "MISSING_REQUIRED_INPUT"], ["mode_calcul", "MISSING_REQUIRED_INPUT"],
    ["periode", "INVALID_PERIOD"], ["devise", "INVALID_CURRENCY"], ["base_montants", "INVALID_AMOUNT_BASIS"],
  ] as const) {
    const candidate = { ...input() } as Record<string, unknown>;
    delete candidate[field];
    rejected(candidate, code);
    for (const value of [null, "", 5, []]) rejected({ ...candidate, [field]: value }, code);
    if (field !== "devise") rejected({ ...candidate, [field]: "invalide" }, code);
  }
  rejected(input({ devise: "   " }), "INVALID_CURRENCY");
  for (const value of [null, undefined, [], 5, "input"]) rejected(value, "MISSING_REQUIRED_INPUT");
});
test("périodes : mêmes contrôles calendaires que le moteur de référence", () => {
  for (const periode of [
    { type: "personnalisee" },
    { type: "personnalisee", debut: "2026-01-01" },
    { type: "personnalisee", debut: "2026-02-30", fin: "2026-03-01" },
    { type: "personnalisee", debut: "2026-02-01", fin: "2026-01-01" },
    { type: "mensuelle", debut: "2026-1-01" },
    { type: "mensuelle", fin: null },
    { type: "mensuelle", debut: "2026-01-01T00:00:00Z" },
  ]) rejected({ ...input(), periode }, "INVALID_PERIOD");
  for (const type of ["mensuelle", "trimestrielle", "annuelle", "personnalisee"] as const) {
    const result = calculatePricing(input({ periode: { type, debut: "2024-02-29", fin: "2024-02-29" }, base_montants: "TTC", devise: "libre" }));
    assert.equal(result.status, "ok");
  }
});
test("les nombres propres aux autres modes ne participent pas à la validation", () => {
  const result = calculatePricing(input({ mode_calcul: "remise", cout: NaN, prix_vente: -1, prix_initial: 100, taux_remise: 0.2 }));
  assert.equal(result.status, "ok");
  assert.equal(Object.hasOwn(result.inputs_retenus, "cout"), false);
});
test("remise ignore perimetre_cout, invalide ou valide, et ne le retient jamais", () => {
  for (const perimetre_cout of [123, "périmètre sans effet"]) {
    const result = calculatePricing(input({
      mode_calcul: "remise", prix_initial: 100, taux_remise: 0.2, perimetre_cout,
    } as unknown as Partial<PricingInput>));
    assert.equal(result.status, "ok");
    assert.equal(result.resultats.montant_remise, 20);
    assert.equal(result.resultats.prix_apres_remise, 80);
    assert.equal(Object.hasOwn(result.inputs_retenus, "perimetre_cout"), false);
  }
});
test("les modes utilisant cout valident perimetre_cout lorsqu'il est fourni", () => {
  rejected(input({ perimetre_cout: 123 } as unknown as Partial<PricingInput>), "MISSING_REQUIRED_INPUT");
});

test("invariants monotones des quatre calculs", () => {
  const margins = [0, 30, 60, 100, 200].map(prix_vente => calculatePricing(input({ prix_vente })).resultats.marge!);
  const marks = [0, 0.1, 0.5, 0.99].map(taux_marque_cible => calculatePricing(input({ mode_calcul: "prix_cible_taux_marque", taux_marque_cible })).resultats.prix_cible!);
  const rates = [0, 0.1, 1, 5].map(taux_marge_cible => calculatePricing(input({ mode_calcul: "prix_cible_taux_marge", taux_marge_cible })).resultats.prix_cible!);
  for (const values of [margins, marks, rates]) {
    for (let i = 1; i < values.length; i++) assert.ok(values[i] >= values[i - 1]);
  }
  const prices = [0, 0.1, 0.5, 1].map(taux_remise => calculatePricing(input({ mode_calcul: "remise", prix_initial: 100, taux_remise })).resultats.prix_apres_remise!);
  for (let i = 1; i < prices.length; i++) assert.ok(prices[i] <= prices[i - 1]);
});
test("dépassement numérique : aucun résultat non fini ni résultat métier partiel", () => {
  for (const candidate of [
    input({ mode_calcul: "prix_cible_taux_marque", cout: Number.MAX_VALUE, taux_marque_cible: 0.5 }),
    input({ mode_calcul: "prix_cible_taux_marge", cout: Number.MAX_VALUE, taux_marge_cible: 1 }),
    input({ cout: Number.MIN_VALUE, prix_vente: Number.MAX_VALUE }),
    input({ cout: Number.MAX_VALUE, prix_vente: Number.MIN_VALUE }),
  ]) rejected(candidate, "INVALID_NUMBER");
});
