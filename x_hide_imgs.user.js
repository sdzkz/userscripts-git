// ==UserScript==
// @name         Hide Background Images on X.com
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hide all background images on x.com (Twitter)
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

    // CSS to hide background images
    const hideBgImages = () => {
        const style = document.createElement('style');
        style.textContent = `
            * {
                background-image: none !important;
                background: none !important;
                background-color: #000000 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // MutationObserver for dynamic content
    const observeBgImages = () => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element nodes
                        // Handle the node itself
                        if (node.style) {
                            node.style.backgroundImage = 'none';
                            node.style.background = 'none';
                        }
                        
                        // Handle children
                        const elements = node.querySelectorAll && node.querySelectorAll('*');
                        if (elements) {
                            elements.forEach(el => {
                                if (el.style) {
                                    el.style.backgroundImage = 'none';
                                    el.style.background = 'none';
                                }
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    // Initialize when DOM is ready
    if (document.head) {
        hideBgImages();
    } else {
        const headObserver = new MutationObserver(() => {
            if (document.head) {
                hideBgImages();
                headObserver.disconnect();
            }
        });
        headObserver.observe(document.documentElement, { childList: true });
    }

    // Initialize observer when body exists
    if (document.body) {
        observeBgImages();
    } else {
        document.addEventListener('DOMContentLoaded', observeBgImages);
    }
})();

