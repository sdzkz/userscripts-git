// ==UserScript==
// @name         Wikipedia Unpin Sidebar
// @version      1.4
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

  const btn = document.querySelector(selector);
  if (btn) {
    btn.click();
    return;
  }

  const observer = new MutationObserver(() => {
    const btn = document.querySelector(selector);
    if (btn) {
      observer.disconnect();
      btn.click();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
