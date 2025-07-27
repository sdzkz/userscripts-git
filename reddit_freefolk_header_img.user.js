// ==UserScript==
// @name         r/FreeFolk - Remove header image
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove subreddit header images on Reddit (old design) while preserving space
// @match        https://www.reddit.com/r/freefolk*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/reddit_freefolk_header_img.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/reddit_freefolk_header_img.user.js
// ==/UserScript==

(function() {
    'use strict';

    function modifyHeaderImage() {
        // Modify the header image
        const headerImg = document.getElementById('header-img');
        if (headerImg) {
            headerImg.style.visibility = 'hidden';
            // Preserve the original dimensions
            const width = headerImg.width;
            const height = headerImg.height;
            headerImg.style.width = width + 'px';
            headerImg.style.height = height + 'px';
        }

        // Remove the header background image while preserving space
        const header = document.getElementById('header');
        if (header) {
            header.style.backgroundImage = 'none';
            // Preserve the original height if it exists
            if (!header.style.height) {
                header.style.height = getComputedStyle(header).height;
            }
        }

        // Handle custom banner
        const banner = document.querySelector('.banner-background');
        if (banner) {
            banner.style.backgroundImage = 'none';
            // Preserve the original height
            if (!banner.style.height) {
                banner.style.height = getComputedStyle(banner).height;
            }
        }
    }

    // Run the function when the page loads
    modifyHeaderImage();

    // Use a MutationObserver to handle any dynamic changes
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                modifyHeaderImage();
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also run the function periodically to ensure it catches any changes
    setInterval(modifyHeaderImage, 1000);
})();
