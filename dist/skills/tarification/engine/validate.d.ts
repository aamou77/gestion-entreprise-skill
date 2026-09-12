import type { CalculationMode, PricingInput, ValidationError } from "./types.ts";
export declare function isCalculationMode(value: unknown): value is CalculationMode;
export declare function validatePricingInput(input: PricingInput): {
    errors: ValidationError[];
};
