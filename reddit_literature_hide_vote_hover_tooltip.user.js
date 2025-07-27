// ==UserScript==
// @name     Reddit Hide Vote Hover Tooltip
// @match    https://www.reddit.com/r/literature/*
// @grant    GM_addStyle
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/reddit_literature_hide_vote_hover_tooltip.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/reddit_literature_hide_vote_hover_tooltip.user.js
// ==/UserScript==

GM_addStyle(`
    .arrow.up:hover::before,
    .arrow.down:hover::before {
        content: none !important;
        display: none !important;
    }
`);
