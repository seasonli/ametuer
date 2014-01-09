<?php require("../../_config.php"); ?>

<?php $myusersql= "SELECT * FROM users WHERE name= '".$_POST['name']."' " ; $myusernumrow=mysql_num_rows(mysql_query($myusersql));
if ($myusernumrow==0) { echo "1"; }
?>
