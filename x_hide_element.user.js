// ==UserScript==
// @name         Hide X.com Element
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides specific element on X.com
// @author       Your Name
// @match        *://x.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_element.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_hide_element.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideElement = () => {
        const selector = '#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(4)';
        const element = document.querySelector(selector);
        if (element) element.style.display = 'none';
    };

    // Initial hide attempt
    hideElement();

    // Monitor DOM changes for SPA navigation
    new MutationObserver(hideElement).observe(document.body, {
        childList: true,
        subtree: true
    });
})();

