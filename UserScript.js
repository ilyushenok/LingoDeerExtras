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

			var style = document.createElement('style');
			style.innerHTML = plainStyles;
			document.head.appendChild(style);

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

var plainStyles = '.optionsArea{counter-reset:option-n}.optionsArea .option .item,.optionsArea .option .item .wrapOption{position:relative}.modelContainerSent.sentenceModel3 .scrollArea .optionsArea .option .item .wrapOption::before{position:absolute;display:block;counter-increment:option-n;content:counter(option-n);width:30px;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px;transform:translateX(1px);color:#000}.modelContainerSent.sentenceModel3 .scrollArea .optionsArea .option .item .wrapOption .circle{width:30px !important;height:30px !important}.modelContainerSent.sentenceModel3 .scrollArea .optionsArea .option.active .item .wrapOption::before{color:#fff}.modelContainerSent.sentenceModel3 .scrollArea .optionsArea .option.active .item .wrapOption .circle{background-color:#fbb10b}.modelContainerSent.sentenceModel3 .scrollArea .optionsArea .option .item .wrapOption .circle{width:30px;height:30px}.modelContainerWord.wordModel1 .optionsArea .option .item::before{position:absolute;top:5px;left:5px;display:flex;align-items:center;justify-content:center;counter-increment:option-n;content:counter(option-n);width:30px;height:30px;font-size:22px;border-radius:100%;background-color:#fff;border:1px solid #979797;color:#000}.modelContainerWord.wordModel1 .optionsArea .option.active .item::before{background-color:#fbb10b;border-color:#fbb10b;color:#fff}';