<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?>
<script>
function checkpassword() {
	password=$("#password").val(); repassword=$("#repassword").val();
	if (password.length>5 && repassword.length>5 && password==repassword) { $("#checkrepassword").html("ok"); info[1]=1; }
	else if (password.length<6) { $("#checkrepassword").html("密码长度太短了"); info[1]=0; } 
	else if (password.length>5 && repassword.length==0 ) { $("#checkrepassword").html("&nbsp;"); info[1]=0; } 
	else { $("#checkrepassword").html("两次密码输入不一样"); info[1]=0; } 
}
</script>

<title>更远网：修改登录密码</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<em><?php echo $_SESSION['NAME'] ?></em>
</div></div>

<div id="dw_outer"><div id="dw_inner">
<form action="-revisepassword.php" method="post">
	<div style="float:left; margin:30px 0 50px 0px; width:960px; font-size:14px">
		<div style="float:left; margin:10px 0 0 0; width:100px; line-height:40px">旧密码</div>
		<div style="float:left; margin:10px 0 0 0; width:860px"><input style="height:38px; width:200px" name="oldpassword" type="password" maxlength="12" /></div>			
		<div style="float:left; margin:10px 0 0 0; width:100px; line-height:40px">设置密码</div>
		<div style="float:left; margin:10px 0 0 0; width:860px"><input onInput="checkpassword()" style="height:38px; width:200px" name="password" id="password" type="password" maxlength="12" /></div>
		<div style="float:left; margin:10px 0 0 0; width:100px; line-height:40px">重复密码</div>
		<div style="float:left; margin:10px 0 0 0; width:240px"><input onInput="checkpassword()" style="height:38px; width:200px" name="repassword" id="repassword" type="password" maxlength="12" /></div>
		<div id="checkrepassword" class="f-green" style="float:left; margin:10px 0 0 0; width:620px; line-height:40px"><?php if ($_GET['fail']==wrong) { echo "肯定是那里出错了" ;} ?>&nbsp;</div>
		<label style="float:left; margin:20px 0 0 230px"><input value="修 改" type="submit" /></label>
	</div>
</form>
</div></div>

<div id="c_outer"><div id="c_inner">
	<div class="kneenav">
		<a href="../"><ul>我的更远帐号</ul></a>
		<a href="../login/-logout.php"><ul>注销登录</ul></a>
	</div>
</div></div>

<?php require("../../_footer.php"); ?>