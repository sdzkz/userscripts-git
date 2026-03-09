// ==UserScript==
// @name         ESPN - highlight WNBA teams
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.espn.com/wnba/schedule
// @icon         https://www.google.com/s2/favicons?sz=64&domain=espn.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_highlight_fever.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/espn_highlight_fever.user.js
// ==/UserScript==

(function() {
    'use strict';

    var teams = ['ind'];

    teams.forEach(function(team) {
        var elements = document.querySelectorAll('a.AnchorLink[href*="/wnba/team/_/name/' + team + '/"]');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '#FFFF00';
            elements[i].style.fontColor = '#000';
            elements[i].style.fontSize = '1.5em';
        }
    });
})();

