export type AnalysisMode = "reel" | "scenario";
export type CalculationMode = "analyse_prix" | "prix_minimum_economique" | "prix_cible_taux_marque" | "prix_cible_taux_marge" | "remise";
export type AmountBasis = "HT" | "TTC";
export type Period = {
    type: "mensuelle" | "trimestrielle" | "annuelle" | "personnalisee";
    debut?: string;
    fin?: string;
};
export type PricingInput = {
    mode_analyse: AnalysisMode;
    mode_calcul: CalculationMode;
    periode: Period;
    devise: string;
    base_montants: AmountBasis;
    unite?: string;
    perimetre_cout?: string;
    cout?: number;
    prix_vente?: number;
    taux_marque_cible?: number;
    taux_marge_cible?: number;
    prix_initial?: number;
    taux_remise?: number;
};
export type ResultStatus = "ok" | "partial" | "unavailable";
export type ErrorCode = "MISSING_REQUIRED_INPUT" | "INVALID_NUMBER" | "INVALID_PERIOD" | "INVALID_CURRENCY" | "INVALID_AMOUNT_BASIS" | "NEGATIVE_COST" | "INVALID_SELLING_PRICE" | "INVALID_INITIAL_PRICE" | "INVALID_MARKUP_RATE" | "INVALID_MARGIN_RATE" | "INVALID_DISCOUNT_RATE";
export type UnavailabilityCode = "ZERO_SELLING_PRICE" | "ZERO_COST";
export type ResultKey = "marge" | "taux_marque" | "taux_marge" | "prix_minimum_economique" | "prix_cible" | "montant_remise" | "prix_apres_remise";
export type FormulaId = "MARGIN" | "MARK_RATE" | "MARGIN_RATE" | "ECONOMIC_MINIMUM_PRICE" | "TARGET_PRICE_FROM_MARK_RATE" | "TARGET_PRICE_FROM_MARGIN_RATE" | "DISCOUNT_AMOUNT" | "PRICE_AFTER_DISCOUNT";
export type ValidationError = {
    code: ErrorCode;
    fields: string[];
    message: string;
};
export type UnavailableResult = {
    resultat: ResultKey;
    code: UnavailabilityCode;
    reason: string;
};
export type Provenance = {
    formula_id: FormulaId;
    inputs_used: string[];
};
export type PricingResult = {
    status: ResultStatus;
    mode_analyse: AnalysisMode | undefined;
    mode_calcul: CalculationMode | undefined;
    inputs_retenus: Partial<PricingInput>;
    resultats: Partial<Record<ResultKey, number>>;
    indisponibles: UnavailableResult[];
    warnings: never[];
    errors: ValidationError[];
    provenance: Partial<Record<ResultKey, Provenance>>;
};
