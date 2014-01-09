<?php require("../../_config.php");
$datetime=date("Y-m-d H:i:s");
mysql_query("INSERT INTO gos_replies (users_id, gos_id, text, datetime) VALUES (".$_SESSION['ID'].",'".$_POST['id']."','".addslashes($_POST['text'])."','".$datetime."')");
mysql_query("UPDATE gos set datetime_renew= '".$datetime."' WHERE id = '".$_POST['id']."'");
$goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$_POST['id']."' AND users_id= '".$_SESSION[ID]."' ORDER BY id DESC LIMIT 1"; $goreplyrow=mysql_fetch_assoc(mysql_query($goreplysql));
preg_match_all("^@(\S+)( )^", addslashes($_POST['text']), $users, PREG_SET_ORDER);
$gosql= "SELECT * FROM gos WHERE id= '".$_POST['id']."' "; $gorow=mysql_fetch_assoc(mysql_query($gosql)); $tmp=0; // 防止重复提醒楼主
for ($n=0; $n<$n+1; $n++) {
	if (isset($users[$n][1])==FALSE) { 
		if ($tmp==0 && $_SESSION['ID']!=$gorow['users_id']) { mysql_query("INSERT INTO gos_ats (subusers_id, users_id, gos_id, gos_replies_id, text, datetime) VALUES ('".$_SESSION['ID']."', '".$gorow['users_id']."', '".$_POST['id']."', '".$goreplyrow['id']."', '".addslashes($_POST['text'])."','".$datetime."')"); }
		break;
	}
	else {
		$usersql= "SELECT * FROM users WHERE name= '".$users[$n][1]."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); 
		if (empty($userrow)) { break; }
		else { 
			if ($userrow['id']==$gorow['users_id']) { $tmp=1; }
			mysql_query("INSERT INTO gos_ats (subusers_id, users_id, gos_id, gos_replies_id, text, datetime) VALUES ('".$_SESSION['ID']."', '".$userrow['id']."', '".$_POST['id']."', '".$goreplyrow['id']."', '".addslashes($_POST['text'])."','".$datetime."')"); }
	}
}
$marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$_POST['id']."'";
$markrow=mysql_fetch_assoc(mysql_query($marksql)); $marknumrow=mysql_num_rows(mysql_query($marksql));
if ($marknumrow==0) {
	$gosql= "SELECT * FROM gos WHERE id= '".$_POST['id']."' "; $gorow= mysql_fetch_assoc(mysql_query($gosql));
	if ($_SESSION['ID']!=$gorow['users_id']) {
		mysql_query("INSERT INTO gos_marks (datetime_renew, users_id, gos_id, subusers_id, status_reply) VALUES ('".$datetime."', '".$_SESSION['ID']."', '".$_POST['id']."', '".$gorow['users_id']."', 1)");
	}
}
else { 
	mysql_query("UPDATE gos_marks SET status_reply=status_reply+1 WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$_POST['id']."'" ); 
	mysql_query("UPDATE gos_marks SET datetime_renew= '".$datetime."' WHERE gos_id= '".$_POST['id']."'" ); 
} ?>

<div class="go_reply go_reply<?php echo $goreplyrow['id'] ?>">		
	<div class="go_reply_avator"><img src="<?php echo $_SESSION['AVATOR'] ?>" /></div>
	<div class="go_reply_name"><?php echo $_SESSION['NAME'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $datetime ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="click-underline" onclick='removegoreply(this.id)' id="<?php echo $goreplyrow['id'] ?>">删除</span></div>
	<div class="go_reply_text"> <?php echo $goreplyrow['text'] ?> </div>
</div>	