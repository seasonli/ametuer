<?php
require("_config.php");
if ($_SERVER['HTTP_HOST']=="m.thefarer.com") { header("Location:".$config_basedir_m."go/new/"); }
else { header("Location:".$config_basedir."travel/new/"); }
?>

