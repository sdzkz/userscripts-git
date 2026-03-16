// ==UserScript==
// @name         Wikipedia Unpin Sidebar
// @namespace    https://github.com/billp
// @version      1.1
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
  }
})();
