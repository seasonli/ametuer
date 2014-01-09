<?php
require("../../_config.php");
$spotsql="SELECT * FROM spots WHERE spot like '%".addslashes($_POST['spot'])."%' "; $spotnumrow=mysql_num_rows(mysql_query($spotsql));
if ($spotnumrow>0) {
	for ($i=0; $i<10; $i++) {
		$spotsql="SELECT * FROM spots WHERE spot like '%".addslashes($_POST['spot'])."%' limit $i, 1"; $spotrow=mysql_fetch_assoc(mysql_query($spotsql));
		if ($spotrow['id']==0) { break; }
		for ($o=0; $o<$o+1; $o++) {
			$subspotsql= "SELECT * FROM spots WHERE areas_id='".$spotrow['areas_id']."' limit $o, 1"; $subspotrow=mysql_fetch_assoc(mysql_query($subspotsql)); 
			if ($subspotrow['id']==0) { break; }
			$shits[$o]=$subspotrow['id'];
			if ($o==0) { $shitscale=$shits[0]; }
			else { $shitscale=$shitscale.", ".$shits[$o]; }
		}
		$shitscale="(".$shitscale.")";
		echo "<a href='../search/?spot=".$spotrow['id']."'><ul>".$spotrow['spot']."</ul></a>";
	}
}
if ($spotnumrow==0 or $spotnumrow>10 ) { echo "<ul class='notice'>".$spotnumrow."个匹配 尝试更准确地输入</ul>"; }