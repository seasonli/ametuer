
<?php
require("../../_config.php"); 
$password=sha1(addslashes($_POST['password']));

$myusersql="SELECT * FROM users WHERE email = '".addslashes($_POST['email'])."' AND password='".$password."' "; 
$myuserresult=mysql_query($myusersql); $myusernumrow=mysql_num_rows($myuserresult); $myuserrow=mysql_fetch_assoc($myuserresult);
	
if ($myusernumrow==1 and $myuserrow['status']!=-1) {
	$_SESSION['ID']=$myuserrow['id']; $_SESSION['NAME']=$myuserrow['name']; $_SESSION['AVATOR']=$myuserrow['avator_thumb']; 
	setcookie('ID', $myuserrow['id'], time()+2592000, "/", $config_basdir); setcookie('NAME', $myuserrow['name'], time()+2592000, "/", $config_basdir); setcookie('AVATOR', $myuserrow['avator_thumb'], time()+2592000, "/", $config_basdir); 
	mysql_query("UPDATE users SET status=status+1 WHERE id= '".$myuserrow['id']."' ");
	header("Location:".$config_basedir."travel/new/");
}
else if ($myusernumrow==1 and $myuserrow['status']=-1) { header("Location:".$config_basedir."account/login/?fail=verify"); }
else { header("Location:".$config_basedir."account/login/?fail=wrong"); }
?>