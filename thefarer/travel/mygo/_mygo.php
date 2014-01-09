
<div class="onegolives-container">
	<div class="onegolives-top">旅行手札</div>
	<div class="onegolives">
		<div class="onegolive-wrapper">
			<div class="onegolive add"><?php require("_addlive.php") ?></div>
			<?php for ($i=0; $i<$i+1; $i++) {
				$mylivesql= "SELECT * FROM gos_lives WHERE gos_id= '".$_GET['mygo']."' AND status!=-1 order by id LIMIT $i,1"; $myliverow=mysql_fetch_assoc(mysql_query($mylivesql));
				if (empty($myliverow)) { break; }
				$spotsql= "SELECT * FROM spots WHERE id= '".$myliverow["spot"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
				echo "<div class='onegolive'>";		
					if ($myliverow['image']!=null) { echo "<img src='".$myliverow['image']."' />"; }
					if ($myliverow['text']!=null) { echo "<div class='onego_live_sign'>".nl2br($myliverow['text'])."</div>"; }
					echo "<div class='onegolive_sign'>".substr($myliverow['datetime'],0,16)."</div>";
				echo "</div>";
			} ?>
			<div class="onegolive"><a href="../../wechat/"><img src="../../_css/live.png" /></a></div>
		</div>
	</div>	


</div>

