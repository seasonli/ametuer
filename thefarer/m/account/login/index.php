<?php require("../../../_config.php"); require("../../_header.php"); ?>

<?php require("../../_a.php"); ?>

<div id="m_d_outer">
	<div class="title">登录更远</div>
	<form action="-login.php" method="post">
		<div class="f-green" style="margin:10px 0 0 0;">
			<?php if ($_GET['fail']=="wrong") { echo "登录信息有误"; } else if ($_GET['fail']=="verify") { echo "你的更远帐号或许还未激活"; } else if ($_GET['fail']=="needlogin") { echo "你还没有登录呐"; }	
			?>
		</div>			
		<div style="margin:10px 0 0 0; ">登录邮箱 <input style="width:200px" name="email" type="text" maxlength="30" /></div>
		<div style="margin:10px 0 0 0; ">登录密码 <input style="width:200px" name="password" type="password" maxlength="12" /></div>
		<div style="margin:10px 0 0 0; "><label style="float:left"><input style="width:80px" value="登 录" type="submit" /></label></div>
	</form>
	
</div>

<?php require("../../../_footer.php"); ?>