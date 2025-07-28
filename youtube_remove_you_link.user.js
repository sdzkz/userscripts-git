// ==UserScript==
// @name         Remove YouTube "You" Sidebar Link
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the "You" link from YouTube sidebar
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_you_link.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_you_link.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeYouLink = () => {
        document.querySelectorAll('#endpoint').forEach(link => {
            if (link.title === 'You') {
                link.remove();
            }
        });
    };

    const observer = new MutationObserver(removeYouLink);
    observer.observe(document.body, { childList: true, subtree: true });
    removeYouLink();
})();
