export type AnalysisMode = "reel" | "scenario";
export type CalculationMode = "unitaire" | "global";
export type AmountBasis = "HT" | "TTC";

export type Period = {
  type: "mensuelle" | "trimestrielle" | "annuelle" | "personnalisee";
  debut?: string;
  fin?: string;
};

export type BreakEvenInput = {
  mode_analyse: AnalysisMode;
  mode_calcul: CalculationMode;
  periode: Period;
  devise: string;
  base_montants: AmountBasis;
  couts_fixes: number;
  prix_unitaire?: number;
  cout_variable_unitaire?: number;
  chiffre_affaires?: number;
  couts_variables?: number;
  chiffre_affaires_comparaison?: number;
  arrondi_operationnel?: "ceil";
  unite?: string;
};

export type ResultStatus = "ok" | "partial" | "unavailable";

export type ErrorCode =
  | "MISSING_REQUIRED_INPUT"
  | "INVALID_NUMBER"
  | "INVALID_PERIOD"
  | "INVALID_CURRENCY"
  | "INVALID_AMOUNT_BASIS"
  | "INVALID_PRICE"
  | "NEGATIVE_FIXED_COST"
  | "NEGATIVE_VARIABLE_COST"
  | "ZERO_REVENUE"
  | "NON_POSITIVE_UNIT_CONTRIBUTION"
  | "NON_POSITIVE_CONTRIBUTION_MARGIN_RATE";

export type ResultKey =
  | "marge_sur_cout_variable_unitaire"
  | "seuil_en_unites_mathematique"
  | "seuil_en_unites_operationnel"
  | "seuil_chiffre_affaires"
  | "taux_couts_variables"
  | "taux_marge_sur_cout_variable"
  | "marge_securite"
  | "taux_marge_securite";

export type FormulaId =
  | "UNIT_CONTRIBUTION_MARGIN"
  | "BREAK_EVEN_UNITS"
  | "BREAK_EVEN_UNITS_OPERATIONAL_CEIL"
  | "BREAK_EVEN_REVENUE_UNIT"
  | "VARIABLE_COST_RATE"
  | "CONTRIBUTION_MARGIN_RATE"
  | "BREAK_EVEN_REVENUE_GLOBAL"
  | "SAFETY_MARGIN"
  | "SAFETY_MARGIN_RATE";

export type ValidationError = {
  code: ErrorCode;
  fields: string[];
  message: string;
};

export type UnavailableResult = {
  resultat: ResultKey;
  code: ErrorCode;
  reason: string;
};

export type BreakEvenResult = {
  status: ResultStatus;
  mode_analyse: AnalysisMode | undefined;
  mode_calcul: CalculationMode | undefined;
  inputs_retenus: Partial<BreakEvenInput>;
  resultats: Partial<Record<ResultKey, number>>;
  indisponibles: UnavailableResult[];
  warnings: Array<{ code: "OPERATIONAL_ROUNDING_APPLIED" }>;
  errors: ValidationError[];
  provenance: Partial<Record<ResultKey, {
    formula_id: FormulaId;
    inputs_used: string[];
  }>>;
};
