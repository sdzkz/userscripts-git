// ==UserScript==
// @name         YouTube Logo Force Reload
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Forces full page reload when clicking YouTube logo
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_logo_force_reload.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_logo_force_reload.user.js
// ==/UserScript==

(function() {
    'use strict';

    const forceReloadOnLogoClick = () => {
        const logo = document.getElementById('logo');
        if (logo && !logo.dataset.reloadModified) {
            logo.dataset.reloadModified = 'true';

            logo.addEventListener('click', (event) => {
                // Only handle left mouse button clicks without modifiers
                if (event.button === 0 && !event.ctrlKey && !event.shiftKey &&
                    !event.altKey && !event.metaKey) {
                    event.preventDefault();
                    event.stopPropagation();

                    // Force full page reload
                    window.location.href = '/';
                }
            });
        }
    };

    const observer = new MutationObserver(forceReloadOnLogoClick);
    observer.observe(document.body, { childList: true, subtree: true });
    forceReloadOnLogoClick();
})();
