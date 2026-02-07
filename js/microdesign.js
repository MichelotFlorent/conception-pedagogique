/**
 * Microdesign - Pedagogical Planning Tool
 * Levels: Unit > Lesson > Activity > Media
 */

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
        console.log('[Microdesign] Taxonomies loaded');
    } catch (e) {
        console.warn('[Microdesign] Could not load taxonomies:', e);
    }
}

// ── Templates ─────────────────────────────────────────────────────────────────
function getMicroUnitTemplate() {
    return document.getElementById('micro-unit-template');
}
function getLessonTemplate() {
    return document.getElementById('lesson-template');
}
function getActivityTemplate() {
    return document.getElementById('activity-template');
}
function getMediaTemplate() {
    return document.getElementById('media-template');
}
function getMicroObjectiveTemplate() {
    return document.getElementById('micro-objective-template');
}

// ── Unit Management ───────────────────────────────────────────────────────────
function syncMicroUnits(count) {
    const container = document.getElementById('units-container');
    if (!container) return;

    count = Math.max(1, Math.min(10, count));
    const current = container.querySelectorAll('.micro-unit-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const unit = createMicroUnit();
            if (unit) {
                // Create default lessons
                const numLessonsInput = unit.querySelector('.num-lessons');
                const numLessons = numLessonsInput ? parseInt(numLessonsInput.value) || 2 : 2;
                syncLessons(unit, numLessons);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createMicroUnit() {
    const container = document.getElementById('units-container');
    const template = getMicroUnitTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMicroUnit(btn) {
    const unit = btn.closest('.micro-unit-card');
    if (!unit) return;

    const container = document.getElementById('units-container');
    const count = container.querySelectorAll('.micro-unit-card').length;
    if (count <= 1) {
        alert('Vous devez conserver au moins une unité.');
        return;
    }

    unit.remove();
    const input = document.getElementById('num-units-global');
    if (input) input.value = count - 1;
    updateMicroAllIndexes();
}

function toggleMicroUnit(btn) {
    const unit = btn.closest('.micro-unit-card');
    const body = unit.querySelector('.micro-unit-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

function microUnitInc() {
    const input = document.getElementById('num-units-global');
    const val = parseInt(input.value) || 1;
    if (val < 10) {
        input.value = val + 1;
        syncMicroUnits(val + 1);
    }
}

function microUnitDec() {
    const input = document.getElementById('num-units-global');
    const val = parseInt(input.value) || 1;
    if (val > 1) {
        input.value = val - 1;
        syncMicroUnits(val - 1);
    }
}

// ── Lesson Management ─────────────────────────────────────────────────────────
function syncLessons(unitEl, count) {
    const container = unitEl.querySelector('.lessons-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.lesson-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const lesson = createLesson(unitEl);
            if (lesson) {
                // Create default activities
                const numActivitiesInput = lesson.querySelector('.num-activities');
                const numActivities = numActivitiesInput ? parseInt(numActivitiesInput.value) || 3 : 3;
                syncActivities(lesson, numActivities);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createLesson(unitEl) {
    const container = unitEl.querySelector('.lessons-container');
    const template = getLessonTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteLesson(btn) {
    const lesson = btn.closest('.lesson-card');
    const unit = btn.closest('.micro-unit-card');
    if (!lesson || !unit) return;

    lesson.remove();
    const input = unit.querySelector('.num-lessons');
    const count = unit.querySelectorAll('.lesson-card').length;
    if (input) input.value = count;
    updateMicroAllIndexes();
}

function toggleLesson(btn) {
    const lesson = btn.closest('.lesson-card');
    const body = lesson.querySelector('.lesson-body');
    const icon = btn.querySelector('.material-icons-round');
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_less';
    } else {
        body.classList.add('hidden');
        icon.textContent = 'expand_more';
    }
}

function microLessonInc(btn) {
    const unit = btn.closest('.micro-unit-card');
    const input = unit.querySelector('.num-lessons');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncLessons(unit, val + 1);
    }
}

function microLessonDec(btn) {
    const unit = btn.closest('.micro-unit-card');
    const input = unit.querySelector('.num-lessons');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncLessons(unit, val - 1);
    }
}

// ── Activity Management ───────────────────────────────────────────────────────
function syncActivities(lessonEl, count) {
    const container = lessonEl.querySelector('.activities-container');
    if (!container) return;

    count = Math.max(0, Math.min(20, count));
    const current = container.querySelectorAll('.activity-card');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            const activity = createActivity(lessonEl);
            if (activity) {
                // Create default media elements
                const numMediaInput = activity.querySelector('.num-media');
                const numMedia = numMediaInput ? parseInt(numMediaInput.value) || 2 : 2;
                syncMedia(activity, numMedia);
            }
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }

    updateMicroAllIndexes();
}

function createActivity(lessonEl) {
    const container = lessonEl.querySelector('.activities-container');
    const template = getActivityTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteActivity(btn) {
    const activity = btn.closest('.activity-card');
    const lesson = btn.closest('.lesson-card');
    if (!activity || !lesson) return;

    activity.remove();
    const input = lesson.querySelector('.num-activities');
    const count = lesson.querySelectorAll('.activity-card').length;
    if (input) input.value = count;
    updateMicroAllIndexes();
}

function microActivityInc(btn) {
    const lesson = btn.closest('.lesson-card');
    const input = lesson.querySelector('.num-activities');
    const val = parseInt(input.value) || 0;
    if (val < 20) {
        input.value = val + 1;
        syncActivities(lesson, val + 1);
    }
}

function microActivityDec(btn) {
    const lesson = btn.closest('.lesson-card');
    const input = lesson.querySelector('.num-activities');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncActivities(lesson, val - 1);
    }
}

// ── Media Management ──────────────────────────────────────────────────────────
function syncMedia(activityEl, count) {
    const container = activityEl.querySelector('.media-container');
    if (!container) return;

    count = Math.max(0, Math.min(10, count));
    const current = container.querySelectorAll('.media-item');
    const currentCount = current.length;

    if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
            createMedia(activityEl);
        }
    } else if (count < currentCount) {
        for (let i = currentCount - 1; i >= count; i--) {
            current[i].remove();
        }
    }
}

function createMedia(activityEl) {
    const container = activityEl.querySelector('.media-container');
    const template = getMediaTemplate();
    if (!container || !template) return null;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    return container.lastElementChild;
}

function deleteMedia(btn) {
    const media = btn.closest('.media-item');
    const activity = btn.closest('.activity-card');
    if (!media || !activity) return;

    media.remove();
    const input = activity.querySelector('.num-media');
    const count = activity.querySelectorAll('.media-item').length;
    if (input) input.value = count;
}

function microMediaInc(btn) {
    const activity = btn.closest('.activity-card');
    const input = activity.querySelector('.num-media');
    const val = parseInt(input.value) || 0;
    if (val < 10) {
        input.value = val + 1;
        syncMedia(activity, val + 1);
    }
}

function microMediaDec(btn) {
    const activity = btn.closest('.activity-card');
    const input = activity.querySelector('.num-media');
    const val = parseInt(input.value) || 0;
    if (val > 0) {
        input.value = val - 1;
        syncMedia(activity, val - 1);
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

function updateMicroTaxonomyLevels(select) {
    const objectiveItem = select.closest('.micro-objective-item');
    const levelSelect = objectiveItem.querySelector('.micro-level-select');
    const verbsDisplay = objectiveItem.querySelector('.micro-verbs-display');

    levelSelect.innerHTML = '<option value="">-- niveau --</option>';
    verbsDisplay.classList.add('hidden');

    const domain = select.value;
    if (!domain || !microTaxonomies[domain]) return;

    const lang = (typeof i18nCore !== 'undefined' && i18nCore.currentLang === 'en-CA') ? 'en' : 'fr';
    const taxonomy = microTaxonomies[domain];

    taxonomy.levels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.level;
        option.textContent = lang === 'en' ? level.name_en : level.name_fr;
        option.dataset.definition = lang === 'en' ? level.definition_en : level.definition_fr;
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
    const container = document.getElementById('units-container');
    if (!container) return;

    const units = container.querySelectorAll('.micro-unit-card');
    units.forEach((unit, uIdx) => {
        const uNum = uIdx + 1;
        const uIndex = unit.querySelector('.micro-unit-index');
        if (uIndex) uIndex.textContent = uNum;

        const lessons = unit.querySelectorAll('.lesson-card');
        lessons.forEach((lesson, lIdx) => {
            const lNum = lIdx + 1;
            const lIndex = lesson.querySelector('.lesson-index');
            if (lIndex) lIndex.textContent = `${uNum}.${lNum}`;

            const activities = lesson.querySelectorAll('.activity-card');
            activities.forEach((activity, aIdx) => {
                const aNum = aIdx + 1;
                const aIndex = activity.querySelector('.activity-index');
                if (aIndex) aIndex.textContent = `${uNum}.${lNum}.${aNum}`;
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
    const units = [];
    document.querySelectorAll('.micro-unit-card').forEach(u => {
        const unit = {
            title: u.querySelector('.micro-unit-title')?.value || '',
            objectives: [],
            lessons: []
        };

        u.querySelectorAll('.micro-unit-objectives .micro-objective-item').forEach(obj => {
            unit.objectives.push({
                text: obj.querySelector('.micro-objective-text')?.value || '',
                taxonomy: obj.querySelector('.micro-taxonomy-select')?.value || '',
                level: obj.querySelector('.micro-level-select')?.value || ''
            });
        });

        u.querySelectorAll('.lesson-card').forEach(l => {
            const lesson = {
                title: l.querySelector('.lesson-title')?.value || '',
                duration: l.querySelector('.lesson-duration')?.value || '60',
                activities: []
            };

            l.querySelectorAll('.activity-card').forEach(a => {
                const activity = {
                    title: a.querySelector('.activity-title')?.value || '',
                    type: a.querySelector('.activity-type')?.value || 'absorb',
                    description: a.querySelector('.activity-description')?.value || '',
                    media: []
                };

                a.querySelectorAll('.media-item').forEach(m => {
                    activity.media.push({
                        type: m.querySelector('.media-type')?.value || 'text',
                        description: m.querySelector('.media-description')?.value || ''
                    });
                });

                lesson.activities.push(activity);
            });

            unit.lessons.push(lesson);
        });

        units.push(unit);
    });

    return { type: 'microdesign', version: '1.0', units };
}

function restoreMicroData(data) {
    if (data.type !== 'microdesign') {
        alert('Ce fichier n\'est pas un fichier microdesign.');
        return;
    }

    const container = document.getElementById('units-container');
    container.innerHTML = '';

    const numInput = document.getElementById('num-units-global');
    numInput.value = data.units.length;

    data.units.forEach(uData => {
        const unit = createMicroUnit();
        if (!unit) return;

        unit.querySelector('.micro-unit-title').value = uData.title || '';

        // Restore objectives
        const objContainer = unit.querySelector('.micro-unit-objectives');
        uData.objectives?.forEach(objData => {
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

        // Restore lessons
        const numLessonsInput = unit.querySelector('.num-lessons');
        numLessonsInput.value = uData.lessons?.length || 0;

        uData.lessons?.forEach(lData => {
            const lesson = createLesson(unit);
            if (!lesson) return;

            lesson.querySelector('.lesson-title').value = lData.title || '';
            lesson.querySelector('.lesson-duration').value = lData.duration || '60';

            const numActivitiesInput = lesson.querySelector('.num-activities');
            numActivitiesInput.value = lData.activities?.length || 0;

            lData.activities?.forEach(aData => {
                const activity = createActivity(lesson);
                if (!activity) return;

                activity.querySelector('.activity-title').value = aData.title || '';
                activity.querySelector('.activity-type').value = aData.type || 'absorb';
                activity.querySelector('.activity-description').value = aData.description || '';

                const numMediaInput = activity.querySelector('.num-media');
                numMediaInput.value = aData.media?.length || 0;

                aData.media?.forEach(mData => {
                    const media = createMedia(activity);
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

    data.units.forEach((u, uIdx) => {
        md += `## Unité ${uIdx + 1}: ${u.title || 'Sans titre'}\n\n`;

        if (u.objectives.length > 0) {
            md += `### Objectifs d'apprentissage\n`;
            u.objectives.forEach((obj, i) => {
                md += `- ${obj.text || 'Objectif non défini'}`;
                if (obj.taxonomy) md += ` *(${obj.taxonomy})*`;
                md += '\n';
            });
            md += '\n';
        }

        u.lessons.forEach((l, lIdx) => {
            md += `### Leçon ${uIdx + 1}.${lIdx + 1}: ${l.title || 'Sans titre'} (${l.duration} min)\n\n`;

            l.activities.forEach((a, aIdx) => {
                md += `#### Activité ${uIdx + 1}.${lIdx + 1}.${aIdx + 1}: ${a.title || 'Sans titre'}\n`;
                md += `- **Type**: ${a.type}\n`;
                if (a.description) md += `- **Description**: ${a.description}\n`;

                if (a.media.length > 0) {
                    md += `- **Médias**:\n`;
                    a.media.forEach(m => {
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
    console.log('[Microdesign] Initializing...');

    // Load taxonomies
    await loadMicroTaxonomies();

    // Initialize with default structure
    syncMicroUnits(2);

    // Setup input listeners
    document.getElementById('num-units-global').addEventListener('change', function() {
        syncMicroUnits(parseInt(this.value) || 1);
    });

    // Mark active nav
    setTimeout(() => {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === 'microdesign.html') {
                link.classList.add('active');
            }
        });
    }, 100);

    console.log('[Microdesign] Ready');
});
