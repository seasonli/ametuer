<?php
require("../_config.php");
$dnasql="SELECT * FROM dna_loves WHERE users_id= '".$_SESSION['ID']."' and spots_id= '".$_POST['spot']."' "; $dnarow=mysql_fetch_assoc(mysql_query($dnasql)); 
if ($dnarow['id']==0) { mysql_query("INSERT INTO dna_loves (users_id, spots_id) VALUES (".$_SESSION['ID'].",".$_POST['spot'].")" ); }
else if ($dnarow['status']==-1) { mysql_query("UPDATE dna_loves SET status=1 WHERE users_id= '".$_SESSION['ID']."' and spots_id= '".$_POST['spot']."' "); }
else { echo "1"; }
?>
