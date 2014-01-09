<?php require("../../../_config.php"); require("../../../_header.php"); require("../../../verify/_verify.php"); require("../../../verify/_verifymygo.php") ?>
<script>
function removego(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='../-removego.php' method='post'><input name='mygo' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	
function removelive(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='-removelive.php' method='post'><input name='mylive' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	
</script>
<title>更远网：我的旅行计划</title>
<?php require("../../../_a.php"); require("../../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<div class="necknav">
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="plan">我的计划</ul></a>
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/talk/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="talk on">讨论</ul></a>
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/live/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="booklet">旅行手札</ul></a>
		<div></div>
	</div>
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div id="left" class="talk">	
		<?php $mygosql= "SELECT * FROM gos WHERE id= '".$_GET['mygo']."'"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); ?>
		<div class="onegoreplies-container">
			<div class="onegoreplies-top">讨论</div>
			<div class="onegoreplies">
				<?php for ($k=0; $k<$k+1; $k++) {
					$goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$_GET['mygo']."' AND status!=-1 order by id desc limit $k,1 "; $goreplyrow=mysql_fetch_assoc(mysql_query($goreplysql));
					if ($goreplyrow['id']==0) { break; }
					$usersql= "SELECT * FROM users WHERE id= '".$goreplyrow['users_id']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
					<div class="onegoreply go_reply<?php echo $goreplyrow['id'] ?>">		
						<div class="onegoreply_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
						<div class="onegoreply_name"><?php echo $userrow['name'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $goreplyrow['datetime'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php if ($_SESSION['ID']==$goreplyrow['users_id']) { ?><span onclick='removegoreply(this.id)' id="<?php echo $goreplyrow['id'] ?>">删除</span><?php } else { ?><span onclick="atuser(this.id)" id="<?php echo $goreplyrow['id'] ?>">回应</span><input type="hidden" class="atuser<?php echo $goreplyrow['id'] ?>" value="<?php echo $userrow['name'] ?>" alt="<?php echo $_GET['mygo'] ?>" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $config_basedir ?>mail/write/?receiver=<?php echo $userrow['id'] ?>"><span>写信</span></a><?php } ?></div>
						<div class="onegoreply_text"><?php echo $goreplyrow['text'] ?> </div>
					</div>	
				<?php } ?>
			</div>
		</div>
	</div>
	<div id="right">
		<div class="hosts-container">
			<?php
			$spotsql= "SELECT * FROM spots WHERE id='".$mygorow['spot_0']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); 
			for ($n=0; $n<$n+1; $n++) {
				$subspotsql= "SELECT * FROM spots WHERE areas_id='".$spotrow['areas_id']."' limit $n, 1"; $subspotrow=mysql_fetch_assoc(mysql_query($subspotsql)); 
				if ($subspotrow['id']==0) { break; }
				$shits[$n]=$subspotrow['id'];
				if ($n==0) { $shitscale=$shits[0]; }
				else { $shitscale=$shitscale.", ".$shits[$n]; }
			}
			$shitscale="(".$shitscale.")";
			for ($n=0; $n<5; $n++) {
				$nowdnasql= "SELECT * FROM dna_now WHERE status!=-1 AND spots_id in $shitscale ORDER BY RAND() DESC limit $n,1"; $nowdnarow=mysql_fetch_assoc(mysql_query($nowdnasql)); 
				if (empty($nowdnarow['id'])) { break; }
				$usersql= "SELECT * FROM users WHERE status!=-1 AND id= '".$nowdnarow['users_id']."' "; $userrow=mysql_fetch_assoc(mysql_query($usersql)); 
				if ($n==0) { echo "<div class='hosts-top'>他们来自".$spotrow['spot']."，点击@他们参与讨论</div>"; } ?>
				<img src="<?php echo $userrow['avator_thumb'] ?>" title="<?php echo $userrow['name'] ?>" onclick="$('.replygo<?php echo $_GET['mygo'] ?>').val('@'+this.title+' '); $('.replygo<?php echo $_GET['mygo'] ?>').focus()"  />
			<?php } ?>
		</div>
		<div class="onegoinput-container">
			<div class="onegoinput">
				<form action="-addgoreply.php" method="post" onsubmit="return checktextarea()">
					<input type="hidden" name="mygo" value="<?php echo $_GET['mygo'] ?>" />
					<textarea name="text"></textarea>
					<img src="<?php echo  $_SESSION['AVATOR'] ?>" />
					<input type="submit" class="green" value="回 应" />
				</form>	
			</div>
		</div>
		<div style="float:right; padding:15px 0 0 0"><a href="<?php echo $config_basedir ?>wechat/"><img src="../../../_css/wechat-2.png" style="float:left; width:200px" /></a></div>
	</div>
</div></div>

<div id="c_outer"><div id="c_inner">
	<div class="kneenav">
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/revise/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="revise">修改这个计划</ul></a>
		<div></div>
		<ul class="remove" onclick="removego(<?php echo $_GET['mygo'] ?>)">删除这个计划</ul>
		<div></div>
	</div>
</div></div>

<?php require("../../../_footer.php"); ?>

<!--<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div id="mygo-container"><?php require("_mygo.php") ?></div>
		<div id="rankgos-container">
			<div class="cap">与我类似的旅行计划</div>
			
			<div class="loadgos" onclick='loadrankgos(<?php echo $_GET['mygo'] ?>)'>加载更多……</div> 
		</div>	
	</div>

	<div id="right">
		<div id="myslips-container">
			<div class="slips">
				<div class="slips_top">纸条板</div>
				<div class="slips_spots spots-wrapper">
					<?php for ($i=0; $i<5; $i++) { $myspotsql= "SELECT * FROM spots WHERE id= '".$mygorow["spot_$i"]."';"; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql)); if ($mygorow["spot_$i"]!=0) { echo "<li>".$myspotrow['spot']."</li>"; } } ?>
					<li class="btn" onClick="nextslip()">更早的纸条</li>
					<li class="btn" onClick="firstslip()">最新的纸条</li>
				</div>
				<div class="slips_wrapper"></div>
				<form action="-addslip.php?mygo=<?php echo $_GET['mygo'] ?>" method="post" onsubmit="return checktext()">
					<div class="slips_add">
						<input type="hidden" name="mygo" value="<?php echo $_GET['mygo'] ?>" />
						<input id="addslip" type="text" name="text" maxlength="70" style="float:left; margin:10px 0 10px 10px; width:210px"/>
						<label style="float:left; margin:10px 0 0 10px"><input style="width:45px" type="submit" value="留纸条"/></label>
					</div>
				</form>
			</div>
		</div>
	</div>
</div></div>-->



