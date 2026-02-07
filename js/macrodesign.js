/**
 * Macrodesign - Strategic Planning Tool
 * Levels: Curriculum > Course > Unit
 */

// ── Taxonomies Cache ──────────────────────────────────────────────────────────
let taxonomies = {
    cognitive: null,
    affective: null,
    psychomotor: null
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
        console.log('[Macrodesign] Taxonomies loaded');
    } catch (e) {
        console.warn('[Macrodesign] Could not load taxonomies:', e);
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
    return container.lastElementChild;
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
    return container.lastElementChild;
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
}

function deleteObjective(btn) {
    const objective = btn.closest('.objective-item');
    if (objective) objective.remove();
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

    return { type: 'macrodesign', version: '1.0', curriculums };
}

function restoreMacroData(data) {
    if (data.type !== 'macrodesign') {
        alert('Ce fichier n\'est pas un fichier macrodesign.');
        return;
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
            if (link.getAttribute('href') === 'macrodesign.html') {
                link.classList.add('active');
            }
        });
    }, 100);

    console.log('[Macrodesign] Ready');
});
