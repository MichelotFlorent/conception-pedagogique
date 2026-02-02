/**
 * Components Loader
 * Loads common header and footer into all pages.
 */
(function () {
    'use strict';

    var COMPONENTS = {
        header: 'components/header.html',
        footer: 'components/footer.html'
    };

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
            'analyse.html': 'nav_analysis'
        };
        var key = map[page];
        if (key) {
            var el = document.querySelector('[data-i18n="' + key + '"]');
            if (el) el.classList.add('active');
        }
    }

    function init() {
        Promise.all([
            loadComponent('header', '#app-header-mount'),
            loadComponent('footer', '#app-footer-mount')
        ]).then(function () {
            markActiveNavLink();
            if (typeof applyTranslations === 'function') {
                try { applyTranslations(); } catch (_) {}
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
