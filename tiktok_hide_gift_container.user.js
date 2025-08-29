// ==UserScript==
// @name         Hide TikTok Gift Containers (Specific)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides specific gift container elements on TikTok Live
// @author       You
// @match        https://www.tiktok.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/tiktok_hide_gift_container.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Multiple targeting approaches
    const selectors = [
        // Your specific selector
        '#tiktok-live-main-container-id > div.bg-UIPageFlat1.tiktok-q76ycn.eayczbk0 > div.tiktok-i9gxme.eayczbk1 > div > div.css-112zjc7.relative.overflow-x-hidden.overflow-auto.p-12 > div.min-h-\\[540px\\].rounded-2xl.overflow-hidden > div:nth-child(3) > div',
        
        // Simplified versions
        '[data-gift-container="1"]',
        'div[data-gift-container]',
        
        // Broader gift-related selectors
        '[class*="gift"]',
        '[class*="Gift"]'
    ];

    const hideElement = (el) => {
        if (!el || el.__hiddenByScript) return; // Prevent double-processing
        
        // Mark as processed
        el.__hiddenByScript = true;
        
        // Aggressive hiding
        el.style.cssText = `
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            min-width: 0 !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            z-index: -9999 !important;
        `;
        
        console.log('Hidden element:', el);
    };

    const hideGiftContainers = () => {
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(hideElement);
            } catch (e) {
                console.debug('Selector failed:', selector, e);
            }
        });
    };

    // Comprehensive observation
    const observer = new MutationObserver(mutations => {
        let shouldHide = false;
        
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldHide = true;
                break;
            }
        }
        
        if (shouldHide) {
            // Use microtask to debounce
            queueMicrotask(hideGiftContainers);
        }
    });

    // Start observation
    const startObservation = () => {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            hideGiftContainers();
        }
    };

    // Multiple startup methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObservation);
    } else {
        startObservation();
    }
    
    // Fallback polling
    const interval = setInterval(hideGiftContainers, 500);
    
    // Stop polling after 30 seconds to prevent performance issues
    setTimeout(() => clearInterval(interval), 30000);
    
    // Also run on page load
    window.addEventListener('load', hideGiftContainers);
})();

