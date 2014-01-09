<?php
require("../_config.php");
mysql_query("UPDATE dna_evers SET status=-1 WHERE users_id= '".$_SESSION['ID']."' and spots_id= '".$_POST['spot']."' ");
?>
