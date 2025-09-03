// ==UserScript==
// @name         Hide Tweet Text on X.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide tweet text elements while preserving image layout
// @author       You
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_img_part_of_tweets.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_img_part_of_tweets.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Create a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                // Process newly added nodes
                if (node.nodeType === Node.ELEMENT_NODE) {
                    hideTweetText(node);
                    // Also check children of added nodes
                    node.querySelectorAll && 
                        node.querySelectorAll('[data-testid="tweetText"]').forEach(hideTweetText);
                }
            });
        });
    });

    // Start observing the document
    observer.observe(document, { 
        childList: true, 
        subtree: true 
    });

    // Initial run on existing content
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-testid="tweetText"]').forEach(hideTweetText);
    });

    // Also run periodically as a fallback
    setInterval(() => {
        document.querySelectorAll('[data-testid="tweetText"]').forEach(hideTweetText);
    }, 1000);

    function hideTweetText(element) {
        // Only target the specific tweet text elements
        if (element.dataset && element.dataset.testid === 'tweetText') {
            // Hide the element but preserve its space
            element.style.visibility = 'hidden';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            
            // Alternative: completely hide (might affect layout)
            // element.style.display = 'none';
        }
    }
})();

