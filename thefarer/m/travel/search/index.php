<?php require("../../../_config.php"); require("../../_header.php"); ?>

<?php require("../../_a.php"); ?>

<div id="m_d_outer">
	<?php $_SESSION['LOADGO']=2099; ?>
	<?php $spotsql= "SELECT * FROM spots WHERE id='".$_GET['spot']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
	for ($n=0; $n<$n+1; $n++) {
		$spotsql= "SELECT * FROM spots WHERE areas_id='".$spotrow['areas_id']."' limit $n, 1"; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
		if ($spotrow['id']==0) { break; }
		$shits[$n]=$spotrow['id'];
		if ($n==0) { $shitscale=$shits[0]; }
		else { $shitscale=$shitscale.", ".$shits[$n]; }
	}	
	$shitscale="(".$shitscale.")";
	<div class="title">有关<?php echo $spotrow['spot'] ?></div>
	for ($n=0; $n<20; $n++) {
		$gosql= "SELECT * FROM gos WHERE datetime< '".$_SESSION['LOADGO']."' AND status!=-1 AND (start in $shitscale OR spot_0 in $shitscale OR spot_1 in $shitscale OR spot_2 in $shitscale OR spot_3 in $shitscale OR spot_4 in $shitscale) ORDER BY id DESC limit 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
		if (empty($gorow)) { break; }
		$_SESSION['LOADGO']=$gorow['datetime'];
		$usersql= "SELECT * FROM users WHERE id = '".$gorow['users_id']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); ?>
		<div class="go">
			<div class="go_title"><a href="../go/?go=<?php echo $gorow['id'] ?>"><?php echo $userrow['name']."：".$gorow['title']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#".$gorow['id']."# " ?></a></div>
			<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
				$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
					if ($gorow["spot_$i"]!=0) { echo " ".$spotrow['spot']." "; }
			} ?></div>
			<div class="go_start">
				<?php if ($gorow['startday']!=0 or $gorow["start"]!=0 ) {
					if ($gorow['startday']!=0) { echo date("Y-m-d", $gorow['startday']); } if ($gorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $gorow['startdays'])." 间";} 
					if ($gorow["start"]!=0) { $spotsql= "SELECT * FROM spots WHERE id= '".$gorow["start"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
						echo "从".$spotrow['spot']; }
					echo "出发 | "; } 
				$today=date("Y-m-d"); $day=substr($gorow['datetime'],0,10); if($day==$today) {echo "今天记下的";} else{echo $day."记下的";} ?></div>
			<div class="go_text"><?php echo nl2br($gorow['text']) ?></div>
		</div>
	<?php } ?>
</div>

<?php require("../../_footer.php"); ?>