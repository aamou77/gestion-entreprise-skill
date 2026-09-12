const descriptive = ["reference_piece", "client_ou_payeur", "nature", "mode_reglement"];
const correctable = ["date_encaissement", "date_facture", "reference_piece", "client_ou_payeur", "nature", "montant", "mode_reglement"];
const has = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const add = (errors, code, field) => { errors.push({ code, fields: [field], message: `${field}: ${code}` }); };
export const isDate = (value) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    const [y, m, d] = value.split("-").map(Number);
    const x = new Date(Date.UTC(y, m - 1, d));
    return x.getUTCFullYear() === y && x.getUTCMonth() === m - 1 && x.getUTCDate() === d;
};
const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
function source(value, field, errors) {
    if (value === undefined)
        return;
    if (!value || typeof value !== "object" || Array.isArray(value))
        return add(errors, "INVALID_REFERENCE", field);
    for (const key of ["source_id", "document_type", "reference"])
        if (has(value, key) && typeof value[key] !== "string")
            add(errors, "INVALID_REFERENCE", `${field}.${key}`);
}
function entry(value, index, period, ids, errors) {
    const path = `entries[${index}]`;
    if (!value || typeof value !== "object" || Array.isArray(value))
        return add(errors, "MISSING_REQUIRED_INPUT", path);
    const item = value;
    if (!nonEmpty(item.id))
        add(errors, "INVALID_ENTRY_ID", `${path}.id`);
    else if (ids.has(item.id))
        add(errors, "DUPLICATE_ENTRY_ID", `${path}.id`);
    else
        ids.add(item.id);
    for (const key of ["date_encaissement", "date_enregistrement"])
        if (!has(item, key))
            add(errors, "MISSING_REQUIRED_INPUT", `${path}.${key}`);
        else if (!isDate(item[key]))
            add(errors, "INVALID_DATE", `${path}.${key}`);
    if (isDate(item.date_encaissement) && (item.date_encaissement < period.debut || item.date_encaissement > period.fin))
        add(errors, "INVALID_DATE", `${path}.date_encaissement`);
    if (item.date_facture !== undefined && !isDate(item.date_facture))
        add(errors, "INVALID_DATE", `${path}.date_facture`);
    if (!has(item, "montant"))
        add(errors, "MISSING_REQUIRED_INPUT", `${path}.montant`);
    else if (typeof item.montant !== "number" || !Number.isFinite(item.montant))
        add(errors, "INVALID_NUMBER", `${path}.montant`);
    else if (item.montant < 0)
        add(errors, "INVALID_AMOUNT", `${path}.montant`);
    for (const key of descriptive)
        if (item[key] !== undefined && typeof item[key] !== "string")
            add(errors, "INVALID_REFERENCE", `${path}.${key}`);
    source(item.source, `${path}.source`, errors);
    if (item.field_statuses !== undefined) {
        if (!item.field_statuses || typeof item.field_statuses !== "object" || Array.isArray(item.field_statuses))
            add(errors, "INVALID_ENTRY_TYPE", `${path}.field_statuses`);
        else
            for (const key of descriptive)
                if (has(item.field_statuses, key) && !["present", "manquant", "ambigu", "a_verifier"].includes(item.field_statuses[key]))
                    add(errors, "INVALID_ENTRY_TYPE", `${path}.field_statuses.${key}`);
    }
}
function event(value, index, entries, period, ids, errors) {
    const path = `events[${index}]`;
    if (!value || typeof value !== "object" || Array.isArray(value))
        return add(errors, "MISSING_REQUIRED_INPUT", path);
    const item = value;
    if (!nonEmpty(item.id))
        add(errors, "INVALID_ENTRY_ID", `${path}.id`);
    else if (ids.has(item.id))
        add(errors, "DUPLICATE_ENTRY_ID", `${path}.id`);
    else
        ids.add(item.id);
    if (!["remboursement", "annulation", "correction"].includes(item.type))
        add(errors, "INVALID_ENTRY_TYPE", `${path}.type`);
    if (!nonEmpty(item.target_entry_id))
        add(errors, "MISSING_REQUIRED_INPUT", `${path}.target_entry_id`);
    else if (!entries.has(item.target_entry_id))
        add(errors, "INVALID_TARGET_ENTRY", `${path}.target_entry_id`);
    for (const key of ["date_evenement", "date_enregistrement"])
        if (!has(item, key))
            add(errors, "MISSING_REQUIRED_INPUT", `${path}.${key}`);
        else if (!isDate(item[key]))
            add(errors, "INVALID_DATE", `${path}.${key}`);
    const target = entries.get(item.target_entry_id);
    if (target && isDate(item.date_evenement) && (item.date_evenement < target.date_encaissement || item.date_evenement > period.fin))
        add(errors, "INVALID_DATE", `${path}.date_evenement`);
    if (!has(item, "motif"))
        add(errors, "MISSING_REQUIRED_INPUT", `${path}.motif`);
    else if (!nonEmpty(item.motif))
        add(errors, "INVALID_REFERENCE", `${path}.motif`);
    source(item.source, `${path}.source`, errors);
    if (item.type === "remboursement") {
        if (!has(item, "montant"))
            add(errors, "MISSING_REQUIRED_INPUT", `${path}.montant`);
        else if (typeof item.montant !== "number" || !Number.isFinite(item.montant))
            add(errors, "INVALID_NUMBER", `${path}.montant`);
        else if (item.montant < 0)
            add(errors, "INVALID_AMOUNT", `${path}.montant`);
    }
    if (item.type === "correction")
        for (const part of ["avant", "apres"]) {
            const patch = item[part];
            if (!patch || typeof patch !== "object" || Array.isArray(patch) || Object.keys(patch).length === 0 || Object.keys(patch).some(key => !correctable.includes(key)))
                add(errors, "INVALID_CORRECTION", `${path}.${part}`);
        }
}
export function validateRevenueLedgerInput(input) {
    const errors = [];
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        add(errors, "MISSING_REQUIRED_INPUT", "input");
        return errors;
    }
    const raw = input;
    const period = raw.periode;
    if (!period || typeof period !== "object" || !isDate(period.debut) || !isDate(period.fin) || period.debut > period.fin)
        add(errors, "INVALID_PERIOD", "periode");
    if (!nonEmpty(raw.devise))
        add(errors, "INVALID_CURRENCY", "devise");
    if (!Array.isArray(raw.entries)) {
        add(errors, "MISSING_REQUIRED_INPUT", "entries");
        return errors;
    }
    const validPeriod = isDate(period?.debut) && isDate(period?.fin) ? { debut: period.debut, fin: period.fin } : { debut: "", fin: "" };
    const ids = new Set();
    for (let i = 0; i < raw.entries.length; i++)
        entry(raw.entries[i], i, validPeriod, ids, errors);
    const entries = new Map();
    for (const item of raw.entries)
        if (item && typeof item === "object" && nonEmpty(item.id))
            entries.set(item.id, item);
    if (raw.events !== undefined && !Array.isArray(raw.events))
        add(errors, "MISSING_REQUIRED_INPUT", "events");
    else if (Array.isArray(raw.events))
        for (let i = 0; i < raw.events.length; i++)
            event(raw.events[i], i, entries, validPeriod, ids, errors);
    return errors;
}
