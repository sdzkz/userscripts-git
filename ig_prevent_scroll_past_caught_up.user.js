// ==UserScript==
// @name         Instagram - Prevent scrolling past Caught up
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Prevent scrolling past "You're all caught up" on Instagram
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_prevent_scroll_past_caught_up.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_prevent_scroll_past_caught_up.user.js
// ==/UserScript==

(function() {
    let lastScroll = window.scrollY;
    const threshold = -220; // Pixels buffer before caught-up element

    function checkCaughtUp() {
        return document.querySelector('div.xvbhtw8.x1bs97v6.x1q0q8m5.xso031l.x11aubdm.xnc8uc2');
    }

    function handleScroll() {
        const caughtUp = checkCaughtUp();
        if (!caughtUp) return;

        const scrollingDown = window.scrollY > lastScroll;
        const elementTop = caughtUp.getBoundingClientRect().top + window.scrollY;
        const viewportBottom = window.scrollY + window.innerHeight;

        if (scrollingDown && (viewportBottom >= elementTop - threshold)) {
            window.scrollTo(0, elementTop - window.innerHeight - threshold);
        }
        lastScroll = window.scrollY;
    }

    new MutationObserver(checkCaughtUp).observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener('scroll', handleScroll);
})();
