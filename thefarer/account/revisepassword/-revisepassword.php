<?php require("../../_config.php"); require("../../verify/_verify.php"); 

$oldpassword=sha1(addslashes($_POST['oldpassword']));
$password=sha1(addslashes($_POST['password']));

$myusersql="SELECT * FROM users WHERE id = '".$_SESSION['ID']."' AND password='".$oldpassword."' ";
$myuserresult=mysql_query($myusersql); $myusernumrow=mysql_num_rows($myuserresult); $myuserrow=mysql_fetch_assoc($myuserresult);
	
if ($_POST['password']==$_POST['repassword'] and $myusernumrow==1) {
	mysql_query("UPDATE users SET password='".$password."' WHERE id= '".$_SESSION['ID']."' ");
	header("Location:".$config_basedir."account/");
}
else {
	header("Location:../revisepassword/?fail=wrong");
}
?>