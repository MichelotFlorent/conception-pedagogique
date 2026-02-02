// ── i18n: French translations (default) ─────────────────────────────────────
var translations_fr = {
    // Page
    persona_page_title: "G\u00e9n\u00e9rateur de Personas",
    persona_heading: "G\u00e9n\u00e9rateur de Personas",
    persona_subtitle: "Cr\u00e9ez et g\u00e9rez plusieurs personas pour concevoir des formations adapt\u00e9es.",

    // Action groups
    persona_grp_io: "IMPORT & EXPORT",
    persona_grp_help: "Aide",
    persona_grp_language: "Langue",

    // Tooltips
    persona_tip_load: "Charger une sauvegarde (JSON)",
    persona_tip_save: "Sauvegarder (JSON)",
    persona_tip_md: "Exporter tous les personas (Markdown)",
    persona_tip_guide: "Guide m\u00e9thodologique",
    persona_tip_about: "\u00c0 propos",
    persona_tip_load_lang: "Charger un pack de langue",

    // Count selector
    persona_lbl_count: "Nombre de personas :",
    persona_hint_count: "Recommandation : 3 \u00e0 5 personas",

    // Tab
    persona_tab_label: "Persona",

    // Section 1: Identity & Image
    persona_sec_identity: "Identit\u00e9 & Image",
    persona_desc_identity: "Nom, avatar et citation cl\u00e9 pour humaniser le persona.",
    persona_lbl_name: "Nom du persona",
    persona_ph_name: "Ex : Julie Tremblay",
    persona_lbl_avatar: "URL de l\u2019avatar (optionnel)",
    persona_ph_avatar: "https://exemple.com/photo.jpg",
    persona_lbl_quote: "Citation cl\u00e9",
    persona_ph_quote: "Ex : \u00ab Je n\u2019ai jamais le temps de me former. \u00bb",

    // Section 2: Demographics
    persona_sec_demographics: "Donn\u00e9es d\u00e9mographiques",
    persona_desc_demographics: "\u00c2ge, genre, formation, poste et exp\u00e9rience.",
    persona_lbl_age: "\u00c2ge",
    persona_ph_age: "Ex : 35",
    persona_lbl_gender: "Genre",
    persona_opt_select: "S\u00e9lectionner...",
    persona_opt_gender_f: "Femme",
    persona_opt_gender_m: "Homme",
    persona_opt_gender_nb: "Non-binaire",
    persona_opt_gender_other: "Autre / Non pr\u00e9cis\u00e9",
    persona_lbl_education: "Formation / Dipl\u00f4me",
    persona_ph_education: "Ex : Ma\u00eetrise en \u00e9ducation",
    persona_lbl_language: "Langue principale",
    persona_ph_language: "Ex : Fran\u00e7ais",
    persona_lbl_job_title: "Poste / Fonction",
    persona_ph_job_title: "Ex : Enseignante au secondaire",
    persona_lbl_experience: "Ann\u00e9es d\u2019exp\u00e9rience",
    persona_ph_experience: "Ex : 8 ans",
    persona_lbl_tenure: "Anciennet\u00e9 dans le poste actuel",
    persona_ph_tenure: "Ex : 3 ans",

    // Section 3: Work Context
    persona_sec_context: "Contexte de travail",
    persona_desc_context: "Environnement, temps disponible, contraintes et r\u00e9seau.",
    persona_lbl_environment: "Environnement de travail",
    persona_chk_env_office: "Bureau / Poste fixe",
    persona_chk_env_field: "Terrain / D\u00e9placements",
    persona_chk_env_remote: "T\u00e9l\u00e9travail",
    persona_chk_env_hybrid: "Mode hybride",
    persona_chk_env_classroom: "Salle de classe",
    persona_chk_env_lab: "Laboratoire / Atelier",
    persona_lbl_time_available: "Temps disponible pour se former",
    persona_ph_time_available: "Ex : 2 heures par semaine maximum",
    persona_lbl_best_time: "Meilleur moment pour apprendre",
    persona_ph_best_time: "Ex : T\u00f4t le matin, pendant les pauses",
    persona_lbl_barriers: "Barri\u00e8res et contraintes",
    persona_ph_barriers: "Ex : Charge de travail \u00e9lev\u00e9e, pas de remplacement possible",
    persona_lbl_network: "R\u00e9seau et soutien",
    persona_ph_network: "Ex : Coll\u00e8gues proches, mentor informel",

    // Section 4: Learning Preferences
    persona_sec_preferences: "Pr\u00e9f\u00e9rences d\u2019apprentissage",
    persona_desc_preferences: "Attitude, aisance num\u00e9rique, formats pr\u00e9f\u00e9r\u00e9s et autonomie.",
    persona_lbl_attitude: "Attitude face \u00e0 la formation",
    persona_opt_attitude_enthusiastic: "Enthousiaste",
    persona_opt_attitude_open: "Ouvert(e) mais prudent(e)",
    persona_opt_attitude_neutral: "Neutre / Indiff\u00e9rent(e)",
    persona_opt_attitude_reluctant: "R\u00e9ticent(e)",
    persona_opt_attitude_resistant: "R\u00e9sistant(e)",
    persona_lbl_tech_comfort: "Aisance num\u00e9rique",
    persona_opt_tech_expert: "Expert(e)",
    persona_opt_tech_comfortable: "\u00c0 l\u2019aise",
    persona_opt_tech_basic: "Bases acquises",
    persona_opt_tech_beginner: "D\u00e9butant(e)",
    persona_opt_tech_none: "Aucune exp\u00e9rience",
    persona_lbl_format_pref: "Formats pr\u00e9f\u00e9r\u00e9s",
    persona_chk_fmt_micro: "Micro-learning (5\u201310 min)",
    persona_chk_fmt_video: "Vid\u00e9os",
    persona_chk_fmt_reading: "Lectures / Documents",
    persona_chk_fmt_workshop: "Ateliers pratiques",
    persona_chk_fmt_peer: "Apprentissage entre pairs",
    persona_chk_fmt_coaching: "Coaching / Mentorat",
    persona_chk_fmt_elearning: "E-learning (modules en ligne)",
    persona_chk_fmt_mobile: "Mobile Learning",
    persona_lbl_autonomy: "Niveau d\u2019autonomie",
    persona_opt_autonomy_high: "\u00c9lev\u00e9 \u2014 Pr\u00e9f\u00e8re explorer seul(e)",
    persona_opt_autonomy_medium: "Moyen \u2014 Aime \u00eatre guid\u00e9(e) ponctuellement",
    persona_opt_autonomy_low: "Faible \u2014 A besoin d\u2019un accompagnement structur\u00e9",

    // Section 5: Performance Gaps & Motivation
    persona_sec_performance: "\u00c9carts de performance & Motivation",
    persona_desc_performance: "Niveau actuel, freins au changement, b\u00e9n\u00e9fices attendus et crit\u00e8res de r\u00e9ussite.",
    persona_lbl_skill_level: "Niveau de comp\u00e9tence actuel",
    persona_ph_skill_level: "Ex : Connait les bases mais n\u2019applique pas syst\u00e9matiquement",
    persona_lbl_change_barriers: "Freins au changement",
    persona_ph_change_barriers: "Ex : Habitudes ancr\u00e9es, peur de l\u2019\u00e9chec, manque de confiance",
    persona_lbl_wiifm: "B\u00e9n\u00e9fices attendus (WIIFM \u2014 What\u2019s In It For Me?)",
    persona_ph_wiifm: "Ex : Gagner du temps, \u00eatre plus efficace, mieux g\u00e9rer les situations difficiles",
    persona_lbl_success_criteria: "Crit\u00e8res de r\u00e9ussite",
    persona_ph_success_criteria: "Ex : Peut appliquer la technique X dans son contexte quotidien",

    // Section 6: Learning Moments
    persona_sec_moments: "Moments d\u2019apprentissage",
    persona_desc_moments: "Quand et comment le persona peut apprendre.",
    persona_lbl_moments: "Types de moments",
    persona_chk_mom_formal: "Formel (formation organis\u00e9e, cours)",
    persona_chk_mom_informal: "Informel (recherche personnelle, essais)",
    persona_chk_mom_social: "Social (entre pairs, communaut\u00e9s)",
    persona_chk_mom_onthejob: "Sur le terrain (pendant le travail)",
    persona_chk_mom_reflection: "R\u00e9flexif (bilan, journal de bord)",
    persona_chk_mom_selfpaced: "Auto-rythm\u00e9 (hors horaires de travail)",
    persona_lbl_moment_notes: "Notes de contexte",
    persona_ph_moment_notes: "Ex : Pr\u00e9f\u00e8re apprendre le soir apr\u00e8s 20h, forme de courtes sessions sur mobile",

    // Footer
    persona_footer: "D\u00e9velopp\u00e9 par Florent Michelot, inspir\u00e9 des travaux de Fran\u00e7ois Jourde & Jacques Dubois (2026) \u2022 CC BY-SA<br>Code original disponible sur <a href=\"https://github.com/jourde/artefacts\" target=\"_blank\" style=\"color: inherit;\">https://github.com/jourde/artefacts</a>",

    // Help modal
    persona_help_title: "Guide m\u00e9thodologique",
    persona_help_body: "<p><strong>1. Qu\u2019est-ce qu\u2019un persona ?</strong><br>Un persona est un profil fictif mais r\u00e9aliste repr\u00e9sentant un segment de votre public cible. Il synth\u00e9tise des donn\u00e9es issues d\u2019observations, d\u2019entretiens ou d\u2019analyses pour guider la conception de formations adapt\u00e9es.</p><p><strong>2. Combien de personas cr\u00e9er ?</strong><br>En g\u00e9n\u00e9ral, 3 \u00e0 5 personas suffisent pour couvrir la diversit\u00e9 de votre public. Un seul persona risque de trop g\u00e9n\u00e9raliser; au-del\u00e0 de 7, la complexit\u00e9 devient difficile \u00e0 g\u00e9rer.</p><p><strong>3. Les 6 sections essentielles</strong><br><ul><li><strong>Identit\u00e9 & Image :</strong> Nom, avatar et citation cl\u00e9.</li><li><strong>D\u00e9mographie :</strong> \u00c2ge, genre, formation, poste.</li><li><strong>Contexte de travail :</strong> Environnement, temps, contraintes.</li><li><strong>Pr\u00e9f\u00e9rences :</strong> Attitude, aisance num\u00e9rique, formats.</li><li><strong>\u00c9carts & Motivation :</strong> Niveau, freins, b\u00e9n\u00e9fices.</li><li><strong>Moments d\u2019apprentissage :</strong> Quand et comment.</li></ul></p><p><strong>4. Utilisation</strong><br>Remplissez chaque section par persona, naviguez entre les onglets, puis exportez en JSON ou Markdown.</p>",

    // About modal
    persona_about_title: "\u00c0 propos",
    persona_about_text: "Cet outil permet de cr\u00e9er et g\u00e9rer plusieurs personas afin de concevoir des formations adapt\u00e9es aux diff\u00e9rents profils d\u2019apprenants.",
    persona_about_prototype: "Ce document est un prototype non officiel, partag\u00e9 \u00e0 des fins d\u2019exp\u00e9rimentation.",
    persona_about_privacy: "<strong>Traitement local :</strong> toutes les donn\u00e9es restent sur votre navigateur, rien n\u2019est envoy\u00e9 en ligne.",
    persona_about_credits: "D\u00e9velopp\u00e9 par Florent Michelot, inspir\u00e9 des travaux de F. Jourde & J. Dubois (2026) \u2022 CC BY-SA",

    // Dynamic JS strings
    persona_error_file_read: "Erreur lors de la lecture du fichier : ",
    persona_autosave_restore: "Des donn\u00e9es sauvegard\u00e9es automatiquement ont \u00e9t\u00e9 trouv\u00e9es. Voulez-vous les restaurer ?",
    persona_md_title: "Fiches Personas",
    persona_md_date: "Date",
    persona_md_section: "Section"
};

// ── State ────────────────────────────────────────────────────────────────────
var state = {
    count: 3,
    activeTab: 0,
    personas: []
};

function createEmptyPersona(index) {
    return {
        name: '', avatar: '', quote: '',
        age: '', gender: '', education: '', language: '', jobTitle: '', experience: '', tenure: '',
        env_office: false, env_field: false, env_remote: false, env_hybrid: false, env_classroom: false, env_lab: false,
        timeAvailable: '', bestTime: '', barriers: '', network: '',
        attitude: '', techComfort: '',
        fmt_micro: false, fmt_video: false, fmt_reading: false, fmt_workshop: false,
        fmt_peer: false, fmt_coaching: false, fmt_elearning: false, fmt_mobile: false,
        autonomy: '',
        skillLevel: '', changeBarriers: '', wiifm: '', successCriteria: '',
        mom_formal: false, mom_informal: false, mom_social: false, mom_onthejob: false, mom_reflection: false, mom_selfpaced: false,
        momentNotes: ''
    };
}

function initPersonas(count) {
    while (state.personas.length < count) {
        state.personas.push(createEmptyPersona(state.personas.length));
    }
    if (state.personas.length > count) {
        state.personas.length = count;
    }
}

// ── DOM references ───────────────────────────────────────────────────────────
var tabsContainer = document.getElementById('personaTabs');
var formContainer = document.getElementById('personaFormContainer');
var infoModal = document.getElementById('infoModal');
var helpModal = document.getElementById('helpModal');

// ── Tab Rendering ────────────────────────────────────────────────────────────
function renderTabs() {
    var html = '';
    for (var i = 0; i < state.count; i++) {
        var label = state.personas[i] && state.personas[i].name
            ? state.personas[i].name
            : i18nCore.t('persona_tab_label') + ' ' + (i + 1);
        var active = i === state.activeTab ? ' active' : '';
        html += '<button class="persona-tab' + active + '" data-index="' + i + '" onclick="switchTab(' + i + ')">' + escapeHtml(label) + '</button>';
    }
    tabsContainer.innerHTML = html;
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ── Form Rendering ───────────────────────────────────────────────────────────
function renderPersonaForm(index) {
    var p = state.personas[index];
    if (!p) return;

    var t = function (key) { return i18nCore.t(key); };

    var html = '<div class="canvas-grid">';

    // Section 1: Identity & Image
    html += '<div class="card">';
    html += '<h2><span class="material-icons">badge</span> <span data-i18n="persona_sec_identity">' + t('persona_sec_identity') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_identity">' + t('persona_desc_identity') + '</div>';
    html += formGroup('persona_lbl_name', 'persona_ph_name', 'name', p.name, 'text');
    html += formGroup('persona_lbl_avatar', 'persona_ph_avatar', 'avatar', p.avatar, 'text');
    html += formGroupTextarea('persona_lbl_quote', 'persona_ph_quote', 'quote', p.quote);
    html += '</div>';

    // Section 2: Demographics
    html += '<div class="card">';
    html += '<h2><span class="material-icons">people</span> <span data-i18n="persona_sec_demographics">' + t('persona_sec_demographics') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_demographics">' + t('persona_desc_demographics') + '</div>';
    html += formGroup('persona_lbl_age', 'persona_ph_age', 'age', p.age, 'text');
    html += formSelect('persona_lbl_gender', 'gender', p.gender, [
        { value: '', key: 'persona_opt_select' },
        { value: 'F', key: 'persona_opt_gender_f' },
        { value: 'M', key: 'persona_opt_gender_m' },
        { value: 'NB', key: 'persona_opt_gender_nb' },
        { value: 'Other', key: 'persona_opt_gender_other' }
    ]);
    html += formGroup('persona_lbl_education', 'persona_ph_education', 'education', p.education, 'text');
    html += formGroup('persona_lbl_language', 'persona_ph_language', 'language', p.language, 'text');
    html += formGroup('persona_lbl_job_title', 'persona_ph_job_title', 'jobTitle', p.jobTitle, 'text');
    html += formGroup('persona_lbl_experience', 'persona_ph_experience', 'experience', p.experience, 'text');
    html += formGroup('persona_lbl_tenure', 'persona_ph_tenure', 'tenure', p.tenure, 'text');
    html += '</div>';

    // Section 3: Work Context
    html += '<div class="card">';
    html += '<h2><span class="material-icons">place</span> <span data-i18n="persona_sec_context">' + t('persona_sec_context') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_context">' + t('persona_desc_context') + '</div>';
    html += '<div class="form-group">';
    html += '<label data-i18n="persona_lbl_environment">' + t('persona_lbl_environment') + '</label>';
    html += '<div class="checkbox-group">';
    html += checkbox('env_office', 'persona_chk_env_office', p.env_office);
    html += checkbox('env_field', 'persona_chk_env_field', p.env_field);
    html += checkbox('env_remote', 'persona_chk_env_remote', p.env_remote);
    html += checkbox('env_hybrid', 'persona_chk_env_hybrid', p.env_hybrid);
    html += checkbox('env_classroom', 'persona_chk_env_classroom', p.env_classroom);
    html += checkbox('env_lab', 'persona_chk_env_lab', p.env_lab);
    html += '</div></div>';
    html += formGroupTextarea('persona_lbl_time_available', 'persona_ph_time_available', 'timeAvailable', p.timeAvailable);
    html += formGroupTextarea('persona_lbl_best_time', 'persona_ph_best_time', 'bestTime', p.bestTime);
    html += formGroupTextarea('persona_lbl_barriers', 'persona_ph_barriers', 'barriers', p.barriers);
    html += formGroupTextarea('persona_lbl_network', 'persona_ph_network', 'network', p.network);
    html += '</div>';

    // Section 4: Learning Preferences
    html += '<div class="card">';
    html += '<h2><span class="material-icons">school</span> <span data-i18n="persona_sec_preferences">' + t('persona_sec_preferences') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_preferences">' + t('persona_desc_preferences') + '</div>';
    html += formSelect('persona_lbl_attitude', 'attitude', p.attitude, [
        { value: '', key: 'persona_opt_select' },
        { value: 'enthusiastic', key: 'persona_opt_attitude_enthusiastic' },
        { value: 'open', key: 'persona_opt_attitude_open' },
        { value: 'neutral', key: 'persona_opt_attitude_neutral' },
        { value: 'reluctant', key: 'persona_opt_attitude_reluctant' },
        { value: 'resistant', key: 'persona_opt_attitude_resistant' }
    ]);
    html += formSelect('persona_lbl_tech_comfort', 'techComfort', p.techComfort, [
        { value: '', key: 'persona_opt_select' },
        { value: 'expert', key: 'persona_opt_tech_expert' },
        { value: 'comfortable', key: 'persona_opt_tech_comfortable' },
        { value: 'basic', key: 'persona_opt_tech_basic' },
        { value: 'beginner', key: 'persona_opt_tech_beginner' },
        { value: 'none', key: 'persona_opt_tech_none' }
    ]);
    html += '<div class="form-group">';
    html += '<label data-i18n="persona_lbl_format_pref">' + t('persona_lbl_format_pref') + '</label>';
    html += '<div class="checkbox-group">';
    html += checkbox('fmt_micro', 'persona_chk_fmt_micro', p.fmt_micro);
    html += checkbox('fmt_video', 'persona_chk_fmt_video', p.fmt_video);
    html += checkbox('fmt_reading', 'persona_chk_fmt_reading', p.fmt_reading);
    html += checkbox('fmt_workshop', 'persona_chk_fmt_workshop', p.fmt_workshop);
    html += checkbox('fmt_peer', 'persona_chk_fmt_peer', p.fmt_peer);
    html += checkbox('fmt_coaching', 'persona_chk_fmt_coaching', p.fmt_coaching);
    html += checkbox('fmt_elearning', 'persona_chk_fmt_elearning', p.fmt_elearning);
    html += checkbox('fmt_mobile', 'persona_chk_fmt_mobile', p.fmt_mobile);
    html += '</div></div>';
    html += formSelect('persona_lbl_autonomy', 'autonomy', p.autonomy, [
        { value: '', key: 'persona_opt_select' },
        { value: 'high', key: 'persona_opt_autonomy_high' },
        { value: 'medium', key: 'persona_opt_autonomy_medium' },
        { value: 'low', key: 'persona_opt_autonomy_low' }
    ]);
    html += '</div>';

    // Section 5: Performance Gaps & Motivation
    html += '<div class="card">';
    html += '<h2><span class="material-icons">trending_up</span> <span data-i18n="persona_sec_performance">' + t('persona_sec_performance') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_performance">' + t('persona_desc_performance') + '</div>';
    html += formGroupTextarea('persona_lbl_skill_level', 'persona_ph_skill_level', 'skillLevel', p.skillLevel);
    html += formGroupTextarea('persona_lbl_change_barriers', 'persona_ph_change_barriers', 'changeBarriers', p.changeBarriers);
    html += formGroupTextarea('persona_lbl_wiifm', 'persona_ph_wiifm', 'wiifm', p.wiifm);
    html += formGroupTextarea('persona_lbl_success_criteria', 'persona_ph_success_criteria', 'successCriteria', p.successCriteria);
    html += '</div>';

    // Section 6: Learning Moments
    html += '<div class="card">';
    html += '<h2><span class="material-icons">schedule</span> <span data-i18n="persona_sec_moments">' + t('persona_sec_moments') + '</span></h2>';
    html += '<div class="card-desc" data-i18n="persona_desc_moments">' + t('persona_desc_moments') + '</div>';
    html += '<div class="form-group">';
    html += '<label data-i18n="persona_lbl_moments">' + t('persona_lbl_moments') + '</label>';
    html += '<div class="checkbox-group">';
    html += checkbox('mom_formal', 'persona_chk_mom_formal', p.mom_formal);
    html += checkbox('mom_informal', 'persona_chk_mom_informal', p.mom_informal);
    html += checkbox('mom_social', 'persona_chk_mom_social', p.mom_social);
    html += checkbox('mom_onthejob', 'persona_chk_mom_onthejob', p.mom_onthejob);
    html += checkbox('mom_reflection', 'persona_chk_mom_reflection', p.mom_reflection);
    html += checkbox('mom_selfpaced', 'persona_chk_mom_selfpaced', p.mom_selfpaced);
    html += '</div></div>';
    html += formGroupTextarea('persona_lbl_moment_notes', 'persona_ph_moment_notes', 'momentNotes', p.momentNotes);
    html += '</div>';

    html += '</div>'; // close canvas-grid

    formContainer.innerHTML = html;
    i18nCore.applyTranslations(formContainer);
}

// ── Form helpers ─────────────────────────────────────────────────────────────
function formGroup(labelKey, phKey, field, value, type) {
    var t = function (k) { return i18nCore.t(k); };
    return '<div class="form-group">'
        + '<label data-i18n="' + labelKey + '">' + t(labelKey) + '</label>'
        + '<input type="' + type + '" data-i18n-placeholder="' + phKey + '" placeholder="' + t(phKey) + '" data-field="' + field + '" value="' + escapeAttr(value) + '" onchange="onFieldChange(this)">'
        + '</div>';
}

function formGroupTextarea(labelKey, phKey, field, value) {
    var t = function (k) { return i18nCore.t(k); };
    return '<div class="form-group">'
        + '<label data-i18n="' + labelKey + '">' + t(labelKey) + '</label>'
        + '<textarea data-i18n-placeholder="' + phKey + '" placeholder="' + t(phKey) + '" data-field="' + field + '" onchange="onFieldChange(this)">' + escapeHtml(value) + '</textarea>'
        + '</div>';
}

function formSelect(labelKey, field, value, options) {
    var t = function (k) { return i18nCore.t(k); };
    var html = '<div class="form-group">'
        + '<label data-i18n="' + labelKey + '">' + t(labelKey) + '</label>'
        + '<select data-field="' + field + '" onchange="onFieldChange(this)">';
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var sel = opt.value === value ? ' selected' : '';
        html += '<option value="' + opt.value + '"' + sel + ' data-i18n="' + opt.key + '">' + t(opt.key) + '</option>';
    }
    html += '</select></div>';
    return html;
}

function checkbox(field, labelKey, checked) {
    var t = function (k) { return i18nCore.t(k); };
    var chk = checked ? ' checked' : '';
    return '<label class="checkbox-item"><input type="checkbox" data-field="' + field + '"' + chk + ' onchange="onFieldChange(this)"> <span data-i18n="' + labelKey + '">' + t(labelKey) + '</span></label>';
}

function escapeAttr(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Data Binding ─────────────────────────────────────────────────────────────
function collectCurrentPersona() {
    var p = state.personas[state.activeTab];
    if (!p) return;

    var fields = formContainer.querySelectorAll('[data-field]');
    fields.forEach(function (el) {
        var field = el.getAttribute('data-field');
        if (el.type === 'checkbox') {
            p[field] = el.checked;
        } else {
            p[field] = el.value;
        }
    });
}

function onFieldChange(el) {
    var field = el.getAttribute('data-field');
    if (!field) return;
    var p = state.personas[state.activeTab];
    if (!p) return;

    if (el.type === 'checkbox') {
        p[field] = el.checked;
    } else {
        p[field] = el.value;
    }

    // Update tab label if name changed
    if (field === 'name') {
        renderTabs();
    }
}

// ── Tab Switching ────────────────────────────────────────────────────────────
function switchTab(index) {
    collectCurrentPersona();
    state.activeTab = index;
    renderTabs();
    renderPersonaForm(index);
}

// ── Count Management ─────────────────────────────────────────────────────────
function changeCount(delta) {
    var input = document.getElementById('personaCount');
    var newVal = state.count + delta;
    if (newVal < 1) newVal = 1;
    if (newVal > 10) newVal = 10;
    updateCount(newVal);
    input.value = newVal;
}

function updateCount(val) {
    var n = parseInt(val, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 10) n = 10;

    collectCurrentPersona();
    state.count = n;
    initPersonas(n);

    if (state.activeTab >= n) {
        state.activeTab = n - 1;
    }

    document.getElementById('personaCount').value = n;
    renderTabs();
    renderPersonaForm(state.activeTab);
}

// ── Save / Load ──────────────────────────────────────────────────────────────
function saveData() {
    collectCurrentPersona();

    var data = {
        version: 1,
        count: state.count,
        activeTab: state.activeTab,
        personas: state.personas
    };

    var jsonStr = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonStr], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = "personas.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadData(input) {
    var file = input.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var data = JSON.parse(e.target.result);
            restoreFromData(data);
        } catch (err) {
            alert(i18nCore.t('persona_error_file_read') + err);
        }
        input.value = '';
    };
    reader.readAsText(file);
}

function restoreFromData(data) {
    if (!data || !data.personas) return;

    state.count = data.count || data.personas.length || 3;
    state.activeTab = data.activeTab || 0;
    state.personas = [];

    for (var i = 0; i < state.count; i++) {
        var base = createEmptyPersona(i);
        if (data.personas[i]) {
            for (var key in data.personas[i]) {
                if (data.personas[i].hasOwnProperty(key)) {
                    base[key] = data.personas[i][key];
                }
            }
        }
        state.personas.push(base);
    }

    if (state.activeTab >= state.count) state.activeTab = 0;
    document.getElementById('personaCount').value = state.count;
    renderTabs();
    renderPersonaForm(state.activeTab);
}

// ── Markdown Export ──────────────────────────────────────────────────────────
function exportMarkdown() {
    collectCurrentPersona();

    var t = function (k) { return i18nCore.t(k); };
    var md = '# ' + t('persona_md_title') + '\n';
    md += '> ' + t('persona_md_date') + ' : ' + new Date().toLocaleDateString() + '\n\n';

    for (var i = 0; i < state.count; i++) {
        var p = state.personas[i];
        var name = p.name || (t('persona_tab_label') + ' ' + (i + 1));
        md += '---\n\n## ' + name + '\n\n';

        // Identity
        if (p.quote) md += '> *' + p.quote + '*\n\n';

        // Demographics
        md += '### ' + t('persona_sec_demographics') + '\n';
        md += mdField(t('persona_lbl_age'), p.age);
        md += mdField(t('persona_lbl_gender'), p.gender ? t('persona_opt_gender_' + genderKeyMap(p.gender)) : '');
        md += mdField(t('persona_lbl_education'), p.education);
        md += mdField(t('persona_lbl_language'), p.language);
        md += mdField(t('persona_lbl_job_title'), p.jobTitle);
        md += mdField(t('persona_lbl_experience'), p.experience);
        md += mdField(t('persona_lbl_tenure'), p.tenure);
        md += '\n';

        // Work Context
        md += '### ' + t('persona_sec_context') + '\n';
        var envItems = collectCheckedLabels(p, 'env_', {
            env_office: 'persona_chk_env_office', env_field: 'persona_chk_env_field',
            env_remote: 'persona_chk_env_remote', env_hybrid: 'persona_chk_env_hybrid',
            env_classroom: 'persona_chk_env_classroom', env_lab: 'persona_chk_env_lab'
        });
        if (envItems.length) md += '- **' + t('persona_lbl_environment') + '** : ' + envItems.join(', ') + '\n';
        md += mdField(t('persona_lbl_time_available'), p.timeAvailable);
        md += mdField(t('persona_lbl_best_time'), p.bestTime);
        md += mdField(t('persona_lbl_barriers'), p.barriers);
        md += mdField(t('persona_lbl_network'), p.network);
        md += '\n';

        // Learning Preferences
        md += '### ' + t('persona_sec_preferences') + '\n';
        md += mdField(t('persona_lbl_attitude'), p.attitude ? t('persona_opt_attitude_' + p.attitude) : '');
        md += mdField(t('persona_lbl_tech_comfort'), p.techComfort ? t('persona_opt_tech_' + p.techComfort) : '');
        var fmtItems = collectCheckedLabels(p, 'fmt_', {
            fmt_micro: 'persona_chk_fmt_micro', fmt_video: 'persona_chk_fmt_video',
            fmt_reading: 'persona_chk_fmt_reading', fmt_workshop: 'persona_chk_fmt_workshop',
            fmt_peer: 'persona_chk_fmt_peer', fmt_coaching: 'persona_chk_fmt_coaching',
            fmt_elearning: 'persona_chk_fmt_elearning', fmt_mobile: 'persona_chk_fmt_mobile'
        });
        if (fmtItems.length) md += '- **' + t('persona_lbl_format_pref') + '** : ' + fmtItems.join(', ') + '\n';
        md += mdField(t('persona_lbl_autonomy'), p.autonomy ? t('persona_opt_autonomy_' + p.autonomy) : '');
        md += '\n';

        // Performance
        md += '### ' + t('persona_sec_performance') + '\n';
        md += mdField(t('persona_lbl_skill_level'), p.skillLevel);
        md += mdField(t('persona_lbl_change_barriers'), p.changeBarriers);
        md += mdField(t('persona_lbl_wiifm'), p.wiifm);
        md += mdField(t('persona_lbl_success_criteria'), p.successCriteria);
        md += '\n';

        // Moments
        md += '### ' + t('persona_sec_moments') + '\n';
        var momItems = collectCheckedLabels(p, 'mom_', {
            mom_formal: 'persona_chk_mom_formal', mom_informal: 'persona_chk_mom_informal',
            mom_social: 'persona_chk_mom_social', mom_onthejob: 'persona_chk_mom_onthejob',
            mom_reflection: 'persona_chk_mom_reflection', mom_selfpaced: 'persona_chk_mom_selfpaced'
        });
        if (momItems.length) {
            md += '- **' + t('persona_lbl_moments') + '** :\n';
            momItems.forEach(function (item) { md += '  - ' + item + '\n'; });
        }
        md += mdField(t('persona_lbl_moment_notes'), p.momentNotes);
        md += '\n';
    }

    var blob = new Blob([md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Personas_' + new Date().toISOString().slice(0, 10) + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function genderKeyMap(val) {
    var map = { 'F': 'f', 'M': 'm', 'NB': 'nb', 'Other': 'other' };
    return map[val] || val;
}

function mdField(label, value) {
    if (!value) return '';
    return '- **' + label + '** : ' + value + '\n';
}

function collectCheckedLabels(p, prefix, mapping) {
    var result = [];
    for (var field in mapping) {
        if (mapping.hasOwnProperty(field) && p[field]) {
            result.push(i18nCore.t(mapping[field]));
        }
    }
    return result;
}

// ── Auto-save ────────────────────────────────────────────────────────────────
var AUTOSAVE_KEY = 'persona_creator_autosave';

function autoSave() {
    collectCurrentPersona();
    try {
        var data = {
            version: 1,
            count: state.count,
            activeTab: state.activeTab,
            personas: state.personas,
            savedAt: Date.now()
        };
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
    } catch (e) {}
}

function tryRestoreAutosave() {
    try {
        var raw = localStorage.getItem(AUTOSAVE_KEY);
        if (!raw) return false;
        var data = JSON.parse(raw);
        if (!data || !data.personas || !data.personas.length) return false;

        var hasContent = data.personas.some(function (p) {
            return p.name || p.quote || p.age || p.jobTitle || p.skillLevel;
        });
        if (!hasContent) return false;

        if (confirm(i18nCore.t('persona_autosave_restore'))) {
            restoreFromData(data);
            return true;
        }
    } catch (e) {}
    return false;
}

setInterval(autoSave, 30000);

// ── Modals ───────────────────────────────────────────────────────────────────
function openInfoModal() { infoModal.style.display = "block"; }
function closeInfoModal() { infoModal.style.display = "none"; }
function openHelpModal() { helpModal.style.display = "block"; }
function closeHelpModal() { helpModal.style.display = "none"; }

window.onclick = function (event) {
    if (event.target == infoModal) infoModal.style.display = "none";
    if (event.target == helpModal) helpModal.style.display = "none";
};

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
i18nCore.init({
    defaultLang: 'fr',
    translations: { 'fr': translations_fr },
    persist: true
});

// Auto-load English Canadian pack
i18nCore.loadLanguagePack('i18n/en-CA.json').then(function (code) {
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

document.title = i18nCore.t('persona_page_title');

// Initialize state and render
initPersonas(state.count);

if (!tryRestoreAutosave()) {
    renderTabs();
    renderPersonaForm(state.activeTab);
}

// Re-render when language changes
document.addEventListener('i18n:langchange', function () {
    document.title = i18nCore.t('persona_page_title');
    syncLangSelector();
    renderTabs();
    renderPersonaForm(state.activeTab);
});
