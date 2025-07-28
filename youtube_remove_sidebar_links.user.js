// ==UserScript==
// @name         Remove links from sidebar
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide specific sidebar items
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_links.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_links.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Add titles to hide in this array
    const titlesToHide = [
        'Home',
        'Shorts',
        'Your videos',
        'Your movies & TV',
        'Liked videos',
        'Watch later',
        'Report history',
        'Help',
        'Send feedback'
    ];

    const hideItems = () => {
        // Hide top-level items
        document.querySelectorAll('#endpoint').forEach(link => {
            const titleElement = link.querySelector('.title');
            if(titleElement && titlesToHide.includes(titleElement.textContent.trim())) {
                link.style.display = 'none';
            }
        });

    };

    const observer = new MutationObserver(hideItems);
    observer.observe(document.body, { childList: true, subtree: true });
    hideItems();
})();
