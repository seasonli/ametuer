<?php
require("../../_config.php");
$gorow = $mysqli -> query("SELECT * FROM gos WHERE id= '".$_GET['go']."'") -> fetch_assoc();
for ($n=0; $n<5; $n++) {
	$ranksql = "SELECT * FROM gos_ranks WHERE 
	status!=-1 
	AND gos_id= '".$_GET['go']."' 
	AND rank_to>=64 
	AND subgos_id< '".$_SESSION['TMP_LOADRANKGO_96']."' 
	AND rank_to= '".$_SESSION['TMP_LOADRANKTO_96']."' 
	AND rank_time>=96
	ORDER BY rank_to DESC, id DESC limit 1";
	$rankrow = $mysqli -> query($ranksql) -> fetch_assoc();
	$m=96;
	if ($rankrow['id']==0) {
		$ranksql = "SELECT * FROM gos_ranks WHERE 
		status!=-1 
		AND gos_id= '".$_GET['go']."' 
		AND rank_to>=64
		AND subgos_id< '".$_SESSION['TMP_LOADRANKGO_96']."' 
		AND rank_time>=96
		ORDER BY rank_to DESC, id DESC limit 1";
		$rankrow = $mysqli -> query($ranksql) -> fetch_assoc();
		$m=96;
		if ($rankrow['id']==0) {
			$ranksql = "SELECT * FROM gos_ranks WHERE 
			status!=-1 
			AND gos_id= '".$_GET['go']."' 
			AND rank_to>=64 
			AND subgos_id< '".$_SESSION['TMP_LOADRANKGO_0']."' 
			AND rank_to= '".$_SESSION['TMP_LOADRANKTO_0']."' 
			AND rank_time>=0 and rank_time<96
			ORDER BY rank_to DESC, id DESC limit 1";
			$rankrow = $mysqli -> query($ranksql) -> fetch_assoc();
			$m=0;
			if ($rankrow['id']==0) {
				$ranksql = "SELECT * FROM gos_ranks WHERE 
				status!=-1 
				AND gos_id= '".$_GET['go']."' 
				AND rank_to>=64
				AND subgos_id< '".$_SESSION['TMP_LOADRANKGO_0']."' 
				AND rank_time>=0 and rank_time<96
				ORDER BY rank_to DESC, id DESC limit 1";
				$rankrow = $mysqli -> query($ranksql) -> fetch_assoc();
				$m=0;
			}
		}
	}
	if ($rankrow['id']==0) { break; }
	if ($m==96) { $_SESSION['TMP_LOADRANKGO_96']=$rankrow['subgos_id']; $_SESSION['TMP_LOADRANKTO_96']=$rankrow['rank_to']; }
	if ($m==0) { $_SESSION['TMP_LOADRANKGO_0']=$rankrow['subgos_id']; $_SESSION['TMP_LOADRANKTO_0']=$rankrow['rank_to']; }
	$gosql= "SELECT * FROM gos WHERE id= '".$rankrow['subgos_id']."' "; $gorow = $mysqli -> query($gosql) -> fetch_assoc(); 
	$usersql= "SELECT * FROM users WHERE id= '".$gorow['users_id']."' "; $userrow = $mysqli -> query($usersql) -> fetch_assoc(); ?>
	<div class="sidego">		
		<div class="sidego_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
		<div class="sidego_text"><?php echo "<a href='../go/".$gorow['id']."'>".$userrow['name'] ?>：<?php echo $gorow['title'] ?></a></div>
			<div class="sidego_sign">
				<div class="go_sign_start">
					<?php if ($gorow['startday']!=0 or $gorow["start"]!=0 ) {
						if ($gorow['startday']!=0) { echo date("Y-m-d", $gorow['startday']); } if ($gorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $gorow['startdays'])." 间";} 
						if ($gorow["start"]!=0) { $spotsql= "SELECT * FROM spots WHERE id= '".$gorow["start"]."' "; $spotrow= $mysqli -> query($spotsql) -> fetch_assoc(); echo "从".$spotrow['spot']; } echo "出发 | "; 
					} 
					$today=date("Y-m-d"); $day=substr($gorow['datetime'],0,10); if($day==$today) {echo "刚刚记下的";} else{echo $day."记下的"; } echo "</div>";
					$goreplysql = "SELECT * FROM gos_replies WHERE gos_id= '".$gorow['id']."' AND status!=-1"; 
					$goreplynumrow = $mysqli -> query($goreplysql) -> num_rows; ?>
		</div>					
		<div class="go-loading go-loading<?php echo $gorow['id'] ?>"></div>
		<div class="go-addition go-addition<?php echo $gorow['id'] ?>"></div>	
	</div>
<?php } ?>