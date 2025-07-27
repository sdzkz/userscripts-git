// ==UserScript==
// @name         Big Scrollbar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Increase the width of scrollbars on all pages
// @author       You
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js
// ==/UserScript==

(function() {
    'use strict';
    const style = document.createElement('style');
    style.innerHTML = `
        ::-webkit-scrollbar {
            width: 30px !important;
            height: 30px !important;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
        }
        ::-webkit-scrollbar-thumb {
            background: #888 !important;
            border-radius: 5px !important;
        }
    `;
    document.head.appendChild(style);
})();

