<?php
require("_config.php");
$mailnumrow = $mysqli -> query("SELECT * FROM mails WHERE receiver = '".$_SESSION['ID']."' AND status_receiver = 1 ") -> num_rows;
echo $mailnumrow;
?>