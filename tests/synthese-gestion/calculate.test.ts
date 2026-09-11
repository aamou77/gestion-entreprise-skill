import assert from "node:assert/strict";
import test from "node:test";
import { calculateManagementSummary } from "../../skills/synthese-gestion/engine/index.ts";
import type { ManagementSummaryInput } from "../../skills/synthese-gestion/engine/index.ts";

const source = { domaine: "moteur", source_id: "source-1", result_key: "montant" };
function input(overrides: Partial<ManagementSummaryInput> = {}): ManagementSummaryInput {
  return {
    periode: { debut: "2024-02-01", fin: "2024-02-29" }, devise: "EUR", base_montants: "HT", perimetre: "activité globale",
    recettes_retenues: { valeur: 1000, state: "reel", origine: "fourni" },
    couts_retenus: { valeur: 600, state: "reel", origine: "fourni" }, ...overrides,
  };
}
function rejected(candidate: unknown, code: string): void {
  const result = calculateManagementSummary(candidate as ManagementSummaryInput);
  assert.equal(result.status, "unavailable");
  assert.ok(result.errors.some(error => error.code === code));
  assert.deepEqual(result.resultats, { indicateurs_reportes: {} });
  assert.deepEqual(result.indisponibles, []);
  assert.deepEqual(result.provenance, {});
}

test("noyau nominal, zéro, solde négatif, state et origine", () => {
  const nominal = calculateManagementSummary(input());
  assert.equal(nominal.status, "ok");
  assert.deepEqual(nominal.resultats.solde_de_gestion_estime, { valeur: 400, state: "reel", origine: "calcule" });
  assert.deepEqual(nominal.provenance, { solde_de_gestion_estime: { formula_id: "ESTIMATED_MANAGEMENT_BALANCE", inputs_used: ["recettes_retenues", "couts_retenus"] } });
  for (const [recettes, couts, state] of [[0, 0, "reel"], [500, 700, "reel"], [1000, 600, "previsionnel"], [1000, 600, "hypothetique"]] as const) {
    const result = calculateManagementSummary(input({ recettes_retenues: { valeur: recettes, state, origine: "fourni" }, couts_retenus: { valeur: couts, state: "reel", origine: "calcule" } }));
    assert.equal(result.resultats.solde_de_gestion_estime!.valeur, recettes - couts);
    assert.equal(result.resultats.solde_de_gestion_estime!.state, state);
    assert.equal(result.resultats.solde_de_gestion_estime!.origine, "calcule");
  }
  assert.equal(calculateManagementSummary(input({ recettes_retenues: { valeur: 1, state: "previsionnel", origine: "fourni" }, couts_retenus: { valeur: 1, state: "previsionnel", origine: "fourni" } })).resultats.solde_de_gestion_estime!.state, "previsionnel");
});

test("noyau indisponible est une indisponibilité métier", () => {
  for (const field of ["recettes_retenues", "couts_retenus"] as const) {
    const result = calculateManagementSummary(input({ [field]: { state: "indisponible", origine: "fourni" } }));
    assert.equal(result.status, "unavailable"); assert.deepEqual(result.errors, []);
    assert.equal(result.resultats.solde_de_gestion_estime, undefined);
    assert.deepEqual(result.indisponibles, [{ resultat: "solde_de_gestion_estime", code: "SOURCE_DATA_UNAVAILABLE", reason: "solde_de_gestion_estime depends on explicitly unavailable source data" }]);
  }
});

test("validation atomique du noyau et des optionnels", () => {
  for (const [candidate, code] of [
    [input({ recettes_retenues: { valeur: -1, state: "reel", origine: "fourni" } }), "INVALID_AMOUNT"],
    [input({ recettes_retenues: { valeur: NaN, state: "reel", origine: "fourni" } }), "INVALID_NUMBER"],
    [input({ recettes_retenues: { valeur: "1" as unknown as number, state: "reel", origine: "fourni" } }), "INVALID_NUMBER"],
    [input({ recettes_retenues: { valeur: 1, state: "autre" as "reel", origine: "fourni" } }), "INVALID_DATA_STATE"],
    [input({ recettes_retenues: { valeur: 1, state: "reel", origine: "autre" as "fourni" } }), "INVALID_DATA_ORIGIN"],
    [input({ recettes_retenues: { state: "reel", origine: "fourni" } }), "INCONSISTENT_DATA_STATE"],
    [input({ recettes_retenues: { valeur: 1, state: "indisponible", origine: "fourni" } }), "INCONSISTENT_DATA_STATE"],
    [input({ indicateurs_reportes: { marge: { state: "reel", origine: "fourni" } } }), "INCONSISTENT_DATA_STATE"],
  ] as const) rejected(candidate, code);
});

test("indicateurs reportés: absent, disponible et indisponible", () => {
  assert.equal(calculateManagementSummary(input()).status, "ok");
  const omitted = calculateManagementSummary(input({ indicateurs_reportes: { marge: undefined } }));
  assert.equal(omitted.status, "ok");
  assert.deepEqual(omitted.errors, []);
  assert.deepEqual(omitted.indisponibles, []);
  assert.equal(Object.hasOwn(omitted.resultats.indicateurs_reportes, "marge"), false);
  const available = { valeur: -12, state: "previsionnel" as const, origine: "fourni" as const };
  const copied = calculateManagementSummary(input({ indicateurs_reportes: { marge: available } }));
  assert.deepEqual(copied.resultats.indicateurs_reportes.marge, available);
  assert.equal(Object.hasOwn(copied.resultats.indicateurs_reportes.marge!, "source"), false);
  const partial = calculateManagementSummary(input({ indicateurs_reportes: { marge_securite: { state: "indisponible", origine: "fourni" } } }));
  assert.equal(partial.status, "partial"); assert.equal(partial.resultats.solde_de_gestion_estime!.valeur, 400);
  assert.equal(partial.resultats.indicateurs_reportes.marge_securite, undefined);
  assert.deepEqual(partial.indisponibles.map(item => item.resultat), ["marge_securite"]);
});

test("source est copiée strictement et la provenance respecte recettes puis coûts", () => {
  const withTwo = calculateManagementSummary(input({
    recettes_retenues: { valeur: 1000, state: "reel", origine: "fourni", source },
    couts_retenus: { valeur: 600, state: "reel", origine: "fourni", source: { domaine: "coûts" } },
    indicateurs_reportes: { marge: { valeur: 1, state: "reel", origine: "fourni", source } },
  }));
  assert.deepEqual(withTwo.provenance.solde_de_gestion_estime!.source_references, [source, { domaine: "coûts" }]);
  assert.deepEqual(withTwo.resultats.indicateurs_reportes.marge!.source, source);
  assert.notEqual(withTwo.resultats.indicateurs_reportes.marge!.source, source);
  const one = calculateManagementSummary(input({ recettes_retenues: { valeur: 1000, state: "reel", origine: "fourni", source } }));
  assert.deepEqual(one.provenance.solde_de_gestion_estime!.source_references, [source]);
  const none = calculateManagementSummary(input());
  assert.equal(Object.hasOwn(none.provenance.solde_de_gestion_estime!, "source_references"), false);
});

test("base, période, devise, périmètre et sources sont validés", () => {
  assert.equal(calculateManagementSummary(input({ base_montants: "TTC", indicateurs_reportes: { prix_vente: { valeur: 9, state: "reel", origine: "fourni" } } })).inputs_retenus.base_montants, "TTC");
  for (const period of [{ debut: "2024-02-30", fin: "2024-03-01" }, { debut: "2024-2-01", fin: "2024-03-01" }, { debut: "2024-03-02", fin: "2024-03-01" }]) rejected(input({ periode: period }), "INVALID_PERIOD");
  rejected(input({ devise: "" }), "INVALID_CURRENCY"); rejected(input({ devise: "   " }), "INVALID_CURRENCY"); rejected(input({ base_montants: "TVA" as "HT" }), "INVALID_AMOUNT_BASIS"); rejected(input({ perimetre: "" }), "INVALID_PERIMETER"); rejected(input({ perimetre: "   " }), "INVALID_PERIMETER");
  rejected(input({ recettes_retenues: { valeur: 1, state: "reel", origine: "fourni", source: [] as unknown as undefined } }), "MISSING_REQUIRED_INPUT");
  rejected(input({ recettes_retenues: { valeur: 1, state: "reel", origine: "fourni", source: { domaine: 1 } as unknown as undefined } }), "MISSING_REQUIRED_INPUT");
  assert.equal(calculateManagementSummary(input({ recettes_retenues: { valeur: 1, state: "reel", origine: "fourni", source: {} } })).status, "ok");
});

test("priorité déterministe du noyau indisponible", () => {
  const result = calculateManagementSummary(input({ recettes_retenues: { state: "indisponible", origine: "fourni" }, indicateurs_reportes: { marge: { state: "indisponible", origine: "fourni" } } }));
  assert.equal(result.status, "unavailable");
  assert.deepEqual(result.indisponibles.map(item => item.resultat), ["solde_de_gestion_estime", "marge"]);
});

test("déterminisme, absence de mutation et invariants", () => {
  const candidate = input({ recettes_retenues: { valeur: 1000, state: "reel", origine: "fourni", source }, indicateurs_reportes: { marge: { valeur: 4, state: "reel", origine: "fourni", source } } });
  const snapshot = structuredClone(candidate);
  Object.freeze(candidate.periode); Object.freeze(candidate.recettes_retenues.source!); Object.freeze(candidate.recettes_retenues); Object.freeze(candidate.indicateurs_reportes!.marge!.source!); Object.freeze(candidate.indicateurs_reportes!.marge!); Object.freeze(candidate.indicateurs_reportes!); Object.freeze(candidate);
  const first = calculateManagementSummary(candidate); assert.deepEqual(first, calculateManagementSummary(candidate)); assert.deepEqual(candidate, snapshot);
  first.inputs_retenus.recettes_retenues!.source!.domaine = "modifiée"; assert.deepEqual(candidate, snapshot);
  const lowCost = calculateManagementSummary(input({ couts_retenus: { valeur: 500, state: "reel", origine: "fourni" } })).resultats.solde_de_gestion_estime!.valeur;
  const highCost = calculateManagementSummary(input({ couts_retenus: { valeur: 700, state: "reel", origine: "fourni" } })).resultats.solde_de_gestion_estime!.valeur;
  assert.ok(lowCost > highCost);
});
