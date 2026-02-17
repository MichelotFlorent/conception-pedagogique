/**
 * Analyse de la situation - JavaScript
 * Based on Carliner (2015) - Training Design Basics
 * Enhanced with Performance Gap Analysis module
 */

(function () {
    'use strict';

    var mainTaskCount = 0;
    var gapChart = null;

    // ========================================
    // Language switching
    // ========================================
    window.switchLang = function (code) {
        if (code && typeof i18nCore !== 'undefined' && i18nCore.translations && i18nCore.translations[code]) {
            i18nCore.setLang(code);
        }
    };

    // ========================================
    // Business Need Checkboxes (max 2)
    // ========================================
    window.limitBusinessNeedCheckboxes = function (checkbox) {
        var checkboxes = document.querySelectorAll('input[name="businessNeedType"]:checked');
        if (checkboxes.length > 2) {
            checkbox.checked = false;
            var msg = getTranslation('analysis_max_2_selections') || 'Maximum 2 sélections autorisées.';
            alert(msg);
        }
    };

    window.toggleOtherNeedField = function (checkbox) {
        var otherField = document.getElementById('otherNeedField');
        if (otherField) {
            if (checkbox.checked) {
                otherField.classList.remove('hidden');
            } else {
                otherField.classList.add('hidden');
                var otherInput = document.getElementById('businessNeedOther');
                if (otherInput) otherInput.value = '';
            }
        }
    };

    // ========================================
    // Gap Visualizer Chart (Stacked Horizontal Bars)
    // ========================================
    window.initGapChart = function () {
        var ctx = document.getElementById('gapChart');
        if (!ctx) return;

        gapChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [getTranslation('analysis_chart_label') || 'Performance'],
                datasets: [
                    {
                        label: getTranslation('analysis_legend_actual') || 'Valeur actuelle',
                        data: [0],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 2,
                        borderRadius: 4
                    },
                    {
                        label: getTranslation('analysis_legend_gap') || 'Écart à combler',
                        data: [0],
                        backgroundColor: 'rgba(34, 197, 94, 0.4)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 2,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 16,
                            padding: 15,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                var unit = document.getElementById('gapUnit')?.value || '';
                                return context.dataset.label + ': ' + context.raw + ' ' + unit;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        stacked: true,
                        grid: { display: false }
                    }
                }
            }
        });
    };

    window.updateGapChart = function () {
        if (!gapChart) return;

        var actual = parseFloat(document.getElementById('gapActualValue')?.value) || 0;
        var optimal = parseFloat(document.getElementById('gapOptimalValue')?.value) || 0;
        var gap = Math.max(0, optimal - actual);

        // Update stacked bar data
        gapChart.data.datasets[0].data = [actual];
        gapChart.data.datasets[1].data = [gap];
        gapChart.update();

        // Auto-generate gap statement
        var unit = document.getElementById('gapUnit')?.value || '';
        if (actual > 0 || optimal > 0) {
            var statement = (getTranslation('analysis_gap_auto') || 'Actuel : {actual} ; Désiré : {optimal} ; Écart : {gap}')
                .replace('{actual}', actual + ' ' + unit)
                .replace('{optimal}', optimal + ' ' + unit)
                .replace('{gap}', gap + ' ' + unit);

            var gapStatementField = document.getElementById('gapStatement');
            if (gapStatementField && !gapStatementField.value) {
                gapStatementField.placeholder = statement;
            }
        }
    };

    // ========================================
    // Survival Test Handler
    // ========================================
    window.handleSurvivalTestChange = function (value) {
        var alert = document.getElementById('nonInstructionalAlert');
        if (!alert) return;

        if (value === 'yes') {
            alert.classList.remove('hidden');
            alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            alert.classList.add('hidden');
        }
    };

    // Helper function for translations
    function getTranslation(key) {
        if (typeof i18nCore !== 'undefined' && i18nCore.t) {
            return i18nCore.t(key);
        }
        return null;
    }

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
        var checkedCheckboxes = function (name) {
            var els = document.querySelectorAll('input[name="' + name + '"]:checked');
            var values = [];
            els.forEach(function (el) { values.push(el.value); });
            return values;
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
            version: '1.1',
            tool: 'analyse-situation',
            createdAt: new Date().toISOString(),
            context: val('contextSelect'),
            section1: {
                sponsorName: val('sponsorName'),
                requestOriginal: val('requestOriginal'),
                requestReformulated: val('requestReformulated')
            },
            section2: {
                businessNeedTypes: checkedCheckboxes('businessNeedType'),
                businessNeedOther: val('businessNeedOther'),
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
            },
            // Performance Gap Analysis sections
            gapAnalysis: {
                optimalPerformance: val('optimalPerformance'),
                actualPerformance: val('actualPerformance'),
                gapActualValue: val('gapActualValue'),
                gapOptimalValue: val('gapOptimalValue'),
                gapUnit: val('gapUnit'),
                gapStatement: val('gapStatement'),
                gapFrequency: val('gapFrequency')
            },
            rootCauseFilter: {
                survivalTest: checkedRadio('survivalTest'),
                envToolsEquipment: val('envToolsEquipment'),
                envProcedures: val('envProcedures'),
                envFeedback: val('envFeedback'),
                motConsequences: val('motConsequences'),
                motValueAlignment: val('motValueAlignment'),
                ksPrerequisite: val('ksPrerequisite'),
                ksComplexity: val('ksComplexity')
            },
            impactAnalysis: {
                costInaction: val('costInaction'),
                smartGoal: val('smartGoal'),
                dropDeadDeadline: val('dropDeadDeadline'),
                maxBudget: val('maxBudget')
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
            // Handle checkboxes for businessNeedTypes (new format)
            if (data.section2.businessNeedTypes && Array.isArray(data.section2.businessNeedTypes)) {
                data.section2.businessNeedTypes.forEach(function (val) {
                    var el = document.querySelector('input[name="businessNeedType"][value="' + val + '"]');
                    if (el) el.checked = true;
                    if (val === 'other') {
                        var otherField = document.getElementById('otherNeedField');
                        if (otherField) otherField.classList.remove('hidden');
                    }
                });
            } else if (data.section2.businessNeedType) {
                // Backwards compatibility with old radio format
                var el = document.querySelector('input[name="businessNeedType"][value="' + data.section2.businessNeedType + '"]');
                if (el) el.checked = true;
            }
            setVal('businessNeedOther', data.section2.businessNeedOther);
            setVal('businessStatement', data.section2.businessStatement);
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

        // Gap Analysis
        if (data.gapAnalysis) {
            setVal('optimalPerformance', data.gapAnalysis.optimalPerformance);
            setVal('actualPerformance', data.gapAnalysis.actualPerformance);
            setVal('gapActualValue', data.gapAnalysis.gapActualValue);
            setVal('gapOptimalValue', data.gapAnalysis.gapOptimalValue);
            setVal('gapUnit', data.gapAnalysis.gapUnit);
            setVal('gapStatement', data.gapAnalysis.gapStatement);
            setVal('gapFrequency', data.gapAnalysis.gapFrequency);
            // Update chart after loading values
            setTimeout(function () { updateGapChart(); }, 100);
        }

        // Root Cause Filter
        if (data.rootCauseFilter) {
            setRadio('survivalTest', data.rootCauseFilter.survivalTest);
            if (data.rootCauseFilter.survivalTest) {
                handleSurvivalTestChange(data.rootCauseFilter.survivalTest);
            }
            setVal('envToolsEquipment', data.rootCauseFilter.envToolsEquipment);
            setVal('envProcedures', data.rootCauseFilter.envProcedures);
            setVal('envFeedback', data.rootCauseFilter.envFeedback);
            setVal('motConsequences', data.rootCauseFilter.motConsequences);
            setVal('motValueAlignment', data.rootCauseFilter.motValueAlignment);
            setVal('ksPrerequisite', data.rootCauseFilter.ksPrerequisite);
            setVal('ksComplexity', data.rootCauseFilter.ksComplexity);
        }

        // Impact Analysis
        if (data.impactAnalysis) {
            setVal('costInaction', data.impactAnalysis.costInaction);
            setVal('smartGoal', data.impactAnalysis.smartGoal);
            setVal('dropDeadDeadline', data.impactAnalysis.dropDeadDeadline);
            setVal('maxBudget', data.impactAnalysis.maxBudget);
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
        a.download = 'analyse_situation_' + new Date().toISOString().slice(0, 10) + '.json';
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

        lines.push('# Analyse de la situation');
        lines.push('');
        lines.push('*Date : ' + new Date().toLocaleDateString('fr-CA') + '*');
        lines.push('*Contexte : ' + (ctx[data.context] || data.context) + '*');
        lines.push('');
        lines.push('---');
        lines.push('');

        // Section 1: Clarification de la demande
        lines.push('## 1. Clarification de la demande');
        lines.push('');
        if (data.section1.sponsorName) {
            lines.push('**Commanditaire/Instance :** ' + data.section1.sponsorName);
            lines.push('');
        }
        if (data.section1.requestOriginal) {
            lines.push('**Demande formulée :**');
            lines.push(data.section1.requestOriginal);
            lines.push('');
        }
        if (data.section1.requestReformulated) {
            lines.push('**Demande reformulée :**');
            lines.push(data.section1.requestReformulated);
            lines.push('');
        }

        // Section 2: Besoin organisationnel
        lines.push('## 2. Besoin organisationnel');
        lines.push('');
        if (data.section2.businessNeedTypes && data.section2.businessNeedTypes.length > 0) {
            var typeLabels = {
                revenue: 'Générer des revenus',
                expenses: 'Contenir les dépenses',
                compliance: 'Se conformer à une norme',
                quality: 'Améliorer la qualité',
                other: 'Autre'
            };
            var typeText = data.section2.businessNeedTypes.map(function (t) { return typeLabels[t] || t; }).join(', ');
            if (data.section2.businessNeedOther && data.section2.businessNeedTypes.indexOf('other') >= 0) {
                typeText += ' (' + data.section2.businessNeedOther + ')';
            }
            lines.push('**Type de besoin :** ' + typeText);
            lines.push('');
        }
        if (data.section2.businessStatement) {
            lines.push('**Énoncé des besoins (mesurables) :**');
            lines.push(data.section2.businessStatement);
            lines.push('');
        }

        // Section 3: Analyse de l'écart de performance (moved from section 9)
        lines.push('## 3. Analyse de l\'écart de performance');
        lines.push('');
        if (data.gapAnalysis) {
            if (data.gapAnalysis.optimalPerformance) {
                lines.push('**Performance optimale :**');
                lines.push(data.gapAnalysis.optimalPerformance);
                lines.push('');
            }
            if (data.gapAnalysis.actualPerformance) {
                lines.push('**Performance réelle :**');
                lines.push(data.gapAnalysis.actualPerformance);
                lines.push('');
            }
            if (data.gapAnalysis.gapStatement) {
                lines.push('**Énoncé de l\'écart :** ' + data.gapAnalysis.gapStatement);
                lines.push('');
            }
            if (data.gapAnalysis.gapFrequency) {
                lines.push('**Fréquence et étendue :**');
                lines.push(data.gapAnalysis.gapFrequency);
                lines.push('');
            }
        }

        // Section 4: Analyse des tâches
        lines.push('## 4. Analyse des tâches');
        lines.push('');
        if (data.section5 && data.section5.mainTasks && data.section5.mainTasks.length) {
            lines.push('**Tâches principales :**');
            for (var i = 0; i < data.section5.mainTasks.length; i++) {
                if (data.section5.mainTasks[i]) {
                    lines.push((i + 1) + '. ' + data.section5.mainTasks[i]);
                }
            }
            lines.push('');
        }
        if (data.section5 && data.section5.entryTasks) {
            lines.push('**Prérequis :**');
            lines.push(data.section5.entryTasks);
            lines.push('');
        }

        // Section 5: Profil des apprenant·es
        lines.push('## 5. Profil des apprenant·es');
        lines.push('');
        if (data.section6) {
            if (data.section6.learnerCount) lines.push('**Nombre d\'apprenant·es :** ' + data.section6.learnerCount);
            if (data.section6.experienceLevel) lines.push('**Niveau d\'expérience :** ' + data.section6.experienceLevel);
            if (data.section6.learnerProfile) {
                lines.push('');
                lines.push('**Profil détaillé :**');
                lines.push(data.section6.learnerProfile);
            }
            if (data.section6.gradeLevel) lines.push('**Niveau scolaire :** ' + data.section6.gradeLevel);
            if (data.section6.academicProgram) lines.push('**Programme :** ' + data.section6.academicProgram);
            if (data.section6.jobTitle) lines.push('**Poste :** ' + data.section6.jobTitle);
            lines.push('');
        }

        // Section 6: Facteurs d'influence
        lines.push('## 6. Facteurs d\'influence');
        lines.push('');
        if (data.section7) {
            if (data.section7.learningBarriers) {
                lines.push('**Obstacles à l\'apprentissage :**');
                lines.push(data.section7.learningBarriers);
                lines.push('');
            }
            if (data.section7.supportFactors) {
                lines.push('**Facteurs de soutien :**');
                lines.push(data.section7.supportFactors);
                lines.push('');
            }
            if (data.section7.learningEnvironment) {
                lines.push('**Environnement d\'apprentissage :**');
                lines.push(data.section7.learningEnvironment);
                lines.push('');
            }
        }

        // Section 7: Contraintes du projet
        lines.push('## 7. Contraintes du projet');
        lines.push('');
        if (data.section8) {
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
        }

        // Section 8: Étude approfondie des causes
        lines.push('## 8. Étude approfondie des causes');
        lines.push('');
        if (data.rootCauseFilter) {
            var survivalResult = { yes: 'OUI - Environnemental/Motivationnel', no: 'NON - Déficit de compétences' };
            if (data.rootCauseFilter.survivalTest) {
                lines.push('**Test de capacité :** ' + (survivalResult[data.rootCauseFilter.survivalTest] || ''));
                lines.push('');
            }

            lines.push('### A. Facteurs environnementaux');
            if (data.rootCauseFilter.envToolsEquipment) lines.push('- **Outils et équipements :** ' + data.rootCauseFilter.envToolsEquipment);
            if (data.rootCauseFilter.envProcedures) lines.push('- **Processus et procédures :** ' + data.rootCauseFilter.envProcedures);
            if (data.rootCauseFilter.envFeedback) lines.push('- **Systèmes de rétroaction :** ' + data.rootCauseFilter.envFeedback);
            lines.push('');

            lines.push('### B. Facteurs motivationnels');
            if (data.rootCauseFilter.motConsequences) lines.push('- **Conséquences :** ' + data.rootCauseFilter.motConsequences);
            if (data.rootCauseFilter.motValueAlignment) lines.push('- **Alignement des valeurs :** ' + data.rootCauseFilter.motValueAlignment);
            lines.push('');

            lines.push('### C. Facteurs de connaissances et compétences');
            if (data.rootCauseFilter.ksPrerequisite) lines.push('- **Vérification des prérequis :** ' + data.rootCauseFilter.ksPrerequisite);
            if (data.rootCauseFilter.ksComplexity) lines.push('- **Complexité et fréquence :** ' + data.rootCauseFilter.ksComplexity);
            lines.push('');
        }

        // Section 9: Analyse d'impact et de valeur
        lines.push('## 9. Analyse d\'impact et de valeur');
        lines.push('');
        if (data.impactAnalysis) {
            if (data.impactAnalysis.costInaction) {
                lines.push('**Coût de l\'inaction :**');
                lines.push(data.impactAnalysis.costInaction);
                lines.push('');
            }
            if (data.impactAnalysis.smartGoal) {
                lines.push('**Objectif SMART :**');
                lines.push(data.impactAnalysis.smartGoal);
                lines.push('');
            }
            if (data.impactAnalysis.dropDeadDeadline) lines.push('**Date limite impérative :** ' + data.impactAnalysis.dropDeadDeadline);
            if (data.impactAnalysis.maxBudget) lines.push('**Budget maximum :** ' + data.impactAnalysis.maxBudget);
            lines.push('');
        }

        // Synthèse et recommandations
        lines.push('## Synthèse et recommandations');
        lines.push('');
        if (data.synthesis) {
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
        }

        // Determine solution type for summary
        var solutionType = 'À déterminer';
        if (data.rootCauseFilter && data.rootCauseFilter.survivalTest === 'yes') {
            solutionType = 'NON PÉDAGOGIQUE (environnemental/motivationnel)';
        } else if (data.rootCauseFilter && data.rootCauseFilter.survivalTest === 'no') {
            solutionType = 'PÉDAGOGIQUE (déficit de compétences)';
        }
        lines.push('---');
        lines.push('');
        lines.push('**Type de solution recommandé :** ' + solutionType);
        lines.push('');

        var md = lines.join('\n');
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'analyse_situation_' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    // ========================================
    // Export Word (.docx)
    // ========================================
    window.exportAnalysisWord = function () {
        if (!window.docx || !window.docx.Document) {
            alert(getTranslation('analysis_docx_not_available') || "La bibliothèque d'export Word n'est pas disponible.");
            return;
        }

        var data = collectFormData();
        var Document = window.docx.Document;
        var Packer = window.docx.Packer;
        var Paragraph = window.docx.Paragraph;
        var TextRun = window.docx.TextRun;

        var safe = function (s) { return (s || '').toString().trim(); };
        var children = [];

        // Styles: Helvetica for headings (burgundy), Garamond for body
        var burgundy = '912338';

        // Helper functions for styled paragraphs
        var createTitle = function (text) {
            return new Paragraph({
                children: [new TextRun({
                    text: text,
                    font: 'Helvetica',
                    size: 32, // 16pt
                    color: burgundy,
                    bold: true
                })],
                spacing: { after: 200 }
            });
        };

        var createHeading = function (text) {
            return new Paragraph({
                children: [new TextRun({
                    text: text,
                    font: 'Helvetica',
                    size: 28, // 14pt
                    color: burgundy,
                    bold: true
                })],
                spacing: { before: 400, after: 200 }
            });
        };

        var createSubheading = function (text) {
            return new Paragraph({
                children: [new TextRun({
                    text: text,
                    font: 'Helvetica',
                    size: 24, // 12pt
                    color: burgundy,
                    bold: true
                })],
                spacing: { before: 300, after: 150 }
            });
        };

        var createLabelValue = function (label, value) {
            return new Paragraph({
                children: [
                    new TextRun({ text: label, font: 'Garamond', size: 24, bold: true }),
                    new TextRun({ text: value, font: 'Garamond', size: 24 })
                ]
            });
        };

        var createLabel = function (label) {
            return new Paragraph({
                children: [new TextRun({ text: label, font: 'Garamond', size: 24, bold: true })]
            });
        };

        var createBody = function (text) {
            return new Paragraph({
                children: [new TextRun({ text: text, font: 'Garamond', size: 24 })]
            });
        };

        var createIndentedBody = function (text) {
            return new Paragraph({
                children: [new TextRun({ text: text, font: 'Garamond', size: 24 })],
                indent: { left: 360 }
            });
        };

        // Title (H1: 16pt Helvetica, burgundy)
        children.push(createTitle(getTranslation('analysis_heading') || 'Analyse de la situation'));

        // Date
        children.push(createLabelValue('Date : ', new Date().toLocaleDateString('fr-CA')));
        children.push(new Paragraph({ spacing: { after: 400 } }));

        // Section 1: Clarification de la demande
        children.push(createHeading('1. Clarification de la demande'));
        if (safe(data.section1.sponsorName)) {
            children.push(createLabelValue('Commanditaire : ', safe(data.section1.sponsorName)));
        }
        if (safe(data.section1.requestOriginal)) {
            children.push(createLabel('Demande formulée :'));
            children.push(createBody(safe(data.section1.requestOriginal)));
        }
        if (safe(data.section1.requestReformulated)) {
            children.push(createLabel('Demande reformulée :'));
            children.push(createBody(safe(data.section1.requestReformulated)));
        }

        // Section 2: Besoin organisationnel
        children.push(createHeading('2. Besoin organisationnel'));
        if (data.section2.businessNeedTypes && data.section2.businessNeedTypes.length > 0) {
            var typeLabels = {
                revenue: 'Générer des revenus',
                expenses: 'Contenir les dépenses',
                compliance: 'Se conformer à une norme',
                quality: 'Améliorer la qualité',
                other: 'Autre'
            };
            var typeText = data.section2.businessNeedTypes.map(function (t) { return typeLabels[t] || t; }).join(', ');
            if (data.section2.businessNeedOther && data.section2.businessNeedTypes.indexOf('other') >= 0) {
                typeText += ' (' + data.section2.businessNeedOther + ')';
            }
            children.push(createLabelValue('Type de besoin : ', typeText));
        }
        if (safe(data.section2.businessStatement)) {
            children.push(createLabel('Énoncé des besoins :'));
            children.push(createBody(safe(data.section2.businessStatement)));
        }

        // Section 3: Analyse de l'écart de performance
        children.push(createHeading("3. Analyse de l'écart de performance"));
        if (data.gapAnalysis) {
            if (safe(data.gapAnalysis.optimalPerformance)) {
                children.push(createLabel('Performance optimale :'));
                children.push(createBody(safe(data.gapAnalysis.optimalPerformance)));
            }
            if (safe(data.gapAnalysis.actualPerformance)) {
                children.push(createLabel('Performance réelle :'));
                children.push(createBody(safe(data.gapAnalysis.actualPerformance)));
            }
            if (safe(data.gapAnalysis.gapStatement)) {
                children.push(createLabelValue("Énoncé de l'écart : ", safe(data.gapAnalysis.gapStatement)));
            }
            if (safe(data.gapAnalysis.gapFrequency)) {
                children.push(createLabel('Fréquence et étendue :'));
                children.push(createBody(safe(data.gapAnalysis.gapFrequency)));
            }
        }

        // Section 4: Analyse des tâches
        children.push(createHeading('4. Analyse des tâches'));
        if (data.section5 && data.section5.mainTasks && data.section5.mainTasks.length) {
            children.push(createLabel('Tâches principales :'));
            data.section5.mainTasks.forEach(function (task, i) {
                if (safe(task)) {
                    children.push(createIndentedBody((i + 1) + '. ' + safe(task)));
                }
            });
        }
        if (safe(data.section5.entryTasks)) {
            children.push(createLabel('Prérequis :'));
            children.push(createBody(safe(data.section5.entryTasks)));
        }

        // Section 5: Profil des apprenant·es
        children.push(createHeading('5. Profil des apprenant·es'));
        if (data.section6) {
            if (safe(data.section6.learnerCount)) {
                children.push(createLabelValue("Nombre d'apprenant·es : ", safe(data.section6.learnerCount)));
            }
            if (safe(data.section6.experienceLevel)) {
                children.push(createLabelValue("Niveau d'expérience : ", safe(data.section6.experienceLevel)));
            }
            if (safe(data.section6.learnerProfile)) {
                children.push(createLabel('Profil détaillé :'));
                children.push(createBody(safe(data.section6.learnerProfile)));
            }
        }

        // Section 6: Facteurs d'influence
        children.push(createHeading("6. Facteurs d'influence"));
        if (data.section7) {
            if (safe(data.section7.learningBarriers)) {
                children.push(createLabel("Obstacles à l'apprentissage :"));
                children.push(createBody(safe(data.section7.learningBarriers)));
            }
            if (safe(data.section7.supportFactors)) {
                children.push(createLabel('Facteurs de soutien :'));
                children.push(createBody(safe(data.section7.supportFactors)));
            }
            if (safe(data.section7.learningEnvironment)) {
                children.push(createLabel("Environnement d'apprentissage :"));
                children.push(createBody(safe(data.section7.learningEnvironment)));
            }
        }

        // Section 7: Contraintes du projet
        children.push(createHeading('7. Contraintes du projet'));
        if (data.section8) {
            if (safe(data.section8.projectDeadline)) {
                children.push(createLabelValue('Date de lancement : ', safe(data.section8.projectDeadline)));
            }
            if (safe(data.section8.projectBudget)) {
                children.push(createLabelValue('Budget : ', safe(data.section8.projectBudget)));
            }
            var formats = [];
            if (data.section8.formatClassroom) formats.push('présentiel');
            if (data.section8.formatVirtual) formats.push('classe virtuelle');
            if (data.section8.formatSelfStudy) formats.push('autoformation');
            if (data.section8.formatBlended) formats.push('mixte');
            if (formats.length) {
                children.push(createLabelValue('Formats : ', formats.join(', ')));
            }
            if (safe(data.section8.otherConstraints)) {
                children.push(createLabel('Autres contraintes :'));
                children.push(createBody(safe(data.section8.otherConstraints)));
            }
        }

        // Section 8: Étude approfondie des causes
        children.push(createHeading('8. Étude approfondie des causes'));
        if (data.rootCauseFilter) {
            var survivalResult = { yes: 'OUI - Environnemental/Motivationnel', no: 'NON - Déficit de compétences' };
            if (safe(data.rootCauseFilter.survivalTest)) {
                children.push(createLabelValue('Test de capacité : ', survivalResult[data.rootCauseFilter.survivalTest] || ''));
            }

            // Sous-section A: Facteurs environnementaux
            children.push(createSubheading('A. Facteurs environnementaux'));
            if (safe(data.rootCauseFilter.envToolsEquipment)) {
                children.push(createLabelValue('Outils et équipements : ', safe(data.rootCauseFilter.envToolsEquipment)));
            }
            if (safe(data.rootCauseFilter.envProcedures)) {
                children.push(createLabelValue('Processus et procédures : ', safe(data.rootCauseFilter.envProcedures)));
            }
            if (safe(data.rootCauseFilter.envFeedback)) {
                children.push(createLabelValue('Systèmes de rétroaction : ', safe(data.rootCauseFilter.envFeedback)));
            }

            // Sous-section B: Facteurs motivationnels
            children.push(createSubheading('B. Facteurs motivationnels'));
            if (safe(data.rootCauseFilter.motConsequences)) {
                children.push(createLabelValue('Conséquences : ', safe(data.rootCauseFilter.motConsequences)));
            }
            if (safe(data.rootCauseFilter.motValueAlignment)) {
                children.push(createLabelValue('Alignement des valeurs : ', safe(data.rootCauseFilter.motValueAlignment)));
            }

            // Sous-section C: Facteurs de connaissances et compétences
            children.push(createSubheading('C. Facteurs de connaissances et compétences'));
            if (safe(data.rootCauseFilter.ksPrerequisite)) {
                children.push(createLabelValue('Vérification des prérequis : ', safe(data.rootCauseFilter.ksPrerequisite)));
            }
            if (safe(data.rootCauseFilter.ksComplexity)) {
                children.push(createLabelValue('Complexité et fréquence : ', safe(data.rootCauseFilter.ksComplexity)));
            }
        }

        // Section 9: Analyse d'impact et de valeur
        children.push(createHeading("9. Analyse d'impact et de valeur"));
        if (data.impactAnalysis) {
            if (safe(data.impactAnalysis.costInaction)) {
                children.push(createLabel("Coût de l'inaction :"));
                children.push(createBody(safe(data.impactAnalysis.costInaction)));
            }
            if (safe(data.impactAnalysis.smartGoal)) {
                children.push(createLabel('Objectif SMART :'));
                children.push(createBody(safe(data.impactAnalysis.smartGoal)));
            }
            if (safe(data.impactAnalysis.dropDeadDeadline)) {
                children.push(createLabelValue('Date limite : ', safe(data.impactAnalysis.dropDeadDeadline)));
            }
            if (safe(data.impactAnalysis.maxBudget)) {
                children.push(createLabelValue('Budget maximum : ', safe(data.impactAnalysis.maxBudget)));
            }
        }

        // Synthèse
        children.push(createHeading('Synthèse et recommandations'));
        if (data.synthesis) {
            if (safe(data.synthesis.keyFindings)) {
                children.push(createLabel('Constats clés :'));
                children.push(createBody(safe(data.synthesis.keyFindings)));
            }
            if (safe(data.synthesis.isTrainingSolution)) {
                var sol = { yes: 'Oui', partial: 'Partiellement', no: 'Non' };
                children.push(createLabelValue('La formation est-elle appropriée ? ', sol[data.synthesis.isTrainingSolution] || ''));
            }
            if (safe(data.synthesis.recommendations)) {
                children.push(createLabel('Recommandations :'));
                children.push(createBody(safe(data.synthesis.recommendations)));
            }
        }

        // Type de solution recommandé
        var solutionType = 'À déterminer';
        if (data.rootCauseFilter && data.rootCauseFilter.survivalTest === 'yes') {
            solutionType = 'NON PÉDAGOGIQUE (environnemental/motivationnel)';
        } else if (data.rootCauseFilter && data.rootCauseFilter.survivalTest === 'no') {
            solutionType = 'PÉDAGOGIQUE (déficit de compétences)';
        }
        children.push(new Paragraph({ spacing: { before: 300 } }));
        children.push(createLabelValue('Type de solution recommandé : ', solutionType));

        // Create document
        var doc = new Document({
            sections: [{
                properties: {},
                children: children
            }]
        });

        // Generate and download
        Packer.toBlob(doc).then(function (blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'analyse_situation_' + new Date().toISOString().slice(0, 10) + '.docx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 500);
        });
    };

    // ========================================
    // Reset
    // ========================================
    window.resetAnalysis = function () {
        var confirmMsg = getTranslation('analysis_reset_confirm') || 'Êtes-vous certain·e de supprimer le contenu de cette page? Cette action est irréversible.';
        if (!confirm(confirmMsg)) return;

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

        // Hide "Other" field for business need
        var otherField = document.getElementById('otherNeedField');
        if (otherField) otherField.classList.add('hidden');

        // Reset Gap Chart (stacked bars)
        if (gapChart) {
            gapChart.data.datasets[0].data = [0];
            gapChart.data.datasets[1].data = [0];
            gapChart.update();
        }

        // Hide Non-Instructional Alert
        var alert = document.getElementById('nonInstructionalAlert');
        if (alert) alert.classList.add('hidden');
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

        // Initialize Gap Visualizer Chart
        if (typeof Chart !== 'undefined') {
            initGapChart();
        }
    });
})();
