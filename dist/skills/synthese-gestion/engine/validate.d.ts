import type { ManagementSummaryInput, ReportedIndicatorKey, ValidationError } from "./types.ts";
export declare const reportedIndicatorKeys: ReportedIndicatorKey[];
export declare function validateManagementSummaryInput(input: ManagementSummaryInput): ValidationError[];
