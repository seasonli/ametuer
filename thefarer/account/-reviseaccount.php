<?php require("../_config.php"); require("../verify/_verify.php"); 
 
mysql_query("UPDATE users SET text = '".addslashes($_POST['text'])."' WHERE id= '".$_SESSION['ID']."' ");

$myusersql= "SELECT * FROM users WHERE name= '".$_POST['name']."' AND id!='".$_SESSION['ID']."' " ; $myusernumrow=mysql_num_rows(mysql_query($myusersql));

if ($myusernumrow!=0) { 
	header("Location:../account/?error=nameoccupied");
}

else {
	mysql_query("UPDATE users SET name = '".addslashes($_POST['name'])."' WHERE id= '".$_SESSION['ID']."' ");
	$_SESSION['NAME']=$_POST['name'];
	header("Location:../account/");
}

?>