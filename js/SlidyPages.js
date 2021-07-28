// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32:1, 33:1, 34:1, 35:1, 36:1};
const pages = 7;
const threshold = 60;
var startTouch = {x: 0, y: 0};
var lastTouch = {x: 0, y: 0};
var timeOut;
var scrollAvg = 0;
var isScrolling = false;
var scrollCount = 0;

function updatePagination(direction = undefined) {
	var radios = document.getElementById("pagination").children;
	var currentPageIndex = Math.round(window.pageYOffset/innerHeight);
	if(direction != undefined){
		if(typeof(direction) == "number"){
			currentPageIndex = direction;
		}else{
			if(isScrolling){
				if(direction == "up"){
					currentPageIndex -= 1;
				}else if(direction == "down"){
					currentPageIndex += 1;
				}
			}
		}
	}
	for(i = 0; i < radios.length; i++){
		radios[i].children[0].checked = false;
		if(i == currentPageIndex){
			radios[i].children[0].checked = true;
		}
	}
	if(currentPageIndex == pages - 1){
		document.getElementById("scrolldown").setAttribute('hidden', 'hidden');
	}else{
		document.getElementById("scrolldown").removeAttribute('hidden');
	}
	if(currentPageIndex == 0){
		document.getElementById("scrollup").setAttribute('hidden', 'hidden');
	}else{
		document.getElementById("scrollup").removeAttribute('hidden');
	}
}

function addClickListeners(){
	var radios = document.getElementById("pagination").children;
	for(i = 0; i < radios.length; i++){
		radios[i].children[0].addEventListener('click', function(e){
			//console.log("Pagination Action");
			scrollAction(e.target.id.substr(4) - 1);
		}, false);
	}
	document.getElementById("scrollup").addEventListener('click', function(e){
		//console.log("ScrollUp Click Action");
		scrollAction("up");
	}, true);
	document.getElementById("scrolldown").addEventListener('click', function(e){
		//console.log("ScrollDown Click Action");
		scrollAction("down");
	}, true);
}

function scrollingTimeOut(){
	setTimeout(function () { 
		isScrolling = false;
		scrollCount = 0;
		var currentPageIndex = Math.round(window.scrollY/innerHeight);
		window.scroll({top: innerHeight*currentPageIndex});
	}, 600);
}

function scrollAction(direction) {
	scrollCount += 1;
	if(scrollCount > 3 && isScrolling) {
		isScrolling = false;
		scrollCount = 0;
	}
	if(!isScrolling){
		isScrolling = true;
		if(typeof(direction) == "number"){
			window.scroll({top: innerHeight*direction, behavior: "smooth"});
			// scrollingTimeOut();
			updatePagination(direction);
			isScrolling = false;
		}else{
			//console.log("scrollAction(direction)");
			if(direction === "down"){
				if(window.pageYOffset < window.innerHeight*(pages-1)){
					window.scroll({top: pageYOffset + innerHeight, behavior: "smooth"});
					scrollingTimeOut();
					//console.log("scrollAction(down)");
					updatePagination(direction);
				}
			}else if(direction === "up"){
				if(window.pageYOffset > 0){
					window.scroll({top: pageYOffset - innerHeight, behavior: "smooth"});
					scrollingTimeOut();
					//console.log("scrollAction(up)");
					updatePagination(direction);
				}
			}
		}
	}
}

function getScrollableParent(element, limit = document.body.parentElement) { 
	if(element == limit) return null;
	if(element.hasAttribute('scrollable'))
		return element;
	return getScrollableParent(element.parentElement);
}

function preventDefault(e) {
	e.preventDefault();
	if(e instanceof KeyboardEvent) {
		//console.log("Keyboard Action");
		if(e.key == "ArrowDown" || e.key == "PageDown"){
			scrollAction("down");
		}else if(e.key == "ArrowUp" || e.key == "PageUp"){
			scrollAction("up");
		}
	}else if (e instanceof WheelEvent) {
		//console.log("Wheel Action");
		scrollAvg += e.deltaY;
		clearTimeout(timeOut);
		timeOut = setTimeout(function () { 
			if(scrollAvg == -1 || scrollAvg == 1) scrollAvg = 0;
			//Parou de scrollar
			if(scrollAvg > 0){
				//Descendo
				scrollAction("down");
			}else if(scrollAvg < 0){
				//Subindo
				scrollAction("up");
			}
			scrollAvg = 0;
		}, 50);
	}else if (e instanceof TouchEvent){
		//console.log("Touch Action");
		if(e.touches.length != 1) return;
		if(e.touches[0].screenY > 0){
			lastTouch.y = e.touches[0].screenY;
		}
		if(Math.abs(e.touches[0].screenX) > 0){
			lastTouch.x = e.touches[0].screenX;
		}
		if(startTouch.x != 0) {
			var horizontalScrollElement = getScrollableParent(e.target);
			if(horizontalScrollElement != null){
				//console.log(startTouch.x + " - " + e.touches[0].screenX + " = " + (startTouch.x - lastTouch.x));
				horizontalScrollElement.scroll({left: horizontalScrollElement.scrollLeft + (startTouch.x - lastTouch.x)/10});
			}
		}
	}
}

function touchStart(e){
	startTouch.y = e.touches[0].screenY;
	startTouch.x = e.touches[0].screenX;
	//console.log("TouchStart: " + startTouch.y);
}

function touchEnd(e) { 
	if(lastTouch.y == 0) return;
	var diff = lastTouch.y - startTouch.y;
	//console.log("Touch End: " + lastTouch.y + " - Diff: " + diff);
	if(diff < 0 && Math.abs(diff) >= threshold){
		//Descendo
		scrollAction("down");
	}else if(diff > 0 && Math.abs(diff) >= threshold){
		//Subindo
		scrollAction("up");
	}
	lastTouch.y = 0;
	startTouch.x = 0;
	lastTouch.x = 0;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () { supportsPassive = true; } 
	}));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
	window.addEventListener('touchstart', touchStart, false);
	window.addEventListener('touchend', touchEnd, false);
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll();
updatePagination();
addClickListeners();
window.__forceSmoothScrollPolyfill__ = true;