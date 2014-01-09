<?php require("../../_config.php"); ?>

<?php $myusersql= "SELECT * FROM users WHERE email= '".$_POST['email']."' " ; $myusernumrow=mysql_num_rows(mysql_query($myusersql));
if ($myusernumrow==0) { echo "1"; }
?>
