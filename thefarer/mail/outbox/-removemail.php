<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>
<?php require("../../_a.php"); ?>
<?php mysql_query("UPDATE mails SET status_sender=-1 where id='".$_POST['mail']."' AND sender='".$_SESSION['ID']."' ");
header("Location:../../mail/outbox/?p='".$_GET['p']."' "); ?>