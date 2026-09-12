import { reportedIndicatorKeys, validateManagementSummaryInput } from "./validate.js";
// dependencies_direct_engines = none
// dependencies_regulatory = none
const copySource = (source) => ({ ...source });
const copyAmount = (amount) => {
    const copy = { state: amount.state, origine: amount.origine };
    if (amount.valeur !== undefined)
        copy.valeur = amount.valeur;
    if (amount.source !== undefined)
        copy.source = copySource(amount.source);
    return copy;
};
function retained(input) {
    const result = {
        periode: { ...input.periode }, devise: input.devise, base_montants: input.base_montants, perimetre: input.perimetre,
        recettes_retenues: copyAmount(input.recettes_retenues), couts_retenus: copyAmount(input.couts_retenus),
    };
    if (input.indicateurs_reportes !== undefined) {
        result.indicateurs_reportes = {};
        for (const key of reportedIndicatorKeys) {
            const amount = input.indicateurs_reportes[key];
            if (amount !== undefined)
                result.indicateurs_reportes[key] = copyAmount(amount);
        }
    }
    return result;
}
const unavailable = (resultat) => ({
    resultat, code: "SOURCE_DATA_UNAVAILABLE", reason: `${resultat} depends on explicitly unavailable source data`,
});
function invalid(errors) {
    return { status: "unavailable", inputs_retenus: {}, resultats: { indicateurs_reportes: {} }, indisponibles: [], warnings: [], errors, provenance: {} };
}
function stateOf(left, right) {
    if (left.state === "hypothetique" || right.state === "hypothetique")
        return "hypothetique";
    if (left.state === "previsionnel" || right.state === "previsionnel")
        return "previsionnel";
    return "reel";
}
export function calculateManagementSummary(input) {
    const errors = validateManagementSummaryInput(input);
    if (errors.length > 0)
        return invalid(errors);
    const inputs_retenus = retained(input);
    const optionals = reportedIndicatorKeys.map((key) => [key, input.indicateurs_reportes?.[key]])
        .filter((entry) => entry[1] !== undefined);
    const indisponibles = [];
    const coreUnavailable = input.recettes_retenues.state === "indisponible" || input.couts_retenus.state === "indisponible";
    if (coreUnavailable)
        indisponibles.push(unavailable("solde_de_gestion_estime"));
    for (const [key, amount] of optionals)
        if (amount.state === "indisponible")
            indisponibles.push(unavailable(key));
    if (coreUnavailable)
        return { status: "unavailable", inputs_retenus, resultats: { indicateurs_reportes: {} }, indisponibles, warnings: [], errors: [], provenance: {} };
    const balance = input.recettes_retenues.valeur - input.couts_retenus.valeur;
    // With finite non-negative operands this formula has no naturally constructible V1 overflow case.
    if (!Number.isFinite(balance))
        return invalid([{ field: "solde_de_gestion_estime", code: "INVALID_NUMBER", message: "solde_de_gestion_estime: INVALID_NUMBER" }]);
    const reports = {};
    for (const [key, amount] of optionals)
        if (amount.state !== "indisponible")
            reports[key] = copyAmount(amount);
    const source_references = [input.recettes_retenues.source, input.couts_retenus.source]
        .filter((source) => source !== undefined).map(copySource);
    const provenance = source_references.length === 0
        ? { formula_id: "ESTIMATED_MANAGEMENT_BALANCE", inputs_used: ["recettes_retenues", "couts_retenus"] }
        : { formula_id: "ESTIMATED_MANAGEMENT_BALANCE", inputs_used: ["recettes_retenues", "couts_retenus"], source_references };
    return {
        status: indisponibles.length > 0 ? "partial" : "ok", inputs_retenus,
        resultats: { solde_de_gestion_estime: { valeur: balance, state: stateOf(input.recettes_retenues, input.couts_retenus), origine: "calcule" }, indicateurs_reportes: reports },
        indisponibles, warnings: [], errors: [], provenance: { solde_de_gestion_estime: provenance },
    };
}
