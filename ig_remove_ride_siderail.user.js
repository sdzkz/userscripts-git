// ==UserScript==
// @name         Instagram - Remove right siderail
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Remove Suggested for You
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_remove_ride_siderail.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_remove_ride_siderail.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeSections = () => {
        // Remove "Suggested for you" section
        const suggested = Array.from(document.querySelectorAll('span, div')).filter(el =>
            el.textContent.trim() === 'Suggested for you'
        );
        suggested.forEach(el => {
            // Go up 5 levels to get the main container
            let container = el;
            for (let i = 0; i < 5; i++) {
                container = container.parentElement;
                if (!container) break;
            }
            if (container && container.classList.contains('x9f619')) {
                container.remove();
            }
        });

        // Remove "Suggested accounts" section
        const suggestedAccounts = Array.from(document.querySelectorAll('span, div')).filter(el =>
            el.textContent.trim() === 'Suggested accounts'
        );
        suggestedAccounts.forEach(el => {
            // Go up 5 levels to get the main container
            let container = el;
            for (let i = 0; i < 5; i++) {
                container = container.parentElement;
                if (!container) break;
            }
            if (container && container.classList.contains('x9f619')) {
                container.remove();
            }
        });
    };

    const observer = new MutationObserver(removeSections);
    observer.observe(document.body, { childList: true, subtree: true });
    removeSections();
})();
