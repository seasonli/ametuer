<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); require("../../verify/_verifymygo.php") ?>
<script>

$(function() { $("#addslip").val("写一张纸条"); $("#addslip").css("color","#999") })
$(function() { $("#addslip").focus(function() { var value=$(this).val(); if (value=="写一张纸条") { $(this).val(""); $(this).css("color","#333") } }) })
$(function() { $("#addslip").blur(function() { var value=$(this).val(); if (value=="") { $(this).val("写一张纸条"); $(this).css("color","#999") } }) })	

function firstslip() { $.post("_ajax_loadfirstslips.php?mygo=<?php echo $_GET['mygo']; ?>", function(data) { if(data.length<10){$(".slips_wrapper").html("<div class='slip f-grey'>这块纸条板上暂时没有纸条</div>")} else {$(".slips_wrapper").html(data)} }) }
function nextslip() { $.post("_ajax_loadnextslips.php?mygo=<?php echo $_GET['mygo']; ?>", function(data) { if(data.length<10){$(".slips_wrapper").html("<div class='slip f-grey'>没有更多了</div>")} else {$(".slips_wrapper").html(data)} }) }
$(function() { firstslip(); })
	
function loadrankgos(value) {
	$.post("_ajax_loadrankgos.php?mygo="+value, function(data) {
		if (data.length<5) { $(".loadgos").html("暂时没有更多了"); $(".loadgos").css("border-top","2px solid #f6f6f6"); }
		else { $(".loadgos").before(data) }
	})
}

function removego(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='-removego.php' method='post'><input name='mygo' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	
function removelive(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='-removelive.php' method='post'><input name='mylive' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	
</script>

<title>更远网：我的旅行计划</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<div class="necknav">
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="plan on">我的计划</ul></a>
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/talk/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="talk">讨论</ul></a>
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygo/live/?mygo=<?php echo $_GET['mygo'] ?>"><ul class="booklet">旅行手札</ul></a>
		<div></div>
	</div>
	<div class="shouldernav">		
		<div></div>
		<a href="<?php echo $config_basedir ?>go/mygos/"><ul class="menu">我的其他计划</ul></a>
	</div>	
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div id="left">	
		<?php $mygosql= "SELECT * FROM gos WHERE id= '".$_GET['mygo']."'"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); ?>
		<div class="onego">
			<div class="onego_spots">
				<?php for ($i=0; $i<5; $i++) {
					$myspotsql= "SELECT * FROM spots WHERE id= '".$mygorow["spot_$i"]."' "; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql));
					if ($mygorow["spot_$i"]!=0) { echo "#".$myspotrow['spot']."#&nbsp&nbsp&nbsp"; }
				} ?>
			</div>
			<div class="onego_avator"><img src="<?php echo $_SESSION['AVATOR'] ?>" /></div>	
			<div class="onego_title"><?php echo $mygorow['title'] ?></div>
			<div class="onego_start">
				<?php if ($mygorow['startday']!=0 or $mygorow["start"]!=0 ) {
					if ($mygorow['startday']!=0) { echo date("Y-m-d", $mygorow['startday']); } if ($mygorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $mygorow['startdays'])." 间";} 
					if ($mygorow["start"]!=0) { $spotsql= "SELECT * FROM spots WHERE id= '".$mygorow["start"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
						echo "从".$spotrow['spot']; }
					echo "出发 | "; } 
				$today=date("Y-m-d"); $day=substr($mygorow['datetime'],0,10); if($day==$today) {echo "今天记下的";} else{echo $day."记下的";} ?>
			</div>
			<div class="onego_text content"><?php echo nl2br($mygorow['text']) ?></div>	
		</div>
	</div>
	<div id="right">
		<div class="sidegos-container">
			<div class="sidegos-top">Ta们也去……</div>
			<?php $_SESSION['TMP_LOADRANKGO_96']=999999999; $_SESSION['TMP_LOADRANKTO_96']=129; $_SESSION['TMP_LOADRANKTIME_96']=0; 
			$_SESSION['TMP_LOADRANKGO_0']=999999999; $_SESSION['TMP_LOADRANKTO_0']=129; $_SESSION['TMP_LOADRANKTIME_0']=0; require("_ajax_loadrankgos.php"); ?>
		</div>
		<div class="stepnav">
			<ul class="last"></ul>
			<ul class="next"></ul>
		</div>
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

<!--<div id="d_outer"><div id="d_inner">

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

<?php require("../../_footer.php"); ?>

