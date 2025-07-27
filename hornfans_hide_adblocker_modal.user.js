// ==UserScript==
// @name         HornFans Modal Closer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically closes the modal on hornfans.com
// @author       You
// @match        https://www.hornfans.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/hornfans_hide_adblocker_modal.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/hornfans_hide_adblocker_modal.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to click the close button
    function closeModal() {
        //const closeButton = document.querySelector('#YnNMDVHyfp > div.BDshUZBRyxCU > div > div:nth-child(2) > a.button--link.button.SBhDqccKVUnoWntp');
        const closeButton = document.querySelector('body > div > div > div > div > div > a.button--link.button');
        if (closeButton) {
            closeButton.click();
        }
    }

    // Try immediately and also after a short delay to ensure the modal has loaded
    closeModal();
    setTimeout(closeModal, 500);
})();
