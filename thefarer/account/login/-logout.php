<?php require("../../_config.php"); 
	session_destroy(); 
	setcookie("ID", "", time()-2592000, "/", $config_basdir); 
	setcookie("NAME", "", time()-2592000, "/", $config_basdir); 
	setcookie("AVATOR", "", time()-2592000, "/", $config_basdir); 
	header("Location:../login/");
?>