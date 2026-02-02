/**
 * i18n-core.js — Shared internationalization module for Learning Designer apps.
 * Vanilla JS, no dependencies.
 *
 * DOM attributes: data-i18n, data-i18n-placeholder, data-i18n-title
 * Language pack format: { "lang": "en", "translations": { "key": "value" } }
 */
(function (window) {
    'use strict';

    var STORAGE_KEY = 'ld_ui_lang';
    var ALLOWED_TAGS = ['BR', 'STRONG', 'B', 'EM', 'I', 'U', 'SPAN', 'A'];

    function sanitizeBasicHtml(unsafeHtml) {
        var raw = String(unsafeHtml == null ? '' : unsafeHtml);
        if (!raw) return '';
        var parser = new DOMParser();
        var doc = parser.parseFromString(raw, 'text/html');
        var walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);
        var toRemove = [];
        while (walker.nextNode()) {
            var el = walker.currentNode;
            if (ALLOWED_TAGS.indexOf(el.tagName) === -1) { toRemove.push(el); continue; }
            if (el.tagName === 'A') {
                var href = el.getAttribute('href'), target = el.getAttribute('target');
                Array.from(el.attributes).forEach(function (a) { el.removeAttribute(a.name); });
                if (href) el.setAttribute('href', href);
                if (target) el.setAttribute('target', target);
            } else {
                Array.from(el.attributes).forEach(function (a) { el.removeAttribute(a.name); });
            }
        }
        toRemove.forEach(function (el) { el.replaceWith(doc.createTextNode(el.textContent || '')); });
        return doc.body.innerHTML;
    }

    var i18nCore = {
        defaultLang: 'fr',
        currentLang: 'fr',
        translations: {},

        /** Initialize: load translations, detect/restore language, apply to DOM. */
        init: function (options) {
            var opts = options || {};
            this.defaultLang = opts.defaultLang || 'fr';
            this.currentLang = this.defaultLang;

            if (opts.translations) {
                for (var lang in opts.translations) {
                    if (opts.translations.hasOwnProperty(lang))
                        this.addTranslations(lang, opts.translations[lang]);
                }
            }

            // Restore persisted choice
            if (opts.persist !== false) {
                try {
                    var stored = localStorage.getItem(STORAGE_KEY);
                    if (stored && this.translations[stored]) this.currentLang = stored;
                } catch (_) {}
            }

            // Browser language fallback
            if (this.currentLang === this.defaultLang) {
                try {
                    var nav = (navigator.language || '').split('-')[0].toLowerCase();
                    if (nav && nav !== this.defaultLang && this.translations[nav])
                        this.currentLang = nav;
                } catch (_) {}
            }

            this.applyTranslations();
        },

        /** Merge translations for a language code. */
        addTranslations: function (langCode, obj) {
            if (!langCode || !obj) return;
            if (!this.translations[langCode]) this.translations[langCode] = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) this.translations[langCode][key] = obj[key];
            }
        },

        /** Fetch a language pack JSON from a URL. Returns a Promise resolving to the lang code. */
        loadLanguagePack: function (jsonUrl) {
            var self = this;
            return fetch(jsonUrl).then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            }).then(function (data) {
                var code = data.lang || self.defaultLang;
                self.addTranslations(code, data.translations || data);
                return code;
            });
        },

        /** Load a language pack from a file input change event. */
        loadLanguagePackFromFile: function (event, callback) {
            var self = this;
            var file = event && event.target && event.target.files && event.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var data = JSON.parse(e.target.result);
                    self.addTranslations(data.lang || self.defaultLang, data.translations || data);
                    self.setLang(data.lang || self.defaultLang);
                    if (typeof callback === 'function') callback(data.lang);
                } catch (err) { console.error('[i18n-core] Invalid language pack:', err); }
            };
            reader.readAsText(file);
        },

        /** Switch language: persist, update DOM, dispatch 'i18n:langchange' event. */
        setLang: function (langCode) {
            if (!langCode) return;
            if (!this.translations[langCode]) {
                this.translations[langCode] = Object.assign({}, this.translations[this.defaultLang] || {});
            }
            this.currentLang = langCode;
            try { localStorage.setItem(STORAGE_KEY, langCode); } catch (_) {}
            try { document.documentElement.lang = langCode; } catch (_) {}
            this.applyTranslations();
            try {
                document.dispatchEvent(new CustomEvent('i18n:langchange', { detail: { lang: langCode } }));
            } catch (_) {}
        },

        /** Apply translations to all data-i18n elements. Optionally scoped to a root element. */
        applyTranslations: function (root) {
            var scope = root || document;
            var dict = this.translations[this.currentLang] || this.translations[this.defaultLang] || {};
            var fallback = this.translations[this.defaultLang] || {};

            scope.querySelectorAll('[data-i18n]').forEach(function (el) {
                var val = dict[el.getAttribute('data-i18n')] || fallback[el.getAttribute('data-i18n')];
                if (val != null) el.innerHTML = sanitizeBasicHtml(val);
            });
            scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
                var val = dict[el.getAttribute('data-i18n-placeholder')] || fallback[el.getAttribute('data-i18n-placeholder')];
                if (val != null) el.placeholder = val;
            });
            scope.querySelectorAll('[data-i18n-title]').forEach(function (el) {
                var val = dict[el.getAttribute('data-i18n-title')] || fallback[el.getAttribute('data-i18n-title')];
                if (val != null) el.title = val;
            });
            scope.querySelectorAll('[data-i18n-tooltip]').forEach(function (el) {
                var val = dict[el.getAttribute('data-i18n-tooltip')] || fallback[el.getAttribute('data-i18n-tooltip')];
                if (val != null) el.setAttribute('data-tooltip', val);
            });
            scope.querySelectorAll('[data-i18n-label]').forEach(function (el) {
                var val = dict[el.getAttribute('data-i18n-label')] || fallback[el.getAttribute('data-i18n-label')];
                if (val != null) el.setAttribute('label', val);
            });
        },

        /** Get a single translation string. Falls back to default lang, then to the key itself. */
        t: function (key, fallback) {
            var dict = this.translations[this.currentLang] || this.translations[this.defaultLang] || {};
            var fb = this.translations[this.defaultLang] || {};
            var val = dict[key] || fb[key];
            return (val != null) ? val : (fallback || key);
        },

        /** Exposed sanitizer for external use. */
        sanitizeHtml: sanitizeBasicHtml
    };

    window.i18nCore = i18nCore;
})(window);
