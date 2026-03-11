// ==UserScript==
// @name         Instagram - Sponsored Posts Cover
// @namespace    http://tampermonkey.net/
// @version      0.31
// @description  Cover sponsored posts with overlay instead of hiding
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_sponsored_posts_cover.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_sponsored_posts_cover.user.js
// ==/UserScript==

(function() {
    'use strict';
    const coverSponsored = () => {
        document.querySelectorAll('span:is(.x1fhwpqd, .x132q4wb, .x5n08af)')
            .forEach(span => {
                if (span.textContent.includes('Sponsored')) {
                    const article = span.closest('article');
                    if (article && !article.querySelector('.sponsored-cover')) {
                        const contentDiv = article.querySelector('div:first-child');
                        if (contentDiv) contentDiv.style.marginTop = '5px';

                        const cover = document.createElement('div');
                        cover.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: white;
                            z-index: 9999;
                            pointer-events: none;
                        `;
                        cover.className = 'sponsored-cover';

                        const text = document.createElement('div');
                        text.textContent = 'Sponsored content hidden';
                        text.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: #999;
                            font-size: 0.8em;
                        `;
                        cover.appendChild(text);

                        article.style.position = 'relative';
                        article.appendChild(cover);
                    }
                }
            });
    };

    setInterval(coverSponsored, 2000);
    window.addEventListener('scroll', coverSponsored);
    window.addEventListener('load', coverSponsored);
})();
