<?php require("../../_config.php"); require("../../_header.php"); ?>

<?php
$gosql= "SELECT * FROM gos WHERE id= '".$_POST['go']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
$usersql= "SELECT * FROM users WHERE id= '".$gorow['users_id']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql));
?>

<?php if (isset($_SESSION['ID'])==TRUE) { ?>
	<div class="go_input">
		<textarea class="replygo<?php echo $_POST['go'] ?>" style="float:left; width:346px; height:30px"></textarea>
		<input type="button" class="green" onclick="replygo(this.id)" id="<?php echo $_POST['go'] ?>" value="回 应" />
	</div>
<?php } ?>

<?php $goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$gorow['id']."' AND status!=-1"; $goreplynumrow=mysql_num_rows(mysql_query($goreplysql)); $goreplynumrow=$goreplynumrow-5; 
?>
<div class="go_finishloading<?php echo $_POST['go'] ?>" style="display:none"></div>



