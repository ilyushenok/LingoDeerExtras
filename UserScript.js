// ==UserScript==
// @name         LingoDeer Extras
// @namespace    https://www.lingodeer.com
// @version      0.1.4
// @description  Extras for LingoDeer web app
// @author       Ilya Ilyushenok
// @match        https://www.lingodeer.com/learn-language*
// @grant        none
// @scriptUpdateURL https://raw.githubusercontent.com/ilyushenok/LingoDeerExtras/master/UserScript.js
// ==/UserScript==


window.addEventListener('load', function() {
	'use strict';
	var checkInterval = 250;
	var extrasEnabledAtt = 'extrasenabled';

	var isCorrect = function() {
		var switchBottom = document.getElementsByClassName('switchBottom')[0];
		return switchBottom && switchBottom.classList.contains('right');
	};

	var playAudio = function() {
		if (isCorrect()) {
			var playBtn = document.getElementsByClassName('checkLabaWrapContainer')[0];
			if (playBtn) {
				playBtn.click();
			}
		}
	};

	setInterval(function() {
		var app = document.getElementById('app');
		if (app && !app.hasAttribute(extrasEnabledAtt)) {
			app.setAttribute(extrasEnabledAtt, '');
			window.addEventListener('keydown', function(e) {
				if (e.code === 'Space') {
					playAudio();
				}

				if (48 <= e.keyCode && e.keyCode <= 57) {
					var index = (e.shiftKey ? 10 : 0) + (e.keyCode === 48 ? 9 : (e.keyCode - 49));
					var optionsArea = document.getElementsByClassName('optionsArea')[0];
					if (optionsArea) {
						var options = optionsArea.getElementsByClassName('option');

						if (index < options.length) {
							var option = options[index].getElementsByClassName('item')[0];

							if (option) {
								option.click();
							}
						}
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