/**
 * Plan d'évaluation (Kirkpatrick) - JavaScript
 * Based on Kirkpatrick Four-Level Model
 */

(function () {
    'use strict';

    // ========================================
    // Level 4 Toggle
    // ========================================
    window.toggleLevel4 = function () {
        var checkbox = document.getElementById('l4Required');
        var content = document.getElementById('level4Content');
        if (!checkbox || !content) return;

        if (checkbox.checked) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    };

    // ========================================
    // Timeline Update
    // ========================================
    window.updateTimeline = function () {
        // Level 1
        var l1When = document.querySelector('input[name="l1When"]:checked');
        var l1WhenText = l1When ? getRadioLabel(l1When) : '-';
        document.getElementById('timeline1When').textContent = l1WhenText;

        var l1Methods = [];
        if (document.getElementById('l1Likert')?.checked) l1Methods.push('Likert');
        if (document.getElementById('l1NPS')?.checked) l1Methods.push('NPS');
        if (document.getElementById('l1OpenEnded')?.checked) l1Methods.push('Questions ouvertes');
        if (document.getElementById('l1InClass')?.checked) l1Methods.push('Sondage en classe');
        document.getElementById('timeline1Method').textContent = l1Methods.length ? l1Methods.join(', ') : '-';

        document.getElementById('timeline1Who').textContent = document.getElementById('l1Who')?.value || '-';

        // Level 2
        var l2When = [];
        if (document.getElementById('l2PrePost')?.checked) l2When.push('Pré/Post-test');
        if (document.getElementById('l2Embedded')?.checked) l2When.push('Intégré');
        if (document.getElementById('l2Final')?.checked) l2When.push('Examen final');
        document.getElementById('timeline2When').textContent = l2When.length ? l2When.join(', ') : '-';

        var l2Methods = [];
        if (document.getElementById('l2MCQ')?.checked) l2Methods.push('QCM');
        if (document.getElementById('l2Simulation')?.checked) l2Methods.push('Simulation');
        if (document.getElementById('l2Observation')?.checked) l2Methods.push('Observation');
        if (document.getElementById('l2Portfolio')?.checked) l2Methods.push('Portfolio');
        document.getElementById('timeline2Method').textContent = l2Methods.length ? l2Methods.join(', ') : '-';

        document.getElementById('timeline2Who').textContent = document.getElementById('l2Who')?.value || '-';

        // Level 3
        document.getElementById('timeline3When').textContent = document.getElementById('l3When')?.value || '-';

        var l3Methods = [];
        if (document.getElementById('l3Checklist')?.checked) l3Methods.push('Checklist terrain');
        if (document.getElementById('l3SelfReport')?.checked) l3Methods.push('Auto-évaluation');
        if (document.getElementById('l3SupervisorInterview')?.checked) l3Methods.push('Entretien superviseur');
        if (document.getElementById('l3Retrospective')?.checked) l3Methods.push('Rétrospective');
        document.getElementById('timeline3Method').textContent = l3Methods.length ? l3Methods.join(', ') : '-';

        document.getElementById('timeline3Who').textContent = document.getElementById('l3Who')?.value || '-';

        // Level 4
        var l4Required = document.getElementById('l4Required')?.checked;
        if (l4Required) {
            document.getElementById('timeline4When').textContent = document.getElementById('l4When')?.value || '-';

            var l4Methods = [];
            if (document.getElementById('l4ControlGroup')?.checked) l4Methods.push('Groupe contrôle');
            if (document.getElementById('l4TrendAnalysis')?.checked) l4Methods.push('Analyse tendances');
            if (document.getElementById('l4StakeholderEstimation')?.checked) l4Methods.push('Estimation parties prenantes');
            document.getElementById('timeline4Method').textContent = l4Methods.length ? l4Methods.join(', ') : '-';

            document.getElementById('timeline4Who').textContent = 'Direction / Analystes';
        } else {
            document.getElementById('timeline4When').textContent = 'N/A';
            document.getElementById('timeline4Method').textContent = 'Non requis';
            document.getElementById('timeline4Who').textContent = '-';
        }
    };

    function getRadioLabel(radioEl) {
        var label = radioEl.closest('label');
        if (label) {
            var span = label.querySelector('span[data-i18n]');
            return span ? span.textContent : label.textContent.trim();
        }
        return radioEl.value;
    }

    // ========================================
    // Collect Form Data
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

        return {
            version: '1.0',
            tool: 'evaluation-kirkpatrick',
            createdAt: new Date().toISOString(),
            level1: {
                who: val('l1Who'),
                instructor: checked('l1Instructor'),
                relevance: checked('l1Relevance'),
                materials: checked('l1Materials'),
                technology: checked('l1Technology'),
                logistics: checked('l1Logistics'),
                when: checkedRadio('l1When'),
                likert: checked('l1Likert'),
                nps: checked('l1NPS'),
                openEnded: checked('l1OpenEnded'),
                inClass: checked('l1InClass'),
                why: val('l1Why')
            },
            level2: {
                who: val('l2Who'),
                knowledge: checked('l2Knowledge'),
                skills: checked('l2Skills'),
                attitudes: checked('l2Attitudes'),
                confidence: checked('l2Confidence'),
                prePost: checked('l2PrePost'),
                embedded: checked('l2Embedded'),
                final: checked('l2Final'),
                mcq: checked('l2MCQ'),
                simulation: checked('l2Simulation'),
                observation: checked('l2Observation'),
                portfolio: checked('l2Portfolio')
            },
            level3: {
                who: val('l3Who'),
                behaviors: val('l3Behaviors'),
                when: val('l3When'),
                checklist: checked('l3Checklist'),
                selfReport: checked('l3SelfReport'),
                supervisorInterview: checked('l3SupervisorInterview'),
                retrospective: checked('l3Retrospective'),
                barriers: val('l3Barriers')
            },
            level4: {
                required: checked('l4Required'),
                monetary: checked('l4Monetary'),
                efficiency: checked('l4Efficiency'),
                retention: checked('l4Retention'),
                quality: checked('l4Quality'),
                gapLink: val('l4GapLink'),
                baseline: val('l4Baseline'),
                controlGroup: checked('l4ControlGroup'),
                trendAnalysis: checked('l4TrendAnalysis'),
                stakeholderEstimation: checked('l4StakeholderEstimation'),
                when: val('l4When')
            }
        };
    }

    // ========================================
    // Populate Form
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

        if (data.level1) {
            setVal('l1Who', data.level1.who);
            setChecked('l1Instructor', data.level1.instructor);
            setChecked('l1Relevance', data.level1.relevance);
            setChecked('l1Materials', data.level1.materials);
            setChecked('l1Technology', data.level1.technology);
            setChecked('l1Logistics', data.level1.logistics);
            setRadio('l1When', data.level1.when);
            setChecked('l1Likert', data.level1.likert);
            setChecked('l1NPS', data.level1.nps);
            setChecked('l1OpenEnded', data.level1.openEnded);
            setChecked('l1InClass', data.level1.inClass);
            setVal('l1Why', data.level1.why);
        }

        if (data.level2) {
            setVal('l2Who', data.level2.who);
            setChecked('l2Knowledge', data.level2.knowledge);
            setChecked('l2Skills', data.level2.skills);
            setChecked('l2Attitudes', data.level2.attitudes);
            setChecked('l2Confidence', data.level2.confidence);
            setChecked('l2PrePost', data.level2.prePost);
            setChecked('l2Embedded', data.level2.embedded);
            setChecked('l2Final', data.level2.final);
            setChecked('l2MCQ', data.level2.mcq);
            setChecked('l2Simulation', data.level2.simulation);
            setChecked('l2Observation', data.level2.observation);
            setChecked('l2Portfolio', data.level2.portfolio);
        }

        if (data.level3) {
            setVal('l3Who', data.level3.who);
            setVal('l3Behaviors', data.level3.behaviors);
            setVal('l3When', data.level3.when);
            setChecked('l3Checklist', data.level3.checklist);
            setChecked('l3SelfReport', data.level3.selfReport);
            setChecked('l3SupervisorInterview', data.level3.supervisorInterview);
            setChecked('l3Retrospective', data.level3.retrospective);
            setVal('l3Barriers', data.level3.barriers);
        }

        if (data.level4) {
            setChecked('l4Required', data.level4.required);
            toggleLevel4();
            setChecked('l4Monetary', data.level4.monetary);
            setChecked('l4Efficiency', data.level4.efficiency);
            setChecked('l4Retention', data.level4.retention);
            setChecked('l4Quality', data.level4.quality);
            setVal('l4GapLink', data.level4.gapLink);
            setVal('l4Baseline', data.level4.baseline);
            setChecked('l4ControlGroup', data.level4.controlGroup);
            setChecked('l4TrendAnalysis', data.level4.trendAnalysis);
            setChecked('l4StakeholderEstimation', data.level4.stakeholderEstimation);
            setVal('l4When', data.level4.when);
        }

        updateTimeline();
    }

    // ========================================
    // Save / Load
    // ========================================
    window.saveEvaluation = function () {
        var data = collectFormData();
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'plan_evaluation_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    window.loadEvaluation = function () {
        document.getElementById('loadFileInput').click();
    };

    window.loadEvalFromFile = function (event) {
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
    window.exportEvaluationMarkdown = function () {
        var data = collectFormData();
        var lines = [];

        lines.push('# Plan d\'évaluation (Modèle de Kirkpatrick)');
        lines.push('');
        lines.push('*Date : ' + new Date().toLocaleDateString('fr-CA') + '*');
        lines.push('');
        lines.push('---');
        lines.push('');

        // Level 1
        lines.push('## Niveau 1 : Réaction');
        lines.push('');
        lines.push('**Responsable :** ' + (data.level1.who || 'À définir'));
        var l1What = [];
        if (data.level1.instructor) l1What.push('Formateur');
        if (data.level1.relevance) l1What.push('Pertinence');
        if (data.level1.materials) l1What.push('Supports');
        if (data.level1.technology) l1What.push('Technologie');
        if (data.level1.logistics) l1What.push('Logistique');
        lines.push('**Éléments mesurés :** ' + (l1What.length ? l1What.join(', ') : 'À définir'));
        lines.push('**Moment :** ' + (data.level1.when || 'À définir'));
        var l1How = [];
        if (data.level1.likert) l1How.push('Likert');
        if (data.level1.nps) l1How.push('NPS');
        if (data.level1.openEnded) l1How.push('Questions ouvertes');
        if (data.level1.inClass) l1How.push('Sondage en classe');
        lines.push('**Méthodes :** ' + (l1How.length ? l1How.join(', ') : 'À définir'));
        if (data.level1.why) {
            lines.push('**Justification :** ' + data.level1.why);
        }
        lines.push('');

        // Level 2
        lines.push('## Niveau 2 : Apprentissage');
        lines.push('');
        lines.push('**Responsable :** ' + (data.level2.who || 'À définir'));
        var l2What = [];
        if (data.level2.knowledge) l2What.push('Connaissances');
        if (data.level2.skills) l2What.push('Compétences');
        if (data.level2.attitudes) l2What.push('Attitudes');
        if (data.level2.confidence) l2What.push('Confiance');
        lines.push('**Types d\'apprentissage :** ' + (l2What.length ? l2What.join(', ') : 'À définir'));
        var l2When = [];
        if (data.level2.prePost) l2When.push('Pré/Post-test');
        if (data.level2.embedded) l2When.push('Intégré');
        if (data.level2.final) l2When.push('Examen final');
        lines.push('**Moment :** ' + (l2When.length ? l2When.join(', ') : 'À définir'));
        var l2How = [];
        if (data.level2.mcq) l2How.push('QCM');
        if (data.level2.simulation) l2How.push('Simulation');
        if (data.level2.observation) l2How.push('Observation');
        if (data.level2.portfolio) l2How.push('Portfolio');
        lines.push('**Méthodes :** ' + (l2How.length ? l2How.join(', ') : 'À définir'));
        lines.push('');

        // Level 3
        lines.push('## Niveau 3 : Comportement');
        lines.push('');
        lines.push('**Responsable :** ' + (data.level3.who || 'À définir'));
        if (data.level3.behaviors) {
            lines.push('**Comportements désirés :**');
            lines.push(data.level3.behaviors);
        }
        lines.push('**Moment :** ' + (data.level3.when || 'À définir'));
        var l3How = [];
        if (data.level3.checklist) l3How.push('Checklist terrain');
        if (data.level3.selfReport) l3How.push('Auto-évaluation');
        if (data.level3.supervisorInterview) l3How.push('Entretien superviseur');
        if (data.level3.retrospective) l3How.push('Rétrospective');
        lines.push('**Méthodes :** ' + (l3How.length ? l3How.join(', ') : 'À définir'));
        if (data.level3.barriers) {
            lines.push('**Obstacles potentiels :** ' + data.level3.barriers);
        }
        lines.push('');

        // Level 4
        lines.push('## Niveau 4 : Résultats');
        lines.push('');
        if (data.level4.required) {
            lines.push('**Statut :** Étude d\'impact requise');
            var l4KPIs = [];
            if (data.level4.monetary) l4KPIs.push('Résultats monétaires');
            if (data.level4.efficiency) l4KPIs.push('Efficacité');
            if (data.level4.retention) l4KPIs.push('Rétention');
            if (data.level4.quality) l4KPIs.push('Qualité');
            lines.push('**KPIs :** ' + (l4KPIs.length ? l4KPIs.join(', ') : 'À définir'));
            if (data.level4.gapLink) {
                lines.push('**Alignement avec l\'écart :** ' + data.level4.gapLink);
            }
            if (data.level4.baseline) {
                lines.push('**Données de référence :** ' + data.level4.baseline);
            }
            var l4How = [];
            if (data.level4.controlGroup) l4How.push('Groupe contrôle');
            if (data.level4.trendAnalysis) l4How.push('Analyse tendances');
            if (data.level4.stakeholderEstimation) l4How.push('Estimation parties prenantes');
            lines.push('**Méthode d\'isolation :** ' + (l4How.length ? l4How.join(', ') : 'À définir'));
            lines.push('**Moment :** ' + (data.level4.when || 'À définir'));
        } else {
            lines.push('**Statut :** Étude d\'impact de Niveau 4 non requise pour ce projet');
        }
        lines.push('');

        lines.push('---');
        lines.push('');
        lines.push('*Rapport d\'évaluation généré avec Learning Designer*');

        var md = lines.join('\n');
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'plan_evaluation_' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    // ========================================
    // Reset
    // ========================================
    window.resetEvaluation = function () {
        if (!confirm('Voulez-vous vraiment réinitialiser le formulaire ?')) return;

        document.querySelectorAll('#evaluationForm input[type="text"], #evaluationForm textarea').forEach(function (el) {
            el.value = '';
        });

        document.querySelectorAll('#evaluationForm input[type="radio"], #evaluationForm input[type="checkbox"]').forEach(function (el) {
            el.checked = false;
        });

        document.getElementById('level4Content')?.classList.add('hidden');
        updateTimeline();
    };

    // ========================================
    // Details toggle animation
    // ========================================
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('details').forEach(function (details) {
            var icon = details.querySelector('.rotate-icon');
            if (icon) {
                details.addEventListener('toggle', function () {
                    if (details.open) {
                        icon.classList.add('open');
                    } else {
                        icon.classList.remove('open');
                    }
                });
            }
        });

        updateTimeline();
    });
})();
