// ==UserScript==
// @name         Twitter Not Interested Button
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Add Not Interested button directly to tweets and remove extra spacing
// @author       You
// @match        https://x.com/*
// @grant        none
// @run-at       document-body
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_add_not_interested_shortcut.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/x_add_not_interested_shortcut.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('[NotInterested] Script loaded');

    function addNotInterestedButton() {
        // Find tweet containers with action bars
        const tweets = document.querySelectorAll('article[data-testid="tweet"]');
        console.log(`[NotInterested] Found ${tweets.length} tweets`);

        tweets.forEach((tweet, index) => {
            // Skip if button already exists
            if (tweet.querySelector('.not-interested-button')) {
                return;
            }

            // Find the action bar (group of buttons)
            const actionBar = tweet.querySelector('div[role="group"][aria-label]');
            if (!actionBar) {
                console.log(`[NotInterested] No action bar found for tweet ${index}`);
                return;
            }

            console.log(`[NotInterested] Processing tweet ${index}`);

            // Remove extra spacing element (usually the 6th child)
            try {
                const spacingElements = actionBar.children;
                if (spacingElements.length >= 6) {
                    const sixthElement = spacingElements[5]; // 0-indexed (5 = 6th element)
                    if (sixthElement && sixthElement.className.includes('css-175oi2r')) {
                        const style = sixthElement.getAttribute('style') || '';
                        if (style.includes('justify-content: inherit') && style.includes('display: inline-grid')) {
                            sixthElement.remove();
                            console.log(`[NotInterested] Removed spacing element from tweet ${index}`);
                        }
                    }
                }
            } catch (e) {
                console.log(`[NotInterested] Could not remove spacing element: ${e.message}`);
            }

            // Create Not Interested button
            const notInterestedButton = document.createElement('div');
            notInterestedButton.className = 'not-interested-button css-175oi2r r-18u37iz r-1h0z5md';
            notInterestedButton.setAttribute('role', 'button');
            notInterestedButton.setAttribute('tabindex', '0');
            notInterestedButton.setAttribute('aria-label', 'Not interested');
            notInterestedButton.innerHTML = `
                <div class="css-175oi2r r-1awozwy r-18u37iz r-1wmy9hl">
                    <div class="css-175oi2r r-1awozwy r-18u37iz">
                        <div class="css-175oi2r r-1awozwy r-1777fci">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-1q142lx">
                                <g>
                                    <path d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            `;

            // Add hover effects
            notInterestedButton.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
                this.style.opacity = '0.8';
            });

            notInterestedButton.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });

            // Add click event
            notInterestedButton.addEventListener('click', function(e) {
                console.log('[NotInterested] Button clicked');
                e.stopPropagation();

                // Find and click the tweet's menu button
                const menuButton = tweet.querySelector('button[aria-label*="More"], button[data-testid="caret"]');

                if (menuButton) {
                    console.log('[NotInterested] Menu button found, clicking...');
                    menuButton.click();

                    // Wait for menu to appear and click "Not interested"
                    setTimeout(() => {
                        const menuItems = document.querySelectorAll('div[role="menuitem"]');
                        console.log(`[NotInterested] Found ${menuItems.length} menu items`);

                        let notInterestedMenuItem = null;
                        menuItems.forEach(item => {
                            const text = item.textContent || '';
                            if (text.includes('Not interested') || text.includes('Interested')) {
                                notInterestedMenuItem = item;
                            }
                        });

                        if (notInterestedMenuItem) {
                            console.log('[NotInterested] Not interested menu item found, clicking...');
                            notInterestedMenuItem.click();
                        } else {
                            console.log('[NotInterested] Not interested menu item NOT found');
                        }
                    }, 300);
                } else {
                    console.log('[NotInterested] Menu button NOT found');
                }
            });

            // Insert button into action bar
            actionBar.appendChild(notInterestedButton);
            console.log(`[NotInterested] Button added to tweet ${index}`);
        });
    }

    // Initial run
    setTimeout(addNotInterestedButton, 2000);

    // Watch for new tweets
    const observer = new MutationObserver(mutations => {
        let shouldAddButtons = false;

        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches('article[data-testid="tweet"]') ||
                            node.querySelector('article[data-testid="tweet"]')) {
                            shouldAddButtons = true;
                        }
                    }
                });
            }
        });

        if (shouldAddButtons) {
            console.log('[NotInterested] New tweets detected');
            setTimeout(addNotInterestedButton, 500);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[NotInterested] Observer started');
})();

