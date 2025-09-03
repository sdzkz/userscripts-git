// ==UserScript==
// @name         Hide X.com Children Except First Two
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide all children except first two of specific X.com elements
// @author       You
// @match        https://x.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_parts_of_tweet.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_parts_of_tweet.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Target class combination
    const targetClass = 'css-175oi2r r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu';

    // Function to hide children except first two
    function hideChildrenExceptFirstTwo() {
        const elements = document.querySelectorAll(`[class="${targetClass}"]`);
        
        elements.forEach(element => {
            // Get all direct children
            const children = Array.from(element.children);
            
            // Hide all children except first two
            children.forEach((child, index) => {
                if (index > 1) { // 0-indexed, so > 1 means 3rd child onwards
                    child.style.display = 'none';
                }
            });
        });
    }

    // Run immediately
    hideChildrenExceptFirstTwo();

    // Set up MutationObserver for dynamic content
    const observer = new MutationObserver(mutations => {
        let shouldProcess = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldProcess = true;
            }
        });
        
        if (shouldProcess) {
            hideChildrenExceptFirstTwo();
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();

