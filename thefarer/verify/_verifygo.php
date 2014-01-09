<?php 
$gosql = "SELECT * FROM gos WHERE id= '".$_GET['go']."' " ; 
$gorow = $mysqli -> query($gosql) -> fetch_assoc();
if ($gorow['status'] == -1 or $gorow['id'] == 0 ) { 
	chdir(dirname(__FILE__));
	require("../_error/_empty.php"); 
	die(); 
} 
else { 
	$mysqli -> query("UPDATE gos_ats set status = 0 WHERE users_id = '".$_SESSION['ID']."' AND gos_id='".$_GET['go']."' "); 
}
?>