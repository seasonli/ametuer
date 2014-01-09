<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>

<?php
$datetime=date("Y-m-d H:i:s");
$sql = "INSERT INTO mails (sender, receiver, text, datetime) VALUES (".$_SESSION['ID'].",'".$_POST['receiver']."','".addslashes($_POST['text'])."','".$datetime."')";
mysql_query($sql);
header("Location:../../mail/");

?> 