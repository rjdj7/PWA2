/*  
	PWA Project
	Author: John Smith
*/

$(document).ready(function(){
	

	/* Tab Javascript ---------------------------- */

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})


	/* Modal Javascript -------------------------- */

	$(".modalClick").on("click", function(event) {
		event.preventDefault();
		$("#overlay")
			.fadeIn()
			.find("#modal")
			.fadeIn();
	});

	$(".close").on("click", function(event) {
		event.preventDefault();
		$("#overlay")
			.fadeOut()
			.find("#modal")
			.fadeOut();
	});

})



