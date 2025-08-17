// ==UserScript==
// @name         Custom Scrollbar Width
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Increase scrollbar width and set minimum thumb height
// @author       You
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/all_scrollbar_width.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/all_scrollbar_width.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Set of hostnames where any port should be excluded
    const excludedHostnames = new Set([
        '127.0.0.1'
    ]);
    
    // Array of URL prefixes to exclude
    const excludedPrefixes = [
	'https://www.google.com/maps/'
    ];
    
    // Check hostname-based exclusions (any port)
    if (excludedHostnames.has(window.location.hostname)) {
        return;
    }
    
    // Check URL prefix exclusions
    const currentUrl = window.location.href;
    for (const prefix of excludedPrefixes) {
        if (currentUrl.startsWith(prefix)) {
            return;
        }
    }
    
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

