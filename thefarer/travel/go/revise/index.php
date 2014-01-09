<?php require("../../../_config.php"); require("../../../_header.php"); require("../../../verify/_verify.php"); require("../../../verify/_verifymygo.php") ?>

<script>
$(function() {
	$.post("_ajax_calendar.php", function(data) { 
		$("#calendar-wrapper").html(data);
		startday=$("#startday").val(); startdays=$("#startdays").val();
		$("#calendar_container li").removeClass('on');
		if (startdays==0) { $("#"+startday).addClass('on'); }
		else {
			times=(parseFloat(startdays)-parseFloat(startday))/86400;
			abstimes=Math.abs(times);
			ii=parseFloat(startday);
			for (i=0;i<=abstimes;i++) {
				$("#"+ii).addClass('on');
				ii=ii+86400; }	} }) })
</script>

<title>更远网：修改我的旅行计划</title>
<?php require("../../../_a.php"); require("../../../_b.php"); ?>
<?php $onegosql= "SELECT * FROM gos WHERE id= '".$_GET['mygo']."' "; $onegorow=mysql_fetch_assoc(mysql_query($onegosql)); ?>

<div id="b_outer"><div id="b_inner">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<em>修改我的旅行计划：<?php echo $onegorow['title'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="calendar_date"><?php if ($onegorow['startday']!=0) { echo date("Y-m-d", $onegorow['startday']); } if ($onegorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $onegorow['startdays']);} ?></span></em>
</div></div>

<div id="dw_outer"><div id="dw_inner" >
	<div id="creatego-container">
		<?php $_SESSION['TMP_YEAR']=date("Y"); $_SESSION['TMP_MONTH']=date("m"); ?>
		<div id="choosedate">
			<div id="calendar"><div id="calendar-wrapper"></div></div>
		</div>	
		<div id="creatego">
			<div style="float:left; width:60px; line-height:40px">出发地</div>
			<div id="creatego_start" class="spots-wrapper" style="background:#f3f3f3">
				<div id="fillstart" class="fillspot">
					<?php $myspotsql= "SELECT * FROM spots WHERE id= '".$onegorow["start"]."' "; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql)); echo "<li>".$myspotrow['spot']."</li>"; ?>
				</div>
				<input id="readstart" type="text" maxlength="10" oninput="readstart(this.value)" onpropertychange="readstart(this.value)" style="background:#f3f3f3; color:#666" value="出发地不能更改" />
				<div id="sugstart" class="sugspot"></div>
			</div>
			<div style="float:left; margin:20px 0 0 0; width:60px; line-height:40px">目的地</div>
			<div id="creatego_spot" class="spots-wrapper" style="background:#f3f3f3">
				<div id="fillspot" class="fillspot">
					<?php for ($i=0; $i<5; $i++) {
						$myspotsql= "SELECT * FROM spots WHERE id= '".$onegorow["spot_$i"]."' "; $myspotrow= mysql_fetch_assoc(mysql_query($myspotsql));
						if ($onegorow["spot_$i"]!=0) { echo "<li>".$myspotrow['spot']."</li>"; }
					} ?>
				</div>
				<div id="readspot-container">
					<input id="readspot" type="text" maxlength="10" oninput="readspot(this.value)" onpropertychange="readspot(this.value)" style="background:#f3f3f3; color:#666" value="目的地不能更改" />
					<div id="sugspot" class="sugspot"></div>
				</div>
			</div>
			<form action="-revisego.php" method="post" onsubmit='return checkcreatego()'>
				<input name="mygo" type="hidden" value="<?php echo $_GET['mygo']?>" />
				<input id="startday" name="startday" value="<?php echo $onegorow['startday'] ?>" type="hidden" alt="<?php echo date("Y-m-d",$onegorow[startday]) ?>" />
				<input id="startdays" name="startdays" value="<?php echo $onegorow['startdays'] ?>" type="hidden" alt="<?php echo date("Y-m-d",$onegorow[startdays]) ?>" />
				<div style="float:left; margin:20px 0 0 0; width:60px; line-height:30px">标题</div><input id="creatego_title" name="title" type="text" maxlength="30" value="<?php echo $onegorow[title] ?>" />
				<div style="float:left; margin:20px 0 0 0; width:60px; line-height:30px">内容</div><textarea id="creatego_text" name="text"><?php echo $onegorow[text] ?></textarea>
				<label style="float:right; margin:10px 0 0 60px"><input type="submit" value="确定" /></label>
			</form>
		</div>
	</div>
</div></div>

<?php require("../../../_footer.php"); ?>