// ==UserScript==
// @name         Set GitHub PAT (run once)
// @namespace    local
// @match        *://*/*
// @grant        GM_setValue
// ==/UserScript==

(() => {
    const token = prompt('Paste your GitHub PAT:', '');
    if (token) {
        GM_setValue('github_pat', token);
        alert('Token stored. You can now disable or delete this script.');
    }
})();

