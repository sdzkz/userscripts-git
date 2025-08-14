// ==UserScript==
// @name         Hide ESPN Main Pane
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the main pane on ESPN.com
// @author       You
// @match        https://www.espn.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_hide_pane_main.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_hide_pane_main.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Hide the element immediately if it exists
    const paneMain = document.getElementById('pane-main');
    if (paneMain) {
        paneMain.style.display = 'none';
    }

    // Use MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const paneMain = document.getElementById('pane-main');
                if (paneMain) {
                    paneMain.style.display = 'none';
                }
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

