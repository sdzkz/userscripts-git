// ==UserScript==
// @name         Wikipedia Unpin Sidebar
// @version      1.6
// @description  Clicks the unpin button on the main menu sidebar on page load
// @match        *://*.wikipedia.org/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/wikipedia_unpin_sidebar.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/wikipedia_unpin_sidebar.user.js
// ==/UserScript==

(function () {
  'use strict';

  const selector = 'button.vector-pinnable-header-unpin-button[data-event-name="pinnable-header.vector-main-menu.unpin"]';

  // Wikipedia's own JS attaches event listeners after document-idle,
  // so we need to wait for it to finish initializing.
  setTimeout(() => {
    const btn = document.querySelector(selector);
    console.log('[UnpinSidebar] Delayed click attempt, button:', btn);
    if (btn) btn.click();
  }, 1000);
})();
