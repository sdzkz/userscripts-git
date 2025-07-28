// ==UserScript==
// @name         Remove YouTube Top Right Corner Elements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the account/settings section in the top right corner
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_top_right_corner.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_top_right_corner.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeTopRightElements = () => {
        const endElement = document.getElementById('end');
        if (endElement) {
            endElement.remove();
        }
    };

    const observer = new MutationObserver(removeTopRightElements);
    observer.observe(document.body, { childList: true, subtree: true });
    removeTopRightElements();
})();
