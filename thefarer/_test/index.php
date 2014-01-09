<?php require("../_config.php"); require("../_header.php");

require("wechat.class.php");

$wechat=new Wechat();
if ($s=$wechat->login()) { echo $s; }











 ?>