// ==UserScript==
// @name         Fix Vertical Text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make vertical-rl text horizontal
// @author       You
// @match        https://moir.ee/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/moiree_make_text_horiz.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/moiree_make_text_horiz.user.js
// ==/UserScript==

GM_addStyle(`
    .\\[writing-mode\\:vertical-rl\\] {
        writing-mode: horizontal-tb !important;
        transform: none !important;
        white-space: normal !important;
    }
    .\\[writing-mode\\:vertical-rl\\] p {
        display: inline-block !important;
        margin-right: 15px !important;
    }
`);
