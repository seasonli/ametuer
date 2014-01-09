<?php require("../../_config.php"); require("../../verify/_verify.php"); require("../../verify/_verifymygo_post.php"); ?>
<?php
mysql_query("UPDATE gos SET status=-1 where id='".$_POST['mygo']."' AND users_id='".$_SESSION['ID']."' ");
mysql_query("UPDATE gos_ranks SET status=-1 WHERE gos_id= '".$_POST['mygo']."' OR subgos_id= '".$_POST['mygo']."' ");
mysql_query("UPDATE gos_favors SET status=-1 WHERE gos_id= '".$_POST['mygo']."' AND users_id='".$_SESSION['ID']."' ");
mysql_query("UPDATE gos_slips SET status=-1 WHERE gos_id= '".$_POST['mygo']."' AND users_id='".$_SESSION['ID']."' ");
mysql_query("UPDATE gos_lives SET status=-1 WHERE gos_id= '".$_POST['mygo']."' AND users_id='".$_SESSION['ID']."' ");

header("Location:../new/");
?>