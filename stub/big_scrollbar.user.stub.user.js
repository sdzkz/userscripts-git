// ==UserScript==
// @name         Big Scrollbar (loader)
// @namespace    https://github.com/sdzkz/userscripts-git
// @version      0.1
// @description  Loader for Big Scrollbar. Requires the GitHub PAT Authenticator script.
// @author       You
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// ==/UserScript==

/*
 * This is an auto-generated loader script. It is designed to fetch the main
 * script from a private GitHub repository.
 *
 * It requires the "GitHub PAT Authenticator" userscript to be installed and
 * configured with a read-only token.
 */

(function() {
    'use strict';

    const SCRIPT_URL = 'https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js';
    const PAT_KEY = 'github_read_pat';

    const pat = GM_getValue(PAT_KEY, null);

    if (!pat) {
        console.error(`'Big Scrollbar (loader)': GitHub PAT not found. ` +
                      `Please install and run the "GitHub PAT Authenticator" script from the Tampermonkey menu to set it.`);
        return;
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: SCRIPT_URL,
        headers: {
            'Authorization': `Bearer ${pat}`,
            'Accept': 'application/vnd.github.v3.raw',
            'Cache-Control': 'no-cache' // Ensures the latest version is always fetched
        },
        onload: function(response) {
            if (response.status === 200) {
                // Execute the fetched script in the global scope.
                // This is safer than eval() as it doesn't leak local variables.
                new Function(response.responseText)();
            } else if (response.status === 401 || response.status === 404) {
                console.error(`'Big Scrollbar (loader)': Failed to fetch script (Status: ${response.status}). ` +
                              `Your PAT may be invalid, expired, or lack SSO authorization for the repo. ` +
                              `Please update it using the Authenticator script.`);
            } else {
                console.error(`'Big Scrollbar (loader)': Failed to fetch script. Status: ${response.status}`, response);
            }
        },
        onerror: function(response) {
            console.error(`'Big Scrollbar (loader)': A network error occurred while fetching the script.`, response);
        }
    });
})();
