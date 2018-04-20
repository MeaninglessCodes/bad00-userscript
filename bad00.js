// ==UserScript==
// @name Bad00
// @author MeaninglessCodes
// @license WTFPL – Do What the Fuck You Want to Public License, http://www.wtfpl.net
// @version 1
//
// @include http://badoo.com/*
// @include https://badoo.com/*
// @include http://*.badoo.com/*
// @include https://*.badoo.com/*
//
// @downloadURL https://raw.githubusercontent.com/MeaninglessCodes/bad00-userscript/master/bad00.js
// @namespace https://github.com/MeaninglessCodes/bad00-userscript
// @updateURL https://raw.githubusercontent.com/MeaninglessCodes/bad00-userscript/master/bad00.js
// ==/UserScript==

// ---- encounters ----
var encountersAutoSwipeInterval;

// ---- nearby walker ----
var nearbyWalkerInterval;
var walkerCounter = 0;

URLHandler();

function URLHandler() {
	if (window.location.href.indexOf("/encounters") > -1) {
		encountersAutoSwipeInterval = setInterval(encountersAutoSwipe, 500);
	} else if (window.location.href.indexOf("/search") > -1) {
		setTimeout(
			function () {
				nearbyWalkerInterval = setInterval(nearbyWalker, 2000);
			},
			500
		);
	} else if (window.location.href.indexOf("/profile") > -1) {
		setTimeout(function () {
			window.close();
		}, 1500);
	}
}

function encountersAutoSwipe() {
	if (isAnyPopupActive()) {
		if (document.querySelectorAll('.brick.brick--xlg>.icon.icon--spread').length === 3) {
			clearInterval(encountersAutoSwipeInterval);
		}

		removePopups();
	}

	document.getElementsByClassName('js-profile-header-vote b-link')[0].click();
}

function nearbyWalker() {
	console.log('walk ' + walkerCounter);
	var users = document.getElementsByClassName('user-card__link');

	if (users.length > walkerCounter) {
		console.log(users[walkerCounter].href);
		var win = window.open(users[walkerCounter].href, '_blank');
		win.focus();

		walkerCounter++;
	} else if (walkerCounter > 0) {
		clearInterval(nearbyWalkerInterval);
	}
}

function removePopups() {
	var popupCloseButton = document.getElementsByClassName('js-ovl-close');
	for (var i = 0; i < popupCloseButton.length; i++) {
		popupCloseButton[i].click();
	}
}


function isAnyPopupActive() {
	return document.getElementsByClassName('js-ovl-close').length > 0;
}
