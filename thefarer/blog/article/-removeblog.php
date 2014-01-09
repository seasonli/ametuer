<?php require("../../_config.php"); require("../../verify/_verify.php"); require("../../verify/_verifymyblog_post.php"); ?>

<?php
mysql_query("UPDATE blogs SET status=-1 where id='".$_POST['myblog']."' AND users_id='".$_SESSION['ID']."' ");

header("Location:../");
?>