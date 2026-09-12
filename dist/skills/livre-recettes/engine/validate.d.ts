import type { RevenueLedgerInput, ValidationError } from "./types.ts";
export declare const isDate: (value: unknown) => value is string;
export declare function validateRevenueLedgerInput(input: RevenueLedgerInput): ValidationError[];
