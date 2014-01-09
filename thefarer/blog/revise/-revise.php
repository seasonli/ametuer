<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); require("../../verify/_verifymyblog_post.php"); ?>

<?php
mysql_query("UPDATE blogs SET title = '".$_POST['title']."' WHERE id= '".$_POST['myblog']."' AND users_id= '".$_SESSION['ID']."' ");
mysql_query("UPDATE blogs SET text = '".$_POST['text']."' WHERE id= '".$_POST['myblog']."' AND users_id= '".$_SESSION['ID']."' ");

header("Location:../");
?>