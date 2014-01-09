<?php 
$mygosql= "SELECT * FROM gos WHERE id= '".$_POST['mygo']."'" ; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); 
if ($mygorow['status']==-1 or $mygorow['id']==0) { chdir(dirname(__FILE__)); require("../_error/_empty.php"); die(); }
else if ($_SESSION['ID']!=$mygorow['users_id']) { chdir(dirname(__FILE__)); require("../_error/_noauthority.php"); die(); } ?>
