// ==UserScript==
// @name         Remove YouTube Homepage Primary Content
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the main content area from YouTube homepage
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_home_remove_main.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_home_remove_main.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removePrimaryContent = () => {
        // Only run on homepage
        if (window.location.pathname !== '/') return;

        const primaryContent = document.getElementById('primary');
        if (primaryContent &&
            primaryContent.classList.contains('style-scope') &&
            primaryContent.classList.contains('ytd-two-column-browse-results-renderer')) {
            primaryContent.remove();
        }
    };

    const observer = new MutationObserver(removePrimaryContent);
    observer.observe(document.body, { childList: true, subtree: true });
    removePrimaryContent();
})();
