<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>
<?php
$mylivesql= "SELECT * FROM gos_lives WHERE id= '".$_POST['mylive']."'"; $myliverow=mysql_fetch_assoc(mysql_query($mylivesql));
if ($myliverow['image']!=null) { 
	$imgdir=end(explode("/", $myliverow['image']));
	require("../../_class/upyun.class.php");
	$upyun = new UpYun('imagea', 'user', 'USERUPYUN0421715YNWA', UpYun::ED_AUTO);
	$upyun->delete("/".$imgdir);
}
mysql_query("UPDATE gos_lives SET status=-1 where id='".$_POST['mylive']."' AND users_id='".$_SESSION['ID']."' ");
header("Location:../mygo?mygo=".$myliverow['gos_id']); ?>
