// var lastScrollTop = 0;
// var currentPage = 0;
// var autoScrolling = false;
// var lastPage = 6;
// var scrolling = false;
// var justScrolled

// $(window).scroll(function (event) { 
// 	// console.log("scroll")
// 	var currentScrollTop = $(window).scrollTop();
// 	if(!autoScrolling && !justScrolled){
// 		// console.log("entrou no notAutoScrolling")
// 		if(currentScrollTop > lastScrollTop){
// 			// console.log("Down");
// 			//Going down
// 			if(currentPage<lastPage){
// 				if(!autoScrolling){
// 					autoScrolling = true;
// 					$(window).scrollTo('#page'+(++currentPage), {'duration':900,
// 					 'onAfter':function(target, settings){
// 						setTimeout(function() { 
// 							autoScrolling = false; 
// 							justScrolled = true; 
// 							setTimeout(function () { 
// 								justScrolled = false;
// 							 }, 100);
// 						}, 100);
// 							if(currentPage == lastPage){
// 								$('#scrolldown').hide();
// 							}
// 							if(currentPage != 0 && $("#scrollup").is(':hidden')){
// 								$("#scrollup").show();
// 							}
// 						}
// 					});
// 				}

// 			}
// 		}else{
// 			// console.log("Up");
// 			//Going up
// 			if(currentPage>0){
// 				if(!autoScrolling){
// 					autoScrolling = true;
// 					$(window).scrollTo('#page'+(--currentPage), {'duration':900,
// 					'onAfter': 
// 							function(target, settings){
// 								setTimeout(function() { 
// 									autoScrolling = false; 
// 									justScrolled = true; 
// 									setTimeout(function () { 
// 										justScrolled = false;
// 									 }, 100);
// 								}, 100);
// 								if(currentPage == 0){
// 									$("#scrollup").hide();
// 								}
// 								if(currentPage != lastPage && $("#scrolldown").is(':hidden')){
// 									$('#scrolldown').show();
// 								}
// 							}
// 					})
// 				}
// 			}
// 		}
// 	}
// 	lastScrollTop = currentScrollTop;
// });

var updateTexts = function(language){
	let internationalization = Internationalization();
	if(language == 'pt-br' || language == 'en-us'){
		var result = $('[i18key]');
		for(i = 0; i < result.length; i++){
			internationalization.updateText(result[i], language);
		};
		updateAge();
	}
}

var updateAge = function () { 
	var age = new Date(Date.now() - (new Date("04/25/1999 00:00:00"))).getFullYear() - 1970;
	$("#about1")[0].innerHTML = $("#about1")[0].innerHTML.replace("$idade$", age)
 }

$(document).ready(function () {
	var language;
	if(sessionStorage.getItem("language") == null){
		sessionStorage.setItem("language", "pt-br");
		console.log("sem lingua no sistema");
	}else{
		language = sessionStorage.getItem("language");
	}
	if(language != 'pt-br' && language != 'en-us'){
		console.log("lingua inválida");
		language = 'pt-br';
	}
	if(language == 'en-us'){
		updateTexts(language);
		$("#usflag").addClass('selected');
		$("#brflag").removeClass('selected');
	}

	// $("#scrolldown").click(function (e) { 
	// 	// e.preventDefault();
	// 	if(currentPage<lastPage){
	// 		if(!autoScrolling){
	// 			autoScrolling = true;
	// 			$('body').scrollTo('#page'+(++currentPage), {'duration':1000, 
	// 		'easing': 'swing', 'onAfter':function(target, settings){
	// 										setTimeout(function() { 
	// 											autoScrolling = false; 
	// 											justScrolled = true; 
	// 											setTimeout(function () { 
	// 												justScrolled = false;
	// 											}, 100);
	// 										}, 100);
	// 										if(currentPage == lastPage){
	// 											$('#scrolldown').hide();
	// 										}
	// 										if(currentPage != 0 && $("#scrollup").is(':hidden')){
	// 											$("#scrollup").show();
	// 										}
	// 									}
	// 			})
	// 		}
	// 	}
	// });

	// $("#scrollup").click(function (e) { 
	// 	// e.preventDefault();
	// 	if(currentPage<lastPage){
	// 		if(!autoScrolling){
	// 			autoScrolling = true;
	// 			$('body').scrollTo('#page'+(--currentPage), {'duration':1000, 
	// 		'easing': 'swing', 'onAfter':function(target, settings){
	// 										setTimeout(function() { 
	// 											autoScrolling = false; 
	// 											justScrolled = true; 
	// 											setTimeout(function () { 
	// 												justScrolled = false;
	// 											}, 100);
	// 										}, 100);
	// 										if(currentPage == 0){
	// 											$("#scrollup").hide();
	// 										}
	// 										if(currentPage != lastPage && $("#scrolldown").is(':hidden')){
	// 											$('#scrolldown').show();
	// 										}
	// 									}
	// 			})
	// 		}
	// 	}
	// });

	updateAge();

	// $("#language-selector").click(function(){
	// 	if($(this).attr('data-selected') != ''){
	// 		$(this).children('#usflag').addClass('to-select');
	// 		$(this).attr('data-selected', '');
	// 	}
	// });
	$("#brflag").click(function () {
		if($(this).parent().attr('data-selected') == ''){
			if(language == 'en-us'){
				$(this).addClass('selected');
				$("#usflag").removeClass('selected');
				language = 'pt-br';
				sessionStorage.setItem("language", language);
				updateTexts(language);
			}
			$(this).parent().children('#usflag').removeClass('to-select');
			$(this).parent().attr('data-selected', 'true');
		}else{
			$(this).parent().children('#usflag').addClass('to-select');
			$(this).parent().attr('data-selected', '');
		}
	 });
	 $("#usflag").click(function () { 
		if($(this).parent().attr('data-selected') == ''){
			if(language == 'pt-br'){
				$(this).addClass('selected');
				$("#brflag").removeClass('selected');
				language = 'en-us';
				sessionStorage.setItem("language", language);
				updateTexts(language);
			}
			$(this).removeClass('to-select');
			$(this).parent().attr('data-selected', 'true');
		}else{
			$(this).addClass('to-select');
			$(this).parent().attr('data-selected', '');
		}
	});
});