export type Period = {
    debut: string;
    fin: string;
};
export type SourceReference = {
    source_id?: string;
    document_type?: string;
    reference?: string;
};
export type FieldStatus = "present" | "manquant" | "ambigu" | "a_verifier";
export type DescriptiveField = "reference_piece" | "client_ou_payeur" | "nature" | "mode_reglement";
export type RevenueEntry = {
    id: string;
    date_encaissement: string;
    date_enregistrement: string;
    montant: number;
    date_facture?: string;
    reference_piece?: string;
    client_ou_payeur?: string;
    nature?: string;
    mode_reglement?: string;
    source?: SourceReference;
    field_statuses?: Partial<Record<DescriptiveField, FieldStatus>>;
};
export type CorrectableRevenueFields = {
    date_encaissement?: string;
    date_facture?: string;
    reference_piece?: string;
    client_ou_payeur?: string;
    nature?: string;
    montant?: number;
    mode_reglement?: string;
};
type EventBase = {
    id: string;
    target_entry_id: string;
    date_evenement: string;
    date_enregistrement: string;
    motif: string;
    source?: SourceReference;
};
export type RefundEvent = EventBase & {
    type: "remboursement";
    montant: number;
};
export type CancellationEvent = EventBase & {
    type: "annulation";
};
export type CorrectionEvent = EventBase & {
    type: "correction";
    avant: Partial<CorrectableRevenueFields>;
    apres: Partial<CorrectableRevenueFields>;
};
export type RevenueEvent = RefundEvent | CancellationEvent | CorrectionEvent;
export type RevenueLedgerInput = {
    periode: Period;
    devise: string;
    entries: RevenueEntry[];
    events?: RevenueEvent[];
};
export type CurrentRevenueEntry = {
    id: string;
    date_encaissement: string;
    date_enregistrement: string;
    date_facture?: string;
    reference_piece?: string;
    client_ou_payeur?: string;
    nature?: string;
    mode_reglement?: string;
    montant_original: number;
    montant_courant: number;
    remboursements_historiques: number;
    remboursements_appliques: number;
    annulee: boolean;
    contribution_finale: number;
    event_ids_appliques: string[];
    source?: SourceReference;
};
export type RevenueTotals = {
    total_recettes_brutes: number;
    total_remboursements_appliques: number;
    total_recettes_nettes: number;
};
export type FieldAssessment = {
    entry_id: string;
    field?: DescriptiveField;
    status: FieldStatus;
    reason?: string;
};
export type PotentialDuplicate = {
    entry_ids: [string, string];
    reason: "POTENTIAL_DUPLICATE";
};
export type ErrorCode = "MISSING_REQUIRED_INPUT" | "INVALID_NUMBER" | "INVALID_PERIOD" | "INVALID_CURRENCY" | "INVALID_ENTRY_ID" | "DUPLICATE_ENTRY_ID" | "INVALID_DATE" | "INVALID_AMOUNT" | "INVALID_ENTRY_TYPE" | "INVALID_REFERENCE" | "INVALID_CORRECTION" | "INVALID_TARGET_ENTRY" | "INVALID_REFUND" | "INVALID_CANCELLATION";
export type ValidationError = {
    code: ErrorCode;
    fields: string[];
    message: string;
};
export type FormulaId = "GROSS_REVENUE_TOTAL" | "APPLIED_REFUND_TOTAL" | "CURRENT_NET_REVENUE_TOTAL";
export type RevenueProvenance = Record<"total_recettes_brutes" | "total_remboursements_appliques" | "total_recettes_nettes", {
    formula_id: FormulaId;
    entry_ids: string[];
    event_ids: string[];
}>;
export type RevenueLedgerResult = {
    status: "ok" | "partial" | "unavailable";
    inputs_retenus: Partial<RevenueLedgerInput>;
    historique: {
        entries: RevenueEntry[];
        events: RevenueEvent[];
    };
    vue_courante: CurrentRevenueEntry[];
    totaux?: RevenueTotals;
    controles: FieldAssessment[];
    doublons_potentiels: PotentialDuplicate[];
    warnings: never[];
    errors: ValidationError[];
    provenance: Partial<RevenueProvenance>;
};
export {};
