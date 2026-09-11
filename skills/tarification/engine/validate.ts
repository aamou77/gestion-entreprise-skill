import type { CalculationMode, PricingInput, ValidationError } from "./types.ts";

function addError(
  errors: ValidationError[], code: ValidationError["code"], fields: string[], message: string,
): void {
  errors.push({ code, fields, message });
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validatePeriod(value: unknown, errors: ValidationError[]): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    addError(errors, "INVALID_PERIOD", ["periode"], "periode doit être un objet valide.");
    return;
  }

  const period = value as Record<string, unknown>;
  if (typeof period.type !== "string" || !(["mensuelle", "trimestrielle", "annuelle", "personnalisee"].includes(period.type))) {
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

  if (hasStart && hasEnd && period.debut! > period.fin!) {
    addError(errors, "INVALID_PERIOD", ["periode.debut", "periode.fin"], "Le début de période doit précéder ou égaler la fin.");
  }
}

export function isCalculationMode(value: unknown): value is CalculationMode {
  return value === "analyse_prix" || value === "prix_minimum_economique"
    || value === "prix_cible_taux_marque" || value === "prix_cible_taux_marge"
    || value === "remise";
}

function requiredNumber(
  input: Record<string, unknown>, field: string, errors: ValidationError[],
  domainCode: ValidationError["code"], upperBound?: number, exclusive = false,
): void {
  const value = input[field];
  if (!Object.prototype.hasOwnProperty.call(input, field) || value === undefined) {
    addError(errors, "MISSING_REQUIRED_INPUT", [field], `${field} est requis.`);
  } else if (typeof value !== "number" || !Number.isFinite(value)) {
    addError(errors, "INVALID_NUMBER", [field], `${field} doit être un nombre fini.`);
  } else if (value < 0 || (upperBound !== undefined
    && (exclusive ? value >= upperBound : value > upperBound))) {
    addError(errors, domainCode, [field], `${field} est hors domaine.`);
  }
}

export function validatePricingInput(input: PricingInput): { errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    addError(errors, "MISSING_REQUIRED_INPUT", ["input"], "L'entrée doit être un objet.");
    return { errors };
  }
  const candidate = input as unknown as Record<string, unknown>;
  if (candidate.mode_analyse !== "reel" && candidate.mode_analyse !== "scenario") {
    addError(errors, "MISSING_REQUIRED_INPUT", ["mode_analyse"], "mode_analyse doit être reel ou scenario.");
  }
  if (!isCalculationMode(candidate.mode_calcul)) {
    addError(errors, "MISSING_REQUIRED_INPUT", ["mode_calcul"], "mode_calcul doit être un mode V1 valide.");
  }
  validatePeriod(candidate.periode, errors);
  if (typeof candidate.devise !== "string" || candidate.devise.trim().length === 0) {
    addError(errors, "INVALID_CURRENCY", ["devise"], "devise doit être une chaîne non vide.");
  }
  if (candidate.base_montants !== "HT" && candidate.base_montants !== "TTC") {
    addError(errors, "INVALID_AMOUNT_BASIS", ["base_montants"], "base_montants doit être HT ou TTC.");
  }
  if (candidate.unite !== undefined && typeof candidate.unite !== "string") {
    addError(errors, "MISSING_REQUIRED_INPUT", ["unite"], "unite doit être une chaîne lorsqu'il est fourni.");
  }
  if (candidate.mode_calcul !== "remise"
    && candidate.perimetre_cout !== undefined
    && typeof candidate.perimetre_cout !== "string") {
    addError(errors, "MISSING_REQUIRED_INPUT", ["perimetre_cout"], "perimetre_cout doit être une chaîne lorsqu'il est fourni.");
  }
  if (isCalculationMode(candidate.mode_calcul) && candidate.mode_calcul !== "remise") {
    requiredNumber(candidate, "cout", errors, "NEGATIVE_COST");
  }
  switch (candidate.mode_calcul) {
    case "analyse_prix":
      requiredNumber(candidate, "prix_vente", errors, "INVALID_SELLING_PRICE");
      break;
    case "prix_cible_taux_marque":
      requiredNumber(candidate, "taux_marque_cible", errors, "INVALID_MARKUP_RATE", 1, true);
      break;
    case "prix_cible_taux_marge":
      requiredNumber(candidate, "taux_marge_cible", errors, "INVALID_MARGIN_RATE");
      break;
    case "remise":
      requiredNumber(candidate, "prix_initial", errors, "INVALID_INITIAL_PRICE");
      requiredNumber(candidate, "taux_remise", errors, "INVALID_DISCOUNT_RATE", 1);
      break;
  }
  return { errors };
}
