// ==UserScript==
// @name         Hide Tweet Images on X.com
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hide tweet images/videos while preserving text content
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
                if (node.nodeType === Node.ELEMENT_NODE) {
                    hideMediaElements(node);
                }
            });
        });
    });

    // Start observing the document
    observer.observe(document, { 
        childList: true, 
        subtree: true 
    });

    // Initial run
    document.addEventListener('DOMContentLoaded', () => {
        hideMediaElements(document);
    });

    // Periodic check as fallback
    setInterval(() => {
        hideMediaElements(document);
    }, 1500);

    function hideMediaElements(root) {
        // Target media containers in tweets
        const selectors = [
            'div[data-testid="tweet"] div:has(> div > div > div > div > div > div > div[role="link"])', // Image containers
            'div[data-testid="tweet"] div:has(> div > div > div > div > div > div > div[aria-labelledby])', // Video containers
            'div[data-testid="tweet"] div:has(> div > div > div > div > div > div > div[style*="background-image"])', // Background image containers
            'div[data-testid="tweet"] div[role="link"]', // Link preview containers
            'div[data-testid="tweet"] div:has(> div > video)', // Video elements
            'div[data-testid="tweet"] div:has(> div > div > img)', // Direct image containers
        ];

        selectors.forEach(selector => {
            const elements = (root.nodeType === Node.ELEMENT_NODE ? root : document).querySelectorAll(selector);
            elements.forEach(el => {
                // Hide but preserve layout
                el.style.display = 'none';
                // Alternative: el.style.visibility = 'hidden';
            });
        });
    }
})();

