<?php require("../../../_config.php"); require("../../../verify/_verify.php"); require("../../../verify/_verifymygo_post.php"); ?>
<?php
$datetime=date("Y-m-d H:i:s");
mysql_query("INSERT INTO gos_lives (users_id, text, image, datetime, gos_id, spot) VALUES 
(".$_SESSION['ID'].", '".addslashes($_POST['text'])."', '".$_POST['image']."', '".$datetime."', '".$_POST['mygo']."', '".$_POST['spot']."')");
header("Location:../live/".$_POST['mygo']); ?>
?>
