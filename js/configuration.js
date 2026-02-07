// ── i18n: French translations (default) ─────────────────────────────────────
const translations_fr = {
    // Page
    cfg_page_title: "Configuration Formation à Distance",
    cfg_heading: "Configuration Pédagogique",
    cfg_subtitle: "Définissez les dimensions de votre dispositif de formation",
    cfg_label_formation: "Formation :",
    cfg_ph_formation: "Nom de la formation",

    // Toolbar
    cfg_label_tools: "Outils",
    cfg_label_language: "Langue",
    cfg_btn_info: "Infos",
    cfg_btn_order: "Ordre",
    cfg_btn_analysis: "Analyse",
    cfg_btn_save: "Sauvegarde",
    cfg_btn_load: "Charger",
    cfg_btn_export_md: "Export MD",

    // Toolbar titles
    cfg_title_about: "À propos",
    cfg_title_reorder: "Réorganiser",
    cfg_title_analysis: "Activer l'analyse (Expérimental)",
    cfg_title_save: "Sauvegarder",
    cfg_title_load: "Charger une sauvegarde",
    cfg_title_export_md: "Exporter en Markdown",
    cfg_title_reset: "Réinitialiser",
    cfg_title_load_lang: "Charger un pack de langue",
    cfg_title_recenter: "Recentrer",

    // Reset modal
    cfg_reset_heading: "Réinitialiser ?",
    cfg_reset_msg: "Tous les curseurs reviendront à leur position centrale (50%).",
    cfg_btn_cancel: "Annuler",
    cfg_btn_confirm_reset: "Réinitialiser",

    // About modal
    cfg_about_heading: "À propos",
    cfg_about_text: "Cet outil permet de visualiser et d\u2019équilibrer les 6 dimensions structurelles de votre dispositif de formation.",
    cfg_about_reference: "Inspiré de : Docq et al. 2023. Enseigner à distance: 5 balises pour vous lancer. Presses universitaires de Louvain.",
    cfg_about_privacy: "Traitement local : toutes les données restent sur votre navigateur, rien n\u2019est envoyé en ligne.",
    cfg_about_credits: "Développé par Florent Michelot, inspiré des travaux de F. Jourde & J. Dubois (2026) \u2022 CC BY-SA",

    // Order panel
    cfg_order_heading: "Priorité des dimensions",
    cfg_order_instruction: "Glissez-déposez pour réorganiser l\u2019affichage.",
    cfg_order_apply: "Mettre à jour l\u2019affichage",

    // Footer
    cfg_footer_credits: "Développé par Florent Michelot, inspiré des travaux de François Jourde & Jacques Dubois (2026) \u2014 CC BY-SA",
    cfg_footer_code: 'Code disponible sur <a href="https://github.com/jourde/artefacts" target="_blank" rel="noopener noreferrer">https://github.com/jourde/artefacts</a>',

    // Dimension 0: Présence / Distance
    cfg_dim0_left: "PRÉSENCE",
    cfg_dim0_right: "DISTANCE",
    cfg_dim0_left_desc: "Unité de lieu et de temps.",
    cfg_dim0_right_desc: "Flexibilité géographique.",
    cfg_dim0_tick0: "Présentiel",
    cfg_dim0_tick1: "Majoritairement présentiel",
    cfg_dim0_tick2: "Hybride",
    cfg_dim0_tick3: "Majoritairement à distance",
    cfg_dim0_tick4: "À distance",

    // Dimension 1: Petit groupe / Grand groupe
    cfg_dim1_left: "PETIT GROUPE",
    cfg_dim1_right: "GRAND GROUPE",
    cfg_dim1_left_desc: "Suivi individuel.",
    cfg_dim1_right_desc: "Massification.",
    cfg_dim1_tick0: "Petit groupe",
    cfg_dim1_tick1: "Groupe restreint",
    cfg_dim1_tick2: "Groupe moyen",
    cfg_dim1_tick3: "Groupe large",
    cfg_dim1_tick4: "Grand groupe",

    // Dimension 2: Asynchrone / Synchrone
    cfg_dim2_left: "ASYNCHRONE",
    cfg_dim2_right: "SYNCHRONE",
    cfg_dim2_left_desc: "Temps différé.",
    cfg_dim2_right_desc: "Temps réel.",
    cfg_dim2_tick0: "Auto-rythmé",
    cfg_dim2_tick1: "Asynchrone guidé",
    cfg_dim2_tick2: "Mixte",
    cfg_dim2_tick3: "Synchrone ponctuel",
    cfg_dim2_tick4: "Synchrone",

    // Dimension 3: Individuel / Collaboratif
    cfg_dim3_left: "INDIVIDUEL",
    cfg_dim3_right: "COLLABORATIF",
    cfg_dim3_left_desc: "Travaux personnels.",
    cfg_dim3_right_desc: "Co-construction.",
    cfg_dim3_tick0: "Individuel",
    cfg_dim3_tick1: "Individuel + échanges",
    cfg_dim3_tick2: "Alterné",
    cfg_dim3_tick3: "Travail en équipe",
    cfg_dim3_tick4: "Collaboratif",

    // Dimension 4: Appropriation / Production
    cfg_dim4_left: "APPROPRIATION",
    cfg_dim4_right: "PRODUCTION",
    cfg_dim4_left_desc: "Ressources.",
    cfg_dim4_right_desc: "Création.",
    cfg_dim4_tick0: "Appropriation",
    cfg_dim4_tick1: "Réutilisation",
    cfg_dim4_tick2: "Adaptation",
    cfg_dim4_tick3: "Création",
    cfg_dim4_tick4: "Production",

    // Dimension 5: Accompagnement / Sans accompagnement
    cfg_dim5_left: "ACCOMPAGNEMENT",
    cfg_dim5_right: "SANS ACCOMPAGNEMENT",
    cfg_dim5_left_desc: "Guidage fort.",
    cfg_dim5_right_desc: "Autonomie.",
    cfg_dim5_tick0: "Accompagnement fort",
    cfg_dim5_tick1: "Accompagnement régulier",
    cfg_dim5_tick2: "Accompagnement ponctuel",
    cfg_dim5_tick3: "Autonomie guidée",
    cfg_dim5_tick4: "Sans accompagnement",

    // Tick label fallbacks
    cfg_tick_balanced: "Équilibré",
    cfg_tick_intermediate: "Intermédiaire",

    // Alerts
    cfg_alert_header: "Points de vigilance",
    cfg_alert_0: "<strong>Synchrone + Sans accompagnement :</strong> les sessions en temps réel sont difficiles à gérer sans présence du/de la formateur\u00b7rice pour animer et réguler.",
    cfg_alert_1: "<strong>Collaboratif + Asynchrone :</strong> la collaboration en temps différé nécessite des outils et consignes très structurés pour coordonner le travail de groupe.",
    cfg_alert_2: "<strong>Production + Sans accompagnement :</strong> les étudiant\u00b7es qui doivent produire leurs propres ressources ont souvent besoin de guidage et de feedback.",
    cfg_alert_3: "<strong>Synchrone + Production + Collaboratif + Sans accompagnement :</strong> configuration très exigeante qui demande beaucoup d\u2019autonomie et de compétences aux étudiant\u00b7es.",
    cfg_alert_4: "<strong>Synchrone + Production + Collaboratif (avec accompagnement) :</strong> cette combinaison demande une coordination importante en temps réel.",
    cfg_alert_5: "<strong>Grand groupe + Accompagnement fort :</strong> l\u2019accompagnement individualisé devient difficile avec un grand nombre de participants.",
    cfg_alert_6: "<strong>Distance + Synchrone :</strong> les sessions synchrones à distance nécessitent des outils fiables et une bonne connexion.",
    cfg_alert_7: "<strong>Distance + Grand groupe + Sans accompagnement :</strong> les étudiant\u00b7es peuvent facilement se sentir isolés et perdus.",
    cfg_alert_8: "<strong>Distance + Collaboratif :</strong> la collaboration à distance nécessite des outils spécifiques et une organisation rigoureuse.",
    cfg_alert_9: "<strong>Grand groupe + Collaboratif :</strong> organiser du travail collaboratif avec un grand nombre de participants demande une structuration forte.",
    cfg_alert_10: "<strong>Grand groupe + Production :</strong> accompagner la production de ressources par un grand groupe est exigeant.",
    cfg_alert_11: "<strong>Présence + Asynchrone :</strong> cette combinaison est peu cohérente. Si les étudiant\u00b7es sont en présence, privilégiez les interactions synchrones.",

    // Export Markdown
    cfg_md_title: "Dispositif de formation",
    cfg_md_info: "Informations",
    cfg_md_formation: "Formation",
    cfg_md_date: "Date",
    cfg_md_dimensions: "Dimensions",
    cfg_md_col_dimension: "Dimension",
    cfg_md_col_tick: "Cran",
    cfg_md_tick_rather: "Plutôt",
    cfg_md_tick_balanced: "Équilibré",

    // Error messages
    cfg_error_invalid_file: "Fichier de sauvegarde invalide.",
    cfg_error_export_failed: "L\u2019export Markdown a échoué sur ce navigateur."
};

// ── Dimensions ───────────────────────────────────────────────────────────────
const dimensions = [
    { id: 0, value: 50 },
    { id: 1, value: 50 },
    { id: 2, value: 50 },
    { id: 3, value: 50 },
    { id: 4, value: 50 },
    { id: 5, value: 50 }
];

// Dimension translation helpers
function dimLeft(dim) { return i18nCore.t('cfg_dim' + dim.id + '_left'); }
function dimRight(dim) { return i18nCore.t('cfg_dim' + dim.id + '_right'); }
function dimLeftDesc(dim) { return i18nCore.t('cfg_dim' + dim.id + '_left_desc'); }
function dimRightDesc(dim) { return i18nCore.t('cfg_dim' + dim.id + '_right_desc'); }
function dimTick(dim, idx) { return i18nCore.t('cfg_dim' + dim.id + '_tick' + idx); }

function tickLabelsFor(dim) {
    return [0, 1, 2, 3, 4].map(function (idx) { return dimTick(dim, idx); });
}

// ── State ────────────────────────────────────────────────────────────────────
let alertsEnabled = false;
let currentOrder = dimensions.map(function (d) { return d.id; });

// ── Save / Load ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "config_pedagogique_state_v1";

function buildState() {
    var formation = (document.getElementById('formationInput') || {}).value || '';
    return {
        version: 1,
        savedAt: new Date().toISOString(),
        formation: formation.trim(),
        alertsEnabled: !!alertsEnabled,
        currentOrder: Array.isArray(currentOrder) ? currentOrder.slice() : dimensions.map(function (d) { return d.id; }),
        dimensions: dimensions.map(function (d) { return { id: d.id, value: d.value }; })
    };
}

function applyState(state) {
    if (!state || typeof state !== "object") return;

    if (typeof state.formation === 'string') {
        var input = document.getElementById('formationInput');
        if (input) input.value = state.formation;
    }

    if (Array.isArray(state.currentOrder) && state.currentOrder.length === dimensions.length) {
        var ids = {};
        dimensions.forEach(function (d) { ids[d.id] = true; });
        var isValid = state.currentOrder.every(function (x) { return ids[x]; });
        if (isValid) currentOrder = state.currentOrder.slice();
    }

    if (Array.isArray(state.dimensions)) {
        state.dimensions.forEach(function (item) {
            var dim = dimensions.find(function (d) { return d.id === item.id; });
            if (dim && Number.isFinite(parseInt(item.value))) {
                dim.value = Math.max(0, Math.min(100, parseInt(item.value)));
            }
        });
    }

    if (typeof state.alertsEnabled === "boolean") {
        alertsEnabled = state.alertsEnabled;
        setAlertsUI(alertsEnabled);
    }

    renderSliders();
    checkAlerts();
}

function saveState() {
    var state = buildState();

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn("localStorage write error:", e);
    }

    try {
        var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        var dateTag = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
        a.href = url;
        a.download = 'configuration-formation_' + dateTag + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.warn("Download error:", e);
    }
}

function exportMarkdown() {
    var state = buildState();

    var orderedDims = (Array.isArray(state.currentOrder) ? state.currentOrder : dimensions.map(function (d) { return d.id; }))
        .map(function (id) { return dimensions.find(function (d) { return d.id === id; }); })
        .filter(Boolean);

    var clamp100 = function (n) {
        var v = Number(n);
        return Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 50;
    };

    var nearestTickIndex = function (value) { return Math.round(value / 25); };
    var safe = function (v) { return (v === null || v === undefined) ? "" : String(v); };
    var esc = function (s) { return safe(s).replace(/\|/g, "\\|").trim(); };

    var getTickLabel = function (dim, value) {
        var idx = nearestTickIndex(value);
        var labels = tickLabelsFor(dim);
        if (labels && labels.length) {
            return safe(labels[idx] || labels[labels.length - 1] || "");
        }
        var left = dimLeft(dim);
        var right = dimRight(dim);
        var rather = i18nCore.t('cfg_md_tick_rather');
        var balanced = i18nCore.t('cfg_md_tick_balanced');
        var derived = [left, left ? rather + ' ' + left : "", balanced, right ? rather + ' ' + right : "", right];
        return derived[idx] || "";
    };

    var getDimensionName = function (dim) {
        var left = dimLeft(dim);
        var right = dimRight(dim);
        if (left && right) return left + '/' + right;
        return left || right || "\u2014";
    };

    var now = new Date();
    var lines = [];

    lines.push('# ' + i18nCore.t('cfg_md_title'));
    lines.push('');
    lines.push('## ' + i18nCore.t('cfg_md_info'));
    lines.push('- **' + i18nCore.t('cfg_md_formation') + ' :** ' + (state.formation ? esc(state.formation) : "\u2014"));
    lines.push('- **' + i18nCore.t('cfg_md_date') + ' :** ' + now.toLocaleString());
    lines.push('');
    lines.push('## ' + i18nCore.t('cfg_md_dimensions'));
    lines.push('');
    lines.push('| ' + i18nCore.t('cfg_md_col_dimension') + ' | ' + i18nCore.t('cfg_md_col_tick') + ' |');
    lines.push('|---|---|');

    orderedDims.forEach(function (dim) {
        var value = clamp100(dim.value);
        var tickStr = getTickLabel(dim, value) || "\u2014";
        var name = getDimensionName(dim);
        lines.push('| **' + esc(name) + '** | ' + esc(tickStr) + ' |');
    });

    var md = lines.join('\n');

    try {
        var blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");

        var safeName = (state.formation || "dispositif-formation").toLowerCase()
            .replace(/[^a-z0-9\u00e0-\u00ff\s-]/gi, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 60) || "dispositif-formation";

        var dateTag = now.toISOString().slice(0, 10);
        a.href = url;
        a.download = safeName + '_' + dateTag + '.md';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.warn("Markdown export error:", e);
        alert(i18nCore.t('cfg_error_export_failed'));
    }
}

function triggerLoad() {
    var input = document.getElementById("loadFileInput");
    if (input) {
        input.value = "";
        input.click();
    }
}

function loadStateFromFile(event) {
    var file = event && event.target && event.target.files && event.target.files[0];
    if (!file) {
        loadStateFromLocal();
        return;
    }

    var reader = new FileReader();
    reader.onload = function () {
        try {
            var state = JSON.parse(String(reader.result || ""));
            applyState(state);
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
        } catch (e) {
            alert(i18nCore.t('cfg_error_invalid_file'));
            console.error(e);
        }
    };
    reader.readAsText(file, "utf-8");
}

function loadStateFromLocal() {
    try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        var state = JSON.parse(raw);
        applyState(state);
    } catch (e) {
        console.warn("localStorage read error:", e);
    }
}

// ── Core Functions ───────────────────────────────────────────────────────────

function togglePanel(panelId) {
    var panel = document.getElementById(panelId);
    var willOpen = !panel.classList.contains('open');

    if (willOpen) {
        if (panelId === 'orderPanel') renderSortableList();
        panel.classList.add('open');
    } else {
        panel.classList.remove('open');
    }
}

function setAlertsUI(enabled) {
    var btn = document.getElementById('btnAlerts');
    var badge = document.getElementById('betaBadge');
    var container = document.getElementById('alertsContainer');

    if (!btn || !badge) return;

    if (enabled) {
        btn.classList.remove('text-slate-400');
        btn.classList.add('text-amber-600', 'bg-amber-50');
        badge.classList.remove('bg-slate-100', 'text-slate-500', 'border-slate-200');
        badge.classList.add('bg-amber-100', 'text-amber-700', 'border-amber-200');
        checkAlerts();
    } else {
        btn.classList.add('text-slate-400');
        btn.classList.remove('text-amber-600', 'bg-amber-50');
        badge.classList.add('bg-slate-100', 'text-slate-500', 'border-slate-200');
        badge.classList.remove('bg-amber-100', 'text-amber-700', 'border-amber-200');
        if (container) container.classList.add('hidden');
    }
}

function toggleAlerts() {
    alertsEnabled = !alertsEnabled;
    setAlertsUI(alertsEnabled);
}

function renderSliders() {
    var container = document.getElementById("slidersContainer");
    var html = "";

    currentOrder.forEach(function (id) {
        var dim = dimensions.find(function (d) { return d.id === id; });
        var leftTitle = dimLeft(dim);
        var rightTitle = dimRight(dim);
        var leftDesc = dimLeftDesc(dim);
        var rightDesc = dimRightDesc(dim);
        var recenterTitle = i18nCore.t('cfg_title_recenter');

        html += '<div id="slider-card-' + dim.id + '" class="slider-card bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 transition-all duration-300">'
            + '<div class="flex justify-between items-end mb-1">'
            +   '<div class="w-5/12">'
            +     '<h3 class="text-xs font-bold text-slate-800 leading-none">' + leftTitle + '</h3>'
            +     '<p class="text-[9px] text-slate-400 leading-tight mt-0.5">' + leftDesc + '</p>'
            +   '</div>'
            +   '<div class="w-2/12 flex justify-center pb-0.5">'
            +     '<button onclick="resetDim(' + dim.id + ')" class="text-slate-200 hover:text-indigo-500 transition-colors p-1" title="' + recenterTitle + '">'
            +       '<span class="material-icons-round text-base">center_focus_strong</span>'
            +     '</button>'
            +   '</div>'
            +   '<div class="w-5/12 text-right">'
            +     '<h3 class="text-xs font-bold text-slate-800 leading-none">' + rightTitle + '</h3>'
            +     '<p class="text-[9px] text-slate-400 leading-tight mt-0.5">' + rightDesc + '</p>'
            +   '</div>'
            + '</div>'
            + '<div class="relative h-5 flex items-center mt-1">'
            +   '<div class="absolute w-full h-1 bg-slate-100 rounded-full overflow-hidden top-1/2 -translate-y-1/2">'
            +     '<div class="w-1/2 h-full bg-slate-200/40"></div>'
            +   '</div>'
            +   '<div class="absolute w-full h-2 flex justify-between px-[1px] pointer-events-none top-1/2 -translate-y-1/2">'
            +     '<div class="w-[1px] h-full bg-slate-300"></div>'
            +     '<div class="w-[1px] h-1 bg-slate-300 self-center"></div>'
            +     '<div class="w-[2px] h-full bg-slate-400"></div>'
            +     '<div class="w-[1px] h-1 bg-slate-300 self-center"></div>'
            +     '<div class="w-[1px] h-full bg-slate-300"></div>'
            +   '</div>'
            +   '<input type="range" min="0" max="100" step="25" value="' + dim.value + '" id="range-' + dim.id + '"'
            +     ' class="w-full relative z-10 appearance-none bg-transparent"'
            +     ' oninput="updateVal(' + dim.id + ', this.value); showTooltip(' + dim.id + ', this, true)"'
            +     ' onmousemove="showTooltip(' + dim.id + ', this)"'
            +     ' onmouseenter="showTooltip(' + dim.id + ', this)"'
            +     ' onmouseleave="hideTooltip(' + dim.id + ')"'
            +     ' ontouchstart="showTooltip(' + dim.id + ', this, true)"'
            +     ' ontouchmove="showTooltip(' + dim.id + ', this, true)"'
            +     ' ontouchend="hideTooltip(' + dim.id + ')"'
            +     ' onfocus="showTooltip(' + dim.id + ', this, true)"'
            +     ' onblur="hideTooltip(' + dim.id + ')">'
            +   '<div id="tooltip-' + dim.id + '" class="slider-tooltip hidden"></div>'
            + '</div>'
            + '</div>';
    });
    container.innerHTML = html;
}

function updateVal(id, val) {
    var dim = dimensions.find(function (d) { return d.id === id; });
    if (dim) {
        dim.value = parseInt(val, 10);
        checkAlerts();
        updateRadarChart();
    }
}

function showTooltip(id, inputEl, forceVisible) {
    var dim = dimensions.find(function (d) { return d.id === id; });
    if (!dim || !inputEl) return;

    var value = parseInt(inputEl.value, 10);
    var labels = tickLabelsFor(dim);
    var idx = Math.max(0, Math.min(4, Math.round(value / 25)));
    var label = labels[idx] || String(value);

    var tooltip = document.getElementById('tooltip-' + id);
    if (!tooltip) return;

    tooltip.textContent = label;
    tooltip.classList.remove('hidden');

    var min = parseInt(inputEl.min || "0", 10);
    var max = parseInt(inputEl.max || "100", 10);
    var pct = (value - min) / (max - min || 1);

    var inputRect = inputEl.getBoundingClientRect();
    var parent = inputEl.parentElement;
    var parentRect = parent.getBoundingClientRect();
    var x = (inputRect.left - parentRect.left) + pct * inputRect.width;
    tooltip.style.left = x + 'px';
}

function hideTooltip(id) {
    var tooltip = document.getElementById('tooltip-' + id);
    if (tooltip) tooltip.classList.add('hidden');
}

function resetDim(id) {
    var dim = dimensions.find(function (d) { return d.id === id; });
    if (dim) {
        dim.value = 50;
        var input = document.getElementById('range-' + id);
        if (input) input.value = 50;
        updateVal(id, 50);
    }
}

function checkAlerts() {
    var container = document.getElementById('alertsContainer');
    if (!container) return;

    if (!alertsEnabled) {
        container.classList.add('hidden');
        return;
    }

    var d = dimensions.map(function (dim) { return dim.value; });
    var alerts = [];

    var isL = function (idx) { return d[idx] < 50; };
    var isR = function (idx) { return d[idx] > 50; };

    if (isR(2) && isR(5)) alerts.push(i18nCore.t('cfg_alert_0'));
    if (isR(3) && isL(2)) alerts.push(i18nCore.t('cfg_alert_1'));
    if (isR(4) && isR(5)) alerts.push(i18nCore.t('cfg_alert_2'));
    if (isR(2) && isR(4) && isR(3) && isR(5)) alerts.push(i18nCore.t('cfg_alert_3'));
    if (isR(2) && isR(4) && isR(3) && isL(5)) alerts.push(i18nCore.t('cfg_alert_4'));
    if (isR(1) && isL(5)) alerts.push(i18nCore.t('cfg_alert_5'));
    if (isR(0) && isR(2)) alerts.push(i18nCore.t('cfg_alert_6'));
    if (isR(0) && isR(1) && isR(5)) alerts.push(i18nCore.t('cfg_alert_7'));
    if (isR(0) && isR(3)) alerts.push(i18nCore.t('cfg_alert_8'));
    if (isR(1) && isR(3)) alerts.push(i18nCore.t('cfg_alert_9'));
    if (isR(1) && isR(4)) alerts.push(i18nCore.t('cfg_alert_10'));
    if (isL(0) && isL(2)) alerts.push(i18nCore.t('cfg_alert_11'));

    if (alerts.length > 0) {
        var header = i18nCore.t('cfg_alert_header');
        container.innerHTML = '<div class="bg-amber-50 rounded-2xl p-5 border border-amber-100 shadow-sm animate-[slideIn_0.3s_ease-out]">'
            + '<h3 class="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">'
            +   '<span class="material-icons-round text-amber-500">warning_amber</span>'
            +   header + ' (' + alerts.length + ')'
            + '</h3>'
            + '<div class="space-y-3">'
            + alerts.map(function (a) { return '<div class="text-xs text-amber-900 bg-white/60 p-2 rounded border border-amber-100/50">' + a + '</div>'; }).join('')
            + '</div></div>';
        container.classList.remove('hidden');
    } else {
        container.innerHTML = '';
        container.classList.add('hidden');
    }
}

// ── Reordering ───────────────────────────────────────────────────────────────

function renderSortableList() {
    var list = document.getElementById("sortableList");
    list.innerHTML = "";
    currentOrder.forEach(function (id) {
        var dim = dimensions.find(function (d) { return d.id === id; });
        var li = document.createElement("li");
        li.className = "flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 cursor-grab active:cursor-grabbing hover:border-indigo-300 transition-colors shadow-sm";
        li.setAttribute("data-id", dim.id);
        li.innerHTML = '<span class="material-icons-round text-slate-300">drag_handle</span>'
            + '<span class="font-bold text-slate-700 text-sm flex-1">' + dimLeft(dim) + ' / ' + dimRight(dim) + '</span>';
        list.appendChild(li);
    });

    if (typeof Sortable !== 'undefined') {
        new Sortable(list, {
            animation: 200,
            ghostClass: 'sortable-ghost',
            handle: 'li'
        });
    }
}

function applyOrder() {
    var listItems = document.querySelectorAll("#sortableList li");
    var newOrder = [];
    listItems.forEach(function (item) {
        newOrder.push(parseInt(item.getAttribute("data-id")));
    });
    currentOrder = newOrder;
    renderSliders();
    togglePanel('orderPanel');
}

// ── Modal & Reset ────────────────────────────────────────────────────────────

function showResetModal() { document.getElementById('resetModal').classList.remove('hidden'); }
function hideResetModal() { document.getElementById('resetModal').classList.add('hidden'); }

function showAboutModal() { document.getElementById('aboutModal').classList.remove('hidden'); }
function hideAboutModal() { document.getElementById('aboutModal').classList.add('hidden'); }

function performReset() {
    dimensions.forEach(function (d) { d.value = 50; });
    renderSliders();
    checkAlerts();
    updateRadarChart();
    hideResetModal();
}

// ── i18n Functions ───────────────────────────────────────────────────────────

function switchLang(code) {
    if (code && i18nCore.translations[code]) {
        i18nCore.setLang(code);
    }
}

function loadLangPack(event) {
    i18nCore.loadLanguagePackFromFile(event, function (code) {
        var sel = document.getElementById('langSelect');
        if (sel && !sel.querySelector('option[value="' + code + '"]')) {
            var opt = document.createElement('option');
            opt.value = code;
            opt.textContent = code;
            sel.appendChild(opt);
        }
        i18nCore.setLang(code);
    });
}

function syncLangSelector() {
    var sel = document.getElementById('langSelect');
    if (sel) sel.value = i18nCore.currentLang;
}

// ── Initialization ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    // Initialize i18n with French translations
    i18nCore.init({
        defaultLang: 'fr',
        translations: { 'fr': translations_fr },
        persist: true
    });

    // Auto-load English Canadian pack
    i18nCore.loadLanguagePack('i18n/en-CA.json').then(function (code) {
        // Restore stored language preference now that the pack is available
        try {
            var stored = localStorage.getItem('ld_ui_lang');
            if (stored && stored !== 'fr' && i18nCore.translations[stored]) {
                i18nCore.setLang(stored);
            }
        } catch (_) {}
        syncLangSelector();
    }).catch(function (err) {
        console.warn('[i18n] Could not load en-CA pack:', err);
    });

    // Page title
    document.title = i18nCore.t('cfg_page_title');

    // Render
    try { renderSliders(); } catch (e) { console.error(e); }
    try { setAlertsUI(alertsEnabled); } catch (e) {}
    try { checkAlerts(); } catch (e) {}
});

// Re-render dynamic content when language changes
document.addEventListener('i18n:langchange', function () {
    document.title = i18nCore.t('cfg_page_title');
    renderSliders();
    checkAlerts();
    syncLangSelector();
    updateRadarChart();
});

// ── Radar Chart ──────────────────────────────────────────────────────────────

var radarChart = null;

function initRadarChart() {
    var ctx = document.getElementById('dimensionsRadarChart');
    if (!ctx) return;

    var labels = dimensions.map(function(d) {
        var leftKey = 'cfg_dim' + d.id + '_left';
        var rightKey = 'cfg_dim' + d.id + '_right';
        var left = i18nCore.t(leftKey) || d.labelLeft;
        var right = i18nCore.t(rightKey) || d.labelRight;
        return left + ' / ' + right;
    });

    var data = dimensions.map(function(d) { return d.value; });

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: i18nCore.t('cfg_radar_title') || 'Configuration',
                data: data,
                fill: true,
                backgroundColor: 'rgba(145, 35, 56, 0.2)',
                borderColor: '#912338',
                borderWidth: 2,
                pointBackgroundColor: '#912338',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        display: false
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 10,
                            weight: '600'
                        },
                        color: '#64748b'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

function updateRadarChart() {
    if (!radarChart) {
        initRadarChart();
        return;
    }

    // Update labels (for language changes)
    radarChart.data.labels = dimensions.map(function(d) {
        var leftKey = 'cfg_dim' + d.id + '_left';
        var rightKey = 'cfg_dim' + d.id + '_right';
        var left = i18nCore.t(leftKey) || d.labelLeft;
        var right = i18nCore.t(rightKey) || d.labelRight;
        return left + ' / ' + right;
    });

    // Update data
    radarChart.data.datasets[0].data = dimensions.map(function(d) { return d.value; });
    radarChart.update();
}

// Initialize radar chart after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initRadarChart, 200);
});
