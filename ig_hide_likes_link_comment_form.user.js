// ==UserScript==
// @name         Instagram - Home Hide Likes, Link, Comment form
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide specific elements on Instagram posts
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_hide_likes_link_comment_form.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_hide_likes_link_comment_form.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideElements = () => {
        document.querySelectorAll('section.xat24cr, div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1xmf6yo').forEach(el => {
            el.style.display = 'none';
        });
    };

    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, { childList: true, subtree: true });
    hideElements();
})();
