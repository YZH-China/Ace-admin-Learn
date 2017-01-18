jQuery(function($){
	$(document).on('click', ".toolbar a[data-target]", function(e){
		e.preventDefault();
		var target = $(this).data("target");
		console.log(target);
		$('.widget-box.visible').removeClass('visible');
		$(target).addClass('visible');
	});


	/*
	* 改变背景样式dark、blur、light
	 */
	$(".navbar-fixed-top").on("click", 'a', function(e){
		e.preventDefault();
		var login_bg_arr = $('body').get(0).className.split(' ');
		var new_class = e.target.innerHTML.toLowerCase()+"-login";
		var reg = /dark-login|blur-login|light-login/;
		$.each(login_bg_arr, function(index, value){
			if(reg.test(value)){
				$('body').removeClass(value).addClass(new_class);
			}
		})
	})
})