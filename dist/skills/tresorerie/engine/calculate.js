import { validateTreasuryInput } from "./validate.js";
const statusConfig = [
    ["realise", "encaissements_realises", "decaissements_realises", "REALIZED_INFLOW_TOTAL", "REALIZED_OUTFLOW_TOTAL"],
    ["engage", "encaissements_engages", "decaissements_engages", "COMMITTED_INFLOW_TOTAL", "COMMITTED_OUTFLOW_TOTAL"],
    ["attendu", "encaissements_attendus", "decaissements_attendus", "EXPECTED_INFLOW_TOTAL", "EXPECTED_OUTFLOW_TOTAL"],
    ["hypothetique", "encaissements_hypothetiques", "decaissements_hypothetiques", "HYPOTHETICAL_INFLOW_TOTAL", "HYPOTHETICAL_OUTFLOW_TOTAL"],
];
function copyFlow(flow) { return { ...flow }; }
function canonicalFlows(flows) {
    return [...flows].sort((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0));
}
function canonicalFlowIds(flows) {
    return canonicalFlows(flows).map(flow => flow.id);
}
function unavailable(input, errors) {
    return { status: "unavailable", mode_analyse: input?.mode_analyse, inputs_retenus: {}, periodes: [], warnings: [], errors };
}
function addResult(period, key, value, formula, inputs, flowIds) {
    period.resultats[key] = value;
    period.provenance[key] = { formula_id: formula, inputs_used: inputs, ...(flowIds !== undefined ? { flow_ids: flowIds } : {}) };
}
function copyInput(input) {
    return {
        mode_analyse: input.mode_analyse, devise: input.devise, solde_ouverture: input.solde_ouverture,
        periodes: input.periodes.map(period => ({ id: period.id, periode: { ...period.periode }, flux: period.flux.map(copyFlow) })),
        ...(input.reserve_tresorerie !== undefined ? { reserve_tresorerie: input.reserve_tresorerie } : {}),
    };
}
function finiteResults(result) {
    return result.periodes.every(period => Object.values(period.resultats).every(Number.isFinite));
}
// dependencies_regulatory = none
export function calculateTreasury(input) {
    const { errors } = validateTreasuryInput(input);
    if (errors.length > 0)
        return unavailable(input, errors);
    const result = {
        status: "ok", mode_analyse: input.mode_analyse, inputs_retenus: copyInput(input),
        periodes: [], warnings: [], errors: [],
    };
    let realOpening = input.solde_ouverture;
    let committedOpening = input.solde_ouverture;
    let expectedOpening = input.solde_ouverture;
    let scenarioOpening = input.solde_ouverture;
    for (const periodInput of input.periodes) {
        const period = {
            id: periodInput.id, periode: { ...periodInput.periode }, flux_retenus: [], flux_exclus: [], resultats: {}, provenance: {},
        };
        for (const flow of periodInput.flux) {
            if (flow.date < periodInput.periode.debut || flow.date > periodInput.periode.fin)
                period.flux_exclus.push({ id: flow.id, code: "OUTSIDE_PERIOD" });
            else
                period.flux_retenus.push(copyFlow(flow));
        }
        for (const [status, inflowKey, outflowKey, inflowFormula, outflowFormula] of statusConfig) {
            if (status === "hypothetique" && input.mode_analyse === "reel")
                continue;
            const inflows = period.flux_retenus.filter(flow => flow.statut === status && flow.sens === "encaissement");
            const outflows = period.flux_retenus.filter(flow => flow.statut === status && flow.sens === "decaissement");
            const canonicalInflows = canonicalFlows(inflows);
            const canonicalOutflows = canonicalFlows(outflows);
            addResult(period, inflowKey, canonicalInflows.reduce((sum, flow) => sum + flow.montant, 0), inflowFormula, ["flux"], canonicalInflows.map(flow => flow.id));
            addResult(period, outflowKey, canonicalOutflows.reduce((sum, flow) => sum + flow.montant, 0), outflowFormula, ["flux"], canonicalOutflows.map(flow => flow.id));
        }
        const r = period.resultats;
        const allRealizedIds = canonicalFlowIds(period.flux_retenus.filter(flow => flow.statut === "realise"));
        const allCommittedIds = canonicalFlowIds(period.flux_retenus.filter(flow => flow.statut === "realise" || flow.statut === "engage"));
        const allExpectedIds = canonicalFlowIds(period.flux_retenus.filter(flow => flow.statut !== "hypothetique"));
        realOpening = realOpening + r.encaissements_realises - r.decaissements_realises;
        addResult(period, "solde_reel_cloture", realOpening, "REAL_CLOSING_BALANCE", [
            result.periodes.length === 0 ? "solde_ouverture" : "solde_reel_cloture", "encaissements_realises", "decaissements_realises",
        ], allRealizedIds);
        committedOpening = committedOpening + r.encaissements_realises - r.decaissements_realises + r.encaissements_engages - r.decaissements_engages;
        addResult(period, "solde_apres_engages", committedOpening, "BALANCE_AFTER_COMMITTED", [
            result.periodes.length === 0 ? "solde_ouverture" : "solde_apres_engages", "encaissements_realises", "decaissements_realises", "encaissements_engages", "decaissements_engages",
        ], allCommittedIds);
        expectedOpening = expectedOpening + r.encaissements_realises - r.decaissements_realises + r.encaissements_engages - r.decaissements_engages + r.encaissements_attendus - r.decaissements_attendus;
        addResult(period, "solde_apres_attendus", expectedOpening, "BALANCE_AFTER_EXPECTED", [
            result.periodes.length === 0 ? "solde_ouverture" : "solde_apres_attendus", "encaissements_realises", "decaissements_realises", "encaissements_engages", "decaissements_engages", "encaissements_attendus", "decaissements_attendus",
        ], allExpectedIds);
        if (input.mode_analyse === "scenario") {
            const allScenarioIds = canonicalFlowIds(period.flux_retenus);
            scenarioOpening = scenarioOpening + r.encaissements_realises - r.decaissements_realises + r.encaissements_engages - r.decaissements_engages + r.encaissements_attendus - r.decaissements_attendus + r.encaissements_hypothetiques - r.decaissements_hypothetiques;
            addResult(period, "solde_scenario", scenarioOpening, "SCENARIO_BALANCE", [
                result.periodes.length === 0 ? "solde_ouverture" : "solde_scenario", "encaissements_realises", "decaissements_realises", "encaissements_engages", "decaissements_engages", "encaissements_attendus", "decaissements_attendus", "encaissements_hypothetiques", "decaissements_hypothetiques",
            ], allScenarioIds);
        }
        if (input.reserve_tresorerie !== undefined) {
            if (input.mode_analyse === "reel")
                addResult(period, "solde_disponible_apres_attendus_et_reserve", r.solde_apres_attendus - input.reserve_tresorerie, "AVAILABLE_BALANCE_AFTER_EXPECTED_AND_RESERVE", ["solde_apres_attendus", "reserve_tresorerie"]);
            else
                addResult(period, "solde_disponible_scenario_apres_reserve", r.solde_scenario - input.reserve_tresorerie, "AVAILABLE_SCENARIO_BALANCE_AFTER_RESERVE", ["solde_scenario", "reserve_tresorerie"]);
        }
        result.periodes.push(period);
    }
    if (!finiteResults(result))
        return unavailable(input, [{ code: "INVALID_NUMBER", fields: ["resultats"], message: "Le calcul dépasse la capacité numérique de number." }]);
    return result;
}
