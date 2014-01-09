<?php require("../../../_config.php"); require("../../_header.php"); ?>

<?php require("../../_a.php"); ?>

<?php $p=$_GET['p']; if($p==0) {$p=1;} $k=$p*20; ?>

<div id="m_d_outer">
	<div class="title">我关注的旅行计划</div>
	<?php for ($n=$k-20; $n<$k; $n++) { 
		$marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' AND (status_love!=0 OR status_reply!=0) ORDER BY id DESC limit $n,1"; $markrow=mysql_fetch_assoc(mysql_query($marksql));
		if ($markrow['id']==0) { break; }
		$gosql= "SELECT * FROM gos WHERE id= '".$markrow['gos_id']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); 
		$usersql= "SELECT * FROM users WHERE id= '".$gorow['users_id']."' "; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
		<div class="go">
			<div class="go_title"><a href="../go/?go=<?php echo $gorow['id'] ?>"><?php echo $userrow['name']."：".$gorow['title'] ?></a></div>
			<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
				$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
					if ($gorow["spot_$i"]!=0) { echo " ".$spotrow['spot']." "; }
			} ?></div>
		</div>
	<?php } ?>
	<div class="title">
		&nbsp;&nbsp;<a href="../new/">首页</a>&nbsp;&nbsp;
		<?php $marksql="SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' AND (status_love!=0 OR status_reply!=0)"; $marknumrow=mysql_num_rows(mysql_query($marksql)); $pagenumrow=$marknumrow/20+1;
		for($n=$p-3; $n<$p+7; $n++) {
			if ($n>0 and $n<$pagenumrow and $n!=$p) {echo "&nbsp;&nbsp;<a href='?p=".$n."'>".$n."</a>&nbsp;&nbsp;"; }
			if ($n==$p) { echo "&nbsp;&nbsp;".$n."&nbsp;&nbsp;"; }
		} ?>
	</div>	
</div>

<?php require("../../_footer.php"); ?>