import assert from "node:assert/strict";
import test from "node:test";
import { calculateTreasury } from "../../skills/tresorerie/engine/index.ts";
import type { ErrorCode, TreasuryFlow, TreasuryInput, TreasuryPeriodInput } from "../../skills/tresorerie/engine/index.ts";

function flow(overrides: Partial<TreasuryFlow> = {}): TreasuryFlow {
  return { id: "flow-1", sens: "encaissement", statut: "realise", montant: 100, date: "2026-01-15", ...overrides };
}
function period(overrides: Partial<TreasuryPeriodInput> = {}): TreasuryPeriodInput {
  return { id: "janvier", periode: { debut: "2026-01-01", fin: "2026-01-31" }, flux: [], ...overrides };
}
function input(overrides: Partial<TreasuryInput> = {}): TreasuryInput {
  return { mode_analyse: "reel", devise: "EUR", solde_ouverture: 1000, periodes: [period()], ...overrides };
}
function rejected(candidate: unknown, code: ErrorCode): void {
  const result = calculateTreasury(candidate as TreasuryInput);
  assert.equal(result.status, "unavailable");
  assert.ok(result.errors.some(error => error.code === code));
  assert.deepEqual(result.periodes, []);
  assert.deepEqual(result.inputs_retenus, {});
}
function results(value: ReturnType<typeof calculateTreasury>, index = 0) { return value.periodes[index]!.resultats; }

test("calcule les réalisés et leur provenance", () => {
  const result = calculateTreasury(input({ periodes: [period({ flux: [
    flow({ id: "in", montant: 500 }), flow({ id: "out", sens: "decaissement", montant: 300 }),
  ] })] }));
  assert.equal(result.status, "ok");
  assert.equal(results(result).encaissements_realises, 500);
  assert.equal(results(result).decaissements_realises, 300);
  assert.equal(results(result).solde_reel_cloture, 1200);
  assert.deepEqual(result.periodes[0]!.provenance.encaissements_realises, {
    formula_id: "REALIZED_INFLOW_TOTAL", inputs_used: ["flux"], flow_ids: ["in"],
  });
  assert.deepEqual(result.periodes[0]!.provenance.solde_reel_cloture, {
    formula_id: "REAL_CLOSING_BALANCE",
    inputs_used: ["solde_ouverture", "encaissements_realises", "decaissements_realises"],
    flow_ids: ["in", "out"],
  });
});

test("accepte solde négatif, aucun flux et flux nul", () => {
  const negative = calculateTreasury(input({ solde_ouverture: 100, periodes: [period({ flux: [flow({ sens: "decaissement", montant: 300 })] })] }));
  assert.equal(results(negative).solde_reel_cloture, -200);
  const empty = calculateTreasury(input());
  assert.equal(empty.status, "ok");
  assert.deepEqual(results(empty), {
    encaissements_realises: 0, decaissements_realises: 0, solde_reel_cloture: 1000,
    encaissements_engages: 0, decaissements_engages: 0, solde_apres_engages: 1000,
    encaissements_attendus: 0, decaissements_attendus: 0, solde_apres_attendus: 1000,
  });
  assert.deepEqual(empty.periodes[0]!.provenance.encaissements_attendus, {
    formula_id: "EXPECTED_INFLOW_TOTAL", inputs_used: ["flux"], flow_ids: [],
  });
  const zero = calculateTreasury(input({ periodes: [period({ flux: [flow({ montant: 0 })] })] }));
  assert.equal(zero.periodes[0]!.flux_retenus.length, 1);
  assert.equal(results(zero).solde_reel_cloture, 1000);
});

test("mode réel sépare engagé et attendu du solde réel", () => {
  const result = calculateTreasury(input({ periodes: [period({ flux: [
    flow({ id: "real", montant: 100 }), flow({ id: "commit", statut: "engage", montant: 200 }),
    flow({ id: "expected", statut: "attendu", montant: 300 }),
  ] })] }));
  const values = results(result);
  assert.equal(values.solde_reel_cloture, 1100);
  assert.equal(values.solde_apres_engages, 1300);
  assert.equal(values.solde_apres_attendus, 1600);
  assert.equal(values.solde_scenario, undefined);
  assert.equal(values.encaissements_hypothetiques, undefined);
  assert.deepEqual(result.periodes[0]!.provenance.solde_apres_attendus, {
    formula_id: "BALANCE_AFTER_EXPECTED",
    inputs_used: ["solde_ouverture", "encaissements_realises", "decaissements_realises", "encaissements_engages", "decaissements_engages", "encaissements_attendus", "decaissements_attendus"],
    flow_ids: ["commit", "expected", "real"],
  });
});
test("refuse un flux hypothétique en mode réel", () => {
  rejected(input({ periodes: [period({ flux: [flow({ statut: "hypothetique" })] })] }), "INVALID_FLOW_STATUS");
});
test("mode scénario produit quatre pistes séparées", () => {
  const result = calculateTreasury(input({ mode_analyse: "scenario", periodes: [period({ flux: [
    flow({ id: "real", montant: 10 }), flow({ id: "commit", statut: "engage", montant: 10 }),
    flow({ id: "expected", statut: "attendu", montant: 10 }), flow({ id: "hypo", statut: "hypothetique", montant: 10 }),
  ] })] }));
  assert.deepEqual(results(result), {
    encaissements_realises: 10, decaissements_realises: 0, solde_reel_cloture: 1010,
    encaissements_engages: 10, decaissements_engages: 0, solde_apres_engages: 1020,
    encaissements_attendus: 10, decaissements_attendus: 0, solde_apres_attendus: 1030,
    encaissements_hypothetiques: 10, decaissements_hypothetiques: 0, solde_scenario: 1040,
  });
  assert.deepEqual(result.periodes[0]!.provenance.solde_scenario, {
    formula_id: "SCENARIO_BALANCE",
    inputs_used: ["solde_ouverture", "encaissements_realises", "decaissements_realises", "encaissements_engages", "decaissements_engages", "encaissements_attendus", "decaissements_attendus", "encaissements_hypothetiques", "decaissements_hypothetiques"],
    flow_ids: ["commit", "expected", "hypo", "real"],
  });
});

test("applique la réserve au niveau attendu en réel et au scénario en scénario", () => {
  const real = calculateTreasury(input({ reserve_tresorerie: 400, periodes: [period({ flux: [flow({ statut: "attendu", montant: 500 })] })] }));
  assert.equal(results(real).solde_apres_attendus, 1500);
  assert.equal(results(real).solde_disponible_apres_attendus_et_reserve, 1100);
  assert.deepEqual(real.periodes[0]!.provenance.solde_disponible_apres_attendus_et_reserve, {
    formula_id: "AVAILABLE_BALANCE_AFTER_EXPECTED_AND_RESERVE", inputs_used: ["solde_apres_attendus", "reserve_tresorerie"],
  });
  const scenario = calculateTreasury(input({ mode_analyse: "scenario", reserve_tresorerie: 2000, periodes: [period({ flux: [flow({ statut: "hypothetique", montant: 500 })] })] }));
  assert.equal(results(scenario).solde_disponible_scenario_apres_reserve, -500);
  assert.deepEqual(scenario.periodes[0]!.provenance.solde_disponible_scenario_apres_reserve, {
    formula_id: "AVAILABLE_SCENARIO_BALANCE_AFTER_RESERVE", inputs_used: ["solde_scenario", "reserve_tresorerie"],
  });
});

test("applique les bornes inclusives et trace les flux hors période", () => {
  const result = calculateTreasury(input({ periodes: [period({ flux: [
    flow({ id: "start", date: "2026-01-01" }), flow({ id: "end", date: "2026-01-31" }),
    flow({ id: "before", date: "2025-12-31" }), flow({ id: "after", date: "2026-02-01" }),
  ] })] }));
  assert.equal(results(result).encaissements_realises, 200);
  assert.deepEqual(result.periodes[0]!.flux_retenus.map(({ id }) => id), ["start", "end"]);
  assert.deepEqual(result.periodes[0]!.flux_exclus, [
    { id: "before", code: "OUTSIDE_PERIOD" }, { id: "after", code: "OUTSIDE_PERIOD" },
  ]);
});

test("chaîne séparément quatre pistes sur trois périodes", () => {
  const periods = [
    period({ id: "p1", periode: { debut: "2026-01-01", fin: "2026-01-31" }, flux: [flow({ id: "r1", montant: 10 }), flow({ id: "c1", statut: "engage", montant: 20 }), flow({ id: "e1", statut: "attendu", montant: 30 }), flow({ id: "h1", statut: "hypothetique", montant: 40 })] }),
    period({ id: "p2", periode: { debut: "2026-02-01", fin: "2026-02-28" }, flux: [flow({ id: "r2", date: "2026-02-01", montant: 1 })] }),
    period({ id: "p3", periode: { debut: "2026-03-01", fin: "2026-03-31" }, flux: [] }),
  ];
  const result = calculateTreasury(input({ mode_analyse: "scenario", solde_ouverture: 0, periodes: periods }));
  assert.equal(results(result, 0).solde_reel_cloture, 10);
  assert.equal(results(result, 0).solde_apres_engages, 30);
  assert.equal(results(result, 0).solde_apres_attendus, 60);
  assert.equal(results(result, 0).solde_scenario, 100);
  assert.equal(results(result, 1).solde_reel_cloture, 11);
  assert.equal(results(result, 1).solde_apres_engages, 31);
  assert.equal(results(result, 1).solde_apres_attendus, 61);
  assert.equal(results(result, 1).solde_scenario, 101);
  assert.equal(results(result, 2).solde_reel_cloture, 11);
  assert.equal(results(result, 2).solde_apres_engages, 31);
  assert.equal(results(result, 2).solde_apres_attendus, 61);
  assert.equal(results(result, 2).solde_scenario, 101);
});

test("rejette périodes non contiguës, chevauchantes ou désordonnées", () => {
  for (const start of ["2026-01-31", "2026-02-02", "2026-03-01"]) {
    rejected(input({ periodes: [period(), period({ id: `next-${start}`, periode: { debut: start, fin: "2026-03-31" } })] }), "INVALID_PERIOD");
  }
});
test("rejette les doublons y compris hors période et entre périodes", () => {
  rejected(input({ periodes: [period({ flux: [flow({ id: "same" }), flow({ id: "same", date: "2025-01-01" })] })] }), "DUPLICATE_FLOW_ID");
  rejected(input({ periodes: [period({ flux: [flow({ id: "same" })] }), period({ id: "feb", periode: { debut: "2026-02-01", fin: "2026-02-28" }, flux: [flow({ id: "same", date: "2026-02-01" })] })] }), "DUPLICATE_FLOW_ID");
});

test("rejette les contextes et flux invalides", () => {
  const invalidFlows: [Partial<TreasuryFlow>, ErrorCode][] = [
    [{ id: "" }, "INVALID_FLOW_ID"], [{ sens: "other" as never }, "INVALID_FLOW_DIRECTION"],
    [{ statut: "other" as never }, "INVALID_FLOW_STATUS"], [{ montant: -1 }, "INVALID_FLOW_AMOUNT"],
    [{ montant: NaN }, "INVALID_FLOW_AMOUNT"], [{ montant: Infinity }, "INVALID_FLOW_AMOUNT"],
    [{ montant: "1" as never }, "INVALID_FLOW_AMOUNT"], [{ date: "2026-02-30" }, "INVALID_FLOW_DATE"],
  ];
  for (const [overrides, code] of invalidFlows) rejected(input({ periodes: [period({ flux: [flow(overrides)] })] }), code);
  for (const value of [NaN, Infinity, "1000"]) rejected(input({ solde_ouverture: value as never }), "INVALID_NUMBER");
  rejected(input({ solde_ouverture: null as never }), "MISSING_REQUIRED_INPUT");
  const missingOpening = { ...input() } as Record<string, unknown>;
  delete missingOpening.solde_ouverture;
  rejected(missingOpening, "MISSING_REQUIRED_INPUT");
  for (const value of [-1, NaN, Infinity, "1", null]) rejected(input({ reserve_tresorerie: value as never }), "INVALID_RESERVE");
  rejected(input({ devise: " " }), "INVALID_CURRENCY");
  rejected(input({ periodes: [] }), "MISSING_REQUIRED_INPUT");
  rejected({ ...input(), periodes: "bad" }, "MISSING_REQUIRED_INPUT");
});
test("rejette les formes invalides de période et les champs descriptifs invalides", () => {
  rejected(input({ periodes: [period({ periode: { debut: "2026-02-30", fin: "2026-02-31" } })] }), "INVALID_PERIOD");
  rejected(input({ periodes: [period({ periode: { debut: "2026-02-02", fin: "2026-02-01" } })] }), "INVALID_PERIOD");
  rejected(input({ periodes: [period({ flux: "bad" as never })] }), "MISSING_REQUIRED_INPUT");
  rejected(input({ periodes: [period({ flux: [flow({ libelle: 2 as never })] })] }), "MISSING_REQUIRED_INPUT");
  rejected(input({ periodes: [period({ flux: [flow({ source_id: 2 as never })] })] }), "MISSING_REQUIRED_INPUT");
});

test("est déterministe, ne mute pas et conserve l'ordre des flux", () => {
  const candidate = input({ mode_analyse: "scenario", periodes: [period({ flux: [
    flow({ id: "second", statut: "hypothetique" }), flow({ id: "first", montant: 200 }),
  ] })] });
  const snapshot = structuredClone(candidate);
  Object.freeze(candidate.periodes[0]!.flux[0]!);
  Object.freeze(candidate.periodes[0]!.flux);
  Object.freeze(candidate.periodes[0]!.periode);
  Object.freeze(candidate.periodes[0]!);
  Object.freeze(candidate.periodes);
  Object.freeze(candidate);
  const first = calculateTreasury(candidate);
  assert.deepEqual(first, calculateTreasury(candidate));
  assert.deepEqual(candidate, snapshot);
  assert.deepEqual(first.periodes[0]!.flux_retenus.map(({ id }) => id), ["second", "first"]);
  const reordered = calculateTreasury(input({ mode_analyse: "scenario", periodes: [period({ flux: [...snapshot.periodes[0]!.flux].reverse() })] }));
  assert.deepEqual(first.periodes[0]!.resultats, reordered.periodes[0]!.resultats);
});
test("canonise les sommes flottantes et la provenance sans réordonner les flux retenus", () => {
  const flows = [
    flow({ id: "a", montant: 10000000000000000 }),
    flow({ id: "b", montant: 1 }),
    flow({ id: "c", montant: 1 }),
  ];
  const firstInput = input({ periodes: [period({ flux: flows })] });
  const secondInput = input({ periodes: [period({ flux: [...flows].reverse() })] });
  const firstSnapshot = structuredClone(firstInput);
  const secondSnapshot = structuredClone(secondInput);
  const first = calculateTreasury(firstInput);
  const second = calculateTreasury(secondInput);
  assert.deepEqual(first.periodes[0]!.resultats, second.periodes[0]!.resultats);
  assert.equal(results(first).encaissements_realises, 10000000000000000);
  assert.deepEqual(first.periodes[0]!.provenance.encaissements_realises!.flow_ids, ["a", "b", "c"]);
  assert.deepEqual(second.periodes[0]!.provenance.solde_reel_cloture!.flow_ids, ["a", "b", "c"]);
  assert.deepEqual(first.periodes[0]!.flux_retenus.map(({ id }) => id), ["a", "b", "c"]);
  assert.deepEqual(second.periodes[0]!.flux_retenus.map(({ id }) => id), ["c", "b", "a"]);
  assert.deepEqual(firstInput, firstSnapshot);
  assert.deepEqual(secondInput, secondSnapshot);
});
test("respecte les invariants et ne laisse pas sortir de nombre non fini", () => {
  const base = calculateTreasury(input());
  const inflow = calculateTreasury(input({ periodes: [period({ flux: [flow({ montant: 1 })] })] }));
  const outflow = calculateTreasury(input({ periodes: [period({ flux: [flow({ sens: "decaissement", montant: 1 })] })] }));
  assert.ok(results(inflow).solde_reel_cloture! >= results(base).solde_reel_cloture!);
  assert.ok(results(outflow).solde_reel_cloture! <= results(base).solde_reel_cloture!);
  const lowReserve = calculateTreasury(input({ reserve_tresorerie: 1 }));
  const highReserve = calculateTreasury(input({ reserve_tresorerie: 2 }));
  assert.ok(results(highReserve).solde_disponible_apres_attendus_et_reserve! <= results(lowReserve).solde_disponible_apres_attendus_et_reserve!);
  rejected(input({ solde_ouverture: Number.MAX_VALUE, periodes: [period({ flux: [flow({ montant: Number.MAX_VALUE })] })] }), "INVALID_NUMBER");
});
