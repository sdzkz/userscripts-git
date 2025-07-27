// ==UserScript==
// @name         Letterboxd Activity Links New Tab
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Open activity links in new tab
// @author       You
// @match        https://letterboxd.com/activity/*
// @icon         https://letterboxd.com/favicon.ico
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_activity_new_tab.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_activity_new_tab.user.js
// ==/UserScript==

(function() {
    'use strict';

    function processLinks() {
        const section = document.querySelector('#content > div > div > section');
        if (!section) return;

        section.querySelectorAll('a:not([target="_blank"])').forEach(link => {
            link.target = '_blank';
        });
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) processLinks();
            });
        });
    });

    function init() {
        processLinks();
        const targetSection = document.querySelector('#content > div > div > section');
        if (targetSection) {
            observer.observe(targetSection, {
                childList: true,
                subtree: true
            });
        }
        else {
            setTimeout(init, 500);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(init, 1000);
    });

    // Periodic check as fallback
    setInterval(processLinks, 2000);
})();
