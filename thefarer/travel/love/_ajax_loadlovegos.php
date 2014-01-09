<?php require("../../_config.php");

for ($n=0; $n<10; $n++) {
	$marksql= "SELECT * FROM gos_marks WHERE datetime_renew< '".$_SESSION['TMP_MARKGO_DATETIME_RENEW']."' AND users_id= '".$_SESSION['ID']."' AND (status_love!=0 OR status_reply!=0) ORDER BY datetime_renew DESC, id DESC limit 1"; $markrow=mysql_fetch_assoc(mysql_query($marksql));
	if ($markrow['id']==0) { 
		$marksql= "SELECT * FROM gos_marks WHERE datetime_renew= '".$_SESSION['TMP_MARKGO_DATETIME_RENEW']."' AND id< '".$_SESSION['TMP_MARKGO_ID']."' AND users_id= '".$_SESSION['ID']."' AND (status_love!=0 OR status_reply!=0) ORDER BY datetime_renew DESC, id DESC limit 1"; $markrow=mysql_fetch_assoc(mysql_query($marksql));
	}
	if ($markrow['id']==0) { break; }
	$gosql= "SELECT * FROM gos WHERE id= '".$markrow['gos_id']."'"; $gorow=mysql_fetch_assoc(mysql_query($gosql)); 
	$JSON['go'][$n]=$gorow;
	$JSON['go'][$n]['datetime_']=substr($gorow['datetime'],0,10);
	$JSON['go'][$n]['startday_']=date("Y-m-d", $gorow['startday']);
	$JSON['go'][$n]['startdays_']=date("Y-m-d", $gorow['startdays']);
	$JSON['go'][$n]['text']=mb_substr($gorow['text'],0,90,"utf-8");
	$usersql= "SELECT * FROM users WHERE id= '".$gorow['users_id']."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql));
	$JSON['go'][$n]['user']=$userrow;
	$goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$gorow['id']."' AND status!=-1"; $goreplynumrow=mysql_num_rows(mysql_query($goreplysql)); 
	$JSON['go'][$n]['goreplynum']=$goreplynumrow;
	for ($i=0; $i<5; $i++) {
		$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["spot_$i"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
		if ($gorow["spot_$i"]!=0) { $JSON['go'][$n]['spot'][$i]=$spotrow['spot']; }
	}
	$spotsql= "SELECT * FROM spots WHERE id= '".$gorow["start"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
	if ($spotrow['id']) { 
		$JSON['go'][$n]['start']=$spotrow['spot'];
	}	
	$livesql= "SELECT * FROM gos_lives WHERE gos_id = '".$gorow['id']."' AND image!='' AND status!=-1 ORDER BY RAND() limit 1"; $liverow=mysql_fetch_assoc(mysql_query($livesql));
	if ($liverow['id']) { 
		$JSON['go'][$n]['live']=$liverow['image'];
	}
	$_SESSION['TMP_MARKGO_DATETIME_RENEW']=$markrow['datetime_renew']; $_SESSION['TMP_MARKGO_ID']=$markrow['id'];
} 

header("Content-type:application/json");
echo json_encode($JSON); ?>