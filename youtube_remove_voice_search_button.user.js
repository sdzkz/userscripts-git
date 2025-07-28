// ==UserScript==
// @name         Remove YouTube Voice Search Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the voice search button from YouTube
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_voice_search_button.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_voice_search_button.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeVoiceSearchButton = () => {
        const voiceButton = document.getElementById('voice-search-button');
        if (voiceButton) {
            voiceButton.remove();
        }
    };

    const observer = new MutationObserver(removeVoiceSearchButton);
    observer.observe(document.body, { childList: true, subtree: true });
    removeVoiceSearchButton();
})();

