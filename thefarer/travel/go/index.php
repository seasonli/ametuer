<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verifygo.php"); ?>

<script type="text/javascript">
function loadfirstslip() { $.post("_ajax_loadfirstslips.php?go=<?php echo $_GET['go']; ?>", function(data) { if(data.length<10){$("#slips-wrapper").html("<div class='slip blank'>这块纸条板上暂时没有纸条</div>")} else {$("#slips-wrapper").html(data)} }) }
function loadnextslip() { $.post("_ajax_loadnextslips.php?go=<?php echo $_GET['go']; ?>", function(data) { if(data.length<10){$("#slips-wrapper").html("<div class='slip blank'>没有更多了</div>")} else {$("#slips-wrapper").html(data)} }) }
$(function() { loadfirstslip(); })

function loadrankgos(value) {
	$.post("_ajax_loadrankgos.php?go="+value, function(data) {
		if (data.length<5) { $(".sidegos").html("<div style='float:left; width:300px; color:#666'>暂时没有更多了</div>"); $(".loadgos").css("border-top","2px solid #f6f6f6"); }
		else { $(".loadgos").before(data) } }) }

function atuser(value) {
	var user=$(".atuser"+value).val(); 
	$("textarea").val("@"+user+" "); 
	$("textarea").focus();	
}

function removegoreply(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除?<br/><br/><label style='float:left'><input type='button' value='确认' onclick='confirmremovegoreply("+value+"); closealert()'/></label>"); }
function confirmremovegoreply(value) { var height=$(document).height(); 
	$.post(config_basedir+"verify/_ajax_verify.php", function(data) {
		if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你可能还没有登录"); }	
		else {
			$.post("_ajax_removegoreply.php", {goreply:value}, function(data){
				if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你没有这个操作的权限，建议刷新页面，确认链接的来源"); }	
				else { $(".go_reply"+value).hide(); $("#alert_outer").delay(500).show(1); $("#alert_outer").height("0"); $("#alert").html("删除成功"); $("#alert_outer").delay(1000).hide(1); }
			})
		}
	})
}

function autoUpload() {
	$("#uploadPhoto").click();
}
function checkfile() { 
	var height=$(document).height();
	var file=$("form :file").val(); 
	var ext=file.substr(file.length-4,4).toLowerCase();
	if (ext!=".jpg" && ext!="jpeg" && ext!=".png" && ext!=".bmp" && ext!=".gif") { 
		$("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("请上传正确的相片"); 
		return false; } }
function changePhoto() { 
	$("#photoUnuploaded").show(); $("#photoUploaded").hide(); $("#photoUploaded").html(""); $("#photoUploadedUrl").html("");
}
function checklive() {
	var height=$(document).height();
	var text=$("textarea").val();
	var photo=$("#photoUploadedUrl").html()
	if (text.length<10 && photo.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你至少要贴上一张照片或是一段文字"); return false; }
	else {return true;}
}
</script>

<?php 
$onegosql = "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; 
$onegorow = $mysqli -> query($onegosql) -> fetch_assoc();
$oneusersql = "SELECT * FROM users WHERE id = '".$onegorow['users_id']."' "; 
$oneuserrow = $mysqli -> query($oneusersql) -> fetch_assoc();
?>

<title>更远网：<?php echo $onegorow['title'] ?></title>

<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="dw_outer">

</div>

<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div class="onego-container">
			<div class="onego">
				<div class="onego_spots">
					<?php for ($i=0; $i<5; $i++) {
						$onespotsql = "SELECT * FROM spots WHERE id= '".$onegorow["spot_$i"]."' ";
						$onespotrow = $mysqli -> query($onespotsql) -> fetch_assoc();
						if ($onegorow["spot_$i"]!=0) { echo "#".$onespotrow['spot']."#&nbsp&nbsp&nbsp"; }
				} ?></div>
				<div class="onego_avator"><img src="<?php echo $oneuserrow['avator_thumb'] ?>" /></div>	
				<div class="onego_title"><?php echo $oneuserrow['name']."：".$onegorow['title'] ?></div>
				<div class="onego_start">
					<?php if ($onegorow['startday']!=0 or $onegorow["start"]!=0 ) {
						if ($onegorow['startday']!=0) { echo date("Y-m-d", $onegorow['startday']); } if ($onegorow['startdays']!=0) { echo " ~ ".date("Y-m-d", $onegorow['startdays'])." 间";} 
						if ($onegorow["start"]!=0) { 
							$spotsql = "SELECT * FROM spots WHERE id= '".$onegorow["start"]."' "; 
							$spotrow = $mysqli -> query($spotsql) -> fetch_assoc();
							echo "从".$spotrow['spot']; }
						echo "出发 | "; } 
					$today=date("Y-m-d"); $day=substr($onegorow['datetime'],0,10); if($day==$today) {echo "今天记下的";} else{echo $day."记下的";} ?>
				</div>
				<div class="onego_text content"><?php echo nl2br($onegorow['text']) ?></div>	
			</div>
		</div>
		<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
			<div class="myslips-container">
				<div class="slips-top">纸条板</div>
				<div class="slips-instruction">你可以看到准备去
					<span class="f-sky">
						<?php for ($i=0; $i<5; $i++) {
							$onespotsql = "SELECT * FROM spots WHERE id= '".$onegorow["spot_$i"]."' "; 
							$onespotrow = $mysqli -> query($onespotsql) -> fetch_assoc();
							if ($onegorow["spot_$i"]!=0) { echo "#".$onespotrow['spot']."#&nbsp&nbsp&nbsp"; }
						} ?>						
					</span>
					的Farers所留下的纸条。同样的，你的纸条也会被他们所看到</div>
				<div class="slips">
					<div id="slips-wrapper"></div>
					<div class="slips_play">
						<ul class="home" onClick="loadfirstslip()"></ul>
						<ul class="next" onClick="loadnextslip()"></ul>
					</div>
					<div class="slips_input">
						<form action="-addslip.php?mygo=<?php echo $_GET['mygo'] ?>" method="post" onsubmit="return checktext()">				
							<input type="hidden" name="mygo" value="<?php echo $_GET['go'] ?>" />
							<input type="text" name="text" maxlength="70" style="float:left; margin:5px 0 10px 10px; width:360px"/>
							<label style="float:left; margin:5px 0 0 10px"><input type="submit" value="留纸条"/></label>	
						</form>
					</div>
				</div>				
			</div>
		<?php } ?>
		<div class="onegoreplies-container">
			<div class="onegoreplies-top">讨论</div>
			<div class="onegoreplies">
				<?php for ($k=0; $k<$k+1; $k++) {
					$goreplysql = "SELECT * FROM gos_replies WHERE gos_id= '".$_GET['go']."' AND status!=-1 order by id desc limit $k,1 "; 
					$goreplyrow = $mysqli -> query($goreplysql) -> fetch_assoc();
					if ($goreplyrow['id']==0) { break; }
					$usersql = "SELECT * FROM users WHERE id= '".$goreplyrow['users_id']."'"; 
					$userrow = $mysqli -> query($usersql) -> fetch_assoc(); ?>
					<div class="onegoreply go_reply<?php echo $goreplyrow['id'] ?>">		
						<div class="onegoreply_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
						<div class="onegoreply_name"><?php echo $userrow['name'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $goreplyrow['datetime'] ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php if ($_SESSION['ID']==$goreplyrow['users_id']) { ?><span onclick='removegoreply(this.id)' id="<?php echo $goreplyrow['id'] ?>">删除</span><?php } else { ?><span onclick="atuser(this.id)" id="<?php echo $goreplyrow['id'] ?>">回应</span><input type="hidden" class="atuser<?php echo $goreplyrow['id'] ?>" value="<?php echo $userrow['name'] ?>" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $config_basedir ?>mail/write/?receiver=<?php echo $userrow['id'] ?>"><span>写信</span></a><?php } ?></div>
						<div class="onegoreply_text"><?php echo $goreplyrow['text'] ?> </div>
					</div>	
				<?php } ?>
			</div>
		</div>		
		<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
			<div class="hosts-container">
				<?php
				$spotsql = "SELECT * FROM spots WHERE id='".$onegorow['spot_0']."' "; 
				$spotrow = $mysqli -> query($spotsql) -> fetch_assoc();
				for ($n=0; $n<$n+1; $n++) {
					$subspotrow = $mysqli -> query("SELECT * FROM spots WHERE areas_id='".$spotrow['areas_id']."' limit $n, 1") -> fetch_assoc();
					if ($subspotrow['id']==0) { break; }
					$shits[$n]=$subspotrow['id'];
					if ($n==0) { $shitscale=$shits[0]; }
					else { $shitscale=$shitscale.", ".$shits[$n]; }
				}
				$shitscale="(".$shitscale.")";
				for ($n=0; $n<5; $n++) {
					$nowdnasql= "SELECT * FROM dna_now WHERE status!=-1 AND spots_id in $shitscale ORDER BY RAND() DESC limit $n,1";
					$nowdnarow= $mysqli -> query($nowdnasql) -> fetch_assoc();
					if (empty($nowdnarow['id'])) { break; }
					$userrow = $mysqli -> query("SELECT * FROM users WHERE status!=-1 AND id= '".$nowdnarow['users_id']."' ") -> fetch_assoc();
					if ($n==0) { echo "<div class='hosts-top'>他们来自".$spotrow['spot']."，点击@他们参与讨论</div>"; } ?>
					<img src="<?php echo $userrow['avator_thumb'] ?>" title="<?php echo $userrow['name'] ?>" onclick="$('textarea').val('@'+this.title+' '); $('textarea').focus()"  />
				<?php } ?>
			</div>
		<?php } ?>		
		<div class="onegoinput-container">
			<div class="onegoinput">
				<form action="-addgoreply.php" method="post" onsubmit="return checktextarea()">
					<input type="hidden" name="go" value="<?php echo $_GET['go'] ?>" />
					<textarea name="text"></textarea>
					<img src="<?php echo  $_SESSION['AVATOR'] ?>" />
					<input type="submit" class="green" value="回 应" />
				</form>	
			</div>
		</div>
		<div class="onegolives-container">
			<div class="onegolives">
					<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?><div class="onegolive add"><?php require("_addlive.php"); ?></div><?php } ?>
					<?php for ($i=0; $i<$i+1; $i++) {
						$mylivesql = "SELECT * FROM gos_lives WHERE gos_id= '".$_GET['go']."' AND status!=-1 order by id DESC LIMIT $i,1"; 
						$myliverow = $mysqli -> query($mylivesql) -> fetch_assoc();
						if (empty($myliverow)) { break; }
						$spotsql= "SELECT * FROM spots WHERE id= '".$myliverow["spot"]."' "; 
						$spotrow= $mysqli -> query($spotsql) -> fetch_assoc();
						echo "<div class='onegolive'>";		
							echo "<div class='onegolive_date'>".substr($myliverow['datetime'],0,16)."</div>";
							if ($myliverow['image']!=null) { echo "<div class='onegolive_img'><img src='".$myliverow['image']."' /></div>"; }
							if ($myliverow['text']!=null) { echo "<div class='onegolive_text'>".nl2br($myliverow['text'])."</div>"; }
						echo "</div>";
					} ?>
			</div>	
		</div>		
	</div>
	<div id="right">
		<?php if ($_SESSION['ID']!=$onegorow['users_id']) { ?>
			<div class="iconnav">
				<?php $marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$onegorow['id']."'"; 
				$markrow = $mysqli -> query($marksql) -> fetch_assoc(); ?>
				<ul id="<?php echo $onegorow['id'] ?>" class="love love<?php echo $onegorow['id']; if ($markrow['status_love']==1) {echo " on";} ?>" onClick="lovego(this.id)">关注</ul>
				<a href="<?php echo $config_basedir ?>mail/write/?receiver=<?php echo $oneuserrow['id'] ?>"><ul class="write">写信</ul></a>
				<div class="clear"></div>
			</div>
		<?php } else { ?>
			<div class="shouldernav">
				<a href="<?php echo $config_basedir ?>travel/go/revise/?mygo=<?php echo $_GET['go'] ?>"><ul class="revise">修改这个计划</ul></a>
				<ul class="remove" onclick="removego(<?php echo $_GET['go'] ?>)">删除这个计划</ul>
			</div>
		<?php } ?>	
		<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
			<div class="sidegos-container">
				<div class="sidegos-top">Ta们也去……</div>
				<?php $_SESSION['TMP_LOADRANKGO_96']=999999999; $_SESSION['TMP_LOADRANKTO_96']=129; $_SESSION['TMP_LOADRANKTIME_96']=0; 
				$_SESSION['TMP_LOADRANKGO_0']=999999999; $_SESSION['TMP_LOADRANKTO_0']=129; $_SESSION['TMP_LOADRANKTIME_0']=0; ?>
				<div class="sidegos"><?php require("_ajax_loadrankgos.php"); ?></div>
			</div>
			<div class="stepnav">
				<ul class="next" onclick="loadrankgos(<?php echo $_GET['go'] ?>)"></ul>
				<ul class="last"></ul>
			</div>
		<?php } ?>
	</div>
	<div class="clear"></div>
</div></div>

<?php require("../../_footer.php"); ?>