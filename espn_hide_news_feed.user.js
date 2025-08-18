// ==UserScript==
// @name         ESPN - News Feed Hider
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides the #news-feed element on espn.com using a robust method that works on dynamic pages.
// @author       Your Name
// @match        *://*.espn.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_hide_news_feed.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_hide_news_feed.user.js
// ==/UserScript==

(function() {
    'use strict';

    const selectorToHide = '#news-feed';
    const styleId = 'espn-hide-news-feed-style';

    /**
     * Injects a CSS rule into the document's head to hide the target element.
     * This method is generally more efficient and less prone to being overridden
     * than directly setting element.style.display = 'none'.
     * Using !important ensures our rule takes precedence.
     */
    const addHideStyle = () => {
        // If the style element already exists, do nothing.
        if (document.getElementById(styleId)) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            ${selectorToHide} {
                display: none !important;
                visibility: hidden !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
        console.log(`[ESPN Hider] CSS rule injected to hide ${selectorToHide}.`);
    };

    // Inject the style immediately. This will hide the element if it exists in the
    // initial HTML, preventing any "flash of content".
    addHideStyle();

    // Although we inject the style immediately with @run-at document-start,
    // some frameworks might remove/re-add the <head> or our <style> tag.
    // A MutationObserver can ensure our style tag is re-injected if removed.
    // However, for simply hiding an element, the initial injection is usually sufficient.
    // The following code is an example of a more complex observer if needed for
    // elements that are dynamically added and not just styled.

    /*
    // The CSS injection at 'document-start' is the primary mechanism.
    // The following MutationObserver is a fallback for extremely dynamic sites
    // where the element itself might be created and injected long after page load,
    // though the CSS rule should still apply once it's added. It's left here
    // for educational purposes or for more complex scenarios.

    const targetNode = document.body || document.documentElement;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
        const targetElement = document.querySelector(selectorToHide);
        if (targetElement) {
            // The CSS rule should have already hidden it, but we can log
            // that it has been found.
            console.log(`[ESPN Hider] Observed that ${selectorToHide} is now in the DOM.`);
            // Since our job is done (the element exists and our CSS rule will hide it),
            // we can disconnect the observer to save resources.
            observer.disconnect();
        }
    };

    const observer = new MutationObserver(callback);

    // If the body isn't available yet, wait for it.
    if (document.body) {
        observer.observe(targetNode, config);
    } else {
        new MutationObserver((_, obs) => {
            if(document.body) {
                observer.observe(document.body, config);
                obs.disconnect();
            }
        }).observe(document.documentElement, {childList: true});
    }
    */
})();

