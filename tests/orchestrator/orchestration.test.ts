import assert from "node:assert/strict";
import test from "node:test";
import {
  composeSum, deriveOverallStatus, ledgerToManagement, pricingToBreakEven,
  routeIntent, validateQualifiedValue, validateReferenceResult
} from "../../orchestrator/index.ts";

const q = (amount = 10, id = "a", extra: Record<string, unknown> = {}) => ({
  status: "available" as const, value: amount, origin: "provided" as const,
  state: "reel" as const, meaning: "ca" as const,
  periode: { debut: "2026-01-01", fin: "2026-01-31" }, devise: "EUR",
  base_montants: "HT" as const, perimetre: "global", unite: "site",
  contribution_refs: [{ domain: "provided" as const, source_id: id }], ...extra
});
const errorCode = (result: unknown) => (result as { error?: { code?: string } }).error?.code;
const sum = (...values: any[]) => composeSum({ operation: "sum", values });

// QualifiedValue

test("QualifiedValue accepte zéro, indisponible motivé et les trois états", () => {
  assert.equal(validateQualifiedValue(q(0)), undefined);
  assert.equal(validateQualifiedValue({ status: "unavailable", origin: "provided", meaning: "ca", reason: "source absente" }), undefined);
  for (const state of ["reel", "previsionnel", "hypothetique"])
    assert.equal(validateQualifiedValue(q(1, "a", { state })), undefined);
});

test("QualifiedValue applique strictement son discriminant", () => {
  for (const invalid of [
    { status: "unavailable", origin: "provided", meaning: "ca", reason: "x", value: 0 },
    { status: "unavailable", origin: "provided", meaning: "ca" },
    { status: "available", origin: "provided", meaning: "ca", state: "reel" },
    { ...q(), state: "invalide" }, { ...q(), status: "other" }
  ]) assert.equal(validateQualifiedValue(invalid)?.code, "INVALID_QUALIFICATION");
});

test("QualifiedValue refuse origin, meaning et textes invalides", () => {
  for (const invalid of [
    { ...q(), origin: "other" }, { ...q(), meaning: "other" }, { ...q(), devise: "" },
    { ...q(), perimetre: "" }, { ...q(), unite: " " }
  ]) assert.equal(validateQualifiedValue(invalid)?.code, "INVALID_QUALIFICATION");
});

test("QualifiedValue accepte HT et TTC, et refuse toute autre base", () => {
  assert.equal(validateQualifiedValue(q(1, "a", { base_montants: "HT" })), undefined);
  assert.equal(validateQualifiedValue(q(1, "a", { base_montants: "TTC" })), undefined);
  assert.equal(validateQualifiedValue(q(1, "a", { base_montants: "TVA" }))?.code, "INVALID_QUALIFICATION");
});

test("source valide et champs source invalides", () => {
  assert.equal(validateQualifiedValue(q(1, "a", { source: { domain: "tarification", source_id: "id", result_key: "prix" } })), undefined);
  for (const source of [
    { domain: "tarification", source_id: 123 }, { domain: "tarification", source_id: "" },
    { domain: "tarification", result_key: 123 }, { domain: "tarification", result_key: "" },
    { domain: "inconnu", source_id: "id" }
  ]) assert.equal(validateQualifiedValue(q(1, "a", { source }))?.code, "INVALID_QUALIFICATION");
});

test("périodes ISO calendaires et ContributionReference sont contrôlées", () => {
  assert.equal(validateQualifiedValue(q(1, "a", { periode: { debut: "2026-01-01", fin: "2026-01-31" } })), undefined);
  for (const periode of [
    { debut: "2026-02-30", fin: "2026-03-01" }, { debut: "2026-2-01", fin: "2026-02-02" },
    { debut: "2026-13-01", fin: "2026-13-02" }, { debut: "2026-02-02", fin: "2026-02-01" }, []
  ]) assert.equal(validateQualifiedValue(q(1, "a", { periode }))?.code, "INVALID_QUALIFICATION");
  assert.equal(validateQualifiedValue(q(1, "a", { contribution_refs: [] })), undefined);
  for (const contribution_refs of [
    [{ domain: "provided", source_id: "" }], [{ domain: "provided", source_id: 1 }], [{ domain: "invalid", source_id: "a" }]
  ]) assert.equal(validateQualifiedValue(q(1, "a", { contribution_refs }))?.code, "INVALID_QUALIFICATION");
});

// ReferenceResult

test("ReferenceResult available requiert verified et un rule_id", () => {
  assert.equal(validateReferenceResult({ status: "available", rule_id: "r", rule_status: "verified", source_ids: ["s"] }), undefined);
  for (const invalid of [
    { status: "available", rule_id: "r", rule_status: "needs_review" },
    { status: "available", rule_status: "verified" },
    { status: "available", rule_id: "r", rule_status: "verified", source_ids: [""] }
  ]) assert.equal(validateReferenceResult(invalid)?.code, "INVALID_QUALIFICATION");
});

test("ReferenceResult unavailable accepte chaque statut défini avec raison", () => {
  for (const rule_status of ["needs_review", "scheduled", "superseded", "unknown", "verified"])
    assert.equal(validateReferenceResult({ status: "unavailable", rule_status, reason: "non applicable" }), undefined);
  assert.equal(validateReferenceResult({ status: "unavailable", rule_status: "scheduled" })?.code, "INVALID_QUALIFICATION");
});

// Transmissions

const ledger = () => q(12, "ledger", { meaning: "recettes_registre_nettes" });
const ledgerContext = { perimetre: "global", base_montants: "HT" as const, state: "reel" as const };

test("ledgerToManagement nominal dérive le meaning et conserve la provenance", () => {
  const source = ledger();
  const out = ledgerToManagement(source, ledgerContext).value!;
  assert.equal(out.status, "available");
  assert.equal(out.meaning, "recettes_retenues_gestion");
  assert.equal(out.origin, "derived");
  assert.deepEqual(out.contribution_refs, source.contribution_refs);
});

test("ledgerToManagement protège toutes ses préconditions runtime", () => {
  assert.equal(errorCode(ledgerToManagement({ status: "available", value: 1 } as any, ledgerContext)), "INVALID_QUALIFICATION");
  assert.equal(errorCode(ledgerToManagement({ status: "unavailable", origin: "provided", meaning: "recettes_registre_nettes", reason: "x" } as any, ledgerContext)), "ENGINE_UNAVAILABLE");
  assert.equal(errorCode(ledgerToManagement(q(1, "a", { meaning: "marge" }), ledgerContext)), "INVALID_QUALIFICATION");
  assert.equal(errorCode(ledgerToManagement(ledger(), { ...ledgerContext, perimetre: undefined })), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(ledgerToManagement(ledger(), { ...ledgerContext, base_montants: undefined })), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(ledgerToManagement(ledger(), { ...ledgerContext, state: undefined })), "MISSING_REQUIRED_DATA");
  for (const extra of [{ periode: undefined }, { devise: undefined }, { contribution_refs: undefined }, { contribution_refs: [] }])
    assert.equal(errorCode(ledgerToManagement({ ...ledger(), ...extra }, ledgerContext)), "INSUFFICIENT_PROVENANCE");
});

test("pricingToBreakEven transmet un prix qualifié compatible", () => {
  const price = q(5, "price", { meaning: "prix_unitaire" });
  const target = { unite: "site", devise: "EUR", base_montants: "HT" as const, perimetre: "global" };
  const out = pricingToBreakEven(price, target).value!;
  assert.equal(out.status, "available");
  assert.equal(out.meaning, "prix_unitaire");
  assert.equal(out.origin, "derived");
});

test("pricingToBreakEven contrôle runtime, meaning, absence et incompatibilités", () => {
  const price = q(5, "price", { meaning: "prix_unitaire" });
  const target = { unite: "site", devise: "EUR", base_montants: "HT" as const, perimetre: "global" };
  assert.equal(errorCode(pricingToBreakEven({ status: "available", value: 1 } as any, target)), "INVALID_QUALIFICATION");
  assert.equal(errorCode(pricingToBreakEven(q(1, "x", { meaning: "marge" }), target)), "INVALID_QUALIFICATION");
  assert.equal(errorCode(pricingToBreakEven({ ...price, unite: undefined }, target)), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(pricingToBreakEven(price, { ...target, unite: undefined })), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(pricingToBreakEven(price, { ...target, unite: "jour" })), "INCOMPATIBLE_UNIT");
  assert.equal(errorCode(pricingToBreakEven(price, { ...target, devise: "USD" })), "INCOMPATIBLE_CURRENCY");
  assert.equal(errorCode(pricingToBreakEven(price, { ...target, perimetre: "autre" })), "INCOMPATIBLE_SCOPE");
  assert.equal(errorCode(pricingToBreakEven(price, { ...target, base_montants: "TTC" })), "INCOMPATIBLE_AMOUNT_BASIS");
});

// SUM

test("SUM nominal, zéro, état et origine dérivée", () => {
  assert.equal(sum(q(40, "a"), q(60, "b")).value?.value, 100);
  assert.equal(sum(q(0, "a"), q(0, "b")).value?.value, 0);
  assert.equal(sum(q(1, "a"), q(2, "b")).value?.state, "reel");
  assert.equal(sum(q(1, "a"), q(2, "b", { state: "previsionnel" })).value?.state, "previsionnel");
  assert.equal(sum(q(1, "a", { state: "previsionnel" }), q(2, "b", { state: "hypothetique" })).value?.state, "hypothetique");
  assert.equal(sum(q(1, "a"), q(2, "b")).value?.origin, "derived");
});

test("SUM compare meaning, périodes et devise", () => {
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { meaning: "marge" }))), "INVALID_QUALIFICATION");
  assert.equal(sum(q(1, "a"), q(2, "b", { periode: { fin: "2026-01-31", debut: "2026-01-01" } })).value?.value, 3);
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { periode: { debut: "2026-02-01", fin: "2026-02-28" } }))), "INCOMPATIBLE_PERIOD");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { periode: undefined }))), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { devise: "USD" }))), "INCOMPATIBLE_CURRENCY");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { devise: undefined }))), "MISSING_REQUIRED_DATA");
});

test("SUM accepte l'absence commune de devise, base et unité sans les inventer", () => {
  const bare = (id: string) => q(1, id, { devise: undefined, base_montants: undefined, unite: undefined });
  const out = sum(bare("a"), bare("b")).value!;
  assert.equal(out.value, 2);
  assert.equal(out.devise, undefined);
  assert.equal(out.base_montants, undefined);
  assert.equal(out.unite, undefined);
});

test("SUM compare base, périmètre et unité", () => {
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { base_montants: "TTC" }))), "INCOMPATIBLE_AMOUNT_BASIS");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { base_montants: undefined }))), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { perimetre: "autre" }))), "INCOMPATIBLE_SCOPE");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { perimetre: undefined }))), "MISSING_REQUIRED_DATA");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { unite: "jour" }))), "INCOMPATIBLE_UNIT");
  assert.equal(errorCode(sum(q(1, "a"), q(2, "b", { unite: undefined }))), "MISSING_REQUIRED_DATA");
});

test("SUM impose une provenance suffisante et rejette le double compte", () => {
  assert.equal(sum(q(1, "a"), q(2, "b")).value?.value, 3);
  assert.equal(errorCode(sum(q(1, "a", { contribution_refs: undefined }), q(2, "b"))), "INSUFFICIENT_PROVENANCE");
  assert.equal(errorCode(sum(q(1, "a", { contribution_refs: [] }), q(2, "b"))), "INSUFFICIENT_PROVENANCE");
  const a = q(1, "a", { contribution_refs: [{ domain: "provided", source_id: "r1" }, { domain: "provided", source_id: "r2" }] });
  const b = q(2, "b", { contribution_refs: [{ domain: "provided", source_id: "r2" }, { domain: "provided", source_id: "r3" }] });
  assert.equal(errorCode(sum(a, b)), "DUPLICATE_ECONOMIC_CONTRIBUTION");
});

test("SUM a un ordre canonique sûr pour les séparateurs", () => {
  const a = q(1, "a", { contribution_refs: [{ domain: "provided", source_id: "a|b" }] });
  const b = q(2, "b", { contribution_refs: [{ domain: "provided", source_id: "a,b" }] });
  const c = q(3, "c", { contribution_refs: [{ domain: "provided", source_id: "|" }, { domain: "tarification", source_id: "," }] });
  assert.deepEqual(sum(a, b, c), sum(c, a, b));
});

test("SUM ne propage pas source et ne partage aucune structure mutable", () => {
  const a = q(1, "a", { source: { domain: "provided", source_id: "first" } });
  const b = q(2, "b", { source: { domain: "provided", source_id: "second" } });
  const snapshot = structuredClone([a, b]);
  const out = sum(a, b).value!;
  assert.equal(out.source, undefined);
  out.periode!.debut = "2030-01-01";
  out.contribution_refs![0].source_id = "mutated";
  assert.deepEqual([a, b], snapshot);
});

test("SUM refuse overflow, opération non autorisée et valeur runtime invalide", () => {
  assert.equal(errorCode(sum(q(Number.MAX_VALUE, "a"), q(Number.MAX_VALUE, "b"))), "INVALID_QUALIFICATION");
  assert.equal(errorCode(composeSum({ operation: "divide", values: [q()] })), "UNSUPPORTED_COMPOSITION");
  assert.equal(errorCode(sum({ status: "available", value: 1 } as any)), "INVALID_QUALIFICATION");
});

// Statut, routes, pureté

test("deriveOverallStatus couvre les sorties requises, optionnelles et review", () => {
  const one = [{ id: "a", kind: "sum" as const, required: true }];
  const two = [...one, { id: "b", kind: "sum" as const, required: true }];
  assert.equal(deriveOverallStatus(one, ["a"], [], []), "ok");
  assert.equal(deriveOverallStatus(two, ["a", "b"], [], []), "ok");
  assert.equal(deriveOverallStatus(two, ["a"], ["b"], []), "partial");
  assert.equal(deriveOverallStatus(two, [], ["a", "b"], []), "unavailable");
  assert.equal(deriveOverallStatus(one, [], ["a"], []), "unavailable");
  assert.equal(deriveOverallStatus([...one, { id: "optional", kind: "sum" as const, required: false }], ["a"], ["optional"], []), "ok");
  assert.equal(deriveOverallStatus(two, ["a"], [], ["b"]), "partial");
  assert.equal(deriveOverallStatus([{ id: "optional", kind: "sum", required: false }], [], [], []), "ok");
});

test("toutes les routes V1 ont les moteurs et la composition exacts", () => {
  const expected = {
    break_even: [["seuil-rentabilite"], "single_engine"], pricing: [["tarification"], "single_engine"],
    treasury: [["tresorerie"], "single_engine"], management_summary: [["synthese-gestion"], "single_engine"],
    revenue_ledger: [["livre-recettes"], "single_engine"], pricing_then_break_even: [["tarification", "seuil-rentabilite"], "pricing_to_break_even"],
    ledger_then_summary: [["livre-recettes", "synthese-gestion"], "qualified_transmission"]
  } as const;
  for (const [intent, [engines, composition]] of Object.entries(expected)) {
    const route = routeIntent(intent as keyof typeof expected)[0];
    assert.equal(route.requested_output_id, intent);
    assert.deepEqual(route.engines, engines);
    assert.equal(route.composition, composition);
  }
});

test("fonctions pures déterministes et sans mutation des entrées", () => {
  const price = q(5, "p", { meaning: "prix_unitaire" });
  const target = { unite: "site", devise: "EUR", base_montants: "HT" as const, perimetre: "global" };
  const sourceLedger = ledger();
  const before = structuredClone({ price, target, sourceLedger });
  Object.freeze(price); Object.freeze(target); Object.freeze(sourceLedger);
  assert.deepEqual(pricingToBreakEven(price, target), pricingToBreakEven(price, target));
  assert.deepEqual(ledgerToManagement(sourceLedger, ledgerContext), ledgerToManagement(sourceLedger, ledgerContext));
  assert.deepEqual(routeIntent("pricing_then_break_even"), routeIntent("pricing_then_break_even"));
  assert.deepEqual({ price, target, sourceLedger }, before);
});
