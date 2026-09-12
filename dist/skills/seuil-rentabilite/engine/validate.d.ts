import type { BreakEvenInput, CalculationMode, ValidationError } from "./types.ts";
export type ValidationResult = {
    errors: ValidationError[];
};
export declare function validateBreakEvenInput(input: BreakEvenInput): ValidationResult;
export declare function isCalculationMode(value: unknown): value is CalculationMode;
