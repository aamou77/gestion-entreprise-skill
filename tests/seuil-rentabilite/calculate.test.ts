import assert from "node:assert/strict";
import test from "node:test";

import { calculateBreakEven } from "../../skills/seuil-rentabilite/engine/index.ts";
import type { BreakEvenInput } from "../../skills/seuil-rentabilite/engine/types.ts";

const period = { type: "mensuelle" } as const;

function unitInput(overrides: Partial<BreakEvenInput> = {}): BreakEvenInput {
  return {
    mode_analyse: "reel",
    mode_calcul: "unitaire",
    periode: period,
    devise: "EUR",
    base_montants: "HT",
    couts_fixes: 3000,
    prix_unitaire: 100,
    cout_variable_unitaire: 40,
    ...overrides,
  };
}

function globalInput(overrides: Partial<BreakEvenInput> = {}): BreakEvenInput {
  return {
    mode_analyse: "scenario",
    mode_calcul: "global",
    periode: period,
    devise: "EUR",
    base_montants: "HT",
    couts_fixes: 3000,
    chiffre_affaires: 10000,
    couts_variables: 4000,
    ...overrides,
  };
}

function invalidInput(value: unknown): BreakEvenInput {
  return value as BreakEvenInput;
}

test("calcule le seuil nominal unitaire et sa provenance", () => {
  const result = calculateBreakEven(unitInput());

  assert.equal(result.status, "ok");
  assert.equal(result.resultats.marge_sur_cout_variable_unitaire, 60);
  assert.equal(result.resultats.seuil_en_unites_mathematique, 50);
  assert.equal(result.resultats.seuil_chiffre_affaires, 5000);
  assert.deepEqual(result.provenance.seuil_en_unites_mathematique, {
    formula_id: "BREAK_EVEN_UNITS",
    inputs_used: ["couts_fixes", "marge_sur_cout_variable_unitaire"],
  });
});

test("conserve le seuil mathématique et applique ceil séparément", () => {
  const result = calculateBreakEven(unitInput({ couts_fixes: 3010, arrondi_operationnel: "ceil" }));

  assert.equal(result.status, "ok");
  assert.ok(Math.abs(result.resultats.seuil_en_unites_mathematique! - 50.166666666666664) < 1e-12);
  assert.equal(result.resultats.seuil_en_unites_operationnel, 51);
  assert.deepEqual(result.provenance.seuil_en_unites_operationnel, {
    formula_id: "BREAK_EVEN_UNITS_OPERATIONAL_CEIL",
    inputs_used: ["seuil_en_unites_mathematique"],
  });
  assert.deepEqual(result.warnings, [{ code: "OPERATIONAL_ROUNDING_APPLIED" }]);
});

test("retourne un résultat partiel pour une contribution nulle", () => {
  const result = calculateBreakEven(unitInput({ cout_variable_unitaire: 100 }));

  assert.equal(result.status, "partial");
  assert.equal(result.resultats.marge_sur_cout_variable_unitaire, 0);
  assert.equal(result.resultats.seuil_en_unites_mathematique, undefined);
  assert.equal(result.indisponibles[0]?.code, "NON_POSITIVE_UNIT_CONTRIBUTION");
});

test("propage l'indisponibilité au seuil opérationnel lorsque ceil est demandé", () => {
  const result = calculateBreakEven(unitInput({
    cout_variable_unitaire: 100,
    arrondi_operationnel: "ceil",
  }));

  assert.equal(result.status, "partial");
  assert.deepEqual(result.indisponibles.find(
    ({ resultat }) => resultat === "seuil_en_unites_operationnel",
  ), {
    resultat: "seuil_en_unites_operationnel",
    code: "NON_POSITIVE_UNIT_CONTRIBUTION",
    reason: "Le seuil exige une marge sur coût variable unitaire strictement positive.",
  });
});

test("retourne un résultat partiel pour une contribution négative", () => {
  const result = calculateBreakEven(unitInput({ cout_variable_unitaire: 120 }));

  assert.equal(result.status, "partial");
  assert.equal(result.resultats.marge_sur_cout_variable_unitaire, -20);
  assert.equal(result.resultats.seuil_chiffre_affaires, undefined);
});

test("propage l'indisponibilité de la marge de sécurité pour une contribution non positive", () => {
  const result = calculateBreakEven(unitInput({
    cout_variable_unitaire: 100,
    chiffre_affaires_comparaison: 5000,
  }));

  const safetyUnavailabilities = result.indisponibles.filter(
    ({ resultat }) => resultat === "marge_securite" || resultat === "taux_marge_securite",
  );
  assert.equal(result.status, "partial");
  assert.deepEqual(safetyUnavailabilities.map(({ resultat, code }) => ({ resultat, code })), [
    { resultat: "marge_securite", code: "NON_POSITIVE_UNIT_CONTRIBUTION" },
    { resultat: "taux_marge_securite", code: "NON_POSITIVE_UNIT_CONTRIBUTION" },
  ]);
});

test("accepte explicitement des coûts fixes nuls", () => {
  const result = calculateBreakEven(unitInput({ couts_fixes: 0 }));

  assert.equal(result.status, "ok");
  assert.equal(result.resultats.seuil_en_unites_mathematique, 0);
  assert.equal(result.resultats.seuil_chiffre_affaires, 0);
});

test("rejette les prix nuls, prix négatifs et coûts variables négatifs", () => {
  for (const input of [
    unitInput({ prix_unitaire: 0 }),
    unitInput({ prix_unitaire: -1 }),
    unitInput({ cout_variable_unitaire: -1 }),
  ]) {
    const result = calculateBreakEven(input);
    assert.equal(result.status, "unavailable");
  }
});

test("calcule le seuil nominal global et conserve le mode scénario", () => {
  const result = calculateBreakEven(globalInput());

  assert.equal(result.status, "ok");
  assert.equal(result.mode_analyse, "scenario");
  assert.equal(result.resultats.taux_couts_variables, 0.4);
  assert.equal(result.resultats.taux_marge_sur_cout_variable, 0.6);
  assert.equal(result.resultats.seuil_chiffre_affaires, 5000);
});

test("retourne un résultat partiel pour une marge globale nulle ou négative", () => {
  for (const input of [
    globalInput({ couts_variables: 10000 }),
    globalInput({ couts_variables: 12000 }),
  ]) {
    const result = calculateBreakEven(input);
    assert.equal(result.status, "partial");
    assert.equal(result.resultats.seuil_chiffre_affaires, undefined);
    assert.equal(result.indisponibles[0]?.code, "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE");
  }
});

test("propage l'indisponibilité de la marge de sécurité pour un taux global non positif", () => {
  const result = calculateBreakEven(globalInput({
    couts_variables: 10000,
    chiffre_affaires_comparaison: 5000,
  }));

  const safetyUnavailabilities = result.indisponibles.filter(
    ({ resultat }) => resultat === "marge_securite" || resultat === "taux_marge_securite",
  );
  assert.equal(result.status, "partial");
  assert.deepEqual(safetyUnavailabilities.map(({ resultat, code }) => ({ resultat, code })), [
    { resultat: "marge_securite", code: "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE" },
    { resultat: "taux_marge_securite", code: "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE" },
  ]);
});

test("rejette un chiffre d'affaires global nul", () => {
  const result = calculateBreakEven(globalInput({ chiffre_affaires: 0 }));

  assert.equal(result.status, "unavailable");
  assert.equal(result.errors[0]?.code, "ZERO_REVENUE");
});

test("calcule les marges de sécurité positive, nulle et négative", () => {
  assert.equal(calculateBreakEven(unitInput({ chiffre_affaires_comparaison: 6000 })).resultats.marge_securite, 1000);
  assert.equal(calculateBreakEven(unitInput({ chiffre_affaires_comparaison: 5000 })).resultats.marge_securite, 0);
  assert.equal(calculateBreakEven(unitInput({ chiffre_affaires_comparaison: 4000 })).resultats.marge_securite, -1000);
});

test("garde la marge absolue et bloque son taux lorsque le CA de comparaison est nul", () => {
  const result = calculateBreakEven(unitInput({ chiffre_affaires_comparaison: 0 }));

  assert.equal(result.status, "partial");
  assert.equal(result.resultats.marge_securite, -5000);
  assert.equal(result.resultats.taux_marge_securite, undefined);
  assert.equal(result.indisponibles[0]?.code, "ZERO_REVENUE");
});

test("rejette les champs absents ou numériques invalides", () => {
  const missing = { ...unitInput() } as Record<string, unknown>;
  delete missing.prix_unitaire;

  for (const input of [
    invalidInput(missing),
    invalidInput({ ...unitInput(), couts_fixes: Number.NaN }),
    invalidInput({ ...unitInput(), couts_fixes: Infinity }),
    invalidInput({ ...unitInput(), couts_fixes: "3000" }),
  ]) {
    assert.equal(calculateBreakEven(input).status, "unavailable");
  }
});

test("rejette une période, une devise ou une base invalides", () => {
  const inputs = [
    unitInput({ periode: { type: "personnalisee" } }),
    unitInput({ devise: "" }),
    invalidInput({ ...unitInput(), base_montants: "INVALID" }),
  ];

  for (const input of inputs) {
    assert.equal(calculateBreakEven(input).status, "unavailable");
  }
});

test("est déterministe et ne mute pas son entrée", () => {
  const input = Object.freeze(unitInput({ chiffre_affaires_comparaison: 6000 }));
  const snapshot = structuredClone(input);
  const first = calculateBreakEven(input);
  const second = calculateBreakEven(input);

  assert.deepEqual(first, second);
  assert.deepEqual(input, snapshot);
});

test("respecte les invariants de seuil", () => {
  const base = calculateBreakEven(unitInput());
  const moreFixedCosts = calculateBreakEven(unitInput({ couts_fixes: 3600 }));
  const higherPrice = calculateBreakEven(unitInput({ prix_unitaire: 120 }));
  const globalBase = calculateBreakEven(globalInput());
  const globalHigherMargin = calculateBreakEven(globalInput({ couts_variables: 3000 }));

  assert.ok(moreFixedCosts.resultats.seuil_en_unites_mathematique! >= base.resultats.seuil_en_unites_mathematique!);
  assert.ok(higherPrice.resultats.seuil_en_unites_mathematique! <= base.resultats.seuil_en_unites_mathematique!);
  assert.ok(globalHigherMargin.resultats.seuil_chiffre_affaires! <= globalBase.resultats.seuil_chiffre_affaires!);
});
