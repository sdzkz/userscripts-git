// ==UserScript==
// @name         Big Scrollbar (loader)
// @namespace    tamperloader
// @version      1
// @description  Loader stub for Big Scrollbar
// @match        *://*/*
// @grant        GM_getValue
// @require      https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js#pat=
// ==/UserScript==

(() => {
    const pat = GM_getValue('github_pat', '');
    if (pat) {
        const url = new URL('https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js');
        url.searchParams.set('pat', pat);
    }
})();
