<?php require("../_config.php"); require("../verify/_verify.php"); 

$x1=$_POST['x1']; $y1=$_POST['y1']; $x2=$_POST['x2']; $y2=$_POST['y2']; $w=$_POST['w']; $h=$_POST['h'];

$datetime=date("YmdHis");
$imageext=strtolower(end(explode(".",$_POST['image']))); // ��ȡ��׺

$tmpdir="../tmp/thumb".$_SESSION['ID'].$datetime.".".$imageext; // ��ʱĿ¼
	
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

$imagedir="/thumb/".$datetime.$_SESSION['ID'].".".$imageext; // �ϴ�Ŀ¼

$myusersql= "SELECT * FROM users WHERE id= '".$_SESSION['ID']."'"; $myuserrow=mysql_fetch_assoc(mysql_query($myusersql));
$oldimagedir=end(explode("/", $myuserrow['avator_thumb'])); // ���ϴ�Ŀ¼

require("../_class/upyun.class.php");
$upyun = new UpYun('avator', 'user', 'USERUPYUN0421715YNWA', UpYun::ED_AUTO); // ����upyun

$opts = array(
	UpYun::X_GMKERL_TYPE => 'square', // ����ͼ����
	UpYun::X_GMKERL_VALUE => 80, // ����ͼ��С
	UpYun::X_GMKERL_QUALITY => 95, // ����ͼѹ������
	UpYun::X_GMKERL_UNSHARP => True // �Ƿ�����񻯴���
);
$fh = fopen($tmpdir, 'rb');
$rsp = $upyun->writeFile($imagedir, $fh, True, $opts);   // �ϴ�ͼƬ
fclose($fh);

unlink($tmpdir); // ������ʱĿ¼

$imagedir="http://avator.thefarer.com".$imagedir;
mysql_query("UPDATE users SET avator_thumb = '".$imagedir."' WHERE id= '".$_SESSION['ID']."' ");

$_SESSION['AVATOR']=$imagedir; // ���»Ự

if ($oldimagedir!="defaultavator.jpg") { $upyun->delete("/thumb/".$oldimagedir); } // ɾ����

header("Location:../account/");
?>