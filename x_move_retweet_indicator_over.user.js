// ==UserScript==
// @name         Fix Flex Basis for x.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sets flex-basis: auto for elements with class r-onrtq4 on x.com
// @author       You
// @match        https://x.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_move_retweet_indicator_over.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_move_retweet_indicator_over.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Create and inject CSS
    const style = document.createElement('style');
    style.textContent = `
        .r-onrtq4 {
            flex-basis: auto !important;
        }
    `;
    document.head.appendChild(style);
})();

