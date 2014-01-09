<?php require("../../../_config.php"); require("../../_header.php"); ?>

<?php require("../../_a.php"); ?>

<div id="m_d_outer">
	<div class="title">我的旅行计划</div>
	<?php for ($n=0; $n<10; $n++) {
		$mygosql= "SELECT * FROM gos WHERE users_id= '".$_SESSION['ID']."' AND status!=-1 ORDER BY id DESC limit $n,1"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); ?>	
		<div class="go">
			<div class="go_title"><a href="../go/?go=<?php echo $mygorow['id'] ?>"><?php echo $mygorow['title'] ?></a></div>
			<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
				$myspotsql= "SELECT * FROM spots WHERE id= '".$mygorow["spot_$i"]."' "; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql));
					if ($mygorow["spot_$i"]!=0) { echo " ".$myspotrow['spot']." "; }
			} ?></div>
		</div>
	<?php } ?>
</div>

<?php require("../../_footer.php"); ?>