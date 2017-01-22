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
	* --=============登录相关=============--
	 */
	//登录函数
	function startLogin(){
		var username_login = $("#username-login").val();
		var password_login = $("#password-login").val();
		if(username_login == ''){
			showHasError($("#username-login"));
			slideDown($("#reg-info"), "错误！ &nbsp; 请输入用户名！");
			return;
		} else {
			showHasSuccess($("#username-login"));
			slideUp($("#reg-info"));
			if(password_login == ''){
				showHasError($("#password-login"));
				slideDown($("#reg-info"), "错误！ &nbsp; 请输入密码！");
			} else {
				showHasSuccess($("#password-login"));
				slideUp($("#reg-info"));
				$.ajax({
					type:"post",
					url:"/index/login",
					data:{username:username_login, password:password_login},
					success:function(data){
						if(data){
							showHasSuccess($("#username-login"));
							slideUp($("#reg-info"));
							$.ajax({
								type:'get',
								url:"/home/index",
								data:{username:username_login},
								success:function(data){
									// window.location.href = "http://127.0.0.1:3000/home";
									console.log(data);
								}
							})
						} else {
							showHasError($("#password-login"));
							slideDown($("#reg-info"), "错误！ &nbsp; 用户名和密码不匹配！");
						}
					}
				})
			}
		}
	}
	//用户名输入框失去焦点
	$("#username-login").on('blur', function(e){
		if($("#username-login").val() == ''){
			showHasError($("#username-login"));
			slideDown($("#reg-info"), "错误！ &nbsp; 请输入用户名！");
			return;
		} else {
			showHasSuccess($("#username-login"));
			slideUp($("#reg-info"));
		}
	})
	//密码输入框失去焦点
	$("#password-login").on('blur', function(e){
		if($("#password-login").val() == ''){
			showHasError($("#password-login"));
			slideDown($("#reg-info"), "错误！ &nbsp; 请输入密码！");
			return;
		} else {
			showHasSuccess($("#password-login"));
			slideUp($("#reg-info"));
		}
	})
	//登录按钮
	$("#btn-login").on('click', function(e){
		startLogin();
	})
	//回车键登录
	$(document).on('keyup', function(e){
		if(e.keyCode === 13){
			startLogin();
		}
	})

	/*
	* --=============注册相关===============--
	 */
	//邮箱检测
	function emailCheck(obj, str){
		var reg_email = /^([\da-z\._-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(reg_email.test(str)){
			email = str;
			showHasSuccess(obj);
			slideUp($("#reg-info"));
			return true;
		} else {
			showHasError(obj);
			slideDown($("#reg-info"), "错误！ &nbsp; 请输入正确的邮箱地址！");
			return false;
		}
	}
	//用户名检测
	function usernameCheack(obj, str){
		var reg_username = /^[A-Za-z0-9]{6,16}$/;
		if(reg_username.test(str)){
			var bool_username = false;
			username = str;
			// return true;
			$.ajax({
				type:"post",
				url:"/index/usernamerepeatcheck",
				data:{username},
				async:false,
				success:function(data){
					if(data){
						bool_username = true;
						showHasSuccess(obj);
						slideUp($("#reg-info"));
					} else {
						bool_username = false;
						showHasError(obj);
						slideDown($("#reg-info"), "错误！ &nbsp; 该用户名已被占用！");
					}
				}
			})
			return bool_username;
		} else {
			showHasError(obj);
			slideDown($("#reg-info"), "错误！ &nbsp; 用户名长度6到16位字符！");
			return false;
		}
	}
	//密码检测
	function passwordCheck(obj, str){
		var reg_password = /^[A-Za-z0-9]{6,16}$/;
		if(reg_password.test(str)){
			password = str;
			showHasSuccess(obj);
			slideUp($("#reg-info"));
			return true;
		} else {
			showHasError(obj);
			slideDown($("#reg-info"), "错误！ &nbsp; 密码长度6到16位字符！");
			return false;
		}
	}
	//重复密码
	function repeatPassword(obj, str){
		if(str === password){
			showHasSuccess(obj);
			slideUp($("#reg-info"));
			return true;
		} else {
			showHasError(obj);
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
	//reset按钮功能
	function resetButton(){
		$("#u_email").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#username").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#password").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		$("#re_password").val("").parents('.form-group').removeClass('has-error').removeClass('has-success');
		slideUp($("#reg-info"));
	}
	//显示has-success样式
	function showHasSuccess(obj){
		obj.parents('.form-group').removeClass('has-error').addClass('has-success');
	}
	//显示has-error样式
	function showHasError(obj){
		obj.parents(".form-group").removeClass('has-success').addClass("has-error");
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
							$.ajax({
								type:"post",
								url:"/index/register",
								data:{username:username, password:password, email:email},
								success:function(data){
									if(data){
										slideUp($("#reg-info"));
										$("#modal-success").modal({});
									} else {
										slideDown($("#reg-info"), "错误！ &nbsp; 注册失败，请稍后再试！");
									}
								}
							})
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
		resetButton();
	})
	//backtologin按钮也应清除内容
	$("#reg-to-log").on('click', function(e){
		resetButton();
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