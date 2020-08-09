// ==UserScript==
// @name         LingoDeer Extras
// @namespace    https://www.lingodeer.com
// @version      0.1.1
// @description  Extras for LingoDeer web app
// @author       Ilya Ilyushenok
// @match        https://www.lingodeer.com/learn-language*
// @grant        none
// @scriptUpdateURL https://raw.githubusercontent.com/ilyushenok/LingoDeerExtras/master/UserScript.js
// ==/UserScript==


window.addEventListener('load', function() {
	'use strict';
	var renderingDelayMs = 750;
	var checkInterval = 250;
	var extrasEnabledAtt = 'extrasenabled';

	var isCorrect = function() {
		var switchBottom = document.getElementsByClassName('switchBottom')[0];
		return switchBottom && switchBottom.classList.contains('right');
	};

	var playAudio = function() {
		if (isCorrect()) {
			setTimeout(function() {
				var playBtn = document.getElementsByClassName('checkLabaWrapContainer')[0];
				if (playBtn) {
					playBtn.click();
				}
			}, renderingDelayMs);
		}
	};

	setInterval(function() {
		var app = document.getElementById('app');
		if (app && !app.hasAttribute(extrasEnabledAtt)) {
			app.setAttribute(extrasEnabledAtt, '');
			window.addEventListener('keydown', function(e) {
				if (e.code === 'Enter') {
					playAudio();
				} else if (e.code === 'Space') {
					var continueBtn = document.getElementsByClassName('continueBtn')[0];
					if (continueBtn) {
						continueBtn.click();
					}
				}
			});
		}

		var checkBtn = document.getElementsByClassName('checkBtn')[0];
		if (checkBtn && !checkBtn.hasAttribute(extrasEnabledAtt)) {
			checkBtn.setAttribute(extrasEnabledAtt, '');
			checkBtn.addEventListener('click', function(){
				playAudio();
			});
		}
	}, checkInterval);
});