// ==UserScript==
// @name         GitHub PAT Authenticator
// @namespace    https://github.com/sdzkz/userscripts-git
// @version      1.0
// @description  Sets a GitHub PAT for use by other userscripts.
// @author       You
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    const PAT_KEY = 'github_read_pat';

    GM_registerMenuCommand('Set GitHub Read-Only PAT', () => {
        const currentPat = GM_getValue(PAT_KEY, '');
        const newPat = prompt('Enter your GitHub read-only PAT:', currentPat);
        if (newPat !== null) { // User did not press Cancel
            GM_setValue(PAT_KEY, newPat);
            alert('GitHub PAT has been saved.');
        }
    });
})();
