// ==UserScript==
// @name         Letterboxd Auto-Load Activity
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Automatically loads older activity when scrolling
// @author       You
// @match        https://letterboxd.com/activity/
// @icon         https://letterboxd.com/favicon.ico
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_activity_autoload.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_activity_autoload.user.js
// ==/UserScript==

(function() {
    'use strict';

    let isLoading = false;
    const endMarkerSelector = 'p.end-of-activity';

    function checkScroll() {
        // Exit if end marker exists
        if (document.querySelector(endMarkerSelector)) return;

        const loadMore = document.querySelector('a.load-more-activity');
        if (loadMore && !isLoading &&
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {

            isLoading = true;
            loadMore.target = '';
            loadMore.click();

            setTimeout(() => { isLoading = false; }, 2000);
        }
    }

    window.addEventListener('scroll', checkScroll);
    setInterval(checkScroll, 1000);
})();

