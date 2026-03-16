// ==UserScript==
// @name         Wikipedia Unpin Sidebar
// @version      1.5
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

  console.log('[UnpinSidebar] Script loaded');
  console.log('[UnpinSidebar] All unpin buttons:', document.querySelectorAll('button.vector-pinnable-header-unpin-button'));
  console.log('[UnpinSidebar] Target button:', document.querySelector(selector));
  console.log('[UnpinSidebar] Sidebar element:', document.querySelector('#vector-main-menu'));

  const btn = document.querySelector(selector);
  if (btn) {
    console.log('[UnpinSidebar] Found button immediately, clicking');
    btn.click();
    return;
  }

  console.log('[UnpinSidebar] Button not found, starting observer');

  const observer = new MutationObserver(() => {
    const btn = document.querySelector(selector);
    if (btn) {
      console.log('[UnpinSidebar] Observer found button, clicking');
      observer.disconnect();
      btn.click();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[UnpinSidebar] Timeout check - all unpin buttons:', document.querySelectorAll('button.vector-pinnable-header-unpin-button'));
    console.log('[UnpinSidebar] Timeout check - target:', document.querySelector(selector));
  }, 3000);
})();
