const statuses = new Set(["realise", "engage", "attendu", "hypothetique"]);
function add(errors, code, fields, message) {
    errors.push({ code, fields, message });
}
function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}
function isIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function nextDay(value) {
    const date = new Date(`${value}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().slice(0, 10);
}
function nonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
export function validateTreasuryInput(input) {
    const errors = [];
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
        add(errors, "MISSING_REQUIRED_INPUT", ["input"], "L'entrée doit être un objet.");
        return { errors };
    }
    const candidate = input;
    const mode = candidate.mode_analyse;
    if (mode !== "reel" && mode !== "scenario") {
        add(errors, "MISSING_REQUIRED_INPUT", ["mode_analyse"], "mode_analyse doit être reel ou scenario.");
    }
    if (!nonEmptyString(candidate.devise))
        add(errors, "INVALID_CURRENCY", ["devise"], "devise doit être une chaîne non vide.");
    if (candidate.solde_ouverture === undefined || candidate.solde_ouverture === null) {
        add(errors, "MISSING_REQUIRED_INPUT", ["solde_ouverture"], "solde_ouverture est requis.");
    }
    else if (!isFiniteNumber(candidate.solde_ouverture)) {
        add(errors, "INVALID_NUMBER", ["solde_ouverture"], "solde_ouverture doit être un nombre fini.");
    }
    if (candidate.reserve_tresorerie !== undefined
        && (!isFiniteNumber(candidate.reserve_tresorerie) || candidate.reserve_tresorerie < 0)) {
        add(errors, "INVALID_RESERVE", ["reserve_tresorerie"], "reserve_tresorerie doit être un nombre fini positif ou nul.");
    }
    if (!Array.isArray(candidate.periodes) || candidate.periodes.length === 0) {
        add(errors, "MISSING_REQUIRED_INPUT", ["periodes"], "periodes doit être une liste non vide.");
        return { errors };
    }
    const flowIds = new Set();
    let previousEnd;
    candidate.periodes.forEach((periodValue, periodIndex) => {
        const path = `periodes[${periodIndex}]`;
        if (periodValue === null || typeof periodValue !== "object" || Array.isArray(periodValue)) {
            add(errors, "INVALID_PERIOD", [path], "Une période doit être un objet.");
            return;
        }
        const period = periodValue;
        if (!nonEmptyString(period.id))
            add(errors, "INVALID_PERIOD", [`${path}.id`], "id de période doit être une chaîne non vide.");
        const range = period.periode;
        if (range === null || typeof range !== "object" || Array.isArray(range)) {
            add(errors, "INVALID_PERIOD", [`${path}.periode`], "periode doit être un objet.");
        }
        else {
            const dates = range;
            const start = dates.debut;
            const end = dates.fin;
            if (!isIsoDate(start) || !isIsoDate(end) || start > end) {
                add(errors, "INVALID_PERIOD", [`${path}.periode.debut`, `${path}.periode.fin`], "Les bornes de période sont invalides.");
            }
            else {
                if (previousEnd !== undefined && start !== nextDay(previousEnd)) {
                    add(errors, "INVALID_PERIOD", [`${path}.periode.debut`], "Les périodes doivent être ordonnées, contiguës et non chevauchantes.");
                }
                previousEnd = end;
            }
        }
        if (!Array.isArray(period.flux)) {
            add(errors, "MISSING_REQUIRED_INPUT", [`${path}.flux`], "flux doit être une liste.");
            return;
        }
        period.flux.forEach((flowValue, flowIndex) => {
            const flowPath = `${path}.flux[${flowIndex}]`;
            if (flowValue === null || typeof flowValue !== "object" || Array.isArray(flowValue)) {
                add(errors, "INVALID_FLOW_ID", [flowPath], "Un flux doit être un objet.");
                return;
            }
            const flow = flowValue;
            if (!nonEmptyString(flow.id))
                add(errors, "INVALID_FLOW_ID", [`${flowPath}.id`], "id doit être une chaîne non vide.");
            else if (flowIds.has(flow.id))
                add(errors, "DUPLICATE_FLOW_ID", [`${flowPath}.id`], "id de flux dupliqué.");
            else
                flowIds.add(flow.id);
            if (flow.sens !== "encaissement" && flow.sens !== "decaissement")
                add(errors, "INVALID_FLOW_DIRECTION", [`${flowPath}.sens`], "sens de flux invalide.");
            if (!statuses.has(flow.statut) || (mode === "reel" && flow.statut === "hypothetique")) {
                add(errors, "INVALID_FLOW_STATUS", [`${flowPath}.statut`], "statut de flux invalide pour le mode.");
            }
            if (!isFiniteNumber(flow.montant) || flow.montant < 0)
                add(errors, "INVALID_FLOW_AMOUNT", [`${flowPath}.montant`], "montant doit être un nombre fini positif ou nul.");
            if (!isIsoDate(flow.date))
                add(errors, "INVALID_FLOW_DATE", [`${flowPath}.date`], "date doit être ISO YYYY-MM-DD.");
            for (const field of ["libelle", "source_id"]) {
                if (flow[field] !== undefined && typeof flow[field] !== "string") {
                    add(errors, "MISSING_REQUIRED_INPUT", [`${flowPath}.${field}`], `${field} doit être une chaîne lorsqu'il est fourni.`);
                }
            }
        });
    });
    return { errors };
}
