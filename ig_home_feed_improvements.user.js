// ==UserScript==
// @name         Instagram - Home feed improvements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add margin to articles for better spacing, seems to reduce judder on scroll
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const adjustMargins = () => {
        document.querySelectorAll('article:not(.margin-adjusted)').forEach(article => {
            article.style.marginTop = '15px';
            article.classList.add('margin-adjusted');
        });
    };

    // Run with debounce to prevent excessive calls
    let timeout;
    const debouncedAdjust = () => {
        clearTimeout(timeout);
        timeout = setTimeout(adjustMargins, 200);
    };

    setInterval(debouncedAdjust, 2000);
    window.addEventListener('scroll', debouncedAdjust);
    window.addEventListener('resize', debouncedAdjust);
    window.addEventListener('load', adjustMargins);
})();
