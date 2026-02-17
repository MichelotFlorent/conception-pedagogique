/**
 * Components Loader
 * Loads common header and footer into all pages.
 * Also handles centralized i18n initialization.
 */
(function () {
    'use strict';

    var COMPONENTS = {
        header: 'components/header.html',
        footer: 'components/footer.html'
    };

    // ========================================
    // Dyslexic Font Toggle (Accessibility)
    // ========================================

    // Apply dyslexic font immediately if stored preference exists
    // This prevents flash of default font on page load
    (function initDyslexicFontEarly() {
        try {
            if (localStorage.getItem('dyslexicFont') === 'true') {
                document.documentElement.classList.add('dyslexic-font');
                if (document.body) {
                    document.body.classList.add('dyslexic-font');
                }
            }
        } catch (e) {}
    })();

    // Global toggle function called by the header checkbox
    window.toggleDyslexicFont = function (enabled) {
        if (enabled) {
            document.documentElement.classList.add('dyslexic-font');
            document.body.classList.add('dyslexic-font');
            localStorage.setItem('dyslexicFont', 'true');
        } else {
            document.documentElement.classList.remove('dyslexic-font');
            document.body.classList.remove('dyslexic-font');
            localStorage.setItem('dyslexicFont', 'false');
        }
    };

    // Sync the toggle checkbox state with stored preference
    function syncDyslexicFontToggle() {
        var toggle = document.getElementById('globalDyslexicToggle');
        if (toggle) {
            var isEnabled = localStorage.getItem('dyslexicFont') === 'true';
            toggle.checked = isEnabled;
            if (isEnabled) {
                document.body.classList.add('dyslexic-font');
            }
        }
    }

    // ========================================
    // Global Language Switching
    // ========================================
    window.switchGlobalLang = function (code) {
        if (typeof i18nCore !== 'undefined' && i18nCore.translations && i18nCore.translations[code]) {
            i18nCore.setLang(code);
            syncGlobalLangSelector();
        }
    };

    function syncGlobalLangSelector() {
        var sel = document.getElementById('globalLangSelect');
        if (sel && typeof i18nCore !== 'undefined') {
            sel.value = i18nCore.currentLang;
        }
        // Also sync any page-specific selectors that might exist
        var pageSel = document.getElementById('langSelect');
        if (pageSel && typeof i18nCore !== 'undefined') {
            pageSel.value = i18nCore.currentLang;
        }
    }

    // ========================================
    // i18n Initialization
    // ========================================
    function initI18n() {
        if (typeof i18nCore === 'undefined') {
            console.warn('[components-loader] i18nCore not found, skipping i18n init');
            return Promise.resolve();
        }

        // Initialize with French translations (from page or empty)
        i18nCore.init({
            defaultLang: 'fr',
            translations: { 'fr': window.translations_fr || {} },
            persist: true
        });

        // Load English translations
        return i18nCore.loadLanguagePack('i18n/en-CA.json')
            .then(function () {
                // Restore saved language preference
                try {
                    var stored = localStorage.getItem('ld_ui_lang');
                    if (stored && stored !== 'fr' && i18nCore.translations[stored]) {
                        i18nCore.setLang(stored);
                    }
                } catch (_) {}
                syncGlobalLangSelector();
            })
            .catch(function (err) {
                console.warn('[i18n] Could not load en-CA pack:', err);
            });
    }

    // ========================================
    // Component Loading
    // ========================================
    function loadComponent(name, selector) {
        return fetch(COMPONENTS[name])
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function (html) {
                var target = document.querySelector(selector);
                if (target) {
                    target.innerHTML = html;
                }
            })
            .catch(function (err) {
                // Silently fail — page still works without shared header/footer
            });
    }

    function markActiveNavLink() {
        var page = window.location.pathname.split('/').pop() || 'index.html';
        var map = {
            'designer.html': 'nav_designer',
            'configuration.html': 'nav_configuration',
            'enseignant.html': 'nav_teacher',
            'persona.html': 'nav_persona',
            'analyse.html': 'nav_analysis',
            'analyse-media-techno.html': 'nav_media',
            'macrodesign.html': 'nav_macrodesign',
            'microdesign.html': 'nav_microdesign',
            'macrodesign-beta.html': 'nav_macrodesign_beta',
            'microdesign-beta.html': 'nav_microdesign_beta',
            'evaluation.html': 'nav_evaluation'
        };
        var key = map[page];
        if (key) {
            var el = document.querySelector('[data-i18n="' + key + '"]');
            if (el) el.classList.add('active');
        }
    }

    // ========================================
    // Initialization
    // ========================================
    function init() {
        // First init i18n, then load components
        initI18n().then(function () {
            return Promise.all([
                loadComponent('header', '#app-header-mount'),
                loadComponent('footer', '#app-footer-mount')
            ]);
        }).then(function () {
            markActiveNavLink();
            syncGlobalLangSelector();
            syncDyslexicFontToggle();
            // Apply translations to newly loaded components
            if (typeof i18nCore !== 'undefined' && i18nCore.applyTranslations) {
                i18nCore.applyTranslations(document.getElementById('app-header-mount'));
                i18nCore.applyTranslations(document.getElementById('app-footer-mount'));
            }
        });
    }

    // Listen for language changes to update the selector
    document.addEventListener('i18n:langchange', function () {
        syncGlobalLangSelector();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
