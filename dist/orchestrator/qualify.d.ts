import type { AvailableQualifiedValue, OrchestrationError, QualifiedValue, ValueMeaning } from "./types.ts";
export declare function validateQualifiedValue(x: unknown): OrchestrationError | undefined;
export declare function validateReferenceResult(v: any): OrchestrationError | undefined;
export declare function transmit<T>(v: QualifiedValue<T>, meaning: ValueMeaning, extra?: Partial<AvailableQualifiedValue<T>>): QualifiedValue<T>;
export declare function ledgerToManagement(v: QualifiedValue<number>, c: {
    perimetre?: string;
    base_montants?: "HT" | "TTC";
    state?: AvailableQualifiedValue<number>["state"];
}): {
    error: {
        code: import("./types.ts").OrchestrationErrorCode;
        message: string;
    };
    value?: undefined;
} | {
    error?: undefined;
    value: QualifiedValue<number>;
};
export declare function pricingToBreakEven(v: QualifiedValue<number>, t: {
    unite?: string;
    devise?: string;
    base_montants?: "HT" | "TTC";
    perimetre?: string;
}): {
    value?: undefined;
    error: {
        code: import("./types.ts").OrchestrationErrorCode;
        message: string;
    };
} | {
    error?: undefined;
    value: QualifiedValue<number>;
};
