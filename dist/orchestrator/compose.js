import { validateQualifiedValue } from "./qualify.js";
const e = (code, message) => ({ code, message });
const cs = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const cr = (a, b) => cs(a.domain, b.domain) || cs(a.source_id, b.source_id);
const refs = (v) => [...(v.contribution_refs ?? [])].sort(cr);
function cv(a, b) { const x = refs(a), y = refs(b); for (let i = 0; i < Math.min(x.length, y.length); i++) {
    const z = cr(x[i], y[i]);
    if (z)
        return z;
} return x.length - y.length; }
export function composeSum(input) { if (input.operation !== "sum")
    return { error: e("UNSUPPORTED_COMPOSITION", "SUM uniquement") }; const vs = input.values; if (!vs.length)
    return { error: e("MISSING_REQUIRED_DATA", "valeurs requises") }; for (const v of vs) {
    const bad = validateQualifiedValue(v);
    if (bad)
        return { error: bad };
    if (v.status !== "available")
        return { error: e("INVALID_QUALIFICATION", "indisponible") };
} const f = vs[0]; for (const v of vs) {
    if (v.meaning !== f.meaning)
        return { error: e("INVALID_QUALIFICATION", "meaning") };
    if (!v.perimetre || !f.perimetre)
        return { error: e("MISSING_REQUIRED_DATA", "périmètre") };
    if (v.perimetre !== f.perimetre)
        return { error: e("INCOMPATIBLE_SCOPE", "périmètre") };
    for (const [k, c] of [["periode", "INCOMPATIBLE_PERIOD"], ["devise", "INCOMPATIBLE_CURRENCY"], ["base_montants", "INCOMPATIBLE_AMOUNT_BASIS"], ["unite", "INCOMPATIBLE_UNIT"]]) {
        if (!vs.some(x => x[k] !== undefined))
            continue;
        if (v[k] === undefined || f[k] === undefined)
            return { error: e("MISSING_REQUIRED_DATA", k) };
        if (k === "periode" ? v.periode.debut !== f.periode.debut || v.periode.fin !== f.periode.fin : v[k] !== f[k])
            return { error: e(c, k) };
    }
} if (vs.length > 1 && vs.some(v => !v.contribution_refs?.length))
    return { error: e("INSUFFICIENT_PROVENANCE", "refs") }; const seen = new Map(); for (const r of vs.flatMap(refs)) {
    const s = seen.get(r.domain) ?? new Set();
    if (s.has(r.source_id))
        return { error: e("DUPLICATE_ECONOMIC_CONTRIBUTION", "doublon") };
    s.add(r.source_id);
    seen.set(r.domain, s);
} const value = [...vs].sort(cv).reduce((n, v) => n + v.value, 0); if (!Number.isFinite(value))
    return { error: e("INVALID_QUALIFICATION", "overflow") }; const all = vs.flatMap(refs).sort(cr); return { value: { status: "available", value, origin: "derived", state: vs.some(v => v.state === "hypothetique") ? "hypothetique" : vs.some(v => v.state === "previsionnel") ? "previsionnel" : "reel", meaning: f.meaning, periode: f.periode ? { debut: f.periode.debut, fin: f.periode.fin } : undefined, devise: f.devise, perimetre: f.perimetre, base_montants: f.base_montants, unite: f.unite, contribution_refs: all.map(r => ({ domain: r.domain, source_id: r.source_id })) } }; }
export function deriveOverallStatus(requested, available, unavailable, review) { const r = requested.filter(x => x.required), good = r.filter(x => available.includes(x.id) && !review.includes(x.id)); return !r.length || good.length === r.length ? "ok" : good.length ? "partial" : "unavailable"; }
