<?php require("../../../_config.php"); require("../../../verify/_verify.php"); require("../../../verify/_verifymygo_post.php"); ?>

<?php 
mysql_query("UPDATE gos SET title= '".$_POST['title']."' WHERE id= '".$_POST['mygo']."' AND users_id= '".$_SESSION['ID']."' ");
mysql_query("UPDATE gos SET text= '".$_POST['text']."' WHERE id= '".$_POST['mygo']."' AND users_id= '".$_SESSION['ID']."' ");
mysql_query("UPDATE gos SET startday= '".$_POST['startday']."' WHERE id= '".$_POST['mygo']."' AND users_id= '".$_SESSION['ID']."' ");
mysql_query("UPDATE gos SET startdays= '".$_POST['startdays']."' WHERE id= '".$_POST['mygo']."' AND users_id= '".$_SESSION['ID']."' ");

$gosql= "SELECT * FROM gos WHERE users_id!='".$_SESSION['ID']."' AND status!=-1 "; $gonumrow=mysql_num_rows(mysql_query($gosql)); //***开始rank

for ($i=0; $i<$gonumrow; $i++) {
	$oldgosql= "SELECT * FROM gos WHERE users_id!= '".$_SESSION['ID']."' AND status!=-1 order by id limit $i,1"; 
	$oldgorow=mysql_fetch_assoc(mysql_query($oldgosql));
	$oldgoid=$oldgorow['id']; //**oldgoid
	
	//**rank_time Both
	if ($_POST['startday']==0) { $rank_time=0; }
	else if ($_POST['startdays']==0) { $dif=$_POST['startday']; } 
	else { $dif=abs($_POST['startday']+$_POST['startdays'])/2; }
	if ($oldgorow['startday']==0) { $rank_time=0; }
	else if ( $oldgorow['startdays']==0) { $olddif=$oldgorow['startday']; } 
	else { $olddif=abs($oldgorow['startday']+$oldgorow['startdays'])/2; }
	$rank_time=128-(abs($olddif-$dif)/86400);

	mysql_query("UPDATE gos_ranks SET rank_time= '".$rank_time."' WHERE gos_id= '".$_POST['mygo']."' AND subgos_id= '".$oldgoid."' ");
	mysql_query("UPDATE gos_ranks SET rank_time= '".$rank_time."' WHERE subgos_id= '".$_POST['mygo']."' AND gos_id= '".$oldgoid."' ");
}
echo "<script>location.href='../".$_POST['mygo']."'</script>"
?>