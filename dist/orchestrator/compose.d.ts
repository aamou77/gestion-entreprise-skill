import type { AvailableQualifiedValue, ArithmeticComposition, RequestedOutput } from "./types.ts";
export declare function composeSum(input: ArithmeticComposition | {
    operation: string;
    values: AvailableQualifiedValue<number>[];
}): {
    error: {
        code: import("./types.ts").OrchestrationErrorCode;
        message: string;
    };
    value?: undefined;
} | {
    error?: undefined;
    value: {
        status: "available";
        value: number;
        origin: "derived";
        state: string;
        meaning: import("./types.ts").ValueMeaning;
        periode: {
            debut: string;
            fin: string;
        } | undefined;
        devise: string | undefined;
        perimetre: string | undefined;
        base_montants: "HT" | "TTC" | undefined;
        unite: string | undefined;
        contribution_refs: {
            domain: "provided" | import("./types.ts").EngineDomain;
            source_id: string;
        }[];
    };
};
export declare function deriveOverallStatus(requested: RequestedOutput[], available: string[], unavailable: string[], review: string[]): "ok" | "partial" | "unavailable";
