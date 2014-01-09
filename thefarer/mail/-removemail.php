<?php require("../_config.php"); require("../verify/_verify.php"); ?>
<?php mysql_query("UPDATE mails SET status_receiver=-1 where id='".$_POST['mail']."' AND receiver='".$_SESSION['ID']."' ");
header("Location:../mail/?p='".$_GET['p']."' "); ?>