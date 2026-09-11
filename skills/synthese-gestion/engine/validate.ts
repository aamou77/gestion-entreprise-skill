import type { ManagementSummaryInput, QualifiedAmount, ReportedIndicatorKey, ValidationError, ValidationErrorCode } from "./types.ts";

export const reportedIndicatorKeys: ReportedIndicatorKey[] = [
  "solde_tresorerie", "seuil_rentabilite_ca", "marge_securite", "prix_vente", "marge",
];

const has = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);
const add = (errors: ValidationError[], field: string, code: ValidationErrorCode) =>
  errors.push({ field, code, message: `${field}: ${code}` });

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function validateSource(source: unknown, field: string, errors: ValidationError[]): void {
  if (source === undefined) return;
  if (source === null || typeof source !== "object" || Array.isArray(source)) {
    add(errors, field, "MISSING_REQUIRED_INPUT");
    return;
  }
  for (const key of ["domaine", "source_id", "result_key"]) {
    if (has(source, key) && typeof (source as Record<string, unknown>)[key] !== "string") {
      add(errors, `${field}.${key}`, "MISSING_REQUIRED_INPUT");
    }
  }
}

function validateAmount(value: unknown, field: string, core: boolean, errors: ValidationError[]): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    add(errors, field, "MISSING_REQUIRED_INPUT");
    return;
  }
  const amount = value as QualifiedAmount;
  if (!has(value, "state")) add(errors, `${field}.state`, "MISSING_REQUIRED_INPUT");
  else if (!["reel", "previsionnel", "hypothetique", "indisponible"].includes(amount.state)) add(errors, `${field}.state`, "INVALID_DATA_STATE");
  if (!has(value, "origine")) add(errors, `${field}.origine`, "MISSING_REQUIRED_INPUT");
  else if (amount.origine !== "fourni" && amount.origine !== "calcule") add(errors, `${field}.origine`, "INVALID_DATA_ORIGIN");

  if (amount.state === "indisponible") {
    if (has(value, "valeur") && amount.valeur !== undefined) add(errors, `${field}.valeur`, "INCONSISTENT_DATA_STATE");
  } else if (!has(value, "valeur") || amount.valeur === undefined || amount.valeur === null) {
    add(errors, `${field}.valeur`, "INCONSISTENT_DATA_STATE");
  } else if (typeof amount.valeur !== "number" || !Number.isFinite(amount.valeur)) {
    add(errors, `${field}.valeur`, "INVALID_NUMBER");
  } else if (core && amount.valeur < 0) {
    add(errors, `${field}.valeur`, "INVALID_AMOUNT");
  }
  validateSource(amount.source, `${field}.source`, errors);
}

export function validateManagementSummaryInput(input: ManagementSummaryInput): ValidationError[] {
  const errors: ValidationError[] = [];
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    add(errors, "input", "MISSING_REQUIRED_INPUT");
    return errors;
  }
  const raw = input as unknown as Record<string, unknown>;
  const period = raw.periode as Record<string, unknown> | undefined;
  if (!period || typeof period !== "object" || Array.isArray(period)
    || typeof period.debut !== "string" || typeof period.fin !== "string"
    || !validDate(period.debut) || !validDate(period.fin) || period.debut > period.fin) add(errors, "periode", "INVALID_PERIOD");
  if (typeof raw.devise !== "string" || raw.devise.trim().length === 0) add(errors, "devise", "INVALID_CURRENCY");
  if (raw.base_montants !== "HT" && raw.base_montants !== "TTC") add(errors, "base_montants", "INVALID_AMOUNT_BASIS");
  if (typeof raw.perimetre !== "string" || raw.perimetre.trim().length === 0) add(errors, "perimetre", "INVALID_PERIMETER");
  if (!has(raw, "recettes_retenues") || raw.recettes_retenues === undefined) add(errors, "recettes_retenues", "MISSING_REQUIRED_INPUT");
  else validateAmount(raw.recettes_retenues, "recettes_retenues", true, errors);
  if (!has(raw, "couts_retenus") || raw.couts_retenus === undefined) add(errors, "couts_retenus", "MISSING_REQUIRED_INPUT");
  else validateAmount(raw.couts_retenus, "couts_retenus", true, errors);
  if (raw.indicateurs_reportes !== undefined) {
    if (raw.indicateurs_reportes === null || typeof raw.indicateurs_reportes !== "object" || Array.isArray(raw.indicateurs_reportes)) add(errors, "indicateurs_reportes", "MISSING_REQUIRED_INPUT");
    else for (const key of reportedIndicatorKeys) if (has(raw.indicateurs_reportes as object, key) && (raw.indicateurs_reportes as Record<string, unknown>)[key] !== undefined) validateAmount((raw.indicateurs_reportes as Record<string, unknown>)[key], `indicateurs_reportes.${key}`, false, errors);
  }
  return errors;
}
