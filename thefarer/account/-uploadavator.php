<?php require("../_config.php"); 

$myusersql= "SELECT * FROM users WHERE id= '".$_SESSION['ID']."'"; $myuserrow=mysql_fetch_assoc(mysql_query($myusersql)); 
$oldimagedir=end(explode("/", $myuserrow['avator'])); // 旧上传目录

$imagedir="http://avator.thefarer.com".$_GET['url']; 
mysql_query("UPDATE users SET avator = '".$imagedir."' WHERE id= '".$_SESSION['ID']."' ");

if ($oldimagedir!="defaultavator.jpg") { 
	require("../_class/upyun.class.php"); 
	$upyun=new UpYun('avator', 'user', 'USERUPYUN0421715YNWA', UpYun::ED_AUTO); $upyun->delete("/".$oldimagedir); } // 删除旧

header("Location:../account/");