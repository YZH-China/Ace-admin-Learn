jQuery(function($){
	var email = '',
			username = "",
			password = "";
	/*
	* --========密码找回和注册跳转========--
	 */
	$(document).on('click', ".toolbar a[data-target]", function(e){
		e.preventDefault();
		var target = $(this).data("target");
		$('.widget-box.visible').removeClass('visible');
		$(target).addClass('visible');
	});

	/*
	* --=============注册相关===============--
	 */
	//邮箱检测
	function emailCheck(str){
		var reg_email = /^([\da-z\._-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg_email.test(str);
	}
	//用户名检测
	function usernameCheack(str){
		var reg_username = /^[A-Za-z0-9]{6,16}$/;
		return reg_username.test(str);
	}
	//密码检测
	function passwordCheck(str){
		var reg_password = /^[A-Za-z0-9]{6,16}$/;
		return reg_password.test(str);
	}

	//邮箱文本框失去焦点
	$("#u_email").on('blur', function(e){
		if(emailCheck(e.target.value)){
			console.log(1);
		} else {
			$(this).parent(selector)
		}
	})

	/*
	* --====改变背景样式dark、blur、light====--
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