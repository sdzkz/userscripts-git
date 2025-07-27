// ==UserScript==
// @name         Boneyard - Hide "Disable Ad Blocker"
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  N/A
// @match        https://the-boneyard.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts/main/boneyard_ad_blocker.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts/main/boneyard_ad_blocker.user.js
// ==/UserScript==

(function() {
    'use strict';
    const element = document.querySelector("#top > div.p-body > div > ul.notices.notices--block.js-notices");
    if (element) element.remove();
})();
