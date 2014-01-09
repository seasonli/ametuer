<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>
<?php 
$datetime=date("Y-m-d H:i:s");
mysql_query("INSERT INTO blogs (users_id, title, text, datetime, datetime_renew) VALUES
('".$_SESSION['ID']."', '".$_POST['title']."','".$_POST['text']."','".$datetime."','".$datetime."')");
header("Location:../"); 
?>