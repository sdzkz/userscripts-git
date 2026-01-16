// ==UserScript==
// @name         Claude Blog Clean
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide hero, marquee, and section spacer on Claude blog
// @match        https://claude.com/blog*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/claude_blog_clean.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/claude_blog_clean.user.js
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .hero_blog_contain.u-container.u-threshold-medium,
        .marquee_wrap,
        .u-section-spacer.w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490.u-ignore-trim {
            display: none !important;
        }
        .blog_wrap.u-section {
            border-top: none !important;
        }
    `;
    document.head.appendChild(style);
})();
