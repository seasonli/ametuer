<?php
date_default_timezone_set('Asia/Shanghai'); error_reporting(E_ALL & ~E_NOTICE);  

SESSION_START();
if (isset($_SESSION['ID'])==FALSE and isset($_COOKIE['ID'])==TRUE) { $_SESSION['ID']=$_COOKIE['ID']; $_SESSION['NAME']=$_COOKIE['NAME']; $_SESSION['AVATOR']=$_COOKIE['AVATOR']; }

$dbhost = "www.thefarer.com"; $dbuser = "root"; $dbpassword = "TFMYSQL0421715YNWA"; $dbdatabase = "farer";
$dbhost = "localhost"; $dbuser = "root"; $dbpassword = "123409"; $dbdatabase = "farer";
 
$config_basedir="http://www.thefarer.com/"; 
$config_basedir="http://localhost.thefarer/"; 

$config_basedir_m="http://m.thefarer.com/";

$mysqli = new mysqli($dbhost,$dbuser,$dbpassword,$dbdatabase);
?>

