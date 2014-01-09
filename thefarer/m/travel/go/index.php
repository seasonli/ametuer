<?php require("../../../_config.php"); require("../../_header.php"); ?>

<?php require("../../_a.php"); ?>

<div id="m_d_outer">
	<?php 
	$onegosql= "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; $onegorow=mysql_fetch_assoc(mysql_query($onegosql));
	$oneusersql= "SELECT * FROM users WHERE id = '".$onegorow['users_id']."' "; $oneuserrow= mysql_fetch_assoc(mysql_query($oneusersql));
	?>
	<div class="title"><?php echo $oneuserrow['name']."：".$onegorow['title']; ?></div>
	<div class="go">
		<div class="go_spots"><?php for ($i=0; $i<5; $i++) {
			$onespotsql= "SELECT * FROM spots WHERE id= '".$onegorow["spot_$i"]."' "; $onespotrow= mysql_fetch_assoc(mysql_query($onespotsql));
				if ($onegorow["spot_$i"]!=0) { echo " ".$onespotrow['spot']." "; }
		} ?></div>
		<div class="go_start">
			<?php if ($onegorow['startday']!=0 or $onegorow["start"]!=0 ) {
				if ($onegorow['startday']!=0) { echo date("Y-m-d", $onegorow['startday']); } if ($onegorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $onegorow['startdays'])." 间";} 
				if ($onegorow["start"]!=0) { $spotsql= "SELECT * FROM spots WHERE id= '".$onegorow["start"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
					echo "从".$spotrow['spot']; }
				echo "出发 | "; } 
			$today=date("Y-m-d"); $day=substr($onegorow['datetime'],0,10); if($day==$today) {echo "今天记下的";} else{echo $day."记下的";} ?></div>
		<div class="go_text"><?php echo nl2br($onegorow['text']) ?></div>
		<div class="go_replies">
			<?php for ($k=0; $k<$k+1; $k++) {
				$goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$_GET['go']."' AND status!=-1 order by id desc limit $k,1 "; $goreplyrow=mysql_fetch_assoc(mysql_query($goreplysql));
				if ($goreplyrow['id']==0) { break; }
				$usersql= "SELECT * FROM users WHERE id= '".$goreplyrow['users_id']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
				<div class="go_reply">
					<div class="go_reply_name"><?php echo $userrow['name']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$goreplyrow['datetime'] ?></div>
					<div class="go_reply_text"><?php echo $goreplyrow['text'] ?></div>
				</div>
			<?php } ?>
		</div>	
	</div>
	<form action="-replygo.php" method="post">
		<div><textarea name="text" style="margin:30px 0 0 0; width:100%; heigh:40px;"></textarea></div>
		<div style="margin:5px 0 0 0"><label style="float:left"><input type="submit" value="回应" /></label></div>
		<input name="go" type="hidden" value="<?php echo $_GET['go'] ?>" />
	</form>
</div>

<?php require("../../_footer.php"); ?>