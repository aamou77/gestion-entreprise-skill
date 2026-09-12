import { isCalculationMode, validateBreakEvenInput } from "./validate.js";
function unavailableResult(input, errors) {
    return {
        status: "unavailable",
        mode_analyse: input?.mode_analyse,
        mode_calcul: input?.mode_calcul,
        inputs_retenus: {},
        resultats: {},
        indisponibles: [],
        warnings: [],
        errors,
        provenance: {},
    };
}
function addProvenance(result, resultKey, formulaId, inputsUsed) {
    result.provenance[resultKey] = {
        formula_id: formulaId,
        inputs_used: inputsUsed,
    };
}
function addUnavailable(result, resultKey, code, reason) {
    result.indisponibles.push({ resultat: resultKey, code, reason });
}
function retainedInputs(input) {
    const common = {
        mode_analyse: input.mode_analyse,
        mode_calcul: input.mode_calcul,
        periode: { ...input.periode },
        devise: input.devise,
        base_montants: input.base_montants,
        couts_fixes: input.couts_fixes,
    };
    if (input.mode_calcul === "unitaire") {
        return {
            ...common,
            prix_unitaire: input.prix_unitaire,
            cout_variable_unitaire: input.cout_variable_unitaire,
            ...(input.chiffre_affaires_comparaison !== undefined
                ? { chiffre_affaires_comparaison: input.chiffre_affaires_comparaison }
                : {}),
            ...(input.arrondi_operationnel === "ceil" ? { arrondi_operationnel: "ceil" } : {}),
            ...(input.unite !== undefined ? { unite: input.unite } : {}),
        };
    }
    return {
        ...common,
        chiffre_affaires: input.chiffre_affaires,
        couts_variables: input.couts_variables,
        ...(input.chiffre_affaires_comparaison !== undefined
            ? { chiffre_affaires_comparaison: input.chiffre_affaires_comparaison }
            : {}),
    };
}
function calculateSafetyMargin(result, input) {
    if (input.chiffre_affaires_comparaison === undefined) {
        return;
    }
    if (result.resultats.seuil_chiffre_affaires === undefined) {
        const thresholdUnavailable = result.indisponibles.find(({ resultat }) => resultat === "seuil_chiffre_affaires");
        if (thresholdUnavailable?.code === "NON_POSITIVE_UNIT_CONTRIBUTION"
            || thresholdUnavailable?.code === "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE") {
            const reason = "La marge de sécurité exige un seuil de chiffre d'affaires disponible.";
            addUnavailable(result, "marge_securite", thresholdUnavailable.code, reason);
            addUnavailable(result, "taux_marge_securite", thresholdUnavailable.code, reason);
        }
        return;
    }
    const safetyMargin = input.chiffre_affaires_comparaison - result.resultats.seuil_chiffre_affaires;
    result.resultats.marge_securite = safetyMargin;
    addProvenance(result, "marge_securite", "SAFETY_MARGIN", [
        "chiffre_affaires_comparaison",
        "seuil_chiffre_affaires",
    ]);
    if (input.chiffre_affaires_comparaison === 0) {
        result.status = "partial";
        addUnavailable(result, "taux_marge_securite", "ZERO_REVENUE", "Le taux de marge de sécurité exige un chiffre d'affaires de comparaison strictement positif.");
        return;
    }
    result.resultats.taux_marge_securite = safetyMargin / input.chiffre_affaires_comparaison;
    addProvenance(result, "taux_marge_securite", "SAFETY_MARGIN_RATE", [
        "marge_securite",
        "chiffre_affaires_comparaison",
    ]);
}
function calculateUnitMode(result, input) {
    const contribution = input.prix_unitaire - input.cout_variable_unitaire;
    result.resultats.marge_sur_cout_variable_unitaire = contribution;
    addProvenance(result, "marge_sur_cout_variable_unitaire", "UNIT_CONTRIBUTION_MARGIN", [
        "prix_unitaire",
        "cout_variable_unitaire",
    ]);
    if (contribution <= 0) {
        result.status = "partial";
        const reason = "Le seuil exige une marge sur coût variable unitaire strictement positive.";
        addUnavailable(result, "seuil_en_unites_mathematique", "NON_POSITIVE_UNIT_CONTRIBUTION", reason);
        addUnavailable(result, "seuil_chiffre_affaires", "NON_POSITIVE_UNIT_CONTRIBUTION", reason);
        if (input.arrondi_operationnel === "ceil") {
            addUnavailable(result, "seuil_en_unites_operationnel", "NON_POSITIVE_UNIT_CONTRIBUTION", reason);
        }
        return;
    }
    const breakEvenUnits = input.couts_fixes / contribution;
    result.resultats.seuil_en_unites_mathematique = breakEvenUnits;
    addProvenance(result, "seuil_en_unites_mathematique", "BREAK_EVEN_UNITS", [
        "couts_fixes",
        "marge_sur_cout_variable_unitaire",
    ]);
    result.resultats.seuil_chiffre_affaires = breakEvenUnits * input.prix_unitaire;
    addProvenance(result, "seuil_chiffre_affaires", "BREAK_EVEN_REVENUE_UNIT", [
        "seuil_en_unites_mathematique",
        "prix_unitaire",
    ]);
    if (input.arrondi_operationnel === "ceil") {
        result.resultats.seuil_en_unites_operationnel = Math.ceil(breakEvenUnits);
        addProvenance(result, "seuil_en_unites_operationnel", "BREAK_EVEN_UNITS_OPERATIONAL_CEIL", [
            "seuil_en_unites_mathematique",
        ]);
        result.warnings.push({ code: "OPERATIONAL_ROUNDING_APPLIED" });
    }
}
function calculateGlobalMode(result, input) {
    const variableCostRate = input.couts_variables / input.chiffre_affaires;
    const contributionMarginRate = 1 - variableCostRate;
    result.resultats.taux_couts_variables = variableCostRate;
    result.resultats.taux_marge_sur_cout_variable = contributionMarginRate;
    addProvenance(result, "taux_couts_variables", "VARIABLE_COST_RATE", [
        "couts_variables",
        "chiffre_affaires",
    ]);
    addProvenance(result, "taux_marge_sur_cout_variable", "CONTRIBUTION_MARGIN_RATE", [
        "taux_couts_variables",
    ]);
    if (contributionMarginRate <= 0) {
        result.status = "partial";
        addUnavailable(result, "seuil_chiffre_affaires", "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE", "Le seuil exige un taux de marge sur coût variable strictement positif.");
        return;
    }
    result.resultats.seuil_chiffre_affaires = input.couts_fixes / contributionMarginRate;
    addProvenance(result, "seuil_chiffre_affaires", "BREAK_EVEN_REVENUE_GLOBAL", [
        "couts_fixes",
        "taux_marge_sur_cout_variable",
    ]);
}
export function calculateBreakEven(input) {
    const { errors } = validateBreakEvenInput(input);
    if (errors.length > 0 || !isCalculationMode(input?.mode_calcul)) {
        return unavailableResult(input, errors);
    }
    const result = {
        status: "ok",
        mode_analyse: input.mode_analyse,
        mode_calcul: input.mode_calcul,
        inputs_retenus: retainedInputs(input),
        resultats: {},
        indisponibles: [],
        warnings: [],
        errors: [],
        provenance: {},
    };
    if (input.mode_calcul === "unitaire") {
        calculateUnitMode(result, input);
    }
    else {
        calculateGlobalMode(result, input);
    }
    calculateSafetyMargin(result, input);
    return result;
}
