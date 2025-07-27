// ==UserScript==
// @name         ON3 College Link Color Changer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes font color of college links on ON3 Women's Basketball Transfer Portal Tracker to #29f085
// @author       Grok
// @match        https://www.on3.com/her/news/on3-2024-2025-womens-basketball-transfer-portal-tracker/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/on3_link_changer.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/on3_link_changer.user.js
// ==/UserScript==

(function() {
    'use strict';
    // Select all anchor tags
    const links = document.querySelectorAll('a[href^="https://www.on3.com/college/"]');
    const linksAlt = document.querySelectorAll('a[href^="https://www.on3.com/teams/"]');

    // Apply the font color to matching links
    links.forEach(link => {
        link.style.color = '#008000';
    });

    linksAlt.forEach(link => {
        link.style.color = '#008000';
    });
})();
