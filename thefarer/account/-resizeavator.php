<?php require("../_config.php"); require("../verify/_verify.php"); 

$x1=$_POST['x1']; $y1=$_POST['y1']; $x2=$_POST['x2']; $y2=$_POST['y2']; $w=$_POST['w']; $h=$_POST['h'];

$datetime=date("YmdHis");
$imageext=strtolower(end(explode(".",$_POST['image']))); // 截取后缀

$tmpdir="../tmp/thumb".$_SESSION['ID'].$datetime.".".$imageext; // 临时目录
	
$thumb=imagecreatetruecolor($w,$h);	
if ($imageext==jpg or $imageext==jpeg) {
	$source=imagecreatefromjpeg($_POST['image']);
	imagecopyresampled($thumb,$source,0,0,$x1,$y1,$w,$h,$w,$h); 
	imagejpeg($thumb,$tmpdir,100); 
	imagedestroy($thumb);
}
else if ($imageext==bmp) {
	$source=imagecreatefrombmp($_POST['image']);
	imagecopyresampled($thumb,$source,0,0,$x1,$y1,$w,$h,$w,$h);
	imagebmp($thumb,$tmpdir,100);
	imagedestroy($thumb);
}
else if ($imageext==png) {
	$source=imagecreatefrompng($_POST['image']);
	imagecopyresampled($thumb,$source,0,0,$x1,$y1,$w,$h,$w,$h);
	imagepng($thumb,$tmpdir);
	imagedestroy($thumb);
}

$imagedir="/thumb/".$datetime.$_SESSION['ID'].".".$imageext; // 上传目录

$myusersql= "SELECT * FROM users WHERE id= '".$_SESSION['ID']."'"; $myuserrow=mysql_fetch_assoc(mysql_query($myusersql));
$oldimagedir=end(explode("/", $myuserrow['avator_thumb'])); // 旧上传目录

require("../_class/upyun.class.php");
$upyun = new UpYun('avator', 'user', 'USERUPYUN0421715YNWA', UpYun::ED_AUTO); // 连接upyun

$opts = array(
	UpYun::X_GMKERL_TYPE => 'square', // 缩略图类型
	UpYun::X_GMKERL_VALUE => 80, // 缩略图大小
	UpYun::X_GMKERL_QUALITY => 95, // 缩略图压缩质量
	UpYun::X_GMKERL_UNSHARP => True // 是否进行锐化处理
);
$fh = fopen($tmpdir, 'rb');
$rsp = $upyun->writeFile($imagedir, $fh, True, $opts);   // 上传图片
fclose($fh);

unlink($tmpdir); // 擦除临时目录

$imagedir="http://avator.thefarer.com".$imagedir;
mysql_query("UPDATE users SET avator_thumb = '".$imagedir."' WHERE id= '".$_SESSION['ID']."' ");

$_SESSION['AVATOR']=$imagedir; // 更新会话

if ($oldimagedir!="defaultavator.jpg") { $upyun->delete("/thumb/".$oldimagedir); } // 删除旧

header("Location:../account/");
?>