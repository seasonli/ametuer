<?php require("../../_config.php"); require("../_header.php"); ?>

<?php require("../_a.php"); ?>

<?php $mygosql= "SELECT * FROM gos WHERE users_id= '".$_SESSION['ID']."' AND status!=-1 ORDER BY id DESC limit 1" ; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); ?>

<div id="m_d_outer">
	<div class="title">我的旅行计划</div>
	<div class="go">
		<div class="go_title"><a href="../go/?go=<?php echo $mygorow['id'] ?>"><?php echo $mygorow['title'] ?></a></div>
		<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
			$myspotsql= "SELECT * FROM spots WHERE id= '".$mygorow["spot_$i"]."' "; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql));
				if ($mygorow["spot_$i"]!=0) { echo " ".$myspotrow['spot']." "; }
		} ?></div>
	</div>
	<div class="tail"><a href="../go/mygos/">更多…</a></div>
	<div class="title">提醒@</div>
	<?php for ($n=0; $n<5; $n++) { 
		$goatsql= "SELECT * FROM gos_ats WHERE users_id= '".$_SESSION['ID']."' AND status>-1 ORDER BY datetime DESC LIMIT $n,1"; $goatrow= mysql_fetch_assoc(mysql_query($goatsql)); 
		if ($goatrow['id']==0) { break; }
		$usersql= "SELECT * FROM users WHERE id= '".$goatrow['subusers_id']."' "; $userrow=mysql_fetch_assoc(mysql_query($usersql));
		$gosql= "SELECT * FROM gos WHERE id= '".$goatrow['gos_id']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); ?>
		<div class="go">
			<div class="go_title">“<a href="../go/?go=<?php echo $gorow['id'] ?>"><?php echo mb_substr($goatrow['text'],0,12,'utf-8') ?>…</a>”<br/><span class="f-grey">来自<?php echo $userrow['name'] ?> [<?php if ($goatrow['status']>0) echo "未读"; else { echo "已读"; }  ?>]</span></div>
		</div>
	<?php } ?>
	<div class="title">我关注的旅行计划</div>
	<?php for ($n=0; $n<5; $n++) { 
		$marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' AND (status_love!=0 OR status_reply!=0) ORDER BY datetime_renew DESC, id DESC limit $n,1"; $markrow=mysql_fetch_assoc(mysql_query($marksql));
		if ($markrow['id']==0) { break; }
		$gosql= "SELECT * FROM gos WHERE id= '".$markrow['gos_id']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); 
		$usersql= "SELECT * FROM users WHERE id= '".$gorow['users_id']."' "; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
		<div class="go">
			<div class="go_title"><a href="../go/?go=<?php echo $gorow['id'] ?>"><?php echo $gorow['title'] ?></a></div>
			<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
				$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
					if ($gorow["spot_$i"]!=0) { echo " ".$spotrow['spot']." "; }
			} ?></div>
		</div>
	<?php } ?>
	<div class="tail"><a href="../go/love/">更多…</a></div>
</div>

<?php require("../_footer.php"); ?>