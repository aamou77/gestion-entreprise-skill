export type Period = {
    debut: string;
    fin: string;
};
export type AmountBasis = "HT" | "TTC";
export type DataState = "reel" | "previsionnel" | "hypothetique" | "indisponible";
export type DataOrigin = "fourni" | "calcule";
export type SourceReference = {
    domaine?: string;
    source_id?: string;
    result_key?: string;
};
export type QualifiedAmount = {
    valeur?: number;
    state: DataState;
    origine: DataOrigin;
    source?: SourceReference;
};
export type ReportedIndicatorKey = "solde_tresorerie" | "seuil_rentabilite_ca" | "marge_securite" | "prix_vente" | "marge";
export type ManagementSummaryInput = {
    periode: Period;
    devise: string;
    base_montants: AmountBasis;
    perimetre: string;
    recettes_retenues: QualifiedAmount;
    couts_retenus: QualifiedAmount;
    indicateurs_reportes?: Partial<Record<ReportedIndicatorKey, QualifiedAmount>>;
};
export type ValidationErrorCode = "MISSING_REQUIRED_INPUT" | "INVALID_NUMBER" | "INVALID_PERIOD" | "INVALID_CURRENCY" | "INVALID_AMOUNT_BASIS" | "INVALID_DATA_STATE" | "INVALID_DATA_ORIGIN" | "INVALID_AMOUNT" | "INVALID_PERIMETER" | "INCONSISTENT_DATA_STATE";
export type ValidationError = {
    field: string;
    code: ValidationErrorCode;
    message: string;
};
export type UnavailableResult = {
    resultat: "solde_de_gestion_estime" | ReportedIndicatorKey;
    code: "SOURCE_DATA_UNAVAILABLE";
    reason: string;
};
export type Provenance = {
    formula_id: "ESTIMATED_MANAGEMENT_BALANCE";
    inputs_used: ["recettes_retenues", "couts_retenus"];
    source_references?: SourceReference[];
};
export type ManagementSummaryResult = {
    status: "ok" | "partial" | "unavailable";
    inputs_retenus: Partial<ManagementSummaryInput>;
    resultats: {
        solde_de_gestion_estime?: QualifiedAmount;
        indicateurs_reportes: Partial<Record<ReportedIndicatorKey, QualifiedAmount>>;
    };
    indisponibles: UnavailableResult[];
    warnings: never[];
    errors: ValidationError[];
    provenance: {
        solde_de_gestion_estime?: Provenance;
    };
};
