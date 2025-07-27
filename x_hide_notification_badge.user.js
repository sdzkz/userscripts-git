// ==UserScript==
// @name         Hide X Notification Badge
// @namespace    https://x.com/
// @match        *://x.com/*
// @match        *://twitter.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_notification_badge.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_notification_badge.user.js
// ==/UserScript==

(function() {
    'use strict';
    const hideBadge = () => {
        const badge = document.querySelector('div[aria-label*="unread items"]');
        if(badge) badge.style.display = 'none';
    };
    new MutationObserver(hideBadge).observe(document, {
        childList: true,
        subtree: true
    });
    hideBadge();
})();

