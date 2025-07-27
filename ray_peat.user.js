// ==UserScript==
// @name         RayPeat.com - Add 10% Margin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a 10% margin to the left and right of the body element
// @match        https://raypeat.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ray_peat.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ray_peat.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to add margin to body
    function addMarginToBody() {
        document.body.style.marginLeft = '10%';
        document.body.style.marginRight = '10%';
        document.body.style.width = '80%';
    }

    // Run the function when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addMarginToBody);
    } else {
        addMarginToBody();
    }
})();
