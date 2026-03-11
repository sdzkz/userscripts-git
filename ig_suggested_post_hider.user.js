// ==UserScript==
// @name         Instagram - (verify) Suggested Post Hider
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides Instagram articles with "Suggested for you" elements
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_suggested_post_hider.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_suggested_post_hider.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideSuggestedPosts = () => {
        document.querySelectorAll('article').forEach(article => {
            const spans = article.querySelectorAll('span');
            for (const span of spans) {
                if (span.textContent.trim() === "Suggested for you") {
                    article.style.display = 'none';
                    break;
                }
            }
        });
    };

    const initObserver = () => {
        const observer = new MutationObserver(hideSuggestedPosts);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            hideSuggestedPosts();
            initObserver();
        });
    } else {
        hideSuggestedPosts();
        initObserver();
    }
})();
