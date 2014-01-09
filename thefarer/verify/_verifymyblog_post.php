<?php 
$myblogsql= "SELECT * FROM blogs WHERE id= '".$_POST['myblog']."'" ; $myblogrow=mysql_fetch_assoc(mysql_query($myblogsql)); 
if ($myblogrow['status']==-1 or $myblogrow['id']==0) { chdir(dirname(__FILE__)); require("../_error/_empty.php"); die(); }
else if ($_SESSION['ID']!=$myblogrow['users_id']) { chdir(dirname(__FILE__)); require("../_error/_noauthority.php"); die(); } ?>
