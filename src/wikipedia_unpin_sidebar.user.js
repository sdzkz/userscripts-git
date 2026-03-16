// ==UserScript==
// @name         Wikipedia Unpin Sidebar
// @version      1.3
// @description  Clicks the unpin button on the main menu sidebar on page load
// @match        *://*.wikipedia.org/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/wikipedia_unpin_sidebar.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/wikipedia_unpin_sidebar.user.js
// ==/UserScript==

(function () {
  'use strict';

  const selector = '#vector-main-menu > div.vector-pinnable-header.vector-main-menu-pinnable-header.vector-pinnable-header-pinned > button.vector-pinnable-header-toggle-button.vector-pinnable-header-unpin-button';

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
