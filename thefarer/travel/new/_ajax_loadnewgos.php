<?php
require("../../_config.php");
for ($n = 0; $n < 10; $n ++) {
	$gorow = $mysqli -> query("SELECT * FROM gos WHERE datetime_renew < '".$_SESSION['TMP_LOADGO']."' AND status != -1 AND (users_id < 10 OR users_id > 100) ORDER BY datetime_renew DESC LIMIT 1") -> fetch_assoc();
	$userrow = $mysqli -> query("SELECT * FROM users WHERE id = '".$gorow['users_id']."'") -> fetch_assoc();
	$goreplynumrow = $mysqli -> query("SELECT * FROM gos_replies WHERE gos_id= '".$gorow['id']."' AND status != -1") -> num_rows;

	$JSON['go'][$n] = $gorow;
	$JSON['go'][$n]['startday_'] = date("Y-m-d", $gorow['startday']);
	$JSON['go'][$n]['startdays_'] = date("Y-m-d", $gorow['startdays']);
	$JSON['go'][$n]['user'] = $userrow;
	$JSON['go'][$n]['user']['password'] = "";
	$JSON['go'][$n]['goreplynum'] = $goreplynumrow;

	for ($i = 0; $i < 5; $i ++) {
		if ($gorow["spot_$i"] != 0) {
			$spotrow = $mysqli -> query("SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."'") -> fetch_assoc();
			$JSON['go'][$n]["spot_$i"] = $spotrow['spot']; 
		}
		else {
			unset($JSON['go'][$n]["spot_$i"]);
		}
	}
	if ($gorow["start"] != 0) {
		$spotrow = $mysqli -> query("SELECT * FROM spots WHERE id= '".$gorow["start"]."'") -> fetch_assoc();
		$JSON['go'][$n]['start'] = $spotrow['spot'];
	}
	else {
		unset($JSON['go'][$n]['start']);
	}
	$liverow = $mysqli -> query("SELECT * FROM gos_lives WHERE gos_id = '".$gorow['id']."' AND image!='' AND status!=-1 ORDER BY RAND() limit 1") -> fetch_assoc();
	if ($liverow['id']) { 
		$JSON['go'][$n]['live'] = $liverow['image'];
	}
	$_SESSION['TMP_LOADGO'] = $gorow['datetime_renew'];
}
$result = json_encode($JSON);
echo $result;
?>