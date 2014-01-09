<?php require("../../_config.php"); require("../../verify/_verify.php"); ?>
<?php 
$datetime=date("Y-m-d H:i:s");

mysql_query("INSERT INTO gos (users_id, start, title, text, startday, startdays, datetime, datetime_renew, spot_0, spot_1, spot_2, spot_3, spot_4 ) 
VALUES 
(".$_SESSION['ID'].", ".$_POST['start'].", '".addslashes(trim($_POST['title']))."', '".addslashes(trim($_POST['text']))."', '".$_POST['startday']."', '".$_POST['startdays']."', '".$datetime."', '".$datetime."', '".$_POST['spot_0']."', '".$_POST['spot_1']."', '".$_POST['spot_2']."', '".$_POST['spot_3']."', '".$_POST['spot_4']."')");

$mygosql= "SELECT * FROM gos WHERE users_id='".$_SESSION["ID"]."' AND status!=-1 ORDER BY id DESC limit 1"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql));
$goid=$mygorow['id'];

preg_match_all("^@(\S+)( )^", addslashes($_POST['text']), $users, PREG_SET_ORDER);
for ($n=0; $n<$n+1; $n++) {
	if (isset($users[$n][1])==FALSE) { break; }
	else {
		$usersql= "SELECT * FROM users WHERE name= '".$users[$n][1]."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); 
		if ($userrow['id']==0) { break; }
		else { mysql_query("INSERT INTO gos_ats (subusers_id, users_id, gos_id, text, datetime) VALUES ('".$_SESSION['ID']."', '".$userrow['id']."', '".$goid."', '".addslashes($_POST['text'])."', '".$datetime."')"); }
	}
}

$gosql= "SELECT * FROM gos WHERE users_id!='".$_SESSION["ID"]."' AND status!=-1 "; $gonumrow=mysql_num_rows(mysql_query($gosql)); //***开始rank

for ($i=0; $i<$gonumrow; $i++) {
	$oldgosql= "SELECT * FROM gos WHERE users_id!='".$_SESSION["ID"]."' AND status!=-1 order by id limit $i,1"; $oldgorow=mysql_fetch_assoc(mysql_query($oldgosql));
	$oldgoid=$oldgorow['id']; //**oldgoid
	
	//**rank_time Both
	if ($_POST['startday']==0 || $oldgorow['startday']==0) { $rank_time=128-round((time()-(strtotime($oldgorow['datetime'])))/86400); echo $oldgoid."=".$rank_time.";"; }	
	else {
		if ($_POST['startdays']==0) { $dif=$_POST['startday']; }
		else { $dif=abs($_POST['startday']+$_POST['startdays'])/2; }
		if ( $oldgorow['startdays']==0) { $olddif=$oldgorow['startday']; }
		else { $olddif=abs($oldgorow['startday']+$oldgorow['startdays'])/2; }
		$rank_time=128-round((abs($olddif-$dif)/86400));
	}	

	//**rank_from Both
	if ($_POST['start']==0 or $oldgorow['start']==0) { $rank_from=0; }
	else if ($_POST['start']==$oldgorow['start'] and $_POST['start']>100) { $rank_from=128; }
	else {
		$oldareasql= "SELECT * FROM spots WHERE id = '".$oldgorow['start']."' "; $oldarearow=mysql_fetch_assoc(mysql_query($oldareasql));     //**oldareaid
		$areasql= "SELECT * FROM spots WHERE id = '".$_POST['start']."' "; $arearow=mysql_fetch_assoc(mysql_query($areasql));     //**areaid	
		if ($_POST['start']<100 or $oldgoid<100) {
			if ($arearow['areas_id']==$oldarearow['areas_id']) { $rank_from=32; } 
			else { $rank_from=0; }
		}
		else if ($arearow['areas_id']==$oldarearow['areas_id']) { $rank_from=64; }
	}
	
	//**rank_to I
	for ($k=0; $k<5; $k++) {
		$spotid=$_POST["spot_$k"];  //**spotid
		if ($spotid!=0) { 
			$rank_to[$k]=64;
			if  ($spotid<100) {
				for ($kk=0; $kk<5; $kk++) {
					$oldspotid=$oldgorow["spot_$kk"];  //**oldspotid
					if ($oldspotid!=0) {
						$oldareasql= "SELECT * FROM spots WHERE id = '".$oldspotid."' "; $oldarearow=mysql_fetch_assoc(mysql_query($oldareasql)); $oldareaid=$oldarearow['areas_id']; 	 //**oldareaid
						if ($spotid==$oldareaid) { $rank_to[$k]=$rank_to[$k]+6; }
						else { $rank_to[$k]=$rank_to[$k]-12; }
					}
				}				
			}
			else {
				$areasql= "SELECT * FROM spots WHERE id = '".$spotid."' "; $arearow=mysql_fetch_assoc(mysql_query($areasql)); $areaid=$arearow['areas_id']; //**areaid	
				for ($kk=0; $kk<5; $kk++) {
					$oldspotid=$oldgorow["spot_$kk"];  //**oldspotid
					if ($oldspotid!=0) {
						if ($oldspotid<100) { 
							if ($areaid==$oldspotid) { $rank_to[$k]=$rank_to[$k]+6; }
							else { $rank_to[$k]=$rank_to[$k]-12; }
						}
						else {
							$oldareasql= "SELECT * FROM spots WHERE id = '".$oldspotid."' "; $oldarearow=mysql_fetch_assoc(mysql_query($oldareasql)); $oldareaid=$oldarearow['areas_id']; 	 //**oldareaid
							if ($spotid==$oldspotid) { $rank_to[$k]=128; break; }
							if ($areaid==$oldareaid) { $rank_to[$k]=$rank_to[$k]+6; }
							else { $rank_to[$k]=$rank_to[$k]-12; }
						}					
					}
				}
			}
		}
		else { $rank_to[$k]=0; }
	}
	$rank_to_=max($rank_to[0], $rank_to[1], $rank_to[2], $rank_to[3], $rank_to[4]);
	$rankgosql= "INSERT INTO gos_ranks (gos_id, subgos_id, rank_time, rank_from, rank_to ) VALUES ('".$goid."','".$oldgoid."', '".$rank_time."', '".$rank_from."', '".$rank_to_."')";
	mysql_query($rankgosql);
	
	//**rank_to II
	for ($kk=0; $kk<5; $kk++) {
		$oldspotid=$oldgorow["spot_$kk"];  //**oldspotid
		if ($oldspotid!=0) {
			$rank__to[$kk]=64;
			if  ($oldspotid<100) {
				for ($k=0; $k<5; $k++) {
					$spotid=$_POST["spot_$k"]; //**spotid
					if ($spotid!=0) { 
						$areasql= "SELECT * FROM spots WHERE id = '".$spotid."' "; $arearow=mysql_fetch_assoc(mysql_query($areasql)); $areaid=$arearow['areas_id']; 	 //**areaid
						if ($oldspotid==$areaid) { $rank__to[$kk]=$rank__to[$kk]+6;  } 
						else { $rank__to[$kk]=$rank__to[$kk]-12; }
					}
				}				
			}			
			else {
				$oldareasql= "SELECT * FROM spots WHERE id = '".$oldspotid."' "; $oldarearow=mysql_fetch_assoc(mysql_query($oldareasql)); $oldareaid=$oldarearow['areas_id']; 	 //**oldareaid
				for ($k=0; $k<5; $k++) {
					$spotid=$_POST["spot_$k"]; //**spotid
					if ($spotid!=0) {
						if ($spotid<100) { 
							if ($oldareaid==$spotid) { $rank__to[$kk]=$rank__to[$kk]+6; }
							else { $rank__to[$kk]=$rank__to[$kk]-12; }
						}
						else {
							$areasql= "SELECT * FROM spots WHERE id = '".$spotid."' "; $arearow=mysql_fetch_assoc(mysql_query($areasql)); $areaid=$arearow['areas_id']; 	 //**areaid
							if ($oldspotid==$spotid) { $rank__to[$kk]=128; break; }
							if ($oldareaid==$areaid) { $rank__to[$kk]=$rank__to[$kk]+6; }
							else { $rank__to[$kk]=$rank__to[$kk]-12; }
						}					
					}
				}
			}
		} else { $rank__to[$kk]=0; }
	}
	$rank__to_=max($rank__to[0], $rank__to[1], $rank__to[2], $rank__to[3], $rank__to[4]); 
	$rankgosql= "INSERT INTO gos_ranks (gos_id, subgos_id, rank_time, rank_from, rank_to ) VALUES ('".$oldgoid."','".$goid."', '".$rank_time."', '".$rank_from."', '".$rank__to_."')";
	mysql_query($rankgosql);
}
echo "<script>location.href='../mygo/?mygo=".$goid."'</script>";
?>
