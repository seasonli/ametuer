<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?>
<script>
$(function() { 
	for (var i=0; i<20; i++) {
		var height=$(".go_img:eq("+i+") img").height(); var width=$(".go_img:eq("+i+") img").width(); var ratio=width/height; 
		if (ratio>=1) { $(".go_img:eq("+i+") img").height("125px"); width=Math.round(120*ratio); $(".go_img:eq("+i+") img").width(width+"px"); }
		else { $(".go_img:eq("+i+") img").width("120px"); height=Math.round(120/ratio); $(".go_img:eq("+i+") img").height(height+"px"); } 
	}
})
</script>
<title>更远网：我的其他旅行计划</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>
<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div id="othergos-container">
			<div class="gos-top">我的其他旅行计划</div>
			<?php for ($n=0; $n<$n+1; $n++) { 
				$gosql= "SELECT * FROM gos WHERE users_id= '".$_SESSION['ID']."' AND status!=-1 ORDER BY datetime desc limit $n, 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
				if ($gorow['spot_0']==0) { break; } ?>
				<div class="go">
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
					<div class="go_avator"><img src="<?php echo $_SESSION['AVATOR'] ?>" /></div>
					<div class="go-middle">	
						<div class="go_title"><?php echo "<a href='../go/".$gorow['id']."'>".$gorow['title'] ?></a></div>
						<div class="go_date"><?php $today=date("Y-m-d"); $day=substr($gorow['datetime'],0,10); if($day==$today) {echo "刚刚记下的";} else{echo $day."记下的";} ?></div>			
						<div class="go_text"><?php echo mb_substr($gorow['text'],0,90,"utf-8") ?>……</div>
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
			<?php } ?>
		</div>
	</div>
</div></div>
<?php require("../../_footer.php"); ?>