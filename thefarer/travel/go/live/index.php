<?php require("../../../_config.php"); require("../../../_header.php"); require("../../../verify/_verifygo.php"); ?>

<script type="text/javascript">
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
	$("#photoNeverUploaded").show(); $("#photoEverUploaded").hide(); $("#photoEverUploaded").html(""); $("#photoEverUploadedUrl").html("");
}
function checklive() {
	var height=$(document).height();
	var text=$("form:last textarea").val();
	var photo=$("#photoEverUploadedUrl").html()
	if (text.length<10 && photo.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你至少要贴上一张照片或是一段文字"); return false; }
	else {return true;}
}
</script>

<?php 
$onegosql= "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; $onegorow=mysql_fetch_assoc(mysql_query($onegosql));
$oneusersql= "SELECT * FROM users WHERE id = '".$onegorow['users_id']."' "; $oneuserrow= mysql_fetch_assoc(mysql_query($oneusersql));
?>

<title>更远网：<?php echo $onegorow['title'] ?></title>

<?php require("../../../_a.php"); require("../../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<div class="necknav">
		<a href="../<?php echo $_GET['go'] ?>"><ul class="plan">旅行计划</ul></a>
		<a href="../talk/<?php echo $_GET['go'] ?>"><ul class="talk">讨论</ul></a>
		<a href=""><ul class="booklet on">旅行手札</ul></a>
	</div>
	<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
		<div class="shouldernav">
			<a href="../../mygos/"><ul class="menu">我的其他计划</ul></a>
		</div>
	<?php } else { ?>
		<div class="shouldernav">
			<?php $marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$onegorow['id']."'"; $markrow=mysql_fetch_assoc(mysql_query($marksql)); ?>
			<ul id="<?php echo $onegorow['id'] ?>" class="love love<?php echo $onegorow['id']; if ($markrow['status_love']==1) {echo " on";} ?>" onClick="lovego(this.id)">关注这条计划</ul>
			<a href="<?php echo $config_basedir ?>mail/write/?receiver=<?php echo $oneuserrow['id'] ?>"><ul class="write">写信给Ta</ul></a>
		</div>
	<?php } ?>
</div></div>

<div id="dw_outer">
	<?php $onegosql= "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; $onegorow=mysql_fetch_assoc(mysql_query($onegosql)); ?>
	<div class="onegolives-container">
		<div class="onegolives">
				<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?><div class="onegolive add"><?php require("_addlive.php"); ?></div><?php } ?>
				<?php for ($i=0; $i<$i+1; $i++) {
					$mylivesql= "SELECT * FROM gos_lives WHERE gos_id= '".$_GET['go']."' AND status!=-1 order by id LIMIT $i,1"; $myliverow=mysql_fetch_assoc(mysql_query($mylivesql));
					if (empty($myliverow)) { break; }
					$spotsql= "SELECT * FROM spots WHERE id= '".$myliverow["spot"]."' "; $spotrow= mysql_fetch_assoc(mysql_query($spotsql));
					echo "<div class='onegolive'>";		
						echo "<div class='onegolive_date'>".substr($myliverow['datetime'],0,16)."</div>";
						if ($myliverow['image']!=null) { echo "<div class='onegolive_img'><img src='".$myliverow['image']."' /></div>"; }
						if ($myliverow['text']!=null) { echo "<div class='onegolive_text'>".nl2br($myliverow['text'])."</div>"; }
					echo "</div>";
				} ?>
		</div>	
	</div>
</div>

<div id="c_outer"><div id="c_inner">
	<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
		<div class="kneenav">
			<div></div>
			<a href="../revise/?mygo=<?php echo $_GET['go'] ?>"><ul class="revise">修改这个计划</ul></a>
			<div></div>
			<ul class="remove" onclick="removego(<?php echo $_GET['go'] ?>)">删除这个计划</ul>
			<div></div>
		</div>
	<?php } ?>
</div></div>

<?php require("../../../_footer.php"); ?>