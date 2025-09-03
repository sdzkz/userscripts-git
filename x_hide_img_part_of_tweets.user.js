// ==UserScript==
// @name         Hide Third Child on x.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the third child of specific elements on x.com
// @author       You
// @match        https://x.com/*
// @grant        none
// @run-at       document-body
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_img_part_of_tweets.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_img_part_of_tweets.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Create a MutationObserver to handle dynamically added content
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                // Check if the added node is an element
                if (node.nodeType === 1) {
                    // Process the node and its descendants
                    processElements(node);
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Process existing elements on page load
    processElements(document.body);

    function processElements(root) {
        // Find elements whose first child has class 'r-zl2h9q'
        const targetElements = root.querySelectorAll(':scope > * > .r-zl2h9q');
        
        targetElements.forEach(el => {
            // Get the parent of the first child (i.e., the container element)
            const parentElement = el.parentElement;
            
            // Hide the third child if it exists
            if (parentElement && parentElement.children.length >= 3) {
                parentElement.children[2].style.display = 'none';
            }
        });
    }
})();

