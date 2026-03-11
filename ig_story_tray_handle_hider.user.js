// ==UserScript==
// @name         Instagram - Story Tray Handle Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide Instagram handles in story tray
// @author       You
// @match        https://www.instagram.com/
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_story_tray_handle_hider.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/ig_story_tray_handle_hider.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideHandles = () => {
        const handles = document.querySelectorAll('div[data-pagelet="story_tray"] div.x4e6jrt');
        handles.forEach(handle => handle.style.display = 'none');
    };

    const observer = new MutationObserver(hideHandles);

    const init = () => {
        const storyTray = document.querySelector('div[data-pagelet="story_tray"]');
        if (storyTray) {
            observer.observe(storyTray, { childList: true, subtree: true });
            hideHandles();
        }
    };

    window.addEventListener('load', init);
})();
