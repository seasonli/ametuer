<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?>

<script>
function checkcreatego() {
	spot0=$("#spot_0").val(); text0=$("#creatego_title").val(); var length0=text0.length; var text1=$("#creatego_text").val(); var length1=text1.length; var height=$(document).height();
	if (spot0==0) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你还没告诉我们目的地！"); return false; }
	else if (length0<5) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧（5个字以上的标题）"); return false; }
	else if (length1<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧（10个字以上的内容）"); return false; }	
}
/*spot提示/填充/增加/删除配套*/
$(function() { $("#readspot").val("最多可添加5个目的地"); $("#readspot").css("color","#999") })
$(function() { $("#readspot").focus(function() { value=$(this).val(); if (value=="最多可添加5个目的地") { $(this).val(""); $(this).css("color","#333") } }) })
$(function() { $("#readspot").blur(function() { value=$(this).val(); $(this).val("最多可添加5个目的地"); $(this).css("color","#999");$('#sugspot').fadeOut(300) }) })
function readspot(value) { if(value.length==0 || value=="最多可添加5个目的地") { $('#sugspot').fadeOut(300); }
	else { $.post("_ajax_sugspot.php", {spot:value}, function(data) {
		if(data.length>0) { $('#sugspot').fadeIn(300); $('#sugspot').html(data) } }) } }		
function fillspot(value) { $("#readspot").val(""); $("#readspot").focus(); $('#fillspot').append(value); } /*readspot清空回来fillstart来了*/
function addspot(value) { 
	spot_0=$("#spot_0").val(); spot_1=$("#spot_1").val(); spot_2=$("#spot_2").val(); spot_3=$("#spot_3").val(); spot_4=$("#spot_4").val();
if(value==spot_0 || value==spot_1 || value==spot_2 || value==spot_3 || value==spot_4) { height=$(document).height(); $("#fillspot li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你好像添加过这个地点了") } else if (spot_0==0) {spot_0=value} else if (spot_1==0) {spot_1=value} else if (spot_2==0) {spot_2=value} else if (spot_3==0) {spot_3=value} else if (spot_4==0) {spot_4=value} else { height=$(document).height(); $("#fillspot li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("最多只允许添加5个目的地") }
	$("#spot_0").val(spot_0); $("#spot_1").val(spot_1); $("#spot_2").val(spot_2); $("#spot_3").val(spot_3); $("#spot_4").val(spot_4); 	
	} /*spot赋值*/
$(function() {
	$("#readspot").keydown(function(event) {
		if(event.which==13) { value=$("#spacespot").val(); /*当只有一个匹配时有个hiddeninput*/
			if (value>0) {
				$.post("_ajax_spacespot.php", {spot:value}, function(data) { 
					$("#readspot").val(""); setTimeout("$('#sugspot').fadeOut(300)", 50); $("#fillspot").append(data); /*readstart清空拜拜fillstart来了，不知道为什么要晚点blur*/
					var spot_0=$("#spot_0").val(); var spot_1=$("#spot_1").val(); var spot_2=$("#spot_2").val(); var spot_3=$("#spot_3").val(); var spot_4=$("#spot_4").val();
					if(value==spot_0 || value==spot_1 || value==spot_2 || value==spot_3 || value==spot_4) { height=$(document).height(); $("#fillspot li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你好像添加过这个地点了"); } else if (spot_0==0) {spot_0=value} else if (spot_1==0) {spot_1=value} else if (spot_2==0) {spot_2=value} else if (spot_3==0) {spot_3=value} else if (spot_4==0) {spot_4=value} else { height=$(document).height(); $("#fillspot li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("最多只允许添加5个目的地") }				
					$("#spot_0").val(spot_0); $("#spot_1").val(spot_1); $("#spot_2").val(spot_2); $("#spot_3").val(spot_3); $("#spot_4").val(spot_4);			
					$("#spacespot").val("0"); /*hiddeninput要清空*/ }) } } }) })
function removespot(value) {
	$("#readspot").focus();
	var spot_0=$("#spot_0").val(); var spot_1=$("#spot_1").val(); var spot_2=$("#spot_2").val(); var spot_3=$("#spot_3").val(); var spot_4=$("#spot_4").val();
	if (spot_0==value) { spot_0=spot_1; spot_1=spot_2; spot_2=spot_3; spot_3=spot_4; spot_4=0; } else if (spot_1==value) { spot_1=spot_2; spot_2=spot_3; spot_3=spot_4; spot_4=0; } else if (spot_2==value) { spot_2=spot_3; spot_3=spot_4; spot_4=0; } else if (spot_3==value) { spot_3=spot_4; spot_4=0; } else { spot_4=0; }
	$("#spot_0").val(spot_0); $("#spot_1").val(spot_1); $("#spot_2").val(spot_2); $("#spot_3").val(spot_3); $("#spot_4").val(spot_4);
}
/*start提示/填充/增加/删除配套*/
$(function() { $("#readstart").val("你的出发地"); $("#readstart").css("color","#999") })
$(function() { $("#readstart").focus(function() { value=$(this).val(); if (value=="你的出发地") { $(this).val(""); $(this).css("color","#333"); $("#start").val("0"); $("#fillstart").html(""); } }) })
$(function() { $("#readstart").blur(function() { value=$(this).val(); $(this).val("你的出发地"); $(this).css("color","#999");$('#sugstart').fadeOut(300) }) })
function readstart(value) { if(value.length==0  || value=="你的出发地") { $('#sugstart').fadeOut(300);}
	else { $.post("_ajax_sugstart.php", {spot: value}, function(data) {
		if(data.length>0) { $('#sugstart').fadeIn(300); $('#sugstart').html(data) } }) } }
function fillstart(value) { $("#readstart").val(""); $("#readstart").blur(); $('#fillstart').html(value); } /*readstart清空拜拜fillstart来了*/
function addstart(value) { $("#start").val(value); } /*start赋值*/
$(function() {
	$("#readstart").keydown(function(event) {
		if(event.which==13) { value=$("#spacestart").val(); /*当只有一个匹配时有个hiddeninput*/
			if (value>0) {
				$.post("_ajax_spacestart.php", {start:value}, function(data) { 	
					$("#readstart").val(""); setTimeout("$('#readstart').blur()", 50); $("#fillstart").html(data); /*readstart清空拜拜fillstart来了，不知道为什么要晚点blur*/
					$("#start").val(value); /*start赋值*/ 					
					$("#spacestart").val("0"); /*hiddeninput要清空*/ }) } } }) })
function removestart(value) { $("#readstart").focus(); $("#start").val("0"); }

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

<title>更远网：新的旅行计划</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<em>新的旅行计划&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="calendar_date"></span></em>
</div></div>

<div id="dw_outer"><div id="dw_inner" >
	<div id="creatego-container">
		<?php $_SESSION['TMP_YEAR']=date("Y"); $_SESSION['TMP_MONTH']=date("m"); ?>
		<div id="choosedate">
			<div id="calendar"><div id="calendar-wrapper"></div></div>
		</div>	
		<div id="creatego">
			<div style="float:left; width:60px; line-height:40px">出发地</div>
			<div id="creatego_start" class="spots-wrapper">
				<div id="fillstart" class="fillspot"></div>
				<input id="readstart" type="text" maxlength="10" oninput="readstart(this.value)" onpropertychange="readstart(this.value)" />
				<div id="sugstart" class="sugspot"></div>
			</div>
			<div style="float:left; margin:20px 0 0 0; width:60px; line-height:40px">目的地</div>
			<div id="creatego_spot" class="spots-wrapper">
				<div id="fillspot" class="fillspot"></div>
				<div id="readspot-container">
					<input id="readspot" type="text" maxlength="10" oninput="readspot(this.value)" onpropertychange="readspot(this.value)" />
					<div id="sugspot" class="sugspot"></div>
				</div>
			</div>
			<form action="-creatego.php" method="post" onsubmit='return checkcreatego()'>			
				<input id="spot_0" name="spot_0" value="0" type="hidden" />
				<input id="spot_1" name="spot_1" value="0" type="hidden" />
				<input id="spot_2" name="spot_2" value="0" type="hidden" />
				<input id="spot_3" name="spot_3" value="0" type="hidden" />
				<input id="spot_4" name="spot_4" value="0" type="hidden" />
				<input id="start" name="start" value="0" type="hidden" />
				<input id="startday" name="startday" value="0" type="hidden" />
				<input id="startdays" name="startdays" value="0" type="hidden" />			
				<div style="float:left; margin:20px 0 0 0; width:60px; line-height:30px">标题</div><input id="creatego_title" name="title" type="text" maxlength="30" />
				<div style="float:left; margin:20px 0 0 0; width:60px; line-height:30px">内容</div><textarea id="creatego_text" name="text"></textarea>
				<label class="green" style="float:right; margin:10px 0 0 0"><input type="submit" class="green" value="确 定" /></label>
			</form>	
		</div>
	</div>
</div></div>

<?php require("../../_footer.php"); ?>