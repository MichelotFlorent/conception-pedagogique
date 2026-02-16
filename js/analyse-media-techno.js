/**
 * Analyse médiatique et technologique - JavaScript
 * Based on Media and Technology Analysis Specifications
 */

(function () {
    'use strict';

    // ========================================
    // Language switching
    // ========================================
    window.switchLang = function (code) {
        if (code && typeof i18nCore !== 'undefined' && i18nCore.translations && i18nCore.translations[code]) {
            i18nCore.setLang(code);
        }
    };

    // ========================================
    // Device Sub-Options Toggle
    // ========================================
    window.toggleDeviceSubOptions = function (deviceType) {
        var mappings = {
            phone: { checkbox: 'devicePhone', container: 'phoneSubOptions' },
            tablet: { checkbox: 'deviceTablet', container: 'tabletSubOptions' },
            computer: { checkboxes: ['deviceLaptop', 'deviceDesktop'], container: 'computerSubOptions' },
            other: { checkbox: 'deviceOther', container: 'otherDeviceField' }
        };

        var mapping = mappings[deviceType];
        if (!mapping) return;

        var container = document.getElementById(mapping.container);
        if (!container) return;

        var isChecked = false;
        if (mapping.checkboxes) {
            isChecked = mapping.checkboxes.some(function (id) {
                var el = document.getElementById(id);
                return el && el.checked;
            });
        } else {
            var checkbox = document.getElementById(mapping.checkbox);
            isChecked = checkbox && checkbox.checked;
        }

        if (isChecked) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    };

    // ========================================
    // Digital Literacy Slider
    // ========================================
    window.updateLiteracyLabel = function () {
        var slider = document.getElementById('digitalLiteracySlider');
        var display = document.getElementById('literacyLevelDisplay');
        if (!slider || !display) return;

        var value = parseInt(slider.value);
        var labels = {
            0: 'Aucune compétence technologique requise',
            1: 'Un tutoriel de base est recommandé',
            2: 'Un tutoriel avancé est indispensable',
            3: 'Une formation approfondie est requise'
        };

        var i18nKeys = {
            0: 'media_literacy_level_0',
            1: 'media_literacy_level_1',
            2: 'media_literacy_level_2',
            3: 'media_literacy_level_3'
        };

        // Try to get translation
        if (typeof i18nCore !== 'undefined' && i18nCore.t) {
            var translated = i18nCore.t(i18nKeys[value]);
            display.textContent = translated || labels[value];
        } else {
            display.textContent = labels[value];
        }
    };

    // ========================================
    // Audio Duration Field Toggle
    // ========================================
    window.toggleAudioDurationField = function () {
        var longRadio = document.querySelector('input[name="audioDuration"][value="long"]');
        var field = document.getElementById('audioDurationField');
        if (!field) return;

        if (longRadio && longRadio.checked) {
            field.classList.remove('hidden');
        } else {
            field.classList.add('hidden');
        }
    };

    // ========================================
    // Audio/Video Storage Options Toggle
    // ========================================
    window.toggleStorageOptions = function () {
        var yesRadio = document.querySelector('input[name="hasAudioVideo"][value="yes"]');
        var field = document.getElementById('storageOptionsField');
        if (!field) return;

        if (yesRadio && yesRadio.checked) {
            field.classList.remove('hidden');
        } else {
            field.classList.add('hidden');
        }
    };

    window.toggleStorageOtherField = function () {
        var checkbox = document.getElementById('storageOther');
        var field = document.getElementById('storageOtherField');
        if (!field) return;

        if (checkbox && checkbox.checked) {
            field.classList.remove('hidden');
        } else {
            field.classList.add('hidden');
        }
    };

    // ========================================
    // DNA Score Info Modal
    // ========================================
    window.showDNAInfo = function () {
        var modal = document.getElementById('dnaInfoModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    window.hideDNAInfo = function () {
        var modal = document.getElementById('dnaInfoModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    // ========================================
    // DNA Score Calculator
    // ========================================
    window.updateDNAScore = function () {
        var score = 0;

        // Device diversity (more devices = more agnostic) - max 10 points
        var devices = ['devicePhone', 'deviceTablet', 'deviceLaptop', 'deviceDesktop'];
        var deviceCount = 0;
        devices.forEach(function (id) {
            if (document.getElementById(id)?.checked) deviceCount++;
        });
        if (deviceCount >= 3) score += 10;
        else if (deviceCount >= 2) score += 5;

        // Platform agnosticism - max 30 points
        var platformAgnostic = document.querySelector('input[name="platformAgnostic"]:checked');
        if (platformAgnostic) {
            if (platformAgnostic.value === 'yes') score += 30;
            else if (platformAgnostic.value === 'partial') score += 15;
        }

        // Browser-only (no install) - max 20 points
        var adminRights = document.querySelector('input[name="adminRights"]:checked');
        if (adminRights && adminRights.value === 'browser') score += 20;

        // Keyboard navigation - max 20 points
        var keyboardNav = document.querySelector('input[name="keyboardNav"]:checked');
        if (keyboardNav && keyboardNav.value === 'full') score += 20;

        // Offline support - max 10 points
        var bandwidth = document.querySelector('input[name="bandwidth"]:checked');
        if (bandwidth && bandwidth.value === 'offline') score += 10;

        // Accessibility features - max 10 points
        var accessFeatures = ['accessTextSize', 'accessContrast', 'accessPlaybackSpeed', 'accessTranscripts', 'accessAltText', 'accessCaptions'];
        var accessCount = 0;
        accessFeatures.forEach(function (id) {
            if (document.getElementById(id)?.checked) accessCount++;
        });
        score += Math.min(10, Math.round(accessCount * 1.67));

        // Update display
        var display = document.getElementById('dnaScoreDisplay');
        if (display) {
            display.textContent = Math.min(100, score);

            // Color coding
            if (score >= 80) {
                display.className = 'text-2xl font-bold text-emerald-600';
            } else if (score >= 50) {
                display.className = 'text-2xl font-bold text-amber-600';
            } else {
                display.className = 'text-2xl font-bold text-rose-600';
            }
        }

        return score;
    };

    // ========================================
    // Bandwidth Handler
    // ========================================
    window.handleBandwidthChange = function (value) {
        var alert = document.getElementById('lowBandwidthAlert');
        if (!alert) return;

        if (value === 'variable' || value === 'offline') {
            alert.classList.remove('hidden');
            alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            alert.classList.add('hidden');
        }

        updateDNAScore();
    };

    // ========================================
    // Redundancy Check
    // ========================================
    window.checkRedundancy = function () {
        var modalityChoice = document.querySelector('input[name="modalityChoice"]:checked');
        var alert = document.getElementById('redundancyAlert');
        if (!alert) return;

        if (modalityChoice && modalityChoice.value === 'both') {
            alert.classList.remove('hidden');
        } else {
            alert.classList.add('hidden');
        }
    };

    // ========================================
    // Mobile Preview
    // ========================================
    window.updateMobilePreview = function () {
        var content = document.getElementById('mobilePreviewContent');
        if (!content) return;

        var html = '<div style="padding: 8px;">';

        // Show selected devices
        html += '<div style="margin-bottom: 12px; padding: 8px; background: #f1f5f9; border-radius: 8px;">';
        html += '<p style="font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 4px;">APPAREILS</p>';
        var devices = [];
        if (document.getElementById('devicePhone')?.checked) devices.push('Téléphone');
        if (document.getElementById('deviceTablet')?.checked) devices.push('Tablette');
        if (document.getElementById('deviceLaptop')?.checked) devices.push('Portable');
        if (document.getElementById('deviceDesktop')?.checked) devices.push('Bureau');
        if (document.getElementById('deviceVR')?.checked) devices.push('VR');
        html += '<p style="font-size: 12px; color: #334155;">' + (devices.length ? devices.join(', ') : 'Non spécifié') + '</p>';
        html += '</div>';

        // Show media counts
        html += '<div style="margin-bottom: 12px; padding: 8px; background: #f1f5f9; border-radius: 8px;">';
        html += '<p style="font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 4px;">MÉDIAS REQUIS</p>';
        var mediaItems = [];
        var videos = parseInt(document.getElementById('mediaCountVideos')?.value) || 0;
        var audio = parseInt(document.getElementById('mediaCountAudio')?.value) || 0;
        var graphics = parseInt(document.getElementById('mediaCountGraphics')?.value) || 0;
        var animations = parseInt(document.getElementById('mediaCountAnimations')?.value) || 0;
        var interactives = parseInt(document.getElementById('mediaCountInteractives')?.value) || 0;
        var documents = parseInt(document.getElementById('mediaCountDocuments')?.value) || 0;

        if (videos > 0) mediaItems.push(videos + ' vidéos');
        if (audio > 0) mediaItems.push(audio + ' audios');
        if (graphics > 0) mediaItems.push(graphics + ' graphiques');
        if (animations > 0) mediaItems.push(animations + ' animations');
        if (interactives > 0) mediaItems.push(interactives + ' interactifs');
        if (documents > 0) mediaItems.push(documents + ' documents');

        html += '<p style="font-size: 12px; color: #334155;">' + (mediaItems.length ? mediaItems.join(', ') : 'Aucun média spécifié') + '</p>';
        html += '</div>';

        // Show accessibility features
        html += '<div style="margin-bottom: 12px; padding: 8px; background: #ecfdf5; border-radius: 8px;">';
        html += '<p style="font-size: 11px; font-weight: 600; color: #047857; margin-bottom: 4px;">ACCESSIBILITÉ</p>';
        var accessFeatures = [];
        if (document.getElementById('accessTextSize')?.checked) accessFeatures.push('Texte ajustable');
        if (document.getElementById('accessTranscripts')?.checked) accessFeatures.push('Transcriptions');
        if (document.getElementById('accessCaptions')?.checked) accessFeatures.push('Sous-titres');
        html += '<p style="font-size: 12px; color: #065f46;">' + (accessFeatures.length ? accessFeatures.join(', ') : 'À configurer') + '</p>';
        html += '</div>';

        // DNA Score
        var score = updateDNAScore();
        var scoreColor = score >= 80 ? '#059669' : (score >= 50 ? '#d97706' : '#dc2626');
        html += '<div style="text-align: center; padding: 12px; background: linear-gradient(135deg, #912338, #6d1a2a); border-radius: 8px;">';
        html += '<p style="font-size: 11px; font-weight: 600; color: #FFD700; margin-bottom: 4px;">SCORE DNA</p>';
        html += '<p style="font-size: 24px; font-weight: 700; color: white;">' + score + '/100</p>';
        html += '</div>';

        html += '</div>';

        content.innerHTML = html;
    };

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
            version: '1.1',
            tool: 'analyse-media-techno',
            createdAt: new Date().toISOString(),
            dnaScore: updateDNAScore(),
            section1: {
                devicePhone: checked('devicePhone'),
                devicePhoneIOS: checked('devicePhoneIOS'),
                devicePhoneAndroid: checked('devicePhoneAndroid'),
                devicePhoneOther: checked('devicePhoneOther'),
                deviceTablet: checked('deviceTablet'),
                deviceTabletIPad: checked('deviceTabletIPad'),
                deviceTabletAndroid: checked('deviceTabletAndroid'),
                deviceTabletOther: checked('deviceTabletOther'),
                deviceLaptop: checked('deviceLaptop'),
                deviceDesktop: checked('deviceDesktop'),
                deviceComputerMac: checked('deviceComputerMac'),
                deviceComputerWindows: checked('deviceComputerWindows'),
                deviceComputerLinux: checked('deviceComputerLinux'),
                deviceComputerOther: checked('deviceComputerOther'),
                deviceVR: checked('deviceVR'),
                deviceOther: checked('deviceOther'),
                deviceOtherText: val('deviceOtherText'),
                platformAgnostic: checkedRadio('platformAgnostic'),
                digitalLiteracyLevel: val('digitalLiteracySlider'),
                adminRights: checkedRadio('adminRights')
            },
            section2: {
                bandwidth: checkedRadio('bandwidth'),
                lowBandwidthAlternative: val('lowBandwidthAlternative'),
                firewallConstraints: val('firewallConstraints'),
                dataCosts: val('dataCosts'),
                learningEnv: checkedRadio('learningEnv')
            },
            section3: {
                modalityChoice: checkedRadio('modalityChoice'),
                audioDuration: checkedRadio('audioDuration'),
                audioDurationMinutes: val('audioDurationMinutes'),
                signalArrows: checked('signalArrows'),
                signalCircles: checked('signalCircles'),
                signalBolding: checked('signalBolding'),
                signalVocal: checked('signalVocal'),
                contentFidelity: checkedRadio('contentFidelity')
            },
            section4: {
                accessTextSize: checked('accessTextSize'),
                accessContrast: checked('accessContrast'),
                accessPlaybackSpeed: checked('accessPlaybackSpeed'),
                accessTranscripts: checked('accessTranscripts'),
                accessAltText: checked('accessAltText'),
                accessCaptions: checked('accessCaptions'),
                languageSupport: checkedRadio('languageSupport'),
                keyboardNav: checkedRadio('keyboardNav')
            },
            section5: {
                naturalLanguage: val('naturalLanguage'),
                hasAudioVideo: checkedRadio('hasAudioVideo'),
                storageYouTube: checked('storageYouTube'),
                storageSoundCloud: checked('storageSoundCloud'),
                storageSpotify: checked('storageSpotify'),
                storagePodcast: checked('storagePodcast'),
                storageOther: checked('storageOther'),
                storageOtherText: val('storageOtherText'),
                skillVideoEditing: checked('skillVideoEditing'),
                skillCoding: checked('skillCoding'),
                skillGraphicDesign: checked('skillGraphicDesign'),
                skillAudio: checked('skillAudio'),
                skill3D: checked('skill3D'),
                shelfLife: checkedRadio('shelfLife'),
                mediaCountVideos: val('mediaCountVideos'),
                mediaCountAudio: val('mediaCountAudio'),
                mediaCountGraphics: val('mediaCountGraphics'),
                mediaCountAnimations: val('mediaCountAnimations'),
                mediaCountInteractives: val('mediaCountInteractives'),
                mediaCountDocuments: val('mediaCountDocuments')
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

        if (data.section1) {
            // Main device checkboxes
            setChecked('devicePhone', data.section1.devicePhone);
            setChecked('devicePhoneIOS', data.section1.devicePhoneIOS);
            setChecked('devicePhoneAndroid', data.section1.devicePhoneAndroid);
            setChecked('devicePhoneOther', data.section1.devicePhoneOther);
            setChecked('deviceTablet', data.section1.deviceTablet);
            setChecked('deviceTabletIPad', data.section1.deviceTabletIPad);
            setChecked('deviceTabletAndroid', data.section1.deviceTabletAndroid);
            setChecked('deviceTabletOther', data.section1.deviceTabletOther);
            setChecked('deviceLaptop', data.section1.deviceLaptop);
            setChecked('deviceDesktop', data.section1.deviceDesktop);
            setChecked('deviceComputerMac', data.section1.deviceComputerMac);
            setChecked('deviceComputerWindows', data.section1.deviceComputerWindows);
            setChecked('deviceComputerLinux', data.section1.deviceComputerLinux);
            setChecked('deviceComputerOther', data.section1.deviceComputerOther);
            setChecked('deviceVR', data.section1.deviceVR);
            setChecked('deviceOther', data.section1.deviceOther);
            setVal('deviceOtherText', data.section1.deviceOtherText);
            setRadio('platformAgnostic', data.section1.platformAgnostic);
            // Digital literacy slider
            var slider = document.getElementById('digitalLiteracySlider');
            if (slider && data.section1.digitalLiteracyLevel !== undefined) {
                slider.value = data.section1.digitalLiteracyLevel;
                updateLiteracyLabel();
            }
            setRadio('adminRights', data.section1.adminRights);
            // Toggle sub-options visibility
            toggleDeviceSubOptions('phone');
            toggleDeviceSubOptions('tablet');
            toggleDeviceSubOptions('computer');
            toggleDeviceSubOptions('other');
        }

        if (data.section2) {
            setRadio('bandwidth', data.section2.bandwidth);
            if (data.section2.bandwidth === 'variable' || data.section2.bandwidth === 'offline') {
                handleBandwidthChange(data.section2.bandwidth);
            }
            setVal('lowBandwidthAlternative', data.section2.lowBandwidthAlternative);
            setVal('firewallConstraints', data.section2.firewallConstraints);
            setVal('dataCosts', data.section2.dataCosts);
            setRadio('learningEnv', data.section2.learningEnv);
        }

        if (data.section3) {
            setRadio('modalityChoice', data.section3.modalityChoice);
            if (data.section3.modalityChoice === 'both') checkRedundancy();
            setRadio('audioDuration', data.section3.audioDuration);
            setVal('audioDurationMinutes', data.section3.audioDurationMinutes);
            if (data.section3.audioDuration === 'long') toggleAudioDurationField();
            setChecked('signalArrows', data.section3.signalArrows);
            setChecked('signalCircles', data.section3.signalCircles);
            setChecked('signalBolding', data.section3.signalBolding);
            setChecked('signalVocal', data.section3.signalVocal);
            setRadio('contentFidelity', data.section3.contentFidelity);
        }

        if (data.section4) {
            setChecked('accessTextSize', data.section4.accessTextSize);
            setChecked('accessContrast', data.section4.accessContrast);
            setChecked('accessPlaybackSpeed', data.section4.accessPlaybackSpeed);
            setChecked('accessTranscripts', data.section4.accessTranscripts);
            setChecked('accessAltText', data.section4.accessAltText);
            setChecked('accessCaptions', data.section4.accessCaptions);
            setRadio('languageSupport', data.section4.languageSupport);
            setRadio('keyboardNav', data.section4.keyboardNav);
        }

        if (data.section5) {
            setVal('naturalLanguage', data.section5.naturalLanguage);
            setRadio('hasAudioVideo', data.section5.hasAudioVideo);
            if (data.section5.hasAudioVideo === 'yes') toggleStorageOptions();
            setChecked('storageYouTube', data.section5.storageYouTube);
            setChecked('storageSoundCloud', data.section5.storageSoundCloud);
            setChecked('storageSpotify', data.section5.storageSpotify);
            setChecked('storagePodcast', data.section5.storagePodcast);
            setChecked('storageOther', data.section5.storageOther);
            setVal('storageOtherText', data.section5.storageOtherText);
            if (data.section5.storageOther) toggleStorageOtherField();
            setChecked('skillVideoEditing', data.section5.skillVideoEditing);
            setChecked('skillCoding', data.section5.skillCoding);
            setChecked('skillGraphicDesign', data.section5.skillGraphicDesign);
            setChecked('skillAudio', data.section5.skillAudio);
            setChecked('skill3D', data.section5.skill3D);
            setRadio('shelfLife', data.section5.shelfLife);
            setVal('mediaCountVideos', data.section5.mediaCountVideos);
            setVal('mediaCountAudio', data.section5.mediaCountAudio);
            setVal('mediaCountGraphics', data.section5.mediaCountGraphics);
            setVal('mediaCountAnimations', data.section5.mediaCountAnimations);
            setVal('mediaCountInteractives', data.section5.mediaCountInteractives);
            setVal('mediaCountDocuments', data.section5.mediaCountDocuments);
        }

        updateDNAScore();
        updateMobilePreview();
    }

    // ========================================
    // Save / Load
    // ========================================
    window.saveMediaAnalysis = function () {
        var data = collectFormData();
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'analyse_media_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    window.loadMediaAnalysis = function () {
        document.getElementById('loadFileInput').click();
    };

    window.loadMediaFromFile = function (event) {
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
    window.exportMediaMarkdown = function () {
        var data = collectFormData();
        var lines = [];

        lines.push('# Analyse médiatique et technologique');
        lines.push('');
        lines.push('*Date : ' + new Date().toLocaleDateString('fr-CA') + '*');
        lines.push('**Score DNA (Device Agnostic) : ' + data.dnaScore + '/100**');
        lines.push('');
        lines.push('---');
        lines.push('');

        // Section 1
        lines.push('## 1. Écosystème numérique des apprenant·es');
        lines.push('');
        var devices = [];
        if (data.section1.devicePhone) devices.push('Téléphone');
        if (data.section1.deviceTablet) devices.push('Tablette');
        if (data.section1.deviceLaptop) devices.push('Ordinateur portable');
        if (data.section1.deviceDesktop) devices.push('Ordinateur de bureau');
        if (data.section1.deviceVR) devices.push('VR');
        if (data.section1.deviceOther && data.section1.deviceOtherText) devices.push(data.section1.deviceOtherText);
        lines.push('**Appareils :** ' + (devices.length ? devices.join(', ') : 'Non spécifié'));

        // Platform agnostic
        var platformLabels = { yes: 'Oui', partial: 'Partiellement', no: 'Non' };
        lines.push('**Agnosticisme de plateforme :** ' + (platformLabels[data.section1.platformAgnostic] || 'Non spécifié'));

        // Digital literacy level
        var literacyLabels = ['Aucune compétence requise', 'Tutoriel de base recommandé', 'Tutoriel avancé indispensable', 'Formation approfondie requise'];
        var literacyLevel = parseInt(data.section1.digitalLiteracyLevel) || 0;
        lines.push('**Littératie numérique :** ' + literacyLabels[literacyLevel]);
        lines.push('**Droits admin :** ' + (data.section1.adminRights || 'Non spécifié'));
        lines.push('');

        // Section 2
        lines.push('## 2. Infrastructure et connectivité');
        lines.push('');
        lines.push('**Bande passante :** ' + (data.section2.bandwidth || 'Non spécifié'));
        if (data.section2.lowBandwidthAlternative) {
            lines.push('**Alternative basse bande :** ' + data.section2.lowBandwidthAlternative);
        }
        if (data.section2.firewallConstraints) {
            lines.push('**Contraintes pare-feu :** ' + data.section2.firewallConstraints);
        }
        lines.push('**Environnement :** ' + (data.section2.learningEnv || 'Non spécifié'));
        lines.push('');

        // Section 3
        lines.push('## 3. Principes multimédia (charge cognitive)');
        lines.push('');
        lines.push('**Choix de modalité :** ' + (data.section3.modalityChoice || 'Non spécifié'));
        lines.push('**Durée audio :** ' + (data.section3.audioDuration || 'Non spécifié'));
        var signals = [];
        if (data.section3.signalArrows) signals.push('Flèches');
        if (data.section3.signalCircles) signals.push('Cercles');
        if (data.section3.signalBolding) signals.push('Gras/couleur');
        if (data.section3.signalVocal) signals.push('Emphase vocale');
        lines.push('**Signalisation :** ' + (signals.length ? signals.join(', ') : 'Non spécifié'));
        lines.push('**Fidélité contenu :** ' + (data.section3.contentFidelity || 'Non spécifié'));
        lines.push('');

        // Section 4
        lines.push('## 4. Accessibilité (CUA)');
        lines.push('');
        var access = [];
        if (data.section4.accessTextSize) access.push('Texte ajustable');
        if (data.section4.accessContrast) access.push('Contraste ajustable');
        if (data.section4.accessPlaybackSpeed) access.push('Vitesse lecture');
        if (data.section4.accessTranscripts) access.push('Transcriptions');
        if (data.section4.accessAltText) access.push('Alt-text');
        if (data.section4.accessCaptions) access.push('Sous-titres');
        lines.push('**Fonctionnalités :** ' + (access.length ? access.join(', ') : 'À configurer'));
        lines.push('**Support linguistique :** ' + (data.section4.languageSupport || 'Non spécifié'));
        lines.push('**Navigation clavier :** ' + (data.section4.keyboardNav || 'Non spécifié'));
        lines.push('');

        // Section 5
        lines.push('## 5. Puissance médiatique vs difficulté');
        lines.push('');
        if (data.section5.naturalLanguage) {
            lines.push('**Langage naturel de la tâche :**');
            lines.push(data.section5.naturalLanguage);
            lines.push('');
        }
        var skills = [];
        if (data.section5.skillVideoEditing) skills.push('Montage vidéo');
        if (data.section5.skillCoding) skills.push('Programmation');
        if (data.section5.skillGraphicDesign) skills.push('Design graphique');
        if (data.section5.skillAudio) skills.push('Production audio');
        if (data.section5.skill3D) skills.push('3D/VR');
        lines.push('**Compétences équipe :** ' + (skills.length ? skills.join(', ') : 'À évaluer'));
        lines.push('**Durée de vie contenu :** ' + (data.section5.shelfLife || 'Non spécifié'));
        lines.push('');

        // Media Production List
        lines.push('## Liste de production médias');
        lines.push('');
        lines.push('| Type | Quantité |');
        lines.push('|------|----------|');
        lines.push('| Vidéos | ' + (data.section5.mediaCountVideos || 0) + ' |');
        lines.push('| Clips audio | ' + (data.section5.mediaCountAudio || 0) + ' |');
        lines.push('| Graphiques | ' + (data.section5.mediaCountGraphics || 0) + ' |');
        lines.push('| Animations | ' + (data.section5.mediaCountAnimations || 0) + ' |');
        lines.push('| Interactifs | ' + (data.section5.mediaCountInteractives || 0) + ' |');
        lines.push('| Documents | ' + (data.section5.mediaCountDocuments || 0) + ' |');
        lines.push('');

        var md = lines.join('\n');
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'analyse_media_' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    // ========================================
    // Export Word (.docx)
    // ========================================
    window.exportMediaWord = function () {
        if (!window.docx || !window.docx.Document) {
            alert("La bibliothèque d'export Word n'est pas disponible.");
            return;
        }

        var data = collectFormData();
        var Document = window.docx.Document;
        var Packer = window.docx.Packer;
        var Paragraph = window.docx.Paragraph;
        var TextRun = window.docx.TextRun;
        var HeadingLevel = window.docx.HeadingLevel;

        var safe = function (s) { return (s || '').toString().trim(); };
        var children = [];

        // Styles: Helvetica for headings (burgundy), Garamond for body
        var burgundy = '912338';

        // Title (H1: 16pt Helvetica, burgundy)
        children.push(new Paragraph({
            children: [new TextRun({
                text: 'Analyse médiatique et technologique',
                font: 'Helvetica',
                size: 32, // 16pt = 32 half-points
                color: burgundy,
                bold: true
            })],
            spacing: { after: 200 }
        }));

        // Date and DNA Score
        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Date : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: new Date().toLocaleDateString('fr-CA'), font: 'Garamond', size: 24 })
            ]
        }));
        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Score DNA : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: data.dnaScore + '/100', font: 'Garamond', size: 24 })
            ],
            spacing: { after: 400 }
        }));

        // Section 1 (H2: 14pt Helvetica, burgundy)
        children.push(new Paragraph({
            children: [new TextRun({
                text: '1. Écosystème numérique des apprenant·es',
                font: 'Helvetica',
                size: 28,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 400, after: 200 }
        }));

        var devices = [];
        if (data.section1.devicePhone) devices.push('Téléphone');
        if (data.section1.deviceTablet) devices.push('Tablette');
        if (data.section1.deviceLaptop) devices.push('Ordinateur portable');
        if (data.section1.deviceDesktop) devices.push('Ordinateur de bureau');
        if (data.section1.deviceVR) devices.push('VR');

        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Appareils : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: devices.length ? devices.join(', ') : 'Non spécifié', font: 'Garamond', size: 24 })
            ]
        }));

        // Section 2
        children.push(new Paragraph({
            children: [new TextRun({
                text: '2. Infrastructure et connectivité',
                font: 'Helvetica',
                size: 28,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 400, after: 200 }
        }));

        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Bande passante : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: data.section2.bandwidth || 'Non spécifié', font: 'Garamond', size: 24 })
            ]
        }));

        // Section 3
        children.push(new Paragraph({
            children: [new TextRun({
                text: '3. Principes de conception multimédia',
                font: 'Helvetica',
                size: 28,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 400, after: 200 }
        }));

        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Choix de modalité : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: data.section3.modalityChoice || 'Non spécifié', font: 'Garamond', size: 24 })
            ]
        }));

        // Section 4
        children.push(new Paragraph({
            children: [new TextRun({
                text: '4. Accessibilité et conception universelle',
                font: 'Helvetica',
                size: 28,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 400, after: 200 }
        }));

        var access = [];
        if (data.section4.accessTextSize) access.push('Texte ajustable');
        if (data.section4.accessTranscripts) access.push('Transcriptions');
        if (data.section4.accessCaptions) access.push('Sous-titres');

        children.push(new Paragraph({
            children: [
                new TextRun({ text: 'Fonctionnalités : ', font: 'Garamond', size: 24, bold: true }),
                new TextRun({ text: access.length ? access.join(', ') : 'À configurer', font: 'Garamond', size: 24 })
            ]
        }));

        // Section 5
        children.push(new Paragraph({
            children: [new TextRun({
                text: '5. Média vs Défis de médiatisation',
                font: 'Helvetica',
                size: 28,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 400, after: 200 }
        }));

        if (safe(data.section5.naturalLanguage)) {
            children.push(new Paragraph({
                children: [new TextRun({ text: 'Langage naturel de la tâche :', font: 'Garamond', size: 24, bold: true })]
            }));
            children.push(new Paragraph({
                children: [new TextRun({ text: safe(data.section5.naturalLanguage), font: 'Garamond', size: 24 })]
            }));
        }

        // Media Production List (H3: 12pt)
        children.push(new Paragraph({
            children: [new TextRun({
                text: 'Liste de production médias',
                font: 'Helvetica',
                size: 24,
                color: burgundy,
                bold: true
            })],
            spacing: { before: 300, after: 200 }
        }));

        var mediaItems = [
            ['Vidéos', data.section5.mediaCountVideos || 0],
            ['Clips audio', data.section5.mediaCountAudio || 0],
            ['Graphiques', data.section5.mediaCountGraphics || 0],
            ['Animations', data.section5.mediaCountAnimations || 0],
            ['Interactifs', data.section5.mediaCountInteractives || 0],
            ['Documents', data.section5.mediaCountDocuments || 0]
        ];

        mediaItems.forEach(function (item) {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: item[0] + ' : ', font: 'Garamond', size: 24, bold: true }),
                    new TextRun({ text: item[1].toString(), font: 'Garamond', size: 24 })
                ]
            }));
        });

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
            a.download = 'analyse_media_' + new Date().toISOString().slice(0, 10) + '.docx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 500);
        });
    };

    // ========================================
    // Reset
    // ========================================
    window.resetMediaAnalysis = function () {
        if (!confirm('Voulez-vous vraiment réinitialiser le formulaire ?')) return;

        document.querySelectorAll('#mediaAnalysisForm input[type="text"], #mediaAnalysisForm input[type="number"], #mediaAnalysisForm textarea').forEach(function (el) {
            el.value = el.type === 'number' ? '0' : '';
        });

        document.querySelectorAll('#mediaAnalysisForm input[type="radio"], #mediaAnalysisForm input[type="checkbox"]').forEach(function (el) {
            el.checked = false;
        });

        document.getElementById('lowBandwidthAlert')?.classList.add('hidden');
        document.getElementById('redundancyAlert')?.classList.add('hidden');

        updateDNAScore();
        updateMobilePreview();
    };

    // ========================================
    // Initialize
    // ========================================
    document.addEventListener('DOMContentLoaded', function () {
        updateDNAScore();
        updateMobilePreview();
    });
})();
