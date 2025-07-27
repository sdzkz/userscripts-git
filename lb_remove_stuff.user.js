// ==UserScript==
// @name         Letterboxd - Remove elements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://letterboxd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_remove_stuff.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/lb_remove_stuff.user.js
// ==/UserScript==

(function() {
    'use strict';

    const myTimeout = setTimeout(deleteElements(), 5000);

    adjustCss();
})();

function deleteElements() {
    const classes_to_remove = [
                "badge", //Pro or patron badge
                "follows-message", //Follows you message
                "profile-mutuals-strip", //Also followed by
                "avatar",
                "profile-statistic",
                "th-rating",
                "title-hero",
                "banner", // ads
                "block-flag-wrapper" //Report or block

        //"account-status",
        //"actions-panel", //side panel on lists
        //"avatar-list", //Following circles
        //"content-metadata",
        //"context",
        //"diary-like",
        //"editable-rating",
        //"js-toggle-settings-panel",
        //"like-link", //Like list/see who liked
        //"main-nav-journal",
        //"main-nav-people",
        //"modaltrigger",
        //"profile-avatar",
        //"section-heading",
        //"status",
        //"tabbed",
        //"table-activity-user",
        //"teaser-media",
    ];

    var arrayLength = classes_to_remove.length;
    for (var i = 0; i < arrayLength; i++) {

        const collection = document.querySelectorAll('.' + classes_to_remove[i]);

        for (let i = 0; i < collection.length; i++) {
            const elem = collection[i];
            elem.parentNode.removeChild(elem);
        }
    }
}

function adjustCss() {

    let padding_left_0 = [
        '.no-mobile .profile-summary .profile-info',
        '.no-mobile .profile-summary .profile-name',
        '.person-summary'
        ];

    var arrayLength = padding_left_0.length;
    for (var i = 0; i < arrayLength; i++) {

        const collection2 = document.querySelectorAll(padding_left_0[i]);

        for (let i = 0; i < collection2.length; i++) {
            const elem = collection2[i];
            elem.style.paddingLeft = 0;
        }
    }

}

