// ==UserScript==
// @name         Instagram - Hide Sponsored/Ad Stories
// @namespace    ig-sponsored-hider
// @match        https://www.instagram.com/*
// @grant        none
// @version      1.2
// @description  Hide sponsored stories and ads on Instagram
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_hide_sponsored_ad_stories.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_hide_sponsored_ad_stories.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideAds = () => {
        document.querySelectorAll('span').forEach(span => {
            const text = span.textContent;
            if (text.includes('Sponsored') || text.includes('Ad')) {
                const container = span.closest('div[style*="position: absolute"]');
                if (container) container.remove();
            }
        });
    };

    new MutationObserver(hideAds)
        .observe(document.body, { childList: true, subtree: true });

    hideAds();
})();

