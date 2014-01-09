<?php 
require("../../_config.php");
$onegesql = "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; 
$onegerow = $mysqli -> query($onegesql) -> fetch_assoc();
for ($n=0; $n<10; $n++) {
	$slipsql= "SELECT * FROM gos_slips WHERE datetime< '".$_SESSION['LOADSLIP']."' AND ( spot= '".$mygorow['spot_0']."' OR
	spot= '".$mygorow['spot_1']."' OR
	spot= '".$mygorow['spot_2']."' OR
	spot= '".$mygorow['spot_3']."' OR
	spot= '".$mygorow['spot_4']."' ) AND status!= -1 GROUP BY idd ORDER BY datetime desc limit 1"; 
	$sliprow = $mysqli -> query($slipsql) -> fetch_assoc();
	if ($sliprow['id']==0) { break; }
	$_SESSION['LOADSLIP'] = $sliprow['datetime'];
	$usersql= "SELECT * FROM users WHERE id= '".$sliprow['users_id']."' "; 
	$userrow = $mysqli -> query($usersql) -> fetch_assoc();
	if ($sliprow['id']==0) { break; }
	$ndd=$sliprow['idd']; ?>
	<a href="../go/<?php echo $sliprow['gos_id'] ?>"><div class="slip">
		<div class="slip_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
		<div class="slip_text"><?php echo " ".$sliprow['text']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".substr($sliprow['datetime'],0,16); ?></div>
		<div class="slip_spots spots-wrapper">
			<?php for ($i=0; $i<5; $i++) { 
				$slipsql = "SELECT * FROM gos_slips WHERE idd=$idd limit $i,1"; 
				$sliprow = $mysqli -> query($slipsql) -> fetch_assoc();
				if ($sliprow['id']==0) { break; }
				$spotsql= "SELECT * FROM spots WHERE id= '".$sliprow['spot']."' ";
				$spotrow = $mysqli -> query($spotsql) -> fetch_assoc();
				echo "<li>".$spotrow['spot']."</li>";
			} ?>
		</div>
	</div></a>
<?php } ?>


