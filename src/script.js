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
					var optionsArea =
						document.getElementsByClassName('optionsArea')[0] ||
						document.querySelector('.sentenceTitle + .sentenceStem');
					if (optionsArea) {
						var options =
							optionsArea.getElementsByClassName('option');

						if (!options.length) {
							options = optionsArea.getElementsByClassName('wrapOption');
						}

						if (index < options.length) {
							var opt = options[index];
							var option = 
								[...opt.classList].includes('wrapOption')
									? opt
									: opt.getElementsByClassName('item')[0];

							if (option) {
								option.click();
							}
						}
					}
				}
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

var plainStyles = '@@plainStyles@@';