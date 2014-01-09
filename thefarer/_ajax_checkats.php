<?php
require("_config.php");
$atnumrow = $mysqli -> query("SELECT * FROM gos_ats WHERE users_id= '".$_SESSION['ID']."' AND status > 0 ") -> num_rows;
echo $atnumrow;
?>