<?php
require("../_config.php");
$dnasql="SELECT * FROM dna_evers WHERE users_id= '".$_SESSION['ID']."' and spots_id= '".$_POST['spot']."' "; $dnarow=mysql_fetch_assoc(mysql_query($dnasql)); 
if ($dnarow['id']==0 and $_POST['spot']!=0) { mysql_query("INSERT INTO dna_evers (users_id, spots_id) VALUES ('".$_SESSION['ID']."', '".$_POST['spot']."')" ); }
else if ($dnarow['status']==-1 and $_POST['spot']!=0) { mysql_query("UPDATE dna_evers SET status=1 WHERE users_id= '".$_SESSION['ID']."' and spots_id= '".$_POST['spot']."' "); }
else { echo "1"; }
?>
