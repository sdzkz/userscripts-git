// ==UserScript==
// @name         Hide All Images on X.com
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hide all images on x.com (Twitter)
// @author       You
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_imgs.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_imgs.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Create stylesheet to hide images
    const hideImages = () => {
        const style = document.createElement('style');
        style.textContent = 'img { display: none !important; }';
        document.head.appendChild(style);
    };

    // MutationObserver to handle dynamically loaded content
    const observeImages = () => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        // Hide images directly
                        if (node.tagName === 'IMG') {
                            node.style.display = 'none';
                        }
                        // Hide images within added elements
                        const images = node.querySelectorAll && node.querySelectorAll('img');
                        if (images) {
                            images.forEach(img => img.style.display = 'none');
                        }
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    // Handle different loading states
    if (document.head) {
        hideImages();
    } else {
        document.addEventListener('DOMContentLoaded', hideImages);
    }

    if (document.body) {
        observeImages();
    } else {
        document.addEventListener('DOMContentLoaded', observeImages);
    }
})();

