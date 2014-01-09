<?php
require("../_config.php");
for ($i=0; $i<10; $i++) {
	$registercodesql= "SELECT * FROM users_registercodes WHERE users_id= '".$_SESSION['ID']."' limit $i,1 "; $registercoderow=mysql_fetch_assoc(mysql_query($registercodesql)); 
	if ($registercoderow['id']==0) { break; }
	echo "<span";
	if ($registercoderow['status']==-1) { echo " style='text-decoration:line-through'"; }
	echo ">".$registercoderow['registercode']."</span><br/>";
}
