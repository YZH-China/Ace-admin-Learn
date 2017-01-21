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
	function emailCheck(obj, str){
		var reg_email = /^([\da-z\._-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(reg_email.test(str)){
			email = str;
			obj.parents('.form-group').removeClass('has-error').addClass('has-success');
			slideUp($("#reg-info"));
			return true;
		} else {
			obj.parents('.form-group').removeClass('has-success').addClass('has-error');
			slideDown($("#reg-info"), "错误！ &nbsp; 请输入正确的邮箱地址！");
			return false;
		}
	}
	//用户名检测
	function usernameCheack(obj, str){
		var reg_username = /^[A-Za-z0-9]{6,16}$/;
		if(reg_username.test(str)){
			username = str;
			obj.parents('.form-group').removeClass('has-error').addClass('has-success');
			slideUp($("#reg-info"));
			return true;
		} else {
			obj.parents('.form-group').removeClass('has-success').addClass('has-error');
			slideDown($("#reg-info"), "错误！ &nbsp; 用户名长度6到16位字符！");
			return false;
		}
	}
	//密码检测
	function passwordCheck(obj, str){
		var reg_password = /^[A-Za-z0-9]{6,16}$/;
		if(reg_password.test(str)){
			password = str;
			obj.parents('.form-group').removeClass('has-error').addClass('has-success');
			slideUp($("#reg-info"));
			return true;
		} else {
			obj.parents('.form-group').removeClass('has-success').addClass('has-error');
			slideDown($("#reg-info"), "错误！ &nbsp; 密码长度6到16位字符！");
			return false;
		}
	}
	//重复密码
	function repeatPassword(obj, str){
		if(str === password){
			obj.parents(".form-group").removeClass('has-error').addClass("has-success");
			slideUp($("#reg-info"));
			return true;
		} else {
			obj.parents(".form-group").removeClass('has-success').addClass("has-error");
			slideDown($("#reg-info"), "错误！ &nbsp; 两次输入不同");
			return false;
		}
	}
	//提示信息出现动画
	function slideDown(obj, str){
		obj.find('strong').html("<i class='ace-icon fa fa-times'></i>" + str);
		obj.slideDown(400);
	}
	function slideUp(obj){
		obj.slideUp(400);
	}
	//邮箱文本框失去焦点事件
	$("#u_email").on('blur', function(e){
		emailCheck($(this), e.target.value);
	})
	//用户名失去焦点事件
	$("#username").on("blur", function(e){
		usernameCheack($(this), e.target.value);
	})
	//密码失去焦点事件
	$("#password").on('blur', function(e){
		passwordCheck($(this), e.target.value);
	})
	//重复密码失去焦点事件
	$("#re_password").on('blur', function(e){
		repeatPassword($(this), e.target.value);
	})
	//register按钮点击事件
	$("#btn-register").on('click', function(e){
		if($("#reg-agreement").get(0).checked){
			slideUp($("#reg-info"));
			if(emailCheck($("#u_email"), $("#u_email").val())){
				if(usernameCheack($("#username"), $("#username").val())){
					if(passwordCheck($("#password"), $("#password").val())){
						if(repeatPassword($("#re_password"),$("#re_password").val())){
							console.log(email, username, password);
						}
					}
				}
			}
		} else {
			slideDown($("#reg-info"), "错误 &nbsp; 未同意用户协议！");
		}
	})
	//reset按钮功能
	$("#reg-reset").on('click', function(e){
		$("#u_email").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#username").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#password").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#re_password").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		slideUp($("#reg-info"));
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