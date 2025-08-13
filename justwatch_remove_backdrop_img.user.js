// ==UserScript==
// @name         Hide JustWatch Carousel
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides backdrops__carousel elements on JustWatch.com
// @author       You
// @match        https://www.justwatch.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/justwatch_remove_backdrop_img.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/justwatch_remove_backdrop_img.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Hide existing elements
    const hideCarousels = () => {
        document.querySelectorAll('.backdrops__carousel').forEach(el => {
            el.style.display = 'none';
        });
    };

    // Initial hiding
    hideCarousels();

    // Handle dynamic content with repeated checks
    const interval = setInterval(hideCarousels, 500);

    // Also use mutation observer as backup
    const observer = new MutationObserver(hideCarousels);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Stop interval after 30 seconds (cleanup)
    setTimeout(() => clearInterval(interval), 30000);
})();

