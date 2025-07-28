// ==UserScript==
// @name         Remove sidebar sections
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes Subscriptions, Explore, More from YouTube, sections from sidebar
// @author       Your Name
// @match        *://*.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_sections.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/youtube_remove_sidebar_sections.user.js
// ==/UserScript==

(function() {
    'use strict';

    const removeExploreSection = () => {
        const sectionsContainer = document.getElementById('sections');
        if (!sectionsContainer) return;

        // Find all section renderers
        const sections = sectionsContainer.querySelectorAll('ytd-guide-section-renderer');
        for (const section of sections) {
            const heading = section.querySelector('h3 #guide-section-title');
            if (heading && (heading.textContent.trim() === 'Subscriptions' || heading.textContent.trim() === 'Explore' || heading.textContent.trim() === 'More from YouTube')) {
                section.remove();
                return; // Stop after removing the first matching section
            }
        }
    };

    const observer = new MutationObserver(removeExploreSection);
    observer.observe(document.body, { childList: true, subtree: true });
    removeExploreSection();
})();

