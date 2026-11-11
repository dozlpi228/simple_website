// Подключаем CSS и иконку с уникальным параметром, чтобы браузер не брал их из кэша.
// Скрипт должен подключаться в <head> обычным (синхронным) тегом <script>.
(function () {
    var v = Date.now();
    document.write('<link rel="stylesheet" href="style.css?v=' + v + '">');
    document.write('<link rel="icon" href="favicon.ico?v=' + v + '" type="image/x-icon">');
})();

// Удаляем все Cache Storage
if ('caches' in window) {
    caches.keys().then(function (names) {
        names.forEach(function (name) { caches.delete(name); });
    });
}

// Удаляем service worker'ы (если когда-либо были зарегистрированы)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (reg) { reg.unregister(); });
    });
}

// Если страницу открыли из bfcache (кнопка «Назад») — перезагружаем
window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
});