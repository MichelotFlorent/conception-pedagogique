/**
 * Macrodesign - Strategic Planning Tool
 * Levels: Curriculum > Course > Unit (Program mode)
 *    or: Thème > Séance > Unit (Course mode)
 */

// ── Current Mode ──────────────────────────────────────────────────────────────
let currentMacroMode = 'program'; // 'program' or 'course'

// ── Mode Labels ───────────────────────────────────────────────────────────────
// Programme complet: Cours > Thématique/Module > Séance (3 levels, hours)
// Cours unique: Thématique/Bloc > Séance (2 levels only)
const modeLabels = {
    program: {
        level1_label: 'macro_num_courses_l1',
        level1_icon: 'menu_book',
        level1_placeholder: 'macro_ph_course_l1',
        level2_label: 'macro_num_themes_l2',
        level2_placeholder: 'macro_ph_theme_l2',
        level2_desc_label: 'macro_theme_description',
        level2_desc_placeholder: 'macro_ph_theme_desc',
        level3_label: 'macro_num_sessions_l3',
        level3_placeholder: 'macro_ph_session_l3',
        hint: 'macro_mode_hint_program',
        hasLevel3: true
    },
    course: {
        level1_label: 'macro_num_themes_blocks',
        level1_icon: 'category',
        level1_placeholder: 'macro_ph_theme_block',
        level2_label: 'macro_num_sessions_l2',
        level2_placeholder: 'macro_ph_session_l2',
        level2_desc_label: 'macro_session_description',
        level2_desc_placeholder: 'macro_ph_session_desc',
        hint: 'macro_mode_hint_course',
        hasLevel3: false
    }
};

// ── Switch Mode ───────────────────────────────────────────────────────────────
function switchMacroMode(mode) {
    currentMacroMode = mode;
    const labels = modeLabels[mode];

    console.log('[Macrodesign] Switching mode to:', mode);

    // Update Level 1 control (main page)
    const level1Label = document.getElementById('level1-label');
    const level1Icon = document.getElementById('level1-icon');
    if (level1Label) {
        level1Label.setAttribute('data-i18n', labels.level1_label);
        level1Label.textContent = getTranslation(labels.level1_label);
    }
    if (level1Icon) {
        level1Icon.textContent = labels.level1_icon;
    }

    // Update hint text
    const hintEl = document.getElementById('macro-mode-hint');
    if (hintEl) {
        hintEl.setAttribute('data-i18n', labels.hint);
        hintEl.textContent = getTranslation(labels.hint);
    }

    // Update all existing curriculum cards (level 1)
    document.querySelectorAll('.curriculum-card').forEach(card => {
        applyModeToLevel1Card(card);
    });

    // Update all existing course cards (level 2)
    document.querySelectorAll('.course-card').forEach(card => {
        applyModeToLevel2Card(card);
    });

    console.log('[Macrodesign] Mode switched to:', mode);
}

// Apply current mode labels to a Level 1 card (Cours/Thématique-Bloc)
function applyModeToLevel1Card(card) {
    const labels = modeLabels[currentMacroMode];

    // Update title placeholder
    const titleInput = card.querySelector('.curriculum-title');
    if (titleInput) {
        titleInput.setAttribute('data-i18n-placeholder', labels.level1_placeholder);
        titleInput.placeholder = getTranslation(labels.level1_placeholder);
    }

    // Update the Level 2 control label inside this card
    const level2ControlLabel = card.querySelector('.level2-control-label');
    if (level2ControlLabel) {
        level2ControlLabel.setAttribute('data-i18n', labels.level2_label);
        level2ControlLabel.textContent = getTranslation(labels.level2_label);
    }
}

// Apply current mode labels to a Level 2 card (Thématique/Module or Séance)
function applyModeToLevel2Card(card) {
    const labels = modeLabels[currentMacroMode];

    // Update title placeholder
    const titleInput = card.querySelector('.course-title');
    if (titleInput) {
        titleInput.setAttribute('data-i18n-placeholder', labels.level2_placeholder);
        titleInput.placeholder = getTranslation(labels.level2_placeholder);
    }

    // Update description label
    const descLabel = card.querySelector('.level2-desc-label');
    if (descLabel) {
        descLabel.setAttribute('data-i18n', labels.level2_desc_label);
        descLabel.textContent = getTranslation(labels.level2_desc_label);
    }

    // Update description placeholder
    const descTextarea = card.querySelector('.course-description');
    if (descTextarea) {
        descTextarea.setAttribute('data-i18n-placeholder', labels.level2_desc_placeholder);
        descTextarea.placeholder = getTranslation(labels.level2_desc_placeholder);
    }

    // Show/hide Level 3 controls based on mode
    const unitsControl = card.querySelector('.units-control');
    const unitsContainer = card.querySelector('.units-container');
    if (labels.hasLevel3) {
        // Program mode: show Level 3 (Séances)
        if (unitsControl) unitsControl.style.display = '';
        if (unitsContainer) unitsContainer.style.display = '';
    } else {
        // Course mode: hide Level 3 (only 2 levels)
        if (unitsControl) unitsControl.style.display = 'none';
        if (unitsContainer) unitsContainer.style.display = 'none';
    }
}

// Helper function to get translation
function getTranslation(key) {
    if (typeof i18nCore !== 'undefined' && i18nCore.translations[i18nCore.currentLang]) {
        const trans = i18nCore.translations[i18nCore.currentLang].translations || i18nCore.translations[i18nCore.currentLang];
        if (trans[key]) return trans[key];
    }
    // Fallback French labels
    const fallbacks = {
        // Programme complet mode (3 levels)
        'macro_num_courses_l1': 'nombre de cours',
        'macro_ph_course_l1': 'Titre du cours (ex: Introduction à la pédagogie)',
        'macro_num_themes_l2': 'nombre de thématiques/modules',
        'macro_ph_theme_l2': 'Titre de la thématique/module',
        'macro_theme_description': 'description de la thématique',
        'macro_ph_theme_desc': 'Objectifs et contenu de la thématique...',
        'macro_num_sessions_l3': 'nombre de séances',
        'macro_ph_session_l3': 'Titre de la séance (ex: Séance 1 - Introduction)',
        'macro_ph_session_desc': 'Objectifs de la séance...',
        'macro_mode_hint_program': 'Structure : Cours → Thématique/Module → Séance (durées en heures)',

        // Cours unique mode (2 levels)
        'macro_num_themes_blocks': 'nombre de thématiques/blocs',
        'macro_ph_theme_block': 'Titre de la thématique/bloc de cours',
        'macro_num_sessions_l2': 'nombre de séances',
        'macro_ph_session_l2': 'Titre de la séance de cours',
        'macro_session_description': 'description de la séance',
        'macro_mode_hint_course': 'Structure : Thématique/Bloc → Séance (2 niveaux)',

        // Legacy fallbacks
        'macro_num_curriculums': 'nombre de cours',
        'macro_num_themes': 'nombre de thématiques',
        'macro_num_courses': 'nombre de thématiques/modules',
        'macro_num_sessions': 'nombre de séances',
        'macro_course_description': 'description de la thématique',
        'unit_hours_short': 'h'
    };
    return fallbacks[key] || key;
}

// ── Taxonomies Cache ──────────────────────────────────────────────────────────
let taxonomies = {
    cognitive: null,
    affective: null,
    psychomotor: null
};

// ── Default Taxonomies (fallback if JSON files not found) ────────────────────
const defaultTaxonomies = {
    cognitive: {
        name_fr: 'Cognitif (Bloom)',
        name_en: 'Cognitive (Bloom)',
        levels: [
            { level: 1, name_fr: 'Se rappeler', name_en: 'Remember', verbs_fr: ['citer', 'définir', 'décrire', 'identifier', 'lister', 'nommer', 'réciter', 'reconnaître'], verbs_en: ['cite', 'define', 'describe', 'identify', 'list', 'name', 'recite', 'recognize'] },
            { level: 2, name_fr: 'Comprendre', name_en: 'Understand', verbs_fr: ['expliquer', 'interpréter', 'résumer', 'classifier', 'comparer', 'illustrer', 'paraphraser'], verbs_en: ['explain', 'interpret', 'summarize', 'classify', 'compare', 'illustrate', 'paraphrase'] },
            { level: 3, name_fr: 'Appliquer', name_en: 'Apply', verbs_fr: ['appliquer', 'démontrer', 'exécuter', 'implémenter', 'résoudre', 'utiliser', 'calculer'], verbs_en: ['apply', 'demonstrate', 'execute', 'implement', 'solve', 'use', 'calculate'] },
            { level: 4, name_fr: 'Analyser', name_en: 'Analyze', verbs_fr: ['analyser', 'différencier', 'organiser', 'attribuer', 'comparer', 'déconstruire', 'examiner'], verbs_en: ['analyze', 'differentiate', 'organize', 'attribute', 'compare', 'deconstruct', 'examine'] },
            { level: 5, name_fr: 'Évaluer', name_en: 'Evaluate', verbs_fr: ['évaluer', 'critiquer', 'juger', 'justifier', 'argumenter', 'défendre', 'vérifier'], verbs_en: ['evaluate', 'critique', 'judge', 'justify', 'argue', 'defend', 'verify'] },
            { level: 6, name_fr: 'Créer', name_en: 'Create', verbs_fr: ['créer', 'concevoir', 'planifier', 'produire', 'inventer', 'composer', 'formuler'], verbs_en: ['create', 'design', 'plan', 'produce', 'invent', 'compose', 'formulate'] }
        ]
    },
    affective: {
        name_fr: 'Affectif',
        name_en: 'Affective',
        levels: [
            { level: 1, name_fr: 'Réception', name_en: 'Receiving', verbs_fr: ['écouter', 'percevoir', 'être attentif', 'accepter', 'reconnaître'], verbs_en: ['listen', 'perceive', 'attend', 'accept', 'acknowledge'] },
            { level: 2, name_fr: 'Valorisation', name_en: 'Valuing', verbs_fr: ['apprécier', 'valoriser', 'respecter', 'préférer', 'adhérer'], verbs_en: ['appreciate', 'value', 'respect', 'prefer', 'commit'] },
            { level: 3, name_fr: 'Adoption', name_en: 'Characterization', verbs_fr: ['adopter', 'intégrer', 'incarner', 'pratiquer', 'défendre'], verbs_en: ['adopt', 'integrate', 'embody', 'practice', 'advocate'] }
        ]
    },
    psychomotor: {
        name_fr: 'Psychomoteur',
        name_en: 'Psychomotor',
        levels: [
            { level: 1, name_fr: 'Perception', name_en: 'Perception', verbs_fr: ['observer', 'percevoir', 'distinguer', 'identifier', 'reconnaître'], verbs_en: ['observe', 'perceive', 'distinguish', 'identify', 'recognize'] },
            { level: 2, name_fr: 'Reproduction', name_en: 'Guided Response', verbs_fr: ['reproduire', 'imiter', 'copier', 'suivre', 'répéter'], verbs_en: ['reproduce', 'imitate', 'copy', 'follow', 'repeat'] },
            { level: 3, name_fr: 'Perfection', name_en: 'Complex Response', verbs_fr: ['perfectionner', 'maîtriser', 'exécuter', 'coordonner', 'automatiser'], verbs_en: ['perfect', 'master', 'execute', 'coordinate', 'automate'] }
        ]
    }
};

// ── Load Taxonomies ───────────────────────────────────────────────────────────
async function loadTaxonomies() {
    try {
        const [cognitive, affective, psychomotor] = await Promise.all([
            fetch('taxonomies/bloom_cognitive.json').then(r => r.json()),
            fetch('taxonomies/affective.json').then(r => r.json()),
            fetch('taxonomies/psychomotor.json').then(r => r.json())
        ]);
        taxonomies.cognitive = cognitive;
        taxonomies.affective = affective;
        taxonomies.psychomotor = psychomotor;
        console.log('[Macrodesign] Taxonomies loaded from files');
    } catch (e) {
        console.warn('[Macrodesign] Could not load taxonomies from files, using defaults:', e);
        // Use default taxonomies as fallback
        taxonomies.cognitive = defaultTaxonomies.cognitive;
        taxonomies.affective = defaultTaxonomies.affective;
        taxonomies.psychomotor = defaultTaxonomies.psychomotor;
        console.log('[Macrodesign] Using default taxonomies');
    }
}

// ── Templates ─────────────────────────────────────────────────────────────────
function getCurriculumTemplate() {
    return document.getElementById('curriculum-template');
}
function getCourseTemplate() {
    return document.getElementById('course-template');
}
function getUnitTemplate() {
    return document.getElementById('unit-template');
}
function getObjectiveTemplate() {
    return document.getElementById('objective-template');
}

// ── Curriculum Management ─────────────────────────────────────────────────────
function syncCurriculums(count) {
    const container = document.getElementById('curriculums-container');
    if (!container) return;

    count = Math.max(1, Math.min(10, count));
    const current = container.querySelectorAll('.curriculum-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const curriculum = createCurriculum();
            if (curriculum) {
                // Create default courses
                const numCoursesInput = curriculum.querySelector('.num-courses');
                const numCourses = numCoursesInput ? parseInt(numCoursesInput.value) || 2 : 2;
                syncCourses(curriculum, numCourses);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateAllIndexes();
}

function createCurriculum() {
    const container = document.getElementById('curriculums-container');
    const template = getCurriculumTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    const newCard = container.lastElementChild;

    // Apply current mode labels to the new card
    if (newCard) {
        applyModeToLevel1Card(newCard);
    }

    return newCard;
}

function deleteCurriculum(btn) {
    const curriculum = btn.closest('.curriculum-card');
    if (!curriculum) return;

    const container = document.getElementById('curriculums-container');
    const count = container.querySelectorAll('.curriculum-card').length;
    if (count <= 1) {
        alert('Vous devez conserver au moins un curriculum.');
        return;
    }

    curriculum.remove();
    const input = document.getElementById('num-curriculums');
    if (input) input.value = count - 1;
    updateAllIndexes();
}

function toggleCurriculum(btn) {
    const curriculum = btn.closest('.curriculum-card');
    const body = curriculum.querySelector('.curriculum-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

function macroCurriculumInc() {
    const input = document.getElementById('num-curriculums');
    const val = parseInt(input.value) || 1;
    if (val < 10) {
        input.value = val + 1;
        syncCurriculums(val + 1);
    }
}

function macroCurriculumDec() {
    const input = document.getElementById('num-curriculums');
    const val = parseInt(input.value) || 1;
    if (val > 1) {
        input.value = val - 1;
        syncCurriculums(val - 1);
    }
}

// ── Course Management ─────────────────────────────────────────────────────────
function syncCourses(curriculumEl, count) {
    const container = curriculumEl.querySelector('.courses-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.course-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const course = createCourse(curriculumEl);
            if (course) {
                // Create default units
                const numUnitsInput = course.querySelector('.num-units');
                const numUnits = numUnitsInput ? parseInt(numUnitsInput.value) || 3 : 3;
                syncUnits(course, numUnits);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateAllIndexes();
}

function createCourse(curriculumEl) {
    const container = curriculumEl.querySelector('.courses-container');
    const template = getCourseTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    const newCard = container.lastElementChild;

    // Apply current mode labels to the new card
    if (newCard) {
        applyModeToLevel2Card(newCard);
    }

    return newCard;
}

function deleteCourse(btn) {
    const course = btn.closest('.course-card');
    const curriculum = btn.closest('.curriculum-card');
    if (!course || !curriculum) return;

    course.remove();
    const input = curriculum.querySelector('.num-courses');
    const count = curriculum.querySelectorAll('.course-card').length;
    if (input) input.value = count;
    updateAllIndexes();
}

function toggleCourse(btn) {
    const course = btn.closest('.course-card');
    const body = course.querySelector('.course-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

function macroCourseInc(btn) {
    const curriculum = btn.closest('.curriculum-card');
    const input = curriculum.querySelector('.num-courses');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncCourses(curriculum, val + 1);
    }
}

function macroCourseDec(btn) {
    const curriculum = btn.closest('.curriculum-card');
    const input = curriculum.querySelector('.num-courses');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncCourses(curriculum, val - 1);
    }
}

// ── Unit Management ───────────────────────────────────────────────────────────
function syncUnits(courseEl, count) {
    const container = courseEl.querySelector('.units-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.unit-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            createUnit(courseEl);
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateAllIndexes();
}

function createUnit(courseEl) {
    const container = courseEl.querySelector('.units-container');
    const template = getUnitTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteUnit(btn) {
    const unit = btn.closest('.unit-card');
    const course = btn.closest('.course-card');
    if (!unit || !course) return;

    unit.remove();
    const input = course.querySelector('.num-units');
    const count = course.querySelectorAll('.unit-card').length;
    if (input) input.value = count;
    updateAllIndexes();
}

function macroUnitInc(btn) {
    const course = btn.closest('.course-card');
    const input = course.querySelector('.num-units');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncUnits(course, val + 1);
    }
}

function macroUnitDec(btn) {
    const course = btn.closest('.course-card');
    const input = course.querySelector('.num-units');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncUnits(course, val - 1);
    }
}

// ── Objectives Management ─────────────────────────────────────────────────────
function addObjective(btn, type) {
    const container = btn.previousElementSibling;
    const template = getObjectiveTemplate();
    if (!container || !template) return;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updateAlignmentScore();
}

function deleteObjective(btn) {
    const objective = btn.closest('.objective-item');
    if (objective) objective.remove();
    updateAlignmentScore();
}

function updateTaxonomyLevels(select) {
    const objectiveItem = select.closest('.objective-item');
    const levelSelect = objectiveItem.querySelector('.level-select');
    const verbsDisplay = objectiveItem.querySelector('.verbs-display');

    levelSelect.innerHTML = '<option value="">-- niveau --</option>';
    verbsDisplay.classList.add('hidden');

    const domain = select.value;
    if (!domain || !taxonomies[domain]) return;

    const lang = (typeof i18nCore !== 'undefined' && i18nCore.currentLang === 'en-CA') ? 'en' : 'fr';
    const taxonomy = taxonomies[domain];

    taxonomy.levels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.level;
        option.textContent = lang === 'en' ? level.name_en : level.name_fr;
        option.dataset.definition = lang === 'en' ? level.definition_en : level.definition_fr;
        levelSelect.appendChild(option);
    });
}

function showVerbsForLevel(select) {
    const objectiveItem = select.closest('.objective-item');
    const taxonomySelect = objectiveItem.querySelector('.taxonomy-select');
    const verbsDisplay = objectiveItem.querySelector('.verbs-display');
    const verbsList = verbsDisplay.querySelector('.verbs-list');

    const domain = taxonomySelect.value;
    const levelNum = parseInt(select.value);

    if (!domain || !levelNum || !taxonomies[domain]) {
        verbsDisplay.classList.add('hidden');
        return;
    }

    const lang = (typeof i18nCore !== 'undefined' && i18nCore.currentLang === 'en-CA') ? 'en' : 'fr';
    const taxonomy = taxonomies[domain];
    const level = taxonomy.levels.find(l => l.level === levelNum);

    if (level) {
        const verbs = lang === 'en' ? level.verbs_en : level.verbs_fr;
        verbsList.textContent = verbs.slice(0, 10).join(', ') + '...';
        verbsDisplay.classList.remove('hidden');
    }
}

// ── Beta Features: Training Percentage ────────────────────────────────────────
function updateTrainingPct(value) {
    const display = document.getElementById('macro-training-pct-display');
    if (display) {
        display.textContent = value + '%';
    }
}

// ── Beta Features: Reverse Engineering Modal ──────────────────────────────────
function openReverseEngineeringModal() {
    const modal = document.getElementById('reverse-engineering-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeReverseEngineeringModal() {
    const modal = document.getElementById('reverse-engineering-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function applyReverseEngineering() {
    const assessment = document.getElementById('reverse-final-assessment')?.value || '';
    const objectives = document.getElementById('reverse-required-objectives')?.value || '';

    if (!assessment && !objectives) {
        alert('Veuillez remplir au moins un champ.');
        return;
    }

    // Add objectives to the first curriculum if exists
    const firstCurriculum = document.querySelector('.curriculum-card');
    if (firstCurriculum) {
        const objContainer = firstCurriculum.querySelector('.curriculum-objectives');
        const template = getObjectiveTemplate();

        if (objContainer && template) {
            // Add assessment-derived objective
            const clone = template.content.cloneNode(true);
            objContainer.appendChild(clone);
            const newObj = objContainer.lastElementChild;
            const textArea = newObj.querySelector('.objective-text');
            if (textArea) {
                textArea.value = `[Évaluation] ${assessment}\n[Objectifs requis] ${objectives}`;
            }
        }
    }

    closeReverseEngineeringModal();
}

// ── Beta Features: Unit Duration Buffer (hours) ────────────────────────────────
function updateUnitBuffer(input) {
    const duration = parseFloat(input.value) || 0;
    const bufferPct = 0.12; // 12% buffer
    const buffer = Math.round(duration * bufferPct * 10) / 10; // Round to 1 decimal

    const unitCard = input.closest('.unit-card');
    if (unitCard) {
        const bufferDisplay = unitCard.querySelector('.unit-buffer');
        if (bufferDisplay) {
            bufferDisplay.textContent = `(+${buffer})`;
            bufferDisplay.title = `Tampon ${Math.round(bufferPct * 100)}% : ${duration}h + ${buffer}h = ${duration + buffer}h`;
        }
    }
}

// ── Alignment Score (removed - kept for compatibility) ─────────────────────────
function updateAlignmentScore() {
    // Function kept for compatibility but alignment score UI removed
}

// ── Index Management ──────────────────────────────────────────────────────────
function updateAllIndexes() {
    const container = document.getElementById('curriculums-container');
    if (!container) return;

    const curriculums = container.querySelectorAll('.curriculum-card');
    curriculums.forEach((curriculum, cIdx) => {
        const cNum = cIdx + 1;
        const cIndex = curriculum.querySelector('.curriculum-index');
        if (cIndex) cIndex.textContent = cNum;

        const courses = curriculum.querySelectorAll('.course-card');
        courses.forEach((course, coIdx) => {
            const coNum = coIdx + 1;
            const coIndex = course.querySelector('.course-index');
            if (coIndex) coIndex.textContent = `${cNum}.${coNum}`;

            const units = course.querySelectorAll('.unit-card');
            units.forEach((unit, uIdx) => {
                const uNum = uIdx + 1;
                const uIndex = unit.querySelector('.unit-index');
                if (uIndex) uIndex.textContent = `${cNum}.${coNum}.${uNum}`;
            });
        });
    });
}

// ── Save/Load ─────────────────────────────────────────────────────────────────
function macroSaveState() {
    const data = collectMacroData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'macrodesign_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function macroLoadState() {
    document.getElementById('macro-load-input').click();
}

function macroLoadFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            restoreMacroData(data);
        } catch (err) {
            alert('Erreur lors du chargement du fichier.');
            console.error(err);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function collectMacroData() {
    // Collect beta strategic sections
    const betaData = {
        kpiLink: document.getElementById('macro-kpi-link')?.value || '',
        smartGoal: document.getElementById('macro-smart-goal')?.value || '',
        trainingPct: document.getElementById('macro-training-pct')?.value || '100',
        sequencingPrinciple: document.getElementById('macro-sequencing-principle')?.value || '',
        epitome: document.getElementById('macro-epitome')?.value || '',
        spiralProgression: document.querySelector('input[name="macro-spiral"]:checked')?.value || '',
        curriculumContext: document.getElementById('macro-curriculum-context')?.value || ''
    };

    const curriculums = [];
    document.querySelectorAll('.curriculum-card').forEach(c => {
        const curriculum = {
            title: c.querySelector('.curriculum-title')?.value || '',
            needs: c.querySelector('.curriculum-needs')?.value || '',
            alignment: c.querySelector('.curriculum-alignment')?.value || '',
            objectives: [],
            courses: []
        };

        c.querySelectorAll('.curriculum-objectives .objective-item').forEach(obj => {
            curriculum.objectives.push({
                text: obj.querySelector('.objective-text')?.value || '',
                taxonomy: obj.querySelector('.taxonomy-select')?.value || '',
                level: obj.querySelector('.level-select')?.value || ''
            });
        });

        c.querySelectorAll('.course-card').forEach(co => {
            const course = {
                title: co.querySelector('.course-title')?.value || '',
                description: co.querySelector('.course-description')?.value || '',
                units: []
            };

            co.querySelectorAll('.unit-card').forEach(u => {
                course.units.push({
                    title: u.querySelector('.unit-title')?.value || '',
                    description: u.querySelector('.unit-description')?.value || ''
                });
            });

            curriculum.courses.push(course);
        });

        curriculums.push(curriculum);
    });

    return { type: 'macrodesign-beta', version: '1.1', betaData, curriculums };
}

function restoreMacroData(data) {
    if (data.type !== 'macrodesign' && data.type !== 'macrodesign-beta') {
        alert('Ce fichier n\'est pas un fichier macrodesign.');
        return;
    }

    // Restore beta data if available
    if (data.betaData) {
        const bd = data.betaData;
        if (document.getElementById('macro-kpi-link')) document.getElementById('macro-kpi-link').value = bd.kpiLink || '';
        if (document.getElementById('macro-smart-goal')) document.getElementById('macro-smart-goal').value = bd.smartGoal || '';
        if (document.getElementById('macro-training-pct')) {
            document.getElementById('macro-training-pct').value = bd.trainingPct || '100';
            updateTrainingPct(bd.trainingPct || '100');
        }
        if (document.getElementById('macro-sequencing-principle')) document.getElementById('macro-sequencing-principle').value = bd.sequencingPrinciple || '';
        if (document.getElementById('macro-epitome')) document.getElementById('macro-epitome').value = bd.epitome || '';
        if (bd.spiralProgression) {
            const radio = document.querySelector(`input[name="macro-spiral"][value="${bd.spiralProgression}"]`);
            if (radio) radio.checked = true;
        }
        if (document.getElementById('macro-curriculum-context')) document.getElementById('macro-curriculum-context').value = bd.curriculumContext || '';
    }

    const container = document.getElementById('curriculums-container');
    container.innerHTML = '';

    const numInput = document.getElementById('num-curriculums');
    numInput.value = data.curriculums.length;

    data.curriculums.forEach(cData => {
        const curriculum = createCurriculum();
        if (!curriculum) return;

        curriculum.querySelector('.curriculum-title').value = cData.title || '';
        curriculum.querySelector('.curriculum-needs').value = cData.needs || '';
        curriculum.querySelector('.curriculum-alignment').value = cData.alignment || '';

        // Restore objectives
        const objContainer = curriculum.querySelector('.curriculum-objectives');
        cData.objectives?.forEach(objData => {
            const template = getObjectiveTemplate();
            const clone = template.content.cloneNode(true);
            objContainer.appendChild(clone);
            const obj = objContainer.lastElementChild;
            obj.querySelector('.objective-text').value = objData.text || '';
            obj.querySelector('.taxonomy-select').value = objData.taxonomy || '';
            if (objData.taxonomy) {
                updateTaxonomyLevels(obj.querySelector('.taxonomy-select'));
                obj.querySelector('.level-select').value = objData.level || '';
            }
        });

        // Restore courses
        const numCoursesInput = curriculum.querySelector('.num-courses');
        numCoursesInput.value = cData.courses?.length || 0;

        cData.courses?.forEach(coData => {
            const course = createCourse(curriculum);
            if (!course) return;

            course.querySelector('.course-title').value = coData.title || '';
            course.querySelector('.course-description').value = coData.description || '';

            const numUnitsInput = course.querySelector('.num-units');
            numUnitsInput.value = coData.units?.length || 0;

            coData.units?.forEach(uData => {
                const unit = createUnit(course);
                if (!unit) return;
                unit.querySelector('.unit-title').value = uData.title || '';
                unit.querySelector('.unit-description').value = uData.description || '';
            });
        });
    });

    updateAllIndexes();
}

// ── Export Markdown ───────────────────────────────────────────────────────────
function macroExportMarkdown() {
    const data = collectMacroData();
    let md = '# Macrodesign - Architecture pédagogique\n\n';

    data.curriculums.forEach((c, cIdx) => {
        md += `## ${cIdx + 1}. ${c.title || 'Curriculum sans titre'}\n\n`;

        if (c.needs) {
            md += `### Analyse des besoins\n${c.needs}\n\n`;
        }
        if (c.alignment) {
            md += `### Alignement stratégique\n${c.alignment}\n\n`;
        }
        if (c.objectives.length > 0) {
            md += `### Objectifs terminaux\n`;
            c.objectives.forEach((obj, i) => {
                md += `- ${obj.text || 'Objectif non défini'}`;
                if (obj.taxonomy) md += ` *(${obj.taxonomy})*`;
                md += '\n';
            });
            md += '\n';
        }

        c.courses.forEach((co, coIdx) => {
            md += `### ${cIdx + 1}.${coIdx + 1} ${co.title || 'Cours sans titre'}\n`;
            if (co.description) md += `${co.description}\n`;
            md += '\n';

            co.units.forEach((u, uIdx) => {
                md += `#### ${cIdx + 1}.${coIdx + 1}.${uIdx + 1} ${u.title || 'Unité sans titre'}\n`;
                if (u.description) md += `${u.description}\n`;
                md += '\n';
            });
        });
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'macrodesign_' + new Date().toISOString().slice(0, 10) + '.md';
    a.click();
    URL.revokeObjectURL(url);
}

// ── Language ──────────────────────────────────────────────────────────────────
function macroSwitchLang(code) {
    if (typeof i18nCore !== 'undefined' && i18nCore.translations[code]) {
        i18nCore.setLang(code);
    }
}

// ── Initialization ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function() {
    console.log('[Macrodesign] Initializing...');

    // Load taxonomies
    await loadTaxonomies();

    // Initialize with default structure
    syncCurriculums(1);

    // Setup input listeners
    document.getElementById('num-curriculums').addEventListener('change', function() {
        syncCurriculums(parseInt(this.value) || 1);
    });

    // Mark active nav
    setTimeout(() => {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === 'macrodesign-beta.html') {
                link.classList.add('active');
            }
        });
    }, 100);

    console.log('[Macrodesign Beta] Ready');
});
