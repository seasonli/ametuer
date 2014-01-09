<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); require("../../verify/_verifymail.php");?>

<title>更远网：我的信箱</title>

<?php require("../../_a.php"); require("../../_b.php"); ?>

<?php 
$mailsql= "SELECT * FROM mails WHERE id = '".$_GET['mail']."' "; $mailrow= mysql_fetch_assoc(mysql_query($mailsql));
if($_SESSION['ID']==$mailrow['receiver']) { $usersql= "SELECT * FROM users WHERE id = '".$mailrow['sender']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); mysql_query("UPDATE mails SET status_receiver=0 WHERE id= '".$_GET['mail']."' "); }
else { $usersql= "SELECT * FROM users WHERE id = '".$mailrow['receiver']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); }
?>

<div id="b_outer"><div id="b_inner">
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div class="onemail-container">
		<div class="onemail">
			<?php if($_SESSION['ID']==$mailrow['receiver']) { ?><div class="onemail_title"><?php echo $userrow['name'] ?>的来信<?php }
			else { ?><div class="onemail_title">给<?php echo $userrow['name'] ?>的信<?php } ?><br/><?php echo $mailrow['datetime'] ?></div>
			<img src="<?php echo $userrow['avator_thumb']?>" />
			<div class="onemail_text content"><?php echo nl2br($mailrow['text']) ?></div>
			<form action="../write/?receiver=<?php echo $userrow['id'] ?>" method="post" >
				<input type="hidden" name="text" value="<?php echo $mailrow['text'] ?>" />
				<?php if($_SESSION['ID']==$mailrow['receiver']) { ?><label><input type="submit" value="回复"></label><?php } ?>
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