<?php 
require("../../_config.php"); 
$_SESSION['LOADSLIP']=2099;
for ($i=0; $i<10; $i++) {
	$slipsql= "SELECT * FROM gos_slips WHERE datetime< '".$_SESSION['LOADSLIP']."' AND status!= -1 GROUP BY idd ORDER BY datetime DESC limit 1"; 
	$sliprow = $mysqli -> query($slipsql) -> fetch_assoc();
	$_SESSION['LOADSLIP']=$sliprow['datetime'];
	$usersql= "SELECT * FROM users WHERE id= '".$sliprow['users_id']."' "; $userrow = $mysqli -> query($usersql) -> fetch_assoc(); 
	if ($sliprow['id']==0) { break; }
	$idd=$sliprow['idd']; ?>
	<div class="slip">
		<div class="slip_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
		<a href="../go/<?php echo $sliprow['gos_id'] ?>"><div class="slip_text"><?php echo " ".$sliprow['text'] ?></a>
		<span class="f-grey"><?php echo substr($sliprow['datetime'],0,10) ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<?php for ($j=0; $j<5; $j++) { 
			$slipsql= "SELECT * FROM gos_slips WHERE idd=$idd limit $j,1";
			$sliprow = $mysqli -> query($slipsql) -> fetch_assoc(); 
			if ($sliprow['id'] == 0) { break; }
			$spotsql= "SELECT * FROM spots WHERE id= '".$sliprow['spot']."' ";
			$spotrow= $mysqli -> query($spotsql) -> fetch_assoc(); 
			echo $spotrow['spot']." ";
		} ?></span></div>
	</div>
<?php } ?>


