// ==UserScript==
// @name         Remove YouTube Thumbnails
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes thumbnails from YouTube video grids
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const removeThumbnails = () => {
        document.querySelectorAll('ytd-rich-grid-media #dismissible #thumbnail').forEach(el => {
            el.remove();
        });
    };

    const observer = new MutationObserver(() => {
        removeThumbnails();
    });

    window.addEventListener('load', () => {
        removeThumbnails();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();

