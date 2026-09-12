import { validatePricingInput } from "./validate.js";
function unavailableResult(input, errors) {
    return {
        status: "unavailable",
        mode_analyse: input?.mode_analyse,
        mode_calcul: input?.mode_calcul,
        inputs_retenus: {}, resultats: {}, indisponibles: [], warnings: [], errors, provenance: {},
    };
}
function retainedInputs(input) {
    const common = {
        mode_analyse: input.mode_analyse,
        mode_calcul: input.mode_calcul,
        periode: {
            type: input.periode.type,
            ...(input.periode.debut !== undefined ? { debut: input.periode.debut } : {}),
            ...(input.periode.fin !== undefined ? { fin: input.periode.fin } : {}),
        },
        devise: input.devise,
        base_montants: input.base_montants,
        ...(input.unite !== undefined ? { unite: input.unite } : {}),
    };
    const costContext = input.perimetre_cout !== undefined
        ? { ...common, perimetre_cout: input.perimetre_cout }
        : common;
    switch (input.mode_calcul) {
        case "analyse_prix": return { ...costContext, cout: input.cout, prix_vente: input.prix_vente };
        case "prix_minimum_economique": return { ...costContext, cout: input.cout };
        case "prix_cible_taux_marque":
            return { ...costContext, cout: input.cout, taux_marque_cible: input.taux_marque_cible };
        case "prix_cible_taux_marge":
            return { ...costContext, cout: input.cout, taux_marge_cible: input.taux_marge_cible };
        case "remise":
            return { ...common, prix_initial: input.prix_initial, taux_remise: input.taux_remise };
    }
}
function addResult(result, key, value, formulaId, inputsUsed) {
    result.resultats[key] = value;
    result.provenance[key] = { formula_id: formulaId, inputs_used: inputsUsed };
}
// dependencies_regulatory = none
// dependencies_marketing = none
export function calculatePricing(input) {
    const { errors } = validatePricingInput(input);
    if (errors.length > 0)
        return unavailableResult(input, errors);
    const result = {
        status: "ok", mode_analyse: input.mode_analyse, mode_calcul: input.mode_calcul,
        inputs_retenus: retainedInputs(input), resultats: {}, indisponibles: [],
        warnings: [], errors: [], provenance: {},
    };
    switch (input.mode_calcul) {
        case "analyse_prix": {
            const margin = input.prix_vente - input.cout;
            addResult(result, "marge", margin, "MARGIN", ["prix_vente", "cout"]);
            if (input.prix_vente === 0) {
                result.indisponibles.push({
                    resultat: "taux_marque", code: "ZERO_SELLING_PRICE",
                    reason: "Le taux de marque exige un prix de vente strictement positif.",
                });
            }
            else {
                addResult(result, "taux_marque", margin / input.prix_vente, "MARK_RATE", ["marge", "prix_vente"]);
            }
            if (input.cout === 0) {
                result.indisponibles.push({
                    resultat: "taux_marge", code: "ZERO_COST",
                    reason: "Le taux de marge exige un coût strictement positif.",
                });
            }
            else {
                addResult(result, "taux_marge", margin / input.cout, "MARGIN_RATE", ["marge", "cout"]);
            }
            if (result.indisponibles.length > 0)
                result.status = "partial";
            break;
        }
        case "prix_minimum_economique":
            // Uniquement le coût dans le périmètre et l'unité déjà qualifiés par l'appelant.
            // Ni prix de marché, ni prix recommandé, ni minimum juridique.
            addResult(result, "prix_minimum_economique", input.cout, "ECONOMIC_MINIMUM_PRICE", ["cout"]);
            break;
        case "prix_cible_taux_marque":
            addResult(result, "prix_cible", input.cout / (1 - input.taux_marque_cible), "TARGET_PRICE_FROM_MARK_RATE", ["cout", "taux_marque_cible"]);
            break;
        case "prix_cible_taux_marge":
            addResult(result, "prix_cible", input.cout * (1 + input.taux_marge_cible), "TARGET_PRICE_FROM_MARGIN_RATE", ["cout", "taux_marge_cible"]);
            break;
        case "remise":
            addResult(result, "montant_remise", input.prix_initial * input.taux_remise, "DISCOUNT_AMOUNT", ["prix_initial", "taux_remise"]);
            addResult(result, "prix_apres_remise", input.prix_initial * (1 - input.taux_remise), "PRICE_AFTER_DISCOUNT", ["prix_initial", "taux_remise"]);
            break;
    }
    // Des entrées finies peuvent dépasser la capacité de number lors du calcul.
    for (const [key, value] of Object.entries(result.resultats)) {
        if (!Number.isFinite(value)) {
            return unavailableResult(input, [{
                    code: "INVALID_NUMBER", fields: [key],
                    message: `Le calcul de ${key} dépasse la capacité numérique de number.`,
                }]);
        }
    }
    return result;
}
