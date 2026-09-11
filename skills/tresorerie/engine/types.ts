export type AnalysisMode = "reel" | "scenario";
export type FlowStatus = "realise" | "engage" | "attendu" | "hypothetique";
export type FlowDirection = "encaissement" | "decaissement";
export type ResultStatus = "ok" | "partial" | "unavailable";

export type TreasuryFlow = {
  id: string;
  sens: FlowDirection;
  statut: FlowStatus;
  montant: number;
  date: string;
  libelle?: string;
  source_id?: string;
};

export type TreasuryPeriodInput = {
  id: string;
  periode: { debut: string; fin: string };
  flux: TreasuryFlow[];
};

export type TreasuryInput = {
  mode_analyse: AnalysisMode;
  devise: string;
  solde_ouverture: number;
  periodes: TreasuryPeriodInput[];
  reserve_tresorerie?: number;
};

export type ErrorCode =
  | "MISSING_REQUIRED_INPUT"
  | "INVALID_NUMBER"
  | "INVALID_PERIOD"
  | "INVALID_CURRENCY"
  | "INVALID_FLOW_ID"
  | "DUPLICATE_FLOW_ID"
  | "INVALID_FLOW_DIRECTION"
  | "INVALID_FLOW_STATUS"
  | "INVALID_FLOW_AMOUNT"
  | "INVALID_FLOW_DATE"
  | "INVALID_RESERVE";

export type ExclusionCode = "OUTSIDE_PERIOD";
export type ResultKey =
  | "encaissements_realises" | "decaissements_realises" | "solde_reel_cloture"
  | "encaissements_engages" | "decaissements_engages" | "solde_apres_engages"
  | "encaissements_attendus" | "decaissements_attendus" | "solde_apres_attendus"
  | "encaissements_hypothetiques" | "decaissements_hypothetiques" | "solde_scenario"
  | "solde_disponible_apres_attendus_et_reserve"
  | "solde_disponible_scenario_apres_reserve";

export type FormulaId =
  | "REALIZED_INFLOW_TOTAL" | "REALIZED_OUTFLOW_TOTAL" | "REAL_CLOSING_BALANCE"
  | "COMMITTED_INFLOW_TOTAL" | "COMMITTED_OUTFLOW_TOTAL" | "BALANCE_AFTER_COMMITTED"
  | "EXPECTED_INFLOW_TOTAL" | "EXPECTED_OUTFLOW_TOTAL" | "BALANCE_AFTER_EXPECTED"
  | "HYPOTHETICAL_INFLOW_TOTAL" | "HYPOTHETICAL_OUTFLOW_TOTAL" | "SCENARIO_BALANCE"
  | "AVAILABLE_BALANCE_AFTER_EXPECTED_AND_RESERVE"
  | "AVAILABLE_SCENARIO_BALANCE_AFTER_RESERVE";

export type ValidationError = { code: ErrorCode; fields: string[]; message: string };
export type Provenance = { formula_id: FormulaId; inputs_used: string[]; flow_ids?: string[] };
export type ExcludedFlow = { id: string; code: ExclusionCode };
export type TreasuryPeriodResult = {
  id: string;
  periode: { debut: string; fin: string };
  flux_retenus: TreasuryFlow[];
  flux_exclus: ExcludedFlow[];
  resultats: Partial<Record<ResultKey, number>>;
  provenance: Partial<Record<ResultKey, Provenance>>;
};
export type TreasuryResult = {
  status: ResultStatus;
  mode_analyse: AnalysisMode | undefined;
  inputs_retenus: Partial<TreasuryInput>;
  periodes: TreasuryPeriodResult[];
  warnings: never[];
  errors: ValidationError[];
};
