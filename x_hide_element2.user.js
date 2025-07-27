// ==UserScript==
// @name         X.com Element Hider
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides specific element on X.com
// @author       YourName
// @match        *://x.com/*
// @match        *://twitter.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_element2.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_element2.user.js
// ==/UserScript==

(function() {
    'use strict';

    const targetSelector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(5)";

    const hideElement = () => {
        const element = document.querySelector(targetSelector);
        if (element) element.style.display = 'none';
    };

    // Initial execution
    hideElement();

    // Create observer for dynamic content
    const observer = new MutationObserver(hideElement);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

