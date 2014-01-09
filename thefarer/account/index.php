<?php require("../_config.php"); require("../_header.php"); require("../verify/_verify.php"); ?>
<script>
function checkfile() { 
	var height=$(document).height();
	var file=$("#file").val(); var ext = file.substr(file.length-4,4).toLowerCase();
	if (ext!=".jpg" && ext!="jpeg") { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("请上传JPG / JPEG格式的图片"); return false; }
} 
function checkresize() { 
	var height=$(document).height();
	var resize=$("#x1").val()+$("#x2").val()+$("#y1").val()+$("#y1").val()+$("#w").val()+$("#h").val();
	if (resize==0) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你还没有选择你的头像"); return false; }
} 
</script>
<?php $myusersql="SELECT * FROM users WHERE id = '".$_SESSION['ID']."' "; $myuserrow=mysql_fetch_assoc(mysql_query($myusersql)); 
function getWidth($image) { $size=getimagesize($image); $width=$size[0]; return $width; }
function getHeight($image) { $size=getimagesize($image); $height=$size[1]; return $height; }
$current_large_image_width = getWidth($myuserrow['avator']);
$current_large_image_height = getHeight($myuserrow['avator']);	 
?>

<script>
$(function() { $('#avator_orginal').imgAreaSelect({ aspectRatio:'1:1', handles: true,onSelectChange: postVal}); });
function postVal(img,selection) {
	var scaleX = 100 / (selection.width || 1); var scaleY = 100 / (selection.height || 1);
	$('#avator_orginal + div > img').css( {
		width: Math.round(scaleX * <?php echo $current_large_image_width;?>) + 'px', height: Math.round(scaleY * <?php echo $current_large_image_height;?>) + 'px',
		marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px', marginTop: '-' + Math.round(scaleY * selection.y1) + 'px' });
	$('#x1').val(selection.x1); $('#y1').val(selection.y1); $('#x2').val(selection.x2); $('#y2').val(selection.y2); $('#w').val(selection.width); $('#h').val(selection.height); }

function invite() {
	var height=$(document).height();
	$.post("_ajax_invite.php", function(data) {
		if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你好像已经申请了超过10个邀请码"); }
		else { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html(data); }
	}) 	
}
function invited() {
	var height=$(document).height();
	$.post("_ajax_invited.php", function(data) {
		$("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html(data);
	}) 	
}
</script>

<title>更远网：我的更远</title>

<?php require("../_a.php"); require("../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<em><?php echo $_SESSION['NAME'] ?></em>
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div id="left">
		<div id="account-container">
			<form action="-reviseaccount.php" method="post">
				<div style="float:left; line-height:30px; width:80px; ">我的名字</div>
				<div style="float:left; width:150px; "><input name="name" type="text" value="<?php echo $_SESSION['NAME'] ?>" maxlength="8" /></div>
				<div style="float:left; line-height:30px; width:350px; color:red">&nbsp;<?php if ($_GET['error']==nameoccupied) { ?>你的新名字可能和别人一样，换一个吧！<?php } ?></div>
				<div style="float:left; margin:20px 0 0 0; line-height:30px; width:80px; ">说些什么</div>
				<div style="float:left; margin:20px 0 0 0; width:500px"><textarea style="width:400px; height:120px" name="text"><?php echo $myuserrow['text']; ?></textarea></div>
				<label style="float:left; margin:10px 0 30px 80px"><input type="submit" value="修 改" /></label>		
			</form>
			<!--<?php require("_spots.php"); ?>-->
		</div>	
	</div>
	<div id="right">
		<div style="float:left; margin:30px 0 30px 0; width:300px;">
			<img style="float:left" id="avator_orginal" src="<?php echo $myuserrow['avator'] ?>" />
			<form method="post" action="-resizeavator.php" onsubmit="return checkresize()">
				<input type="hidden" name="x1" id="x1" value="" />
				<input type="hidden" name="y1" id="y1" value="" />
				<input type="hidden" name="x2" id="x2" value="" />
				<input type="hidden" name="y2" id="y2" value="" />
				<input type="hidden" name="w" id="w" value="" />
				<input type="hidden" name="h" id="h" value="" />
				<input type="hidden" name="image" value="<?php echo $myuserrow['avator'] ?>" />
				<div style="float:left; margin:10px 0 0 0; width:240px">在大图中按住鼠标并拖动出小方块，点击“更新头像”作为你的头像</div>
				<label style="float:left; margin:5px 0 0 0"><input type="submit" value="更新头像"/></label>
			</form>
			<div style="float:left; margin:20px 0 0 0; padding:5px 0 0 0; width:300px; border-top:1px solid #ddd">或是在本地上传全新的相片作为头像<br/>（JPG / JPEG格式，请保证图片小于1Mb）</div>
			<?php
			$form_api_secret = 'tiH3ZpsAMUox1DTojUDnZqpeNJw='; /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）		
			$bucket = 'avator'; /// 空间名
			$options = array();
			$options['bucket'] = $bucket; /// 空间名
			$options['expiration'] = time()+600; /// 授权过期时间
			$options['save-key'] = '/{year}{mon}{day}{hour}{min}{sec}{random}{.suffix}'; /// 文件名生成格式，请参阅 API 文档
			$options['allow-file-type'] = 'jpg,jpeg'; /// 控制文件上传的类型，可选
			$options['x-gmkerl-type'] = 'fix_max'; 
			$options['x-gmkerl-value'] = '240'; 
			$options['x-gmkerl-quality'] = '95'; 
			$options['return-url'] = $config_basedir.'account/-uploadavator.php'; /// 页面跳转型回调地址				
			$policy = base64_encode(json_encode($options));
			$sign = md5($policy.'&'.$form_api_secret); /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）
			?>
			<form action="http://v0.api.upyun.com/<?php echo $bucket?>/" onsubmit="return checkfile()" method="post" enctype="Multipart/form-data">
				<input type="hidden" name="policy" value="<?php echo $policy?>">
				<input type="hidden" name="signature" value="<?php echo $sign?>">
				<label class="file" style="float:left; margin:10px 0 0 0"><input type="file" name="file" id="file"></label>
				<label style="float:left; margin:10px 0 0 10px"><input type="submit" value="从本地上传" /></label>
			</form>					
		</div>
	</div>
</div></div>

<div id="c_outer"><div id="c_inner">
	<div class="kneenav">
		<a href="revisepassword/"><ul>修改密码</ul></a>
		<a href="login/-logout.php"><ul>注销登录</ul></a>
	</div>
</div></div>

<?php require("../_footer.php"); ?>