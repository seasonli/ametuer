<?php require("../../../_config.php"); require("../../../_header.php"); ?>

<title>更远 Thefarer.com - 分享 自由 互助旅行</title>
<?php require("../../../_a.php"); require("../../../_b.php"); ?>

<div id="d_outer"><div id="d_inner">

<div id="left">
	<div id="info-container">
		<div class="info">
			<?php 
			$myusersql= "SELECT * FROM users WHERE registerverify= '".$_GET['k']."' AND status=-1 " ; $myuserrow=mysql_fetch_assoc(mysql_query($myusersql)); $myusernumrow=mysql_num_rows(mysql_query($myusersql));
			if ($myusernumrow==1) {mysql_query( "UPDATE users set status=0 WHERE id= '".$myuserrow['id']."' "); echo "邮箱验证成功，你现在可以登录更远了！"; }
			else { echo "这个邮箱验证地址失效，或是已经验证，请检查你接受到的邮件"; }
			?>
		</div>
	</div>
</div>

</div></div>

<?php require("../../../_footer.php"); ?>