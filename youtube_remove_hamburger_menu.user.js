// ==UserScript==
// @name         Remove YouTube Hamburger Menu Near Logo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the sidebar toggle button next to YouTube logo
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_hamburger_menu.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_hamburger_menu.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeHamburgerMenu = () => {
        const guideButton = document.getElementById('guide-button');
        if (guideButton) {
            guideButton.remove();
        }
    };

    const observer = new MutationObserver(removeHamburgerMenu);
    observer.observe(document.body, { childList: true, subtree: true });
    removeHamburgerMenu();
})();
