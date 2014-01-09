<?php require("../../_config.php"); require("../../_header.php"); ?>

<script>

info=[0,0,0]; 

function movetologin() {
	location.href="../login/"
}
function register(value) {
	live=$("#live").val();
	if (info=="1,1,1") {
		height=$(document).height(); var email=$("#email").val(); var password=$("#password").val(); var repassword=$("#repassword").val(); var name=$("#name").val(); 
		$("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("正在为你发送激活邮件，请不要关闭等待几秒"); 
		$.post("_ajax_sendemail.php", {email:email, password:password, name:name, registercode:value}, function(data) { 
			if (data=="-1") { height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你的注册信息中肯定是搞错了什么<br/><br/><label style='float:left'><input type='button' value='确认' onclick='closealert()'/></label>"); }
			if (data=="-2") { height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("已经注册成功，但是激活邮件发送出现了些问题，你可能没法立刻收到激活邮件。别担心，我们会尽快解决，你很快可以收到激活邮件<br/><br/><label style='float:left'><input type='button' value='确认' onclick='closealert()'/></label>"); }
			$("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert-container").html("<div id='alert-top'><div id='alert-top_title'></div><div id='alert-top_close' onclick='movetologin()'>X</div></div><div id='alert'>"+data+"</div>"); $("#alert").append("<br/><br/><label style='float:left'><input type='button' value='确认' onclick='movetologin()'></label>");
		})
	}
	else { height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你的注册信息中肯定是搞错了什么<br/><br/><label style='float:left'><input type='button' value='确认' onclick='closealert()'/></label>"); return false; }
}	
function checkemail(value) {
	standardemail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	resultemail=standardemail.test(value);
	if (resultemail==true) {
		$.post("_ajax_checkemail.php", {email:value}, function(data) {
			if (data==1) { $("#checkemail").html("ok"); info[0]=1; }
			else { $("#checkemail").html("这个邮箱已经被注册掉了"); info[0]=0;}
		})
	}
	else { $("#checkemail").html("请输入正确的邮箱格式"); } 
}
function checkpassword() {
	var password=$("#password").val(); var repassword=$("#repassword").val();
	if (password.length>5 && repassword.length>5 && password==repassword) { $("#checkrepassword").html("ok"); info[1]=1; }
	else if (password.length<6) { $("#checkrepassword").html("密码长度太短了"); info[1]=0; } 
	else if (password.length>5 && repassword.length==0 ) { $("#checkrepassword").html("&nbsp;"); info[1]=0; } 
	else { $("#checkrepassword").html("两次密码输入不一样"); info[1]=0; } 
}
function checkname(value) {
	if (value.length>0) { 
		$.post("_ajax_checkname.php", {name:value}, function(data) {
			if (data==1) { $("#checkname").html("ok"); $("#checkname").html("ok"); info[2]=1; }
			else { $("#checkname").html("这个名字被别人取掉了"); info[2]=0;}
		})		
	}
	else { $("#checkname").html("起一个心仪的名字"); info[2]=0; } 
}
</script>

<title>更远网：登录</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="d_outer"><div id="d_inner">
	<div id="half">
		<div style="float:left; margin:30px 0 50px 0px; width:470px; font-size:14px; background:#eee">
			<div style="float:left; margin:10px 0 0 10px; width:80px; line-height:40px">注册邮箱</div>
			<div style="float:left; margin:10px 0 0 0; width:220px"><input onInput="checkemail(this.value)" onpropertychange="checkemail(this.value)" style="height:38px; width:200px" id="email" type="text" maxlength="30" /></div>
			<div id="checkemail" style="float:left; margin:10px 0 0 0; width:160px; line-height:40px">&nbsp;</div>
			
			<div style="float:left; margin:10px 0 0 10px; width:80px; line-height:40px">设置密码</div>
			<div style="float:left; margin:10px 0 0 0; width:380px"><input onInput="checkpassword()" onpropertychange="checkpassword()" style="height:38px; width:200px" id="password" type="password" maxlength="12" /></div>
			<div style="float:left; margin:10px 0 0 10px; width:80px; line-height:40px">重复密码</div>
			<div style="float:left; margin:10px 0 0 0; width:220px"><input onInput="checkpassword()" onpropertychange="checkpassword()" style="height:38px; width:200px" id="repassword" type="password" maxlength="12" /></div>
			<div id="checkrepassword" style="float:left; margin:10px 0 0 0; width:160px; line-height:40px">&nbsp;</div>
			
			<div style="float:left; margin:10px 0 0 10px; width:80px; line-height:40px">起个名字</div>
			<div style="float:left; margin:10px 0 0 0; width:220px"><input onInput="checkname(this.value)" onpropertychange="checkname(this.value)" style="height:38px; width:200px" id="name" type="text" maxlength="8" /></div>
			<div id="checkname" style="float:left; margin:10px 0 0 0; width:160px; line-height:40px">&nbsp;</div>

			<label style="float:right; margin:10px 20px 10px 0"><input onClick="register(this.id)" id="<?php echo $_GET['k'] ?>" style="height:38px; width:80px" value="完 成" type="button" /></label>
		</div>
	</div>
	<div id="half">
		<form action="-login.php" method="post">
			<div style="float:left; padding:50px 0 0 0; width:360px; font-size:14px">
				<div class="f-green" style="float:left; margin:10px 0 0 0; width:360px; line-height:40px">登录更远</div>
				<div style="float:left; margin:10px 0 0 0; width:100px; line-height:40px">登录邮箱</div>
				<div style="float:left; margin:10px 0 0 0; width:260px"><input style="line-height:38px; height:38px; width:200px" name="email" type="text" maxlength="30" /></div>
				<div style="float:left; margin:10px 0 0 0; width:100px; line-height:40px">登录密码</div>
				<div style="float:left; margin:10px 0 0 0; width:200px"><input style="line-height:38px; height:38px; width:200px" name="password" type="password" maxlength="12" /></div>
				<label style="float:left; margin:10px 0 0 40px"><input style="height:38px; width:80px" value="登录" type="submit" /></label>
				<div id="logininfo" class="f-green" style="float:left; margin:20px 0 20px 0; width:960px; height:20px; font-size:12px">
					<?php if ($_GET['fail']=="wrong") { echo "登录信息有误"; } else if ($_GET['fail']=="verify") { echo "你的更远帐号或许还未激活"; } else if ($_GET['fail']=="needlogin") { echo "你还没有登录呐"; }	
					?>
				</div>
			</div>
		</form>
	</div>	
</div></div>
<?php require("../../_footer.php"); ?>