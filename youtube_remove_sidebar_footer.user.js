// ==UserScript==
// @name         Remove YouTube Sidebar Footer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the footer section from YouTube sidebar
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_footer.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_footer.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeFooter = () => {
        const footer = document.getElementById('footer');
        if (footer && footer.classList.contains('style-scope') &&
            footer.classList.contains('ytd-guide-renderer')) {
            footer.remove();
        }
    };

    const observer = new MutationObserver(removeFooter);
    observer.observe(document.body, { childList: true, subtree: true });
    removeFooter();
})();
