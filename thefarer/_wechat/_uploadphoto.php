<?php require("../_config.php"); ?>

<?php
echo "not now";					
$datetime=date("YmdHis");
$tmpphoto="../tmp/w_".$datetime.$_GET['go'];
ob_start(); readfile($_GET['photo']); $img_data=ob_get_contents(); ob_end_clean(); $size=strlen($img_data); $local_file=fopen($tmpphoto, 'a'); fwrite($local_file, $img_data); fclose($local_file);				
$uploadphoto="/w_".$datetime.$_GET['go']; // 上传目录
require("../_class/upyun.class.php");
$upyun=new UpYun('imagea', 'user', 'USERUPYUN0421715YNWA', UpYun::ED_AUTO); // 连接upyun					
$opts=array(UpYun::X_GMKERL_TYPE => 'fix_max', UpYun::X_GMKERL_VALUE => 480, UpYun::X_GMKERL_QUALITY => 95, UpYun::X_GMKERL_UNSHARP => True);
$fh=fopen($tmpphoto,"rb");
$rsp=$upyun->writeFile($uploadphoto, $fh, True, $opts);   // 上传图片
fclose($fh);
unlink($tmpphoto);
$uploadphoto="http://imagea.thefarer.com".$uploadphoto;
mysql_query("INSERT INTO gos_lives (users_id, gos_id, image, datetime, status_wechat) VALUES ('".$_GET['my']."', '".$_GET['go']."', '".$uploadphoto."', '".$datetime."', 1)");
echo "<br/>yeah baby";
?>