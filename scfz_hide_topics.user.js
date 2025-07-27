// ==UserScript==
// @name         SCFZ - Hide certain topics
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Hides the list item containing a specific topic title link
// @author       Your Name
// @match        *://scfzforum.org/phpBB3/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/scfz_hide_topics.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/scfz_hide_topics.user.js
// ==/UserScript==

(function() {
    'use strict';

    const blockedTopics = [
        "Everything is Political",
        "stop the lists 3.0"
    ];

    function hideParentElements() {
        document.querySelectorAll('li.row dl.row-item dt a.topictitle').forEach(function(element) {
            if (blockedTopics.some(term => element.textContent.trim().includes(term))) {
                var parentLi = element.closest('li.row');
                if (parentLi) {
                    parentLi.style.display = 'none';
                }
            }
        });
    }

    hideParentElements();

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                hideParentElements();
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, { childList: true, subtree: true });
    });

    setInterval(hideParentElements, 500);
})();
