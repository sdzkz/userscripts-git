// ==UserScript==
// @name         Hide TikTok Gift Containers
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides gift container elements on TikTok
// @author       You
// @match        https://www.tiktok.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Multiple hiding strategies
    const hideElement = (el) => {
        // Method 1: display none
        el.style.setProperty('display', 'none', 'important');
        
        // Method 2: visibility hidden + size reduction
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('width', '0px', 'important');
        el.style.setProperty('height', '0px', 'important');
        el.style.setProperty('min-height', '0px', 'important');
        el.style.setProperty('min-width', '0px', 'important');
        el.style.setProperty('margin', '0px', 'important');
        el.style.setProperty('padding', '0px', 'important');
        
        // Method 3: remove from DOM (optional - uncomment if needed)
        // el.remove();
    };

    // Hide existing gift containers
    const hideGiftContainers = () => {
        const containers = document.querySelectorAll('div[data-gift-container="1"]');
        containers.forEach(el => {
            console.log('Hiding gift container:', el);
            hideElement(el);
        });
    };

    // More robust selector observer
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    // Check direct match
                    if (node.hasAttribute?.('data-gift-container')) {
                        console.log('New gift container detected (direct):', node);
                        hideElement(node);
                    }
                    
                    // Check descendants
                    const matchingChildren = node.querySelectorAll?.('[data-gift-container="1"]');
                    if (matchingChildren && matchingChildren.length > 0) {
                        matchingChildren.forEach(el => {
                            console.log('New gift container detected (child):', el);
                            hideElement(el);
                        });
                    }
                }
            });
        });
    });

    // Start observing early
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        hideGiftContainers();
    } else {
        // Wait for body if not available
        const waitForBody = setInterval(() => {
            if (document.body) {
                clearInterval(waitForBody);
                observer.observe(document.body, { childList: true, subtree: true });
                hideGiftContainers();
            }
        }, 100);
    }

    // Also run on DOMContentLoaded and load events
    document.addEventListener('DOMContentLoaded', hideGiftContainers);
    window.addEventListener('load', hideGiftContainers);
    
    // Periodic check as fallback
    setInterval(hideGiftContainers, 1000);
})();

