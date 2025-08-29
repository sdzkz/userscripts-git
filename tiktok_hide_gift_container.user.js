// ==UserScript==
// @name         Hide TikTok Gift Containers
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides gift container elements on TikTok
// @author       You
// @match        https://www.tiktok.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Hide existing gift containers
    const hideGiftContainers = () => {
        const containers = document.querySelectorAll('div.w-full.flex.items-center.justify-center[data-gift-container="1"]');
        containers.forEach(el => {
            el.style.display = 'none';
        });
    };

    // Observe DOM changes to catch dynamically loaded containers
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node itself matches
                    if (node.matches?.('div.w-full.flex.items-center.justify-center[data-gift-container="1"]')) {
                        node.style.display = 'none';
                    }
                    // Check if any of its children match
                    const matchingChildren = node.querySelectorAll?.('div.w-full.flex.items-center.justify-center[data-gift-container="1"]');
                    if (matchingChildren) {
                        matchingChildren.forEach(el => el.style.display = 'none');
                    }
                }
            });
        });
    });

    // Initial hide and start observing
    hideGiftContainers();
    observer.observe(document.body, { childList: true, subtree: true });
})();

