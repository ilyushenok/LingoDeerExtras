// ==UserScript==
// @name         LingoDeer Extras
// @namespace    https://www.lingodeer.com
// @version      0.1.9
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
		var playBtn =
			document.getElementsByClassName('labaWrapContainer')[0] ||
			document.getElementsByClassName('titleLabaWrapContainer')[0];

		if (isCorrect()) {
			playBtn = document.getElementsByClassName('checkLabaWrapContainer')[0];
		}

		if (playBtn) {
			playBtn.click();
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

				if (!isCorrect() && 48 <= e.keyCode && e.keyCode <= 57) {
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

		var el = document.querySelector('.isCheckedPanel');
		if (el && !el.hasAttribute('played')) {
			setTimeout(function() {
				document.querySelector('.checkLabaWrapContainer.right').click();
			}, 500);
			el.setAttribute('played', '');
		}
		var el2 = document.querySelector('.checkPanel');
		if (el2 && el2.hasAttribute('played')) {
			el2.removeAttribute('played');
		}
	}, checkInterval);
});

var plainStyles = '.optionsArea{counter-reset:option-n}.optionsArea .option{border-radius:9px!important}.optionsArea .option .item,.optionsArea .option .item .wrapOption{position:relative}.optionsArea .option .item .wrapOption .circle{opacity:0!important}.optionsArea .option .item{border-radius:8px!important}.optionsArea .option .item::before{position:absolute;top:8px;left:8px;display:flex;align-items:center;justify-content:center;counter-increment:option-n;content:counter(option-n);width:30px;height:30px;font-size:22px;border-radius:100%;background-color:#fff;border:1px solid #979797;color:#000}.optionsArea .option.active .item::before{background-color:#1caff6;border-color:#1caff6;color:#fff}.wordModel5 .optionsArea{padding-top:10px!important}.sentenceModel10 .optionsArea .option .item::before,.sentenceModel13 .optionsArea .option .item::before,.sentenceModel5 .optionsArea .option .item::before,.wordModel10 .optionsArea .option .item::before,.wordModel5 .optionsArea .option .item::before{top:-10px;left:-10px;width:20px;height:20px;font-size:12px}.sentenceModel13 .optionsAreaWrap .center,.sentenceModel13 .optionsAreaWrap .left,.sentenceModel13 .optionsAreaWrap .right{padding-top:10px}.modelContainerSent.sentenceModel13 .optionsArea .optionsAreaWrap .center .oneRow.active{display:block!important;margin:0!important;padding:0!important;overflow:hidden!important;height:0!important}';