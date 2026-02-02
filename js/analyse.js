/**
 * Analyse des besoins - JavaScript
 * Based on Carliner (2015) - Training Design Basics
 */

(function () {
    'use strict';

    var mainTaskCount = 0;

    // ========================================
    // Context fields
    // ========================================
    window.updateContextFields = function (context) {
        document.querySelectorAll('.context-fields').forEach(function (el) {
            el.classList.add('hidden');
        });
        var map = {
            k12: 'k12Fields',
            postsecondary: 'postsecFields',
            corporate: 'corpFields'
        };
        if (map[context]) {
            var el = document.getElementById(map[context]);
            if (el) el.classList.remove('hidden');
        }
    };

    // ========================================
    // Dynamic task list
    // ========================================
    window.addMainTask = function () {
        mainTaskCount++;
        var container = document.getElementById('mainTasksList');
        if (!container) return;
        var taskDiv = document.createElement('div');
        taskDiv.className = 'flex gap-2 items-center';
        taskDiv.innerHTML =
            '<span class="text-sm text-slate-400 font-semibold w-6 text-right shrink-0">' + mainTaskCount + '.</span>' +
            '<input type="text" class="main-task-input flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Tâche principale ' + mainTaskCount + '">' +
            '<button onclick="removeTask(this)" class="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded" type="button">' +
            '<span class="material-icons-round text-sm">close</span>' +
            '</button>';
        container.appendChild(taskDiv);
    };

    window.removeTask = function (btn) {
        btn.parentElement.remove();
        renumberTasks();
    };

    function renumberTasks() {
        var container = document.getElementById('mainTasksList');
        if (!container) return;
        var items = container.querySelectorAll('.flex');
        mainTaskCount = items.length;
        for (var i = 0; i < items.length; i++) {
            var num = items[i].querySelector('span');
            if (num) num.textContent = (i + 1) + '.';
        }
    }

    // ========================================
    // Collect form data
    // ========================================
    function collectFormData() {
        var checkedRadio = function (name) {
            var el = document.querySelector('input[name="' + name + '"]:checked');
            return el ? el.value : '';
        };
        var val = function (id) {
            var el = document.getElementById(id);
            return el ? el.value : '';
        };
        var checked = function (id) {
            var el = document.getElementById(id);
            return el ? el.checked : false;
        };

        var tasks = [];
        document.querySelectorAll('.main-task-input').forEach(function (input) {
            tasks.push(input.value);
        });

        return {
            version: '1.0',
            tool: 'analyse-besoins',
            createdAt: new Date().toISOString(),
            context: val('contextSelect'),
            section1: {
                requestOriginal: val('requestOriginal'),
                sponsorName: val('sponsorName'),
                requestReformulated: val('requestReformulated')
            },
            section2: {
                businessNeedType: checkedRadio('businessNeedType'),
                businessStatement: val('businessStatement')
            },
            section3: {
                desiredScenario: val('desiredScenario'),
                performanceIndicators: val('performanceIndicators')
            },
            section4: {
                currentScenario: val('currentScenario'),
                performanceGap: val('performanceGap')
            },
            section5: {
                mainTasks: tasks,
                entryTasks: val('entryTasks')
            },
            section6: {
                learnerCount: val('learnerCount'),
                experienceLevel: val('experienceLevel'),
                learnerProfile: val('learnerProfile'),
                gradeLevel: val('gradeLevel'),
                parentInvolvement: val('parentInvolvement'),
                academicProgram: val('academicProgram'),
                coursePosition: val('coursePosition'),
                jobTitle: val('jobTitle'),
                managerSupport: val('managerSupport')
            },
            section7: {
                learningBarriers: val('learningBarriers'),
                supportFactors: val('supportFactors'),
                learningEnvironment: val('learningEnvironment')
            },
            section8: {
                projectDeadline: val('projectDeadline'),
                projectBudget: val('projectBudget'),
                formatClassroom: checked('formatClassroom'),
                formatVirtual: checked('formatVirtual'),
                formatSelfStudy: checked('formatSelfStudy'),
                formatBlended: checked('formatBlended'),
                otherConstraints: val('otherConstraints')
            },
            synthesis: {
                keyFindings: val('keyFindings'),
                isTrainingSolution: checkedRadio('isTrainingSolution'),
                recommendations: val('recommendations')
            }
        };
    }

    // ========================================
    // Populate form from data
    // ========================================
    function populateForm(data) {
        var setVal = function (id, v) {
            var el = document.getElementById(id);
            if (el) el.value = v || '';
        };
        var setChecked = function (id, v) {
            var el = document.getElementById(id);
            if (el) el.checked = !!v;
        };
        var setRadio = function (name, v) {
            if (!v) return;
            var el = document.querySelector('input[name="' + name + '"][value="' + v + '"]');
            if (el) el.checked = true;
        };

        setVal('contextSelect', data.context);
        updateContextFields(data.context || 'general');

        // Section 1
        if (data.section1) {
            setVal('requestOriginal', data.section1.requestOriginal);
            setVal('sponsorName', data.section1.sponsorName);
            setVal('requestReformulated', data.section1.requestReformulated);
        }

        // Section 2
        if (data.section2) {
            setRadio('businessNeedType', data.section2.businessNeedType);
            setVal('businessStatement', data.section2.businessStatement);
        }

        // Section 3
        if (data.section3) {
            setVal('desiredScenario', data.section3.desiredScenario);
            setVal('performanceIndicators', data.section3.performanceIndicators);
        }

        // Section 4
        if (data.section4) {
            setVal('currentScenario', data.section4.currentScenario);
            setVal('performanceGap', data.section4.performanceGap);
        }

        // Section 5
        if (data.section5) {
            var container = document.getElementById('mainTasksList');
            if (container) container.innerHTML = '';
            mainTaskCount = 0;
            var tasks = data.section5.mainTasks || [];
            for (var i = 0; i < tasks.length; i++) {
                addMainTask();
                var inputs = document.querySelectorAll('.main-task-input');
                var last = inputs[inputs.length - 1];
                if (last) last.value = tasks[i];
            }
            setVal('entryTasks', data.section5.entryTasks);
        }

        // Section 6
        if (data.section6) {
            setVal('learnerCount', data.section6.learnerCount);
            setVal('experienceLevel', data.section6.experienceLevel);
            setVal('learnerProfile', data.section6.learnerProfile);
            setVal('gradeLevel', data.section6.gradeLevel);
            setVal('parentInvolvement', data.section6.parentInvolvement);
            setVal('academicProgram', data.section6.academicProgram);
            setVal('coursePosition', data.section6.coursePosition);
            setVal('jobTitle', data.section6.jobTitle);
            setVal('managerSupport', data.section6.managerSupport);
        }

        // Section 7
        if (data.section7) {
            setVal('learningBarriers', data.section7.learningBarriers);
            setVal('supportFactors', data.section7.supportFactors);
            setVal('learningEnvironment', data.section7.learningEnvironment);
        }

        // Section 8
        if (data.section8) {
            setVal('projectDeadline', data.section8.projectDeadline);
            setVal('projectBudget', data.section8.projectBudget);
            setChecked('formatClassroom', data.section8.formatClassroom);
            setChecked('formatVirtual', data.section8.formatVirtual);
            setChecked('formatSelfStudy', data.section8.formatSelfStudy);
            setChecked('formatBlended', data.section8.formatBlended);
            setVal('otherConstraints', data.section8.otherConstraints);
        }

        // Synthesis
        if (data.synthesis) {
            setVal('keyFindings', data.synthesis.keyFindings);
            setRadio('isTrainingSolution', data.synthesis.isTrainingSolution);
            setVal('recommendations', data.synthesis.recommendations);
        }
    }

    // ========================================
    // Save / Load
    // ========================================
    window.saveAnalysis = function () {
        var data = collectFormData();
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'analyse_besoins_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    window.loadAnalysis = function () {
        document.getElementById('loadFileInput').click();
    };

    window.loadAnalysisFromFile = function (event) {
        var file = event.target.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = JSON.parse(e.target.result);
                populateForm(data);
            } catch (error) {
                alert('Erreur lors du chargement du fichier.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    // ========================================
    // Export Markdown
    // ========================================
    window.exportAnalysisMarkdown = function () {
        var data = collectFormData();
        var ctx = { general: 'Général', k12: 'K-12', postsecondary: 'Postsecondaire', corporate: 'Entreprise' };
        var lines = [];

        lines.push('# Analyse des besoins de formation');
        lines.push('');
        lines.push('*Date : ' + new Date().toLocaleDateString('fr-CA') + '*');
        lines.push('*Contexte : ' + (ctx[data.context] || data.context) + '*');
        lines.push('');
        lines.push('---');
        lines.push('');

        // Section 1
        lines.push('## 1. Clarification de la demande');
        lines.push('');
        if (data.section1.requestOriginal) {
            lines.push('**Demande originale :**');
            lines.push(data.section1.requestOriginal);
            lines.push('');
        }
        if (data.section1.sponsorName) {
            lines.push('**Commanditaire :** ' + data.section1.sponsorName);
            lines.push('');
        }
        if (data.section1.requestReformulated) {
            lines.push('**Demande reformulée :**');
            lines.push(data.section1.requestReformulated);
            lines.push('');
        }

        // Section 2
        lines.push('## 2. Besoin organisationnel');
        lines.push('');
        if (data.section2.businessNeedType) {
            var types = { revenue: 'Générer des revenus', expenses: 'Contenir les dépenses', compliance: 'Conformité réglementaire', quality: 'Améliorer la qualité' };
            lines.push('**Type :** ' + (types[data.section2.businessNeedType] || data.section2.businessNeedType));
            lines.push('');
        }
        if (data.section2.businessStatement) {
            lines.push('**Énoncé mesurable :**');
            lines.push(data.section2.businessStatement);
            lines.push('');
        }

        // Section 3
        lines.push('## 3. Performance désirée');
        lines.push('');
        if (data.section3.desiredScenario) {
            lines.push('**Scénario :**');
            lines.push(data.section3.desiredScenario);
            lines.push('');
        }
        if (data.section3.performanceIndicators) {
            lines.push('**Indicateurs :**');
            lines.push(data.section3.performanceIndicators);
            lines.push('');
        }

        // Section 4
        lines.push('## 4. Performance actuelle');
        lines.push('');
        if (data.section4.currentScenario) {
            lines.push('**Scénario :**');
            lines.push(data.section4.currentScenario);
            lines.push('');
        }
        if (data.section4.performanceGap) {
            lines.push('**Écart :**');
            lines.push(data.section4.performanceGap);
            lines.push('');
        }

        // Section 5
        lines.push('## 5. Analyse des tâches');
        lines.push('');
        if (data.section5.mainTasks.length) {
            lines.push('**Tâches principales :**');
            for (var i = 0; i < data.section5.mainTasks.length; i++) {
                if (data.section5.mainTasks[i]) {
                    lines.push((i + 1) + '. ' + data.section5.mainTasks[i]);
                }
            }
            lines.push('');
        }
        if (data.section5.entryTasks) {
            lines.push('**Prérequis :**');
            lines.push(data.section5.entryTasks);
            lines.push('');
        }

        // Section 6
        lines.push('## 6. Profil des apprenants');
        lines.push('');
        if (data.section6.learnerCount) lines.push('**Nombre :** ' + data.section6.learnerCount);
        if (data.section6.experienceLevel) lines.push('**Niveau :** ' + data.section6.experienceLevel);
        if (data.section6.learnerProfile) {
            lines.push('');
            lines.push(data.section6.learnerProfile);
        }
        if (data.section6.gradeLevel) lines.push('**Niveau scolaire :** ' + data.section6.gradeLevel);
        if (data.section6.academicProgram) lines.push('**Programme :** ' + data.section6.academicProgram);
        if (data.section6.jobTitle) lines.push('**Poste :** ' + data.section6.jobTitle);
        lines.push('');

        // Section 7
        lines.push('## 7. Facteurs d\'influence');
        lines.push('');
        if (data.section7.learningBarriers) {
            lines.push('**Obstacles :**');
            lines.push(data.section7.learningBarriers);
            lines.push('');
        }
        if (data.section7.supportFactors) {
            lines.push('**Soutien :**');
            lines.push(data.section7.supportFactors);
            lines.push('');
        }
        if (data.section7.learningEnvironment) {
            lines.push('**Environnement :**');
            lines.push(data.section7.learningEnvironment);
            lines.push('');
        }

        // Section 8
        lines.push('## 8. Contraintes du projet');
        lines.push('');
        if (data.section8.projectDeadline) lines.push('**Date de lancement :** ' + data.section8.projectDeadline);
        if (data.section8.projectBudget) lines.push('**Budget :** ' + data.section8.projectBudget);
        var formats = [];
        if (data.section8.formatClassroom) formats.push('présentiel');
        if (data.section8.formatVirtual) formats.push('classe virtuelle');
        if (data.section8.formatSelfStudy) formats.push('autoformation');
        if (data.section8.formatBlended) formats.push('mixte');
        if (formats.length) lines.push('**Formats :** ' + formats.join(', '));
        if (data.section8.otherConstraints) {
            lines.push('');
            lines.push('**Autres contraintes :**');
            lines.push(data.section8.otherConstraints);
        }
        lines.push('');

        // Synthesis
        lines.push('## Synthèse et recommandations');
        lines.push('');
        if (data.synthesis.keyFindings) {
            lines.push('**Constats clés :**');
            lines.push(data.synthesis.keyFindings);
            lines.push('');
        }
        if (data.synthesis.isTrainingSolution) {
            var sol = { yes: 'Oui', partial: 'Partiellement', no: 'Non' };
            lines.push('**La formation est-elle appropriée ?** ' + (sol[data.synthesis.isTrainingSolution] || ''));
            lines.push('');
        }
        if (data.synthesis.recommendations) {
            lines.push('**Recommandations :**');
            lines.push(data.synthesis.recommendations);
            lines.push('');
        }

        var md = lines.join('\n');
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'analyse_besoins_' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    // ========================================
    // Reset
    // ========================================
    window.resetAnalysis = function () {
        if (!confirm('Voulez-vous vraiment réinitialiser le formulaire ?')) return;

        // Clear all text inputs and textareas
        document.querySelectorAll('#analysisForm input[type="text"], #analysisForm input[type="number"], #analysisForm input[type="date"], #analysisForm textarea').forEach(function (el) {
            el.value = '';
        });

        // Uncheck all radios and checkboxes
        document.querySelectorAll('#analysisForm input[type="radio"], #analysisForm input[type="checkbox"]').forEach(function (el) {
            el.checked = false;
        });

        // Reset selects
        document.querySelectorAll('#analysisForm select').forEach(function (el) {
            el.selectedIndex = 0;
        });

        // Clear task list and re-add 3 defaults
        var container = document.getElementById('mainTasksList');
        if (container) container.innerHTML = '';
        mainTaskCount = 0;
        for (var i = 0; i < 3; i++) addMainTask();

        // Reset context fields
        document.getElementById('contextSelect').value = 'general';
        updateContextFields('general');
    };

    // ========================================
    // Modals
    // ========================================
    window.openHelpModal = function () {
        document.getElementById('helpModal').style.display = 'block';
    };
    window.closeHelpModal = function () {
        document.getElementById('helpModal').style.display = 'none';
    };
    window.openInfoModal = function () {
        document.getElementById('infoModal').style.display = 'block';
    };
    window.closeInfoModal = function () {
        document.getElementById('infoModal').style.display = 'none';
    };

    // Close modals on backdrop click
    window.addEventListener('click', function (e) {
        if (e.target.classList && e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // ========================================
    // Initialize
    // ========================================
    document.addEventListener('DOMContentLoaded', function () {
        // Add 3 initial task fields
        for (var i = 0; i < 3; i++) {
            addMainTask();
        }
    });
})();
