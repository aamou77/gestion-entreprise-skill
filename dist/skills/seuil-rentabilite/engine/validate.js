const periodTypes = new Set([
    "mensuelle",
    "trimestrielle",
    "annuelle",
    "personnalisee",
]);
function hasOwn(value, key) {
    return Object.prototype.hasOwnProperty.call(value, key);
}
function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}
function isIsoDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function addError(errors, code, fields, message) {
    errors.push({ code, fields, message });
}
function validateRequiredNumber(input, field, errors) {
    if (!hasOwn(input, field) || input[field] === undefined || input[field] === null) {
        addError(errors, "MISSING_REQUIRED_INPUT", [field], `${field} est requis.`);
        return undefined;
    }
    if (!isFiniteNumber(input[field])) {
        addError(errors, "INVALID_NUMBER", [field], `${field} doit être un nombre fini.`);
        return undefined;
    }
    return input[field];
}
function validateOptionalNumber(input, field, errors) {
    if (!hasOwn(input, field) || input[field] === undefined) {
        return undefined;
    }
    if (!isFiniteNumber(input[field])) {
        addError(errors, "INVALID_NUMBER", [field], `${field} doit être un nombre fini.`);
        return undefined;
    }
    return input[field];
}
function validatePeriod(value, errors) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        addError(errors, "INVALID_PERIOD", ["periode"], "periode doit être un objet valide.");
        return;
    }
    const period = value;
    if (typeof period.type !== "string" || !periodTypes.has(period.type)) {
        addError(errors, "INVALID_PERIOD", ["periode.type"], "type de période invalide.");
        return;
    }
    const hasStart = period.debut !== undefined;
    const hasEnd = period.fin !== undefined;
    if ((hasStart && (typeof period.debut !== "string" || !isIsoDate(period.debut)))
        || (hasEnd && (typeof period.fin !== "string" || !isIsoDate(period.fin)))) {
        addError(errors, "INVALID_PERIOD", ["periode.debut", "periode.fin"], "Les dates de période doivent être au format ISO-8601 YYYY-MM-DD.");
        return;
    }
    if (period.type === "personnalisee" && (!hasStart || !hasEnd)) {
        addError(errors, "INVALID_PERIOD", ["periode.debut", "periode.fin"], "Une période personnalisée exige un début et une fin.");
        return;
    }
    if (hasStart && hasEnd && period.debut > period.fin) {
        addError(errors, "INVALID_PERIOD", ["periode.debut", "periode.fin"], "Le début de période doit précéder ou égaler la fin.");
    }
}
function validateCommonFields(input, errors) {
    if (input.mode_analyse !== "reel" && input.mode_analyse !== "scenario") {
        addError(errors, "MISSING_REQUIRED_INPUT", ["mode_analyse"], "mode_analyse doit être reel ou scenario.");
    }
    if (input.mode_calcul !== "unitaire" && input.mode_calcul !== "global") {
        addError(errors, "MISSING_REQUIRED_INPUT", ["mode_calcul"], "mode_calcul doit être unitaire ou global.");
    }
    validatePeriod(input.periode, errors);
    if (typeof input.devise !== "string" || input.devise.trim().length === 0) {
        addError(errors, "INVALID_CURRENCY", ["devise"], "devise doit être une chaîne non vide.");
    }
    if (input.base_montants !== "HT" && input.base_montants !== "TTC") {
        addError(errors, "INVALID_AMOUNT_BASIS", ["base_montants"], "base_montants doit être HT ou TTC.");
    }
    const fixedCosts = validateRequiredNumber(input, "couts_fixes", errors);
    if (fixedCosts !== undefined && fixedCosts < 0) {
        addError(errors, "NEGATIVE_FIXED_COST", ["couts_fixes"], "couts_fixes ne peut pas être négatif.");
    }
    if (input.arrondi_operationnel !== undefined && input.arrondi_operationnel !== "ceil") {
        addError(errors, "MISSING_REQUIRED_INPUT", ["arrondi_operationnel"], "arrondi_operationnel doit être ceil lorsqu'il est fourni.");
    }
    if (input.unite !== undefined && typeof input.unite !== "string") {
        addError(errors, "MISSING_REQUIRED_INPUT", ["unite"], "unite doit être une chaîne lorsqu'elle est fournie.");
    }
}
function validateUnitMode(input, errors) {
    const price = validateRequiredNumber(input, "prix_unitaire", errors);
    const variableCost = validateRequiredNumber(input, "cout_variable_unitaire", errors);
    if (price !== undefined && price <= 0) {
        addError(errors, "INVALID_PRICE", ["prix_unitaire"], "prix_unitaire doit être strictement positif.");
    }
    if (variableCost !== undefined && variableCost < 0) {
        addError(errors, "NEGATIVE_VARIABLE_COST", ["cout_variable_unitaire"], "cout_variable_unitaire ne peut pas être négatif.");
    }
}
function validateGlobalMode(input, errors) {
    const revenue = validateRequiredNumber(input, "chiffre_affaires", errors);
    const variableCosts = validateRequiredNumber(input, "couts_variables", errors);
    if (revenue !== undefined && revenue <= 0) {
        addError(errors, "ZERO_REVENUE", ["chiffre_affaires"], "chiffre_affaires doit être strictement positif.");
    }
    if (variableCosts !== undefined && variableCosts < 0) {
        addError(errors, "NEGATIVE_VARIABLE_COST", ["couts_variables"], "couts_variables ne peut pas être négatif.");
    }
}
export function validateBreakEvenInput(input) {
    const errors = [];
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
        addError(errors, "MISSING_REQUIRED_INPUT", ["input"], "L'entrée doit être un objet.");
        return { errors };
    }
    const candidate = input;
    validateCommonFields(candidate, errors);
    const comparisonRevenue = validateOptionalNumber(candidate, "chiffre_affaires_comparaison", errors);
    if (comparisonRevenue !== undefined && comparisonRevenue < 0) {
        addError(errors, "INVALID_NUMBER", ["chiffre_affaires_comparaison"], "chiffre_affaires_comparaison ne peut pas être négatif.");
    }
    if (candidate.mode_calcul === "unitaire") {
        validateUnitMode(candidate, errors);
    }
    else if (candidate.mode_calcul === "global") {
        validateGlobalMode(candidate, errors);
    }
    return { errors };
}
export function isCalculationMode(value) {
    return value === "unitaire" || value === "global";
}
