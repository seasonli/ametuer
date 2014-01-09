<?php require("../../_config.php"); require("../../verify/_verify.php"); require("../../verify/_verifymygo_post.php"); ?>
<?php
$datetime=date("Y-m-d H:i:s");
$mygosql= "SELECT * FROM gos WHERE id= '".$_POST['mygo']."'"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql));
$j=0;
for ($i=0; $i<5; $i++) {	
	if ($mygorow["spot_$i"]==0) { $j=$i; break; }
	$sql = "INSERT INTO gos_slips (users_id, gos_id, text, datetime, spot) VALUES ('".$_SESSION['ID']."', '".$mygorow['id']."', '".addslashes($_POST['text'])."', '".$datetime."', '".$mygorow["spot_$i"]."') ";
	mysql_query($sql); $j=$i+1;
}
$extrasql= "SHOW table status WHERE Name ='gos_slips' ";
$extrarow=mysql_fetch_array(mysql_query($extrasql));
$idd=$extrarow['Auto_increment']-$j; //**goid
$iddd=$idd+$j;
for ($i=$idd; $i<$iddd; $i++) { mysql_query("UPDATE gos_slips SET idd='".$idd."' WHERE id= '".$i."' "); }
header("Location:../go/".$_POST['mygo']); ?>