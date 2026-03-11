// ==UserScript==
// @name         Instagram - Ad Posts Cover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cover ad posts with overlay instead of hiding
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_ad_posts_cover.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_ad_posts_cover.user.js
// ==/UserScript==

(function() {
    'use strict';

    const coverAdPosts = () => {
        document.querySelectorAll('span.x1fhwpqd.x132q4wb.x5n08af')
            .forEach(span => {
                if (span.textContent === 'Ad') {
                    const article = span.closest('article');
                    if (article && !article.querySelector('.ad-cover')) {
                        article.style.position = 'relative';

                        const cover = document.createElement('div');
                        cover.className = 'ad-cover';
                        cover.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: white;
                            z-index: 9999;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            pointer-events: none;
                        `;

                        const text = document.createElement('div');
                        text.textContent = 'Ad content hidden';
                        text.style.cssText = `
                            color: #999;
                            font-size: 0.8em;
                            padding: 5px 10px;
                            background: rgba(255,255,255,0.9);
                            border-radius: 3px;
                        `;

                        cover.appendChild(text);
                        article.appendChild(cover);
                    }
                }
            });
    };

    // Run periodically and on events
    setInterval(coverAdPosts, 2000);
    window.addEventListener('scroll', coverAdPosts);
    window.addEventListener('load', coverAdPosts);
})();
