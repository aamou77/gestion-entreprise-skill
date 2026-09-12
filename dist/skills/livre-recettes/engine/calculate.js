import { isDate, validateRevenueLedgerInput } from "./validate.js";
// dependencies_regulatory = none
const descriptive = ["reference_piece", "client_ou_payeur", "nature", "mode_reglement"];
const correctable = ["date_encaissement", "date_facture", "reference_piece", "client_ou_payeur", "nature", "montant", "mode_reglement"];
const clone = (value) => structuredClone(value);
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const sortById = (values) => [...values].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const fail = (input, errors) => ({ status: "unavailable", inputs_retenus: {}, historique: { entries: [], events: [] }, vue_courante: [], controles: [], doublons_potentiels: [], warnings: [], errors, provenance: {} });
const error = (code, field) => ({ code, fields: [field], message: `${field}: ${code}` });
function assessment(input) {
    const result = [];
    for (const entry of input.entries)
        for (const field of descriptive) {
            const value = entry[field];
            const declared = entry.field_statuses?.[field];
            result.push({ entry_id: entry.id, field, status: typeof value !== "string" || value.trim().length === 0 ? "manquant" : (declared === "ambigu" || declared === "a_verifier" ? declared : "present") });
        }
    return result;
}
function duplicates(entries) {
    const pairs = [];
    for (let i = 0; i < entries.length; i++)
        for (let j = i + 1; j < entries.length; j++) {
            const a = entries[i], b = entries[j];
            if (a.date_encaissement === b.date_encaissement && a.montant === b.montant && a.reference_piece?.trim() && a.reference_piece === b.reference_piece && a.client_ou_payeur?.trim() && a.client_ou_payeur === b.client_ou_payeur) {
                pairs.push({ entry_ids: a.id < b.id ? [a.id, b.id] : [b.id, a.id], reason: "POTENTIAL_DUPLICATE" });
            }
        }
    return pairs.sort((a, b) => compare(a.entry_ids[0], b.entry_ids[0]) || compare(a.entry_ids[1], b.entry_ids[1]));
}
function validPatch(patch, period) {
    for (const [key, value] of Object.entries(patch)) {
        if (!correctable.includes(key))
            return false;
        if (key === "montant" && (typeof value !== "number" || !Number.isFinite(value) || value < 0))
            return false;
        if ((key === "date_encaissement" || key === "date_facture") && !isDate(value))
            return false;
        if (key === "date_encaissement" && (value < period.debut || value > period.fin))
            return false;
        if (!["montant", "date_encaissement", "date_facture"].includes(key) && typeof value !== "string")
            return false;
    }
    return true;
}
function apply(current, events, period) {
    let refunded = 0;
    let cancelled = false;
    const ordered = [...events].sort((a, b) => compare(a.date_evenement, b.date_evenement) || compare(a.id, b.id));
    for (const event of ordered) {
        if (current.date_encaissement > event.date_evenement)
            return error("INVALID_DATE", `events.${event.id}.date_evenement`);
        if (cancelled)
            return error("INVALID_CANCELLATION", `events.${event.id}`);
        if (event.type === "remboursement") {
            if (refunded + event.montant > current.montant_courant)
                return error("INVALID_REFUND", `events.${event.id}.montant`);
            refunded += event.montant;
        }
        else if (event.type === "annulation")
            cancelled = true;
        else {
            const before = event.avant, after = event.apres;
            const beforeKeys = Object.keys(before).sort(), afterKeys = Object.keys(after).sort();
            if (beforeKeys.length === 0 || beforeKeys.join("|") !== afterKeys.join("|") || !validPatch(after, period))
                return error("INVALID_CORRECTION", `events.${event.id}`);
            for (const key of beforeKeys) {
                const currentValue = key === "montant" ? current.montant_courant : current[key];
                if (!correctable.includes(key) || before[key] !== currentValue)
                    return error("INVALID_CORRECTION", `events.${event.id}.avant.${key}`);
            }
            if (after.date_encaissement !== undefined && after.date_encaissement > event.date_evenement)
                return error("INVALID_CORRECTION", `events.${event.id}.apres.date_encaissement`);
            if (after.montant !== undefined && after.montant < refunded)
                return error("INVALID_CORRECTION", `events.${event.id}.apres.montant`);
            if (after.montant !== undefined)
                current.montant_courant = after.montant;
            for (const key of correctable)
                if (key !== "montant" && after[key] !== undefined)
                    current[key] = after[key];
        }
        current.event_ids_appliques.push(event.id);
    }
    current.remboursements_historiques = refunded;
    current.annulee = cancelled;
    current.remboursements_appliques = cancelled ? 0 : refunded;
    current.contribution_finale = cancelled ? 0 : current.montant_courant - refunded;
}
export function calculateRevenueLedger(input) {
    const errors = validateRevenueLedgerInput(input);
    if (errors.length)
        return fail(input, errors);
    const current = input.entries.map(entry => ({
        id: entry.id, date_encaissement: entry.date_encaissement, date_enregistrement: entry.date_enregistrement, ...(entry.date_facture !== undefined ? { date_facture: entry.date_facture } : {}),
        ...(entry.reference_piece !== undefined ? { reference_piece: entry.reference_piece } : {}), ...(entry.client_ou_payeur !== undefined ? { client_ou_payeur: entry.client_ou_payeur } : {}), ...(entry.nature !== undefined ? { nature: entry.nature } : {}), ...(entry.mode_reglement !== undefined ? { mode_reglement: entry.mode_reglement } : {}),
        montant_original: entry.montant, montant_courant: entry.montant, remboursements_historiques: 0, remboursements_appliques: 0, annulee: false, contribution_finale: entry.montant, event_ids_appliques: [], ...(entry.source !== undefined ? { source: clone(entry.source) } : {}),
    }));
    const events = input.events ?? [];
    for (const row of current) {
        const eventError = apply(row, events.filter(event => event.target_entry_id === row.id), input.periode);
        if (eventError)
            return fail(input, [eventError]);
    }
    const entryIds = sortById(input.entries).map(entry => entry.id);
    const canonicalEvents = [...events].sort((a, b) => compare(a.target_entry_id, b.target_entry_id) || compare(a.date_evenement, b.date_evenement) || compare(a.id, b.id));
    const rowById = new Map(current.map(row => [row.id, row]));
    const grossEventIds = canonicalEvents.filter(event => event.type === "correction" && event.apres.montant !== undefined).map(event => event.id);
    const refundedTargets = new Set(canonicalEvents.filter(event => event.type === "remboursement").map(event => event.target_entry_id));
    const refundEventIds = canonicalEvents.filter(event => {
        const row = rowById.get(event.target_entry_id);
        return (event.type === "remboursement" && !row.annulee)
            || (event.type === "annulation" && row.annulee && refundedTargets.has(event.target_entry_id));
    }).map(event => event.id);
    const netEventIds = canonicalEvents.filter(event => {
        const row = rowById.get(event.target_entry_id);
        return event.type === "annulation" || (!row.annulee && (event.type === "remboursement" || (event.type === "correction" && event.apres.montant !== undefined)));
    }).map(event => event.id);
    const canonical = sortById(current);
    const gross = canonical.reduce((sum, row) => sum + row.montant_courant, 0);
    const refunds = canonical.reduce((sum, row) => sum + row.remboursements_appliques, 0);
    const net = canonical.reduce((sum, row) => sum + row.contribution_finale, 0);
    if (![gross, refunds, net].every(Number.isFinite))
        return fail(input, [error("INVALID_NUMBER", "totaux")]);
    const controles = assessment(input);
    const doublons_potentiels = duplicates(input.entries);
    for (const duplicate of doublons_potentiels)
        for (const entry_id of duplicate.entry_ids)
            controles.push({ entry_id, status: "a_verifier", reason: "POTENTIAL_DUPLICATE" });
    const totaux = { total_recettes_brutes: gross, total_remboursements_appliques: refunds, total_recettes_nettes: net };
    const provenance = {
        total_recettes_brutes: { formula_id: "GROSS_REVENUE_TOTAL", entry_ids: entryIds, event_ids: grossEventIds },
        total_remboursements_appliques: { formula_id: "APPLIED_REFUND_TOTAL", entry_ids: entryIds, event_ids: refundEventIds },
        total_recettes_nettes: { formula_id: "CURRENT_NET_REVENUE_TOTAL", entry_ids: entryIds, event_ids: netEventIds },
    };
    return { status: controles.some(control => control.status !== "present") ? "partial" : "ok", inputs_retenus: clone(input), historique: { entries: clone(input.entries), events: clone(events) }, vue_courante: current, totaux, controles, doublons_potentiels, warnings: [], errors: [], provenance };
}
