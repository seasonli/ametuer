<?php
require("../../_config.php");
$goreplysql= "SELECT * FROM gos_replies WHERE id= '".$_POST['goreply']."' AND users_id='".$_SESSION['ID']."' ";
$goreplyrow= mysql_fetch_assoc(mysql_query($goreplysql));
if ($goreplyrow['id']==0) { echo "-1"; }
else { mysql_query("UPDATE gos_replies SET status=-1 WHERE id='".$_POST['goreply']."' AND users_id='".$_SESSION['ID']."' "); 
	mysql_query("UPDATE gos_marks SET status_reply=status_reply-1 WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$goreplyrow['gos_id']."' "); }
?>
