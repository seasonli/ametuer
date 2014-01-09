<?php
require("_config.php");
$atrow = $mysqli -> query("SELECT * FROM gos_ats WHERE users_id= '".$_SESSION['ID']."' AND status>0 ORDER BY ID LIMIT 1") -> fetch_assoc();
echo $atrow['gos_id'];
?>