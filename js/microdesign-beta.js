/**
 * Microdesign Beta - Pedagogical Planning Tool
 * NEW Structure: Leçon (Level 1) > Activité (Level 2) > Tâche (Level 3)
 * Added: Course context fields, Taxonomy dropdowns for all levels
 */

// ── Default Taxonomies ────────────────────────────────────────────────────────
const microDefaultTaxonomies = {
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

// ── Taxonomies Cache ──────────────────────────────────────────────────────────
let microTaxonomies = {
    cognitive: null,
    affective: null,
    psychomotor: null
};

// ── Load Taxonomies ───────────────────────────────────────────────────────────
async function loadMicroTaxonomies() {
    try {
        const [cognitive, affective, psychomotor] = await Promise.all([
            fetch('taxonomies/bloom_cognitive.json').then(r => r.json()),
            fetch('taxonomies/affective.json').then(r => r.json()),
            fetch('taxonomies/psychomotor.json').then(r => r.json())
        ]);
        microTaxonomies.cognitive = cognitive;
        microTaxonomies.affective = affective;
        microTaxonomies.psychomotor = psychomotor;
        console.log('[Microdesign] Taxonomies loaded from files');
    } catch (e) {
        console.warn('[Microdesign] Could not load taxonomies from files, using defaults:', e);
        microTaxonomies.cognitive = microDefaultTaxonomies.cognitive;
        microTaxonomies.affective = microDefaultTaxonomies.affective;
        microTaxonomies.psychomotor = microDefaultTaxonomies.psychomotor;
        console.log('[Microdesign] Using default taxonomies');
    }
}

// ── Vertical Cascade from Macrodesign ─────────────────────────────────────────
function loadTerminalGoalFromMacro() {
    try {
        const macroData = localStorage.getItem('macrodesign-beta-terminal-goal');
        if (macroData) {
            const container = document.getElementById('micro-terminal-goal-container');
            const textEl = document.getElementById('micro-terminal-goal-text');
            if (container && textEl) {
                textEl.textContent = macroData;
                container.classList.remove('hidden');
            }
        }
    } catch (e) {
        console.warn('[Microdesign Beta] Could not load terminal goal from Macro');
    }
}

// ── Congruency Check ──────────────────────────────────────────────────────────
function checkCongruency() {
    let showAlert = false;

    document.querySelectorAll('.micro-activity-card').forEach(activity => {
        const levelSelect = activity.querySelector('.activity-level-select');
        const treatmentType = activity.querySelector('.activity-treatment-type')?.value;
        const levelVal = levelSelect?.value;

        // If high-level objective (5=Evaluate, 6=Create) but only absorb activity
        if ((levelVal === '5' || levelVal === '6') && treatmentType === 'absorb') {
            showAlert = true;
        }
    });

    const alertEl = document.getElementById('congruency-alert');
    if (alertEl) {
        if (showAlert) {
            alertEl.classList.remove('hidden');
        } else {
            alertEl.classList.add('hidden');
        }
    }
}

// ── Templates ─────────────────────────────────────────────────────────────────
function getMicroLessonTemplate() {
    return document.getElementById('micro-lesson-template');
}
function getMicroActivityTemplate() {
    return document.getElementById('micro-activity-template');
}
function getMicroTaskTemplate() {
    return document.getElementById('micro-task-template');
}
function getMediaTemplate() {
    return document.getElementById('media-template');
}
function getMicroObjectiveTemplate() {
    return document.getElementById('micro-objective-template');
}

// ── Level 1: Leçon Management ─────────────────────────────────────────────────
function syncMicroLessons(count) {
    const container = document.getElementById('lessons-main-container');
    if (!container) return;

    count = Math.max(1, Math.min(10, count));
    const current = container.querySelectorAll('.micro-lesson-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const lesson = createMicroLesson();
            if (lesson) {
                // Create default activities (Level 2)
                const numActivitiesInput = lesson.querySelector('.num-activities-l2');
                const numActivities = numActivitiesInput ? parseInt(numActivitiesInput.value) || 2 : 2;
                syncMicroActivities(lesson, numActivities);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createMicroLesson() {
    const container = document.getElementById('lessons-main-container');
    const template = getMicroLessonTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMicroLesson(btn) {
    const lesson = btn.closest('.micro-lesson-card');
    if (!lesson) return;

    const container = document.getElementById('lessons-main-container');
    const count = container.querySelectorAll('.micro-lesson-card').length;
    if (count <= 1) {
        alert('Vous devez conserver au moins une leçon.');
        return;
    }

    lesson.remove();
    updateMicroAllIndexes();
}

function toggleMicroLesson(btn) {
    const lesson = btn.closest('.micro-lesson-card');
    const body = lesson.querySelector('.micro-lesson-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

// ── Level 2: Activité Management ──────────────────────────────────────────────
function syncMicroActivities(lessonEl, count) {
    const container = lessonEl.querySelector('.activities-l2-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.micro-activity-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const activity = createMicroActivity(lessonEl);
            if (activity) {
                // Create default tasks (Level 3)
                const numTasksInput = activity.querySelector('.num-tasks');
                const numTasks = numTasksInput ? parseInt(numTasksInput.value) || 2 : 2;
                syncMicroTasks(activity, numTasks);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createMicroActivity(lessonEl) {
    const container = lessonEl.querySelector('.activities-l2-container');
    const template = getMicroActivityTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMicroActivity(btn) {
    const activity = btn.closest('.micro-activity-card');
    const lesson = btn.closest('.micro-lesson-card');
    if (!activity || !lesson) return;

    activity.remove();
    const input = lesson.querySelector('.num-activities-l2');
    const count = lesson.querySelectorAll('.micro-activity-card').length;
    if (input) input.value = count;
    updateMicroAllIndexes();
}

function toggleMicroActivity(btn) {
    const activity = btn.closest('.micro-activity-card');
    const body = activity.querySelector('.micro-activity-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

function microActivityIncL2(btn) {
    const lesson = btn.closest('.micro-lesson-card');
    const input = lesson.querySelector('.num-activities-l2');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncMicroActivities(lesson, val + 1);
    }
}

function microActivityDecL2(btn) {
    const lesson = btn.closest('.micro-lesson-card');
    const input = lesson.querySelector('.num-activities-l2');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncMicroActivities(lesson, val - 1);
    }
}

// ── Level 3: Tâche Management ─────────────────────────────────────────────────
function syncMicroTasks(activityEl, count) {
    const container = activityEl.querySelector('.tasks-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.micro-task-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const task = createMicroTask(activityEl);
            if (task) {
                // Create default media elements
                const numMediaInput = task.querySelector('.num-media');
                const numMedia = numMediaInput ? parseInt(numMediaInput.value) || 1 : 1;
                syncMedia(task, numMedia);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createMicroTask(activityEl) {
    const container = activityEl.querySelector('.tasks-container');
    const template = getMicroTaskTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMicroTask(btn) {
    const task = btn.closest('.micro-task-card');
    const activity = btn.closest('.micro-activity-card');
    if (!task || !activity) return;

    task.remove();
    const input = activity.querySelector('.num-tasks');
    const count = activity.querySelectorAll('.micro-task-card').length;
    if (input) input.value = count;
    updateMicroAllIndexes();
}

function microTaskInc(btn) {
    const activity = btn.closest('.micro-activity-card');
    const input = activity.querySelector('.num-tasks');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncMicroTasks(activity, val + 1);
    }
}

function microTaskDec(btn) {
    const activity = btn.closest('.micro-activity-card');
    const input = activity.querySelector('.num-tasks');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncMicroTasks(activity, val - 1);
    }
}

// ── Media Management ──────────────────────────────────────────────────────────
function syncMedia(taskEl, count) {
    const container = taskEl.querySelector('.media-container');
    if (!container) return;

    count = Math.max(0, Math.min(10, count));
    const current = container.querySelectorAll('.media-item');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            createMedia(taskEl);
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }
}

function createMedia(taskEl) {
    const container = taskEl.querySelector('.media-container');
    const template = getMediaTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMedia(btn) {
    const media = btn.closest('.media-item');
    const task = btn.closest('.micro-task-card');
    if (!media || !task) return;

    media.remove();
    const input = task.querySelector('.num-media');
    const count = task.querySelectorAll('.media-item').length;
    if (input) input.value = count;
}

function microMediaInc(btn) {
    const task = btn.closest('.micro-task-card');
    const input = task.querySelector('.num-media');
    const val = parseInt(input.value) || 0;
    if (val < 10) {
        input.value = val + 1;
        syncMedia(task, val + 1);
    }
}

function microMediaDec(btn) {
    const task = btn.closest('.micro-task-card');
    const input = task.querySelector('.num-media');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncMedia(task, val - 1);
    }
}

// ── Objectives Management ─────────────────────────────────────────────────────
function addMicroObjective(btn, type) {
    const container = btn.previousElementSibling;
    const template = getMicroObjectiveTemplate();
    if (!container || !template) return;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
}

function deleteMicroObjective(btn) {
    const objective = btn.closest('.micro-objective-item');
    if (objective) objective.remove();
}

// ── Taxonomy Levels Update (for all levels) ───────────────────────────────────
function updateMicroTaxonomyLevels(select, levelType) {
    let levelSelect;

    if (levelType === 'lesson') {
        const lessonCard = select.closest('.micro-lesson-card');
        levelSelect = lessonCard.querySelector('.lesson-level-select');
    } else if (levelType === 'activity') {
        const activityCard = select.closest('.micro-activity-card');
        levelSelect = activityCard.querySelector('.activity-level-select');
    } else if (levelType === 'task') {
        const taskCard = select.closest('.micro-task-card');
        levelSelect = taskCard.querySelector('.task-level-select');
    } else {
        // Fallback for objective items
        const objectiveItem = select.closest('.micro-objective-item');
        if (objectiveItem) {
            levelSelect = objectiveItem.querySelector('.micro-level-select');
        }
    }

    if (!levelSelect) return;

    levelSelect.innerHTML = '<option value="">-- niveau --</option>';

    const domain = select.value;
    if (!domain || !microTaxonomies[domain]) return;

    const lang = (typeof i18nCore !== 'undefined' && i18nCore.currentLang === 'en-CA') ? 'en' : 'fr';
    const taxonomy = microTaxonomies[domain];

    if (!taxonomy.levels) return;

    taxonomy.levels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.level;
        option.textContent = lang === 'en' ? level.name_en : level.name_fr;
        option.dataset.definition = lang === 'en' ? (level.definition_en || '') : (level.definition_fr || '');
        levelSelect.appendChild(option);
    });
}

function showMicroVerbsForLevel(select) {
    const objectiveItem = select.closest('.micro-objective-item');
    const taxonomySelect = objectiveItem.querySelector('.micro-taxonomy-select');
    const verbsDisplay = objectiveItem.querySelector('.micro-verbs-display');
    const verbsList = verbsDisplay.querySelector('.micro-verbs-list');

    const domain = taxonomySelect.value;
    const levelNum = parseInt(select.value);

    if (!domain || !levelNum || !microTaxonomies[domain]) {
        verbsDisplay.classList.add('hidden');
        return;
    }

    const lang = (typeof i18nCore !== 'undefined' && i18nCore.currentLang === 'en-CA') ? 'en' : 'fr';
    const taxonomy = microTaxonomies[domain];
    const level = taxonomy.levels.find(l => l.level === levelNum);

    if (level) {
        const verbs = lang === 'en' ? level.verbs_en : level.verbs_fr;
        verbsList.textContent = verbs.slice(0, 10).join(', ') + '...';
        verbsDisplay.classList.remove('hidden');
    }
}

// ── Index Management ──────────────────────────────────────────────────────────
function updateMicroAllIndexes() {
    const container = document.getElementById('lessons-main-container');
    if (!container) return;

    const lessons = container.querySelectorAll('.micro-lesson-card');
    lessons.forEach((lesson, lIdx) => {
        const lNum = lIdx + 1;
        const lIndex = lesson.querySelector('.micro-lesson-index');
        if (lIndex) lIndex.textContent = lNum;

        const activities = lesson.querySelectorAll('.micro-activity-card');
        activities.forEach((activity, aIdx) => {
            const aNum = aIdx + 1;
            const aIndex = activity.querySelector('.micro-activity-index');
            if (aIndex) aIndex.textContent = `${lNum}.${aNum}`;

            const tasks = activity.querySelectorAll('.micro-task-card');
            tasks.forEach((task, tIdx) => {
                const tNum = tIdx + 1;
                const tIndex = task.querySelector('.micro-task-index');
                if (tIndex) tIndex.textContent = `${lNum}.${aNum}.${tNum}`;
            });
        });
    });
}

// ── Save/Load ─────────────────────────────────────────────────────────────────
function microSaveState() {
    const data = collectMicroData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'microdesign_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function microLoadState() {
    document.getElementById('micro-load-input').click();
}

function microLoadFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            restoreMicroData(data);
        } catch (err) {
            alert('Erreur lors du chargement du fichier.');
            console.error(err);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function collectMicroData() {
    // Collect context fields
    const contextData = {
        courseTitle: document.getElementById('micro-course-title')?.value || '',
        programTitle: document.getElementById('micro-program-title')?.value || '',
        themeTitle: document.getElementById('micro-theme-title')?.value || ''
    };

    // Collect beta sections
    const betaData = {
        prerequisites: document.getElementById('micro-prerequisites')?.value || '',
        preassessment: document.getElementById('micro-preassessment')?.value || '',
        wiifm: document.getElementById('micro-wiifm')?.value || '',
        guidanceLevel: document.getElementById('micro-guidance-level')?.value || '',
        feedbackMechanism: document.getElementById('micro-feedback-mechanism')?.value || '',
        retention: document.getElementById('micro-retention')?.value || '',
        actionLearning: document.getElementById('micro-action-learning')?.value || ''
    };

    const lessons = [];
    document.querySelectorAll('.micro-lesson-card').forEach(l => {
        const lesson = {
            title: l.querySelector('.micro-lesson-title')?.value || '',
            duration: l.querySelector('.lesson-duration')?.value || '60',
            taxonomy: l.querySelector('.lesson-taxonomy-select')?.value || '',
            level: l.querySelector('.lesson-level-select')?.value || '',
            objectives: [],
            activities: []
        };

        l.querySelectorAll('.micro-lesson-objectives .micro-objective-item').forEach(obj => {
            lesson.objectives.push({
                text: obj.querySelector('.micro-objective-text')?.value || '',
                taxonomy: obj.querySelector('.micro-taxonomy-select')?.value || '',
                level: obj.querySelector('.micro-level-select')?.value || ''
            });
        });

        l.querySelectorAll('.micro-activity-card').forEach(a => {
            const activity = {
                title: a.querySelector('.micro-activity-title')?.value || '',
                duration: a.querySelector('.activity-duration')?.value || '15',
                taxonomy: a.querySelector('.activity-taxonomy-select')?.value || '',
                level: a.querySelector('.activity-level-select')?.value || '',
                treatmentType: a.querySelector('.activity-treatment-type')?.value || 'absorb',
                description: a.querySelector('.activity-description')?.value || '',
                tasks: []
            };

            a.querySelectorAll('.micro-task-card').forEach(t => {
                const task = {
                    title: t.querySelector('.micro-task-title')?.value || '',
                    duration: t.querySelector('.task-duration')?.value || '5',
                    taxonomy: t.querySelector('.task-taxonomy-select')?.value || '',
                    level: t.querySelector('.task-level-select')?.value || '',
                    description: t.querySelector('.task-description')?.value || '',
                    media: []
                };

                t.querySelectorAll('.media-item').forEach(m => {
                    task.media.push({
                        type: m.querySelector('.media-type')?.value || 'text',
                        description: m.querySelector('.media-description')?.value || ''
                    });
                });

                activity.tasks.push(task);
            });

            lesson.activities.push(activity);
        });

        lessons.push(lesson);
    });

    return { type: 'microdesign-beta', version: '2.0', contextData, betaData, lessons };
}

function restoreMicroData(data) {
    if (data.type !== 'microdesign' && data.type !== 'microdesign-beta') {
        alert('Ce fichier n\'est pas un fichier microdesign.');
        return;
    }

    // Restore context data if available
    if (data.contextData) {
        const cd = data.contextData;
        if (document.getElementById('micro-course-title')) document.getElementById('micro-course-title').value = cd.courseTitle || '';
        if (document.getElementById('micro-program-title')) document.getElementById('micro-program-title').value = cd.programTitle || '';
        if (document.getElementById('micro-theme-title')) document.getElementById('micro-theme-title').value = cd.themeTitle || '';
    }

    // Restore beta data if available
    if (data.betaData) {
        const bd = data.betaData;
        if (document.getElementById('micro-prerequisites')) document.getElementById('micro-prerequisites').value = bd.prerequisites || '';
        if (document.getElementById('micro-preassessment')) document.getElementById('micro-preassessment').value = bd.preassessment || '';
        if (document.getElementById('micro-wiifm')) document.getElementById('micro-wiifm').value = bd.wiifm || '';
        if (document.getElementById('micro-guidance-level')) document.getElementById('micro-guidance-level').value = bd.guidanceLevel || '';
        if (document.getElementById('micro-feedback-mechanism')) document.getElementById('micro-feedback-mechanism').value = bd.feedbackMechanism || '';
        if (document.getElementById('micro-retention')) document.getElementById('micro-retention').value = bd.retention || '';
        if (document.getElementById('micro-action-learning')) document.getElementById('micro-action-learning').value = bd.actionLearning || '';
    }

    const container = document.getElementById('lessons-main-container');
    container.innerHTML = '';

    // Handle both old format (units) and new format (lessons)
    const lessonsData = data.lessons || data.units || [];

    lessonsData.forEach(lData => {
        const lesson = createMicroLesson();
        if (!lesson) return;

        lesson.querySelector('.micro-lesson-title').value = lData.title || '';
        if (lesson.querySelector('.lesson-duration')) {
            lesson.querySelector('.lesson-duration').value = lData.duration || '60';
        }

        // Restore objectives
        const objContainer = lesson.querySelector('.micro-lesson-objectives');
        lData.objectives?.forEach(objData => {
            const template = getMicroObjectiveTemplate();
            const clone = template.content.cloneNode(true);
            objContainer.appendChild(clone);
            const obj = objContainer.lastElementChild;
            obj.querySelector('.micro-objective-text').value = objData.text || '';
            obj.querySelector('.micro-taxonomy-select').value = objData.taxonomy || '';
            if (objData.taxonomy) {
                updateMicroTaxonomyLevels(obj.querySelector('.micro-taxonomy-select'));
                obj.querySelector('.micro-level-select').value = objData.level || '';
            }
        });

        // Restore activities (or lessons in old format)
        const activitiesData = lData.activities || lData.lessons || [];
        const numActivitiesInput = lesson.querySelector('.num-activities-l2');
        numActivitiesInput.value = activitiesData.length || 0;

        activitiesData.forEach(aData => {
            const activity = createMicroActivity(lesson);
            if (!activity) return;

            activity.querySelector('.micro-activity-title').value = aData.title || '';
            if (activity.querySelector('.activity-duration')) {
                activity.querySelector('.activity-duration').value = aData.duration || '15';
            }
            if (activity.querySelector('.activity-description')) {
                activity.querySelector('.activity-description').value = aData.description || '';
            }

            // Restore tasks (or activities in old format)
            const tasksData = aData.tasks || aData.activities || [];
            const numTasksInput = activity.querySelector('.num-tasks');
            numTasksInput.value = tasksData.length || 0;

            tasksData.forEach(tData => {
                const task = createMicroTask(activity);
                if (!task) return;

                task.querySelector('.micro-task-title').value = tData.title || '';
                if (task.querySelector('.task-duration')) {
                    task.querySelector('.task-duration').value = tData.duration || '5';
                }
                if (task.querySelector('.task-description')) {
                    task.querySelector('.task-description').value = tData.description || '';
                }

                const numMediaInput = task.querySelector('.num-media');
                numMediaInput.value = tData.media?.length || 0;

                tData.media?.forEach(mData => {
                    const media = createMedia(task);
                    if (!media) return;
                    media.querySelector('.media-type').value = mData.type || 'text';
                    media.querySelector('.media-description').value = mData.description || '';
                });
            });
        });
    });

    updateMicroAllIndexes();
}

// ── Export Markdown ───────────────────────────────────────────────────────────
function microExportMarkdown() {
    const data = collectMicroData();
    let md = '# Microdesign - Scénarisation pédagogique\n\n';

    // Add context info
    if (data.contextData) {
        if (data.contextData.courseTitle) md += `**Cours/Formation:** ${data.contextData.courseTitle}\n`;
        if (data.contextData.programTitle) md += `**Programme:** ${data.contextData.programTitle}\n`;
        if (data.contextData.themeTitle) md += `**Thématique/Module:** ${data.contextData.themeTitle}\n`;
        md += '\n';
    }

    data.lessons.forEach((l, lIdx) => {
        md += `## Leçon ${lIdx + 1}: ${l.title || 'Sans titre'} (${l.duration} min)\n\n`;

        if (l.objectives && l.objectives.length > 0) {
            md += `### Objectifs d'apprentissage\n`;
            l.objectives.forEach((obj, i) => {
                md += `- ${obj.text || 'Objectif non défini'}`;
                if (obj.taxonomy) md += ` *(${obj.taxonomy})*`;
                md += '\n';
            });
            md += '\n';
        }

        l.activities.forEach((a, aIdx) => {
            md += `### Activité ${lIdx + 1}.${aIdx + 1}: ${a.title || 'Sans titre'} (${a.duration} min)\n`;
            if (a.description) md += `${a.description}\n`;
            md += '\n';

            a.tasks.forEach((t, tIdx) => {
                md += `#### Tâche ${lIdx + 1}.${aIdx + 1}.${tIdx + 1}: ${t.title || 'Sans titre'} (${t.duration} min)\n`;
                if (t.description) md += `${t.description}\n`;

                if (t.media && t.media.length > 0) {
                    md += `- **Médias:**\n`;
                    t.media.forEach(m => {
                        md += `  - ${m.type}: ${m.description || 'Non spécifié'}\n`;
                    });
                }
                md += '\n';
            });
        });
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'microdesign_' + new Date().toISOString().slice(0, 10) + '.md';
    a.click();
    URL.revokeObjectURL(url);
}

// ── Language ──────────────────────────────────────────────────────────────────
function microSwitchLang(code) {
    if (typeof i18nCore !== 'undefined' && i18nCore.translations[code]) {
        i18nCore.setLang(code);
    }
}

// ── Initialization ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function() {
    console.log('[Microdesign Beta] Initializing...');

    // Load taxonomies
    await loadMicroTaxonomies();

    // Load terminal goal from Macrodesign Beta
    loadTerminalGoalFromMacro();

    // Initialize with default structure (1 lesson, 2 activities)
    syncMicroLessons(1);

    // Mark active nav
    setTimeout(() => {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === 'microdesign-beta.html') {
                link.classList.add('active');
            }
        });
    }, 100);

    console.log('[Microdesign Beta] Ready');
});
