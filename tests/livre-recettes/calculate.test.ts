import assert from "node:assert/strict";
import test from "node:test";
import { calculateRevenueLedger } from "../../skills/livre-recettes/engine/index.ts";
import type { RevenueLedgerInput } from "../../skills/livre-recettes/engine/index.ts";

const complete = { reference_piece: "F-1", client_ou_payeur: "Client", nature: "service", mode_reglement: "virement" };
function entry(id = "r1", montant = 100, overrides = {}) { return { id, date_encaissement: "2026-01-15", date_enregistrement: "2026-01-15", montant, ...complete, ...overrides }; }
function input(overrides: Partial<RevenueLedgerInput> = {}): RevenueLedgerInput { return { periode: { debut: "2026-01-01", fin: "2026-01-31" }, devise: "EUR", entries: [entry()], events: [], ...overrides }; }
function rejected(candidate: unknown, code: string): void { const result = calculateRevenueLedger(candidate as RevenueLedgerInput); assert.equal(result.status, "unavailable"); assert.ok(result.errors.some(error => error.code === code)); assert.equal(result.totaux, undefined); assert.deepEqual(result.vue_courante, []); }
function event(type: string, id: string, overrides = {}) { return { type, id, target_entry_id: "r1", date_evenement: "2026-01-20", date_enregistrement: "2026-01-20", motif: "ajustement", ...overrides }; }

test("recette simple, deux recettes et zéro", () => {
  for (const [entries, gross] of [[[entry()], 100], [[entry("b", 50), entry("a", 100)], 150], [[entry("z", 0)], 0]] as const) {
    const result = calculateRevenueLedger(input({ entries: entries as RevenueLedgerInput["entries"] }));
    assert.equal(result.status, "ok"); assert.deepEqual(result.totaux, { total_recettes_brutes: gross, total_remboursements_appliques: 0, total_recettes_nettes: gross });
  }
});
test("champs descriptifs, ambigu explicite et doublons potentiels", () => {
  const missing = calculateRevenueLedger(input({ entries: [entry("r1", 100, { reference_piece: undefined, client_ou_payeur: undefined, nature: undefined, mode_reglement: undefined })] }));
  assert.equal(missing.status, "partial"); assert.deepEqual(missing.controles.map(x => x.status), ["manquant", "manquant", "manquant", "manquant"]);
  assert.equal(calculateRevenueLedger(input({ entries: [entry("r1", 100, { field_statuses: { reference_piece: "ambigu" } })] })).status, "partial");
  const duplicate = calculateRevenueLedger(input({ entries: [entry("c"), entry("a"), entry("b")] }));
  assert.equal(duplicate.status, "partial"); assert.deepEqual(duplicate.doublons_potentiels.map(x => x.entry_ids), [["a", "b"], ["a", "c"], ["b", "c"]]);
});
test("validation structurelle, dates et IDs", () => {
  rejected(input({ devise: "   " }), "INVALID_CURRENCY"); rejected(input({ entries: [entry("r", -1)] }), "INVALID_AMOUNT"); rejected(input({ entries: [entry("r", NaN)] }), "INVALID_NUMBER");
  rejected(input({ entries: [entry("r", 1, { date_encaissement: "2026-02-01" })] }), "INVALID_DATE"); rejected(input({ entries: [entry("r", 1, { date_facture: "2026-02-30" })] }), "INVALID_DATE");
  rejected(input({ entries: [entry("same"), entry("same")] }), "DUPLICATE_ENTRY_ID"); rejected(input({ events: [event("remboursement", "r1", { montant: 1 })] as RevenueLedgerInput["events"] }), "DUPLICATE_ENTRY_ID");
  rejected(input({ events: [event("remboursement", "e", { target_entry_id: "nope", montant: 1 })] as RevenueLedgerInput["events"] }), "INVALID_TARGET_ENTRY");
  rejected(input({ events: [event("remboursement", "e", { montant: 1, date_evenement: "2026-01-10" })] as RevenueLedgerInput["events"] }), "INVALID_DATE");
  rejected(input({ events: [event("remboursement", "e", { montant: 1, date_evenement: "2026-02-01" })] as RevenueLedgerInput["events"] }), "INVALID_DATE");
});
test("remboursements et annulation", () => {
  for (const [events, expected] of [
    [[event("remboursement", "e", { montant: 20 })], [100, 20, 80]],
    [[event("remboursement", "e", { montant: 100 })], [100, 100, 0]],
    [[event("remboursement", "e1", { montant: 20 }), event("remboursement", "e2", { montant: 30 })], [100, 50, 50]],
    [[event("remboursement", "e1", { montant: 20 }), event("annulation", "e2")], [100, 0, 0]],
  ] as const) { const result = calculateRevenueLedger(input({ events: events as unknown as RevenueLedgerInput["events"] })); assert.deepEqual(Object.values(result.totaux!), expected); }
  rejected(input({ events: [event("remboursement", "e", { montant: 120 })] as RevenueLedgerInput["events"] }), "INVALID_REFUND");
  for (const tail of [event("remboursement", "r", { montant: 1, date_evenement: "2026-01-21" }), event("annulation", "a2", { date_evenement: "2026-01-21" }), event("correction", "c", { date_evenement: "2026-01-21", avant: { montant: 100 }, apres: { montant: 110 } })]) rejected(input({ events: [event("annulation", "a"), tail] as RevenueLedgerInput["events"] }), "INVALID_CANCELLATION");
});
test("corrections: montant, métadonnées, ordre et erreurs", () => {
  const correction = event("correction", "c", { avant: { montant: 100 }, apres: { montant: 120 } });
  const result = calculateRevenueLedger(input({ events: [correction, event("remboursement", "r", { montant: 20, date_evenement: "2026-01-21" })] as RevenueLedgerInput["events"] }));
  assert.deepEqual(result.totaux, { total_recettes_brutes: 120, total_remboursements_appliques: 20, total_recettes_nettes: 100 });
  const metadata = calculateRevenueLedger(input({ events: [event("correction", "c", { avant: { nature: "service" }, apres: { nature: "produit" } })] as RevenueLedgerInput["events"] })); assert.equal(metadata.vue_courante[0].nature, "produit"); assert.equal(metadata.totaux!.total_recettes_nettes, 100);
  rejected(input({ events: [event("correction", "c", { avant: { montant: 99 }, apres: { montant: 120 } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
  rejected(input({ events: [event("correction", "c", { avant: { montant: 100 }, apres: { nature: "x" } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
  rejected(input({ events: [event("correction", "c", { avant: { id: "r1" }, apres: { id: "r2" } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
  rejected(input({ events: [event("correction", "c", { avant: { date_encaissement: "2026-01-15" }, apres: { date_encaissement: "2026-02-01" } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
  rejected(input({ events: [event("remboursement", "r", { montant: 20 }), event("correction", "c", { date_evenement: "2026-01-21", avant: { montant: 100 }, apres: { montant: 10 } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
});
test("chronologie dynamique après correction de date d'encaissement", () => {
  const valid = calculateRevenueLedger(input({ events: [
    event("correction", "c", { avant: { date_encaissement: "2026-01-15" }, apres: { date_encaissement: "2026-01-18" } }),
    event("remboursement", "r", { montant: 20, date_evenement: "2026-01-21" }),
  ] as RevenueLedgerInput["events"] }));
  assert.equal(valid.status, "ok"); assert.equal(valid.vue_courante[0].date_encaissement, "2026-01-18");
  rejected(input({ events: [event("correction", "c", { avant: { date_encaissement: "2026-01-15" }, apres: { date_encaissement: "2026-01-25" } })] as RevenueLedgerInput["events"] }), "INVALID_CORRECTION");
});
test("provenance ne retient que les événements ayant un effet final", () => {
  const corrected = calculateRevenueLedger(input({ events: [
    event("correction", "c", { avant: { montant: 100 }, apres: { montant: 120 } }),
    event("remboursement", "r", { montant: 20, date_evenement: "2026-01-21" }),
  ] as RevenueLedgerInput["events"] }));
  assert.deepEqual(corrected.provenance.total_recettes_brutes!.event_ids, ["c"]);
  assert.deepEqual(corrected.provenance.total_remboursements_appliques!.event_ids, ["r"]);
  assert.deepEqual(corrected.provenance.total_recettes_nettes!.event_ids, ["c", "r"]);
  const cancelled = calculateRevenueLedger(input({ events: [event("remboursement", "r", { montant: 20 }), event("annulation", "a", { date_evenement: "2026-01-21" })] as RevenueLedgerInput["events"] }));
  assert.deepEqual(cancelled.totaux, { total_recettes_brutes: 100, total_remboursements_appliques: 0, total_recettes_nettes: 0 });
  assert.deepEqual(cancelled.provenance.total_remboursements_appliques!.event_ids, ["a"]);
  assert.deepEqual(cancelled.provenance.total_recettes_nettes!.event_ids, ["a"]);
  const cancellationOnly = calculateRevenueLedger(input({ events: [event("annulation", "a")] as RevenueLedgerInput["events"] }));
  assert.deepEqual(cancellationOnly.provenance.total_remboursements_appliques!.event_ids, []);
});
test("ordre canonique, provenance, overflow et non-mutation", () => {
  const a = input({ entries: [entry("b", 1), entry("a", 1)], events: [event("remboursement", "z", { target_entry_id: "a", montant: 1 }), event("correction", "c", { target_entry_id: "a", avant: { montant: 1 }, apres: { montant: 120 }, date_evenement: "2026-01-19" })] as RevenueLedgerInput["events"] });
  const b = input({ entries: [entry("a", 1), entry("b", 1)], events: [...a.events!].reverse() });
  const first = calculateRevenueLedger(a), second = calculateRevenueLedger(b); assert.deepEqual(first.totaux, second.totaux); assert.deepEqual(first.provenance.total_recettes_nettes!.entry_ids, ["a", "b"]); assert.deepEqual(first.provenance.total_recettes_nettes!.event_ids, ["c", "z"]); assert.deepEqual(first.historique.entries.map(x => x.id), ["b", "a"]);
  const frozen = input({ entries: [entry("r", 1, { source: { reference: "x" } })] }); const snapshot = structuredClone(frozen); Object.freeze(frozen.periode); Object.freeze(frozen.entries[0].source!); Object.freeze(frozen.entries[0]); Object.freeze(frozen.entries); Object.freeze(frozen); assert.deepEqual(calculateRevenueLedger(frozen), calculateRevenueLedger(frozen)); assert.deepEqual(frozen, snapshot);
  rejected(input({ entries: [entry("a", Number.MAX_VALUE), entry("b", Number.MAX_VALUE)] }), "INVALID_NUMBER");
});
