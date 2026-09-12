const ds = ["provided", "seuil-rentabilite", "tarification", "tresorerie", "synthese-gestion", "livre-recettes"], ms = ["encaissement", "recettes_registre_brutes", "recettes_registre_nettes", "recettes_retenues_gestion", "couts_retenus_gestion", "ca", "flux_tresorerie", "solde_tresorerie", "prix_unitaire", "marge", "seuil_rentabilite_ca", "marge_securite", "base_sociale", "base_tva", "indicateur_reporte"];
const e = (code, message) => ({ code, message }), ne = (x) => typeof x === "string" && x.trim().length > 0;
const date = (x) => { if (typeof x !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(x))
    return false; const [y, m, d] = x.split("-").map(Number), z = new Date(Date.UTC(y, m - 1, d)); return z.getUTCFullYear() === y && z.getUTCMonth() === m - 1 && z.getUTCDate() === d; };
const src = (x) => !!x && typeof x === "object" && !Array.isArray(x) && ds.includes(x.domain) && (x.result_key === undefined || ne(x.result_key)) && (x.source_id === undefined || ne(x.source_id));
const ref = (x) => !!x && typeof x === "object" && !Array.isArray(x) && ds.includes(x.domain) && ne(x.source_id);
export function validateQualifiedValue(x) { const v = x; if (!v || typeof v !== "object" || Array.isArray(v) || !["available", "unavailable"].includes(v.status) || !["provided", "engine", "derived"].includes(v.origin) || !ms.includes(v.meaning))
    return e("INVALID_QUALIFICATION", "qualification invalide"); if (v.source !== undefined && !src(v.source) || v.periode !== undefined && (!v.periode || typeof v.periode !== "object" || Array.isArray(v.periode) || !date(v.periode.debut) || !date(v.periode.fin) || v.periode.debut > v.periode.fin) || ["devise", "perimetre", "unite"].some(k => v[k] !== undefined && !ne(v[k])) || v.base_montants !== undefined && !["HT", "TTC"].includes(v.base_montants) || v.contribution_refs !== undefined && (!Array.isArray(v.contribution_refs) || v.contribution_refs.some((r) => !ref(r))))
    return e("INVALID_QUALIFICATION", "métadonnée invalide"); return v.status === "available" ? (Object.hasOwn(v, "value") && ["reel", "previsionnel", "hypothetique"].includes(v.state) ? undefined : e("INVALID_QUALIFICATION", "available invalide")) : (!Object.hasOwn(v, "value") && ne(v.reason) ? undefined : e("INVALID_QUALIFICATION", "unavailable invalide")); }
export function validateReferenceResult(v) { const s = () => v?.source_ids === undefined || (Array.isArray(v.source_ids) && v.source_ids.every(ne)); if (!v || typeof v !== "object" || Array.isArray(v) || !s())
    return e("INVALID_QUALIFICATION", "référence invalide"); if (v.status === "available")
    return ne(v.rule_id) && v.rule_status === "verified" ? undefined : e("INVALID_QUALIFICATION", "available invalide"); return v.status === "unavailable" && ne(v.reason) && (v.rule_status === undefined || ["verified", "scheduled", "needs_review", "superseded", "unknown"].includes(v.rule_status)) ? undefined : e("INVALID_QUALIFICATION", "unavailable invalide"); }
export function transmit(v, meaning, extra = {}) { return v.status === "unavailable" ? { ...v, meaning } : { ...v, ...extra, origin: "derived", meaning }; }
export function ledgerToManagement(v, c) { const bad = validateQualifiedValue(v); if (bad)
    return { error: bad }; if (v.status !== "available")
    return { error: e("ENGINE_UNAVAILABLE", "registre indisponible") }; if (v.meaning !== "recettes_registre_nettes")
    return { error: e("INVALID_QUALIFICATION", "meaning invalide") }; if (!ne(c.perimetre) || !c.base_montants || !c.state)
    return { error: e("MISSING_REQUIRED_DATA", "contexte requis") }; if (!v.periode || !v.devise || !v.contribution_refs?.length)
    return { error: e("INSUFFICIENT_PROVENANCE", "provenance insuffisante") }; return { value: transmit(v, "recettes_retenues_gestion", { perimetre: c.perimetre, base_montants: c.base_montants, state: c.state }) }; }
export function pricingToBreakEven(v, t) { const bad = validateQualifiedValue(v); if (bad)
    return { error: bad }; if (v.status !== "available" || v.meaning !== "prix_unitaire")
    return { error: e("INVALID_QUALIFICATION", "prix requis") }; for (const k of ["unite", "devise", "perimetre"])
    if (!ne(v[k]) || !ne(t[k]))
        return { error: e("MISSING_REQUIRED_DATA", `${k} requis`) }; if (v.unite !== t.unite)
    return { error: e("INCOMPATIBLE_UNIT", "unité") }; if (v.devise !== t.devise)
    return { error: e("INCOMPATIBLE_CURRENCY", "devise") }; if (v.perimetre !== t.perimetre)
    return { error: e("INCOMPATIBLE_SCOPE", "périmètre") }; if (v.base_montants !== t.base_montants)
    return { error: e("INCOMPATIBLE_AMOUNT_BASIS", "base") }; return { value: transmit(v, "prix_unitaire") }; }
