<?php
require("../_config.php");
$registercodesql= "SELECT * FROM users_registercodes WHERE users_id= '".$_SESSION['ID']."' "; $registercodenumrow=mysql_num_rows(mysql_query($registercodesql)); 
if ($registercodenumrow>9) { echo "-1"; die(); }
$registercode=md5($_SESSION['ID'].date("Y-m-d H:i:s"));
mysql_query("INSERT INTO users_registercodes (registercode, users_id) VALUES ('".$registercode."', '".$_SESSION['ID']."')");
?>
为你申请的邀请码是 <?php echo $registercode ?><br/>
你也可以把下面这个地址发给你的朋友<br/><br/>
<?php echo $config_basedir."account/register/?k=".$registercode ?>
