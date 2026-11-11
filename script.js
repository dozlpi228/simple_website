(function () {
    var v = Date.now();
    document.write('<link rel="stylesheet" href="style.css?v=' + v + '">');
    document.write('<link rel="icon" href="favicon.ico?v=' + v + '" type="image/x-icon">');
})();
if ('caches' in window) {
    caches.keys().then(function (names) {
        names.forEach(function (name) { caches.delete(name); });
    });
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (reg) { reg.unregister(); });
    });
}
window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
});
(function () {
    var STORAGE_KEY = 'lang';

    var translations = {
        en: {
            before: "it's simple website, so you can contact me in discord:",
            after: 'for place advertisment',
            toggleLabel: 'Switch language to Russian'
        },
        ru: {
            before: 'Это простой сайт, так что вы можете связаться со мной в Discord:',
            after: 'по вопросам размещения рекламы',
            toggleLabel: 'Переключить язык на английский'
        }
    };

    function detectLanguage() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && translations[saved]) return saved;
        } catch (e) {}
        var nav = (navigator.language || 'en').toLowerCase();
        return nav.indexOf('ru') === 0 ? 'ru' : 'en';
    }

    function applyLanguage(lang) {
        var dict = translations[lang];
        document.documentElement.lang = lang;

        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var key = nodes[i].getAttribute('data-i18n');
            if (dict[key]) nodes[i].textContent = dict[key];
        }

        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.textContent = lang === 'en' ? 'RU' : 'EN';
            btn.setAttribute('aria-label', dict.toggleLabel);
        }

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', function () {
        var current = detectLanguage();
        applyLanguage(current);

        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                current = current === 'en' ? 'ru' : 'en';
                applyLanguage(current);
            });
        }
    });
})();