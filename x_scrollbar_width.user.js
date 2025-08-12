// ==UserScript==
// @name         Custom Scrollbar Width
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Increase scrollbar width and set minimum thumb height
// @author       You
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_scrollbar_width.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_scrollbar_width.user.js
// ==/UserScript==

(function() {
    'use strict';
    const style = document.createElement('style');
    style.innerHTML = `
        ::-webkit-scrollbar {
            width: 100px !important;
            height: 100px !important;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
        }
        ::-webkit-scrollbar-thumb {
            background: #888 !important;
            border-radius: 5px !important;
            min-height: 300px !important;
        }
    `;
    document.head.appendChild(style);
})();


