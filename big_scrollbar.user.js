// ==UserScript==
// @name         Big Scrollbar
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Increase the width of scrollbars on all pages with toggle and blacklist
// @author       You
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/big_scrollbar.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    const currentDomain = window.location.hostname;
    const storageKey = 'bigScrollbar_';
    
    // Check if site is blacklisted
    const isBlacklisted = GM_getValue(storageKey + 'blacklist_' + currentDomain, false);
    if (isBlacklisted) return;
    
    // Check if scrollbar is enabled for this site
    let isEnabled = GM_getValue(storageKey + 'enabled_' + currentDomain, true);
    
    let style = null;
    
    function createScrollbarStyle() {
        if (style) return style;
        
        style = document.createElement('style');
        style.id = 'big-scrollbar-style';
        style.innerHTML = `
            ::-webkit-scrollbar {
                width: 30px !important;
                height: 30px !important;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1 !important;
            }
            ::-webkit-scrollbar-thumb {
                background: #888 !important;
                border-radius: 5px !important;
            }
        `;
        return style;
    }
    
    function enableScrollbar() {
        if (!document.head.contains(createScrollbarStyle())) {
            document.head.appendChild(style);
        }
        isEnabled = true;
        GM_setValue(storageKey + 'enabled_' + currentDomain, true);
    }
    
    function disableScrollbar() {
        if (style && document.head.contains(style)) {
            document.head.removeChild(style);
        }
        isEnabled = false;
        GM_setValue(storageKey + 'enabled_' + currentDomain, false);
    }
    
    function toggleScrollbar() {
        if (isEnabled) {
            disableScrollbar();
            console.log('Big Scrollbar: DISABLED for ' + currentDomain);
        } else {
            enableScrollbar();
            console.log('Big Scrollbar: ENABLED for ' + currentDomain);
        }
    }
    
    function blacklistSite() {
        disableScrollbar();
        GM_setValue(storageKey + 'blacklist_' + currentDomain, true);
        console.log('Big Scrollbar: BLACKLISTED ' + currentDomain);
    }
    
    function unblacklistSite() {
        GM_setValue(storageKey + 'blacklist_' + currentDomain, false);
        enableScrollbar();
        console.log('Big Scrollbar: REMOVED from blacklist ' + currentDomain);
    }
    
    // Initialize
    if (isEnabled) {
        enableScrollbar();
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+S: Toggle scrollbar
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            toggleScrollbar();
        }
        // Ctrl+Shift+B: Toggle blacklist
        else if (e.ctrlKey && e.shiftKey && e.key === 'B') {
            e.preventDefault();
            const currentlyBlac

