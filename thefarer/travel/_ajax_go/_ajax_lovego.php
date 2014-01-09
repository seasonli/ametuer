<?php
require("../../_config.php");
$gosql= "SELECT * FROM gos WHERE id= '".$_POST['go']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
$marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$_POST['go']."'"; $markrow=mysql_fetch_assoc(mysql_query($marksql)); $marknumrow=mysql_num_rows(mysql_query($marksql));
if ($marknumrow==0) {
$sql= "INSERT INTO gos_marks (users_id, gos_id, subusers_id, status_love, status_reply) VALUES 
	(".$_SESSION['ID'].",".$_POST['go'].",'".$gorow['users_id']."',1,0);";
mysql_query($sql); echo "1";
}
else if ($markrow['status_love']==0) { 
	mysql_query( "UPDATE gos_marks set status_love=1 WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$_POST['go']."'" ); echo "1";
}
else { 
	mysql_query( "UPDATE gos_marks set status_love=0 WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$_POST['go']."' "); echo "0";
}

?>