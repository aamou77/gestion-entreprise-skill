export * from "./orchestrator/index.ts";

export { calculateBreakEven } from "./skills/seuil-rentabilite/engine/index.ts";
export type {
  AmountBasis as BreakEvenAmountBasis,
  AnalysisMode as BreakEvenAnalysisMode,
  BreakEvenInput,
  BreakEvenResult,
  CalculationMode as BreakEvenCalculationMode,
  ErrorCode as BreakEvenErrorCode,
  FormulaId as BreakEvenFormulaId,
  Period as BreakEvenPeriod,
  ResultStatus as BreakEvenResultStatus,
} from "./skills/seuil-rentabilite/engine/index.ts";

export { calculatePricing } from "./skills/tarification/engine/index.ts";
export type {
  AmountBasis as PricingAmountBasis,
  AnalysisMode as PricingAnalysisMode,
  CalculationMode as PricingCalculationMode,
  ErrorCode as PricingErrorCode,
  FormulaId as PricingFormulaId,
  Period as PricingPeriod,
  PricingInput,
  PricingResult,
  Provenance as PricingProvenance,
  ResultKey as PricingResultKey,
  ResultStatus as PricingResultStatus,
  UnavailabilityCode as PricingUnavailabilityCode,
  UnavailableResult as PricingUnavailableResult,
  ValidationError as PricingValidationError,
} from "./skills/tarification/engine/index.ts";

export { calculateTreasury } from "./skills/tresorerie/engine/index.ts";
export type {
  AnalysisMode as TreasuryAnalysisMode,
  ErrorCode as TreasuryErrorCode,
  ExcludedFlow,
  ExclusionCode,
  FlowDirection,
  FlowStatus,
  FormulaId as TreasuryFormulaId,
  Provenance as TreasuryProvenance,
  ResultKey as TreasuryResultKey,
  ResultStatus as TreasuryResultStatus,
  TreasuryFlow,
  TreasuryInput,
  TreasuryPeriodInput,
  TreasuryPeriodResult,
  TreasuryResult,
  ValidationError as TreasuryValidationError,
} from "./skills/tresorerie/engine/index.ts";

export { calculateManagementSummary } from "./skills/synthese-gestion/engine/index.ts";
export type {
  AmountBasis as ManagementSummaryAmountBasis,
  DataOrigin,
  DataState,
  ManagementSummaryInput,
  ManagementSummaryResult,
  Period as ManagementSummaryPeriod,
  Provenance as ManagementSummaryProvenance,
  QualifiedAmount,
  ReportedIndicatorKey,
  SourceReference as ManagementSummarySourceReference,
  UnavailableResult as ManagementSummaryUnavailableResult,
  ValidationError as ManagementSummaryValidationError,
  ValidationErrorCode as ManagementSummaryValidationErrorCode,
} from "./skills/synthese-gestion/engine/index.ts";

export { calculateRevenueLedger } from "./skills/livre-recettes/engine/index.ts";
export type {
  CancellationEvent,
  CorrectableRevenueFields,
  CurrentRevenueEntry,
  DescriptiveField,
  ErrorCode as RevenueLedgerErrorCode,
  FieldAssessment,
  FieldStatus,
  PotentialDuplicate,
  RefundEvent,
  RevenueEntry,
  RevenueEvent,
  RevenueLedgerInput,
  RevenueLedgerResult,
  RevenueProvenance,
  RevenueTotals,
  SourceReference as RevenueLedgerSourceReference,
  ValidationError as RevenueLedgerValidationError,
} from "./skills/livre-recettes/engine/index.ts";
