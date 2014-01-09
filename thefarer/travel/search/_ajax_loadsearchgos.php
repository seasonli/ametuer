<?php
require("../../_config.php");
$spotsql= "SELECT * FROM spots WHERE id='".$_GET['spot']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
for ($n=0; $n<$n+1; $n++) {
	$spotsql= "SELECT * FROM spots WHERE areas_id='".$spotrow['areas_id']."' limit $n, 1"; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
	if ($spotrow['id']==0) { break; }
	$shits[$n]=$spotrow['id'];
	if ($n==0) { $shitscale=$shits[0]; }
	else { $shitscale=$shitscale.", ".$shits[$n]; }
}
$shitscale="(".$shitscale.")";
for ($n=0; $n<30; $n++) {
	if ($_GET['type']==to) { $gosql= "SELECT * FROM gos WHERE datetime< '".$_SESSION['LOADGO']."' AND status!=-1 AND (spot_0 in $shitscale OR spot_1 in $shitscale OR spot_2 in $shitscale OR spot_3 in $shitscale OR spot_4 in $shitscale) ORDER BY id DESC limit 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); }
	else if ($_GET['type']==from) { $gosql= "SELECT * FROM gos WHERE datetime< '".$_SESSION['LOADGO']."' AND status!=-1 AND start in $shitscale ORDER BY id DESC limit 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); }
	else {
		$gosql= "SELECT * FROM gos WHERE datetime< '".$_SESSION['LOADGO']."' AND status!=-1 AND (start in $shitscale OR spot_0 in $shitscale OR spot_1 in $shitscale OR spot_2 in $shitscale OR spot_3 in $shitscale OR spot_4 in $shitscale) ORDER BY id DESC limit 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
	}
	if ($gorow['id']==0) { break; }
	$_SESSION['LOADGO']=$gorow['datetime'];
	$usersql= "SELECT * FROM users WHERE id = '".$gorow['users_id']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); ?>
	<div class="go" id="<?php echo $gorow['id'] ?>" onmouseout='hideslidedown(this.id)' onmouseover='showslidedown(this.id)'>
		<div class="go_spots">
			<div class="go_spots_spots"><?php for ($i=0; $i<5; $i++) {
				$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
				if ($spotrow['id']!=0) { ?>#<?php echo $spotrow['spot']."#&nbsp&nbsp&nbsp"; }
			} ?></div>
			<div class="go_spots_start">
				<?php 
					if ($gorow['startday']!=0 or $gorow["start"]!=0 ) {
					if ($gorow['startday']!=0) { echo date("Y-m-d", $gorow['startday']); } if ($gorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $gorow['startdays'])." 间";} 
					if ($gorow["start"]!=0) { $spotsql= "SELECT * FROM spots WHERE id= '".$gorow["start"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql)); echo "从".$spotrow['spot']; } echo "出发"; }
				?> 
			</div>
		</div>
		<div class="go_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
		<div class="go-middle">	
			<div class="go_title"><?php echo "<a href='../go/".$gorow['id']."'>".$userrow['name'] ?>：<?php echo $gorow['title'] ?></a></div>
			<div class="go_date"><?php $today=date("Y-m-d"); $day=substr($gorow['datetime'],0,10); if($day==$today) {echo "刚刚记下的";} else{echo $day."记下的";} ?></div>
			<div class="go_icons"><ul class="talk"><?php echo $goreplynumrow ?></ul></div>
			<div class="go_text"><?php echo mb_substr($gorow['text'],0,90,"utf-8") ?>……</div>
			<div class="go_slidedown go_slidedown<?php echo $gorow['id'] ?>"><li id="<?php echo $gorow['id'] ?>" onclick='browsego(this.id)'>点击快速回复</li></div>
			<div class="go-loading go-loading<?php echo $gorow['id'] ?>"></div>
			<div class="go-addition go-addition<?php echo $gorow['id'] ?>"></div>	
		</div>
		<?php $livesql= "SELECT * FROM gos_lives WHERE gos_id = '".$gorow['id']."' AND image!='' AND status!=-1 ORDER BY datetime DESC limit 1"; $liverow= mysql_fetch_assoc(mysql_query($livesql)); if (!empty($liverow['id'])) { ?>							
			<div class="go_img">
				<?php for ($o=0; $o<3; $o++) {
					$livesql= "SELECT * FROM gos_lives WHERE gos_id = '".$gorow['id']."' AND image!='' AND status!=-1 ORDER BY RAND() limit 1"; $liverow= mysql_fetch_assoc(mysql_query($livesql));
					if (!empty($liverow['id'])) { echo "<img class='o".$o."' src='".$liverow['image']."' />"; } 
				} ?>
			</div>
		<?php } ?>	
	</div>
<?php  } ?>
