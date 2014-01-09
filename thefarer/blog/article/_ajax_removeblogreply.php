<?php
require("../../_config.php");
$blogreplysql= "SELECT * FROM blogs_replies WHERE id= '".$_POST['blogreply']."' AND users_id='".$_SESSION['ID']."' ";
$blogreplyrow= mysql_fetch_assoc(mysql_query($blogreplysql));
if ($blogreplyrow['id']==0) { echo "-1"; }
else { mysql_query("UPDATE blogs_replies SET status=-1 WHERE id='".$_POST['blogreply']."' AND users_id='".$_SESSION['ID']."' "); }
?>
