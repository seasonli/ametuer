<?php require("../_config.php"); ?><?php require("../_header.php"); ?>
<?php $dnasql="SELECT * FROM dna_loves WHERE users_id = '".$_SESSION['ID']."' AND status!=-1 "; $dnanumrow=mysql_num_rows(mysql_query($dnasql));
	for ($i=0; $i<$dnanumrow; $i++) {
		$dnasql="SELECT * FROM dna_loves WHERE users_id = '".$_SESSION['ID']."' AND status!=-1 limit $i,1 "; $dnarow=mysql_fetch_assoc(mysql_query($dnasql)); 
		$spotsql="SELECT * FROM spots WHERE id = '".$dnarow['spots_id']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
		echo "<li id='".$spotrow['id']."' class='love".$spotrow['id']."' onClick='removelove(this.id)' style='cursor:pointer'>".$spotrow['spot']."<div class='remove'>X</div></li>";	} ?>
