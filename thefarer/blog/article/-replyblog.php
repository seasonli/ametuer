<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>
<?php 
$datetime=date("Y-m-d H:i:s");
mysql_query("INSERT INTO blogs_replies (users_id, blogs_id, text, datetime) VALUES 
	(".$_SESSION['ID'].", '".$_POST['blog']."', '".addslashes($_POST['text'])."', '".$datetime."')");
mysql_query("UPDATE blogs SET datetime_renew ='".$datetime."'WHERE id ='".$_POST['blog']."'");

header("Location:../article/".$_POST['blog']);
?>