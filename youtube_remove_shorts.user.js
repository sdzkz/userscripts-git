// ==UserScript==
// @name         YouTube Shorts Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes Shorts shelf from YouTube homepage
// @author       You
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const removeShorts = () => {
        document.querySelectorAll('ytd-rich-section-renderer').forEach(section => {
            const title = section.querySelector('#title-container');
            if (title && title.textContent.trim() === 'Shorts') {
                section.remove();
            }
        });
    };

    const observer = new MutationObserver(removeShorts);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('load', removeShorts);
})();

