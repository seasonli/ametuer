<?php
require("../_config.php");
$dnasql="SELECT * FROM dna_now WHERE users_id= '".$_SESSION['ID']."' "; $dnarow=mysql_fetch_assoc(mysql_query($dnasql)); 
if ($dnarow['id']==0) {
$sql= "INSERT INTO dna_now (users_id, spots_id) VALUES 
	(".$_SESSION['ID'].",".$_POST['spot'].")";
mysql_query($sql);
}
else { mysql_query("UPDATE dna_now SET spots_id= '".$_POST['spot']."' WHERE users_id= '".$_SESSION['ID']."'"); }
?>