<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?> 

<title>更远网：写信</title>

<?php require("../../_a.php"); require("../../_b.php"); ?>
<?php $usersql= "SELECT * FROM users WHERE id = '".$_GET['receiver']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); ?>

<div id="b_outer"><div id="b_inner">
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div class="writemail-container">
		<div class="writemail">
			<div class="writemail_title">给<?php echo $userrow['name'] ?>写信</div><title>更远网：给<?php echo $userrow['name'] ?>写信</title>
			<img src="<?php echo $userrow['avator_thumb']?>" />
			<form action="-sendmail.php" method="post" onsubmit="return check()">
				<textarea name="text" ><?php echo $_POST['text'] ?></textarea>
				<label style=""><input type="submit" value="发给Ta" /></label>
				<input type="hidden" value=<?php echo $_GET['receiver'] ?> name="receiver" />
			</form>
		</div>
	</div>
</div></div>

<div id="c_outer"><div id="c_inner">
	<div class="kneenav">
		<a href="../../mail/"><ul>我的信箱</ul></a>
		<a href="../outbox/"><ul>发出的信</ul></a>	
	</div>
</div></div>

<?php require("../../_footer.php"); ?>