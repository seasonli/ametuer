
<?php
$form_api_secret = '27/2C+Z2HgSRY+LM/req/6LpOok='; /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）		
$bucket = 'imagea'; /// 空间名
$options = array();
$options['bucket'] = $bucket; /// 空间名
$options['expiration'] = time()+600; /// 授权过期时间
$options['save-key']="/{year}{mon}{day}{hour}{min}{sec}".$_SESSION['ID']; /// 文件名生成格式，请参阅 API 文档
$options['allow-file-type'] = 'jpg,jpeg,bmp,png,gif'; /// 控制文件上传的类型，可选
$options['x-gmkerl-type'] = 'fix_max'; 
$options['x-gmkerl-value'] = '480'; 
$options['x-gmkerl-quality'] = '95'; 
$options['return-url'] = $config_basedir."travel/go/live/_iframe_returnUpload.php"; /// 页面跳转型回调地址				
$policy = base64_encode(json_encode($options));
$sign = md5($policy.'&'.$form_api_secret); /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）
?>
<div id="photoNeverUploaded">
	<iframe name="uploadIframe" id="uploadIframe" style="display:none"></iframe>
	<form action="http://v0.api.upyun.com/<?php echo $bucket?>/" onsubmit="return checkfile()" method="post" target="uploadIframe" enctype="Multipart/form-data">
		<input type="hidden" name="policy" value="<?php echo $policy?>">
		<input type="hidden" name="signature" value="<?php echo $sign?>">
		<label class="file" style="float:left; margin:20px 0 0 65px"><input onChange="autoUpload()" onpropertychange="autoUpload()" type="file" name="file" id="file"></label>
		<input id="uploadPhoto" type="submit" value="上传" style="display:none" />
	</form>
</div>
<div id="photoEverUploaded"></div>
<form action="-addlive.php" method="post">			
	<textarea name="text" style="float:left; width:224px; height:50px; border:0; border-top:1px solid #ddd; border-bottom:1px solid #ddd"></textarea>
	<input type="hidden" name="mygo" value="<?php echo $_GET['go'] ?>" />
	<div id="photoEverUploadedUrl" ></div>
	<input type="hidden" id="spot" name="spot" value="0" />
	<label class="green" style="float:left; margin:5px 0 0 75px"><input type="submit" class="green" onclick="return checklive()" value="加一条"></label>
</form>
