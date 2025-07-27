// ==UserScript==
// @name         Boneyard - Clean
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove navigation and section links
// @author       You
// @match        https://the-boneyard.com/forums/general-womens-basketball-forum.83/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/boneyard_clean.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/boneyard_clean.user.js
// ==/UserScript==

(function() {
    'use strict';
    const remove = selector => document.querySelector(selector)?.remove();
    remove('#top > nav');
    remove('#top > div.p-sectionLinks');
})();
