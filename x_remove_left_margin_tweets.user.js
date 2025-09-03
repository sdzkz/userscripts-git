// ==UserScript==
// @name         X.com - Remove tweet left margin
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hide elements with specific classes on X.com
// @author       You
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_remove_left_margin_tweets.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_remove_left_margin_tweets.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Classes to target (without the leading dots)
    const targetClasses = [
        'css-175oi2r',
        'r-18kxxzh',
        'r-1wron08',
        'r-onrtq4',
        'r-1awozwy'
    ];

    // Create a unique class name for our hiding style
    const hideClassName = 'x-userscript-hidden-' + Date.now();

    // Add CSS to hide elements with our special class
    function addHideStyle() {
        if (document.getElementById('x-userscript-hide-style')) return;

        const style = document.createElement('style');
        style.id = 'x-userscript-hide-style';
        style.textContent = `
            .${hideClassName} {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Function to hide elements with all specified classes
    function hideTargetElements() {
        // Create selector for elements containing ALL specified classes
        const selector = targetClasses.map(cls => `.${cls}`).join('');
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            if (!el.classList.contains(hideClassName)) {
                el.classList.add(hideClassName);
            }
        });
    }

    // Create MutationObserver
    let observer;
    function createObserver() {
        if (observer) return;

        observer = new MutationObserver(mutations => {
            let shouldHide = false;

            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldHide = true;
                    break;
                }
            }

            if (shouldHide) {
                hideTargetElements();
            }
        });
    }

    // Start observing when DOM is ready
    function startObserving() {
        if (!observer || !document.body) return;

        try {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } catch (e) {
            console.warn('MutationObserver failed:', e);
        }
    }

    // Initialize
    function init() {
        addHideStyle();
        hideTargetElements();
        createObserver();
        startObserving();
    }

    // Handle different loading states
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            startObserving();
        });
    } else {
        // DOM is already ready
        init();
        // Delay startObserving slightly to ensure body exists
        setTimeout(startObserving, 0);
    }

    // Also run periodically as a fallback
    setInterval(hideTargetElements, 1000);

    // Handle navigation events (for single-page apps)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(hideTargetElements, 100);
        }
    }).observe(document, { subtree: true, childList: true });
})();

