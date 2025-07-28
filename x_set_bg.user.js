// ==UserScript==
// @name         x.com – custom background (#e6ecf0)
// @namespace    https://example.com
// @version      1.0
// @description  Force the body background on x.com to #e6ecf0
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_set_bg.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_set_bg.user.js
// ==/UserScript==

(function () {
  'use strict';

  const css = `
    body {
      background-color: #e6ecf0 !important;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);
})();