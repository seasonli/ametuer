<?php require("../../_config.php"); require("../../_header.php"); 

require("../../_class/class.phpmailer.php");
	
$registerverify=md5(rand().date("Y-m-d H:i:s"));
$password=sha1($_POST['password']);	
$repassword=sha1($_POST['repassword']);		
	
$mail = new PHPMailer();
$mail->SMTPDebug = 1;
$mail->IsSMTP();	 // send via SMTP 
$mail->SMTPAuth = true;   // turn on SMTP authentication  
$mail->SMTPSecure = "ssl";
$mail->Host = "smtp.ym.163.com";	// SMTP servers
$mail->Port = 465; 
$mail->Username = "admin@thefarer.com"; // SMTP username  
$mail->Password = "52661622"; // SMTP password
$mail->From = "admin@thefarer.com";  // 发件人 
$mail->FromName =  "更远";  // 发件人 
   
$mail->CharSet = "utf-8";   // 这里指定字符集！ 
$mail->Encoding = "base64";
$mail->AddAddress($_POST['email'], $_POST['name']);  // 收件人邮箱和姓名
$mail->IsHTML(true);  // send as HTML

// 邮件主题  
$mail->Subject = "来自更远的注册激活邮件";
// 邮件内容 
$mail->Body = "<html>感谢你注册更远，愿你的旅行充满精彩和更多可能。<br/><br/>点击下边的地址以完成注册过程：<br/><br/><a href='http://www.thefarer.com/account/register/verify/?k=".$registerverify."'>http://www.thefarer.com/account/register/verify/?k=".$registerverify."<a></html>";   
$mail->AltBody ="text/html";

$myusersql= "SELECT * FROM users WHERE email= '".$_POST['email']."' " ; $myusernumrow=mysql_num_rows(mysql_query($myusersql));
if ($myusernumrow==0 and $password&&$repassword) {
	mysql_query("INSERT INTO users (email, password, name, registerverify) VALUES ('".$_POST['email']."', '".$password."', '".$_POST['name']."', '".$registerverify."')");
	// mysql_query("UPDATE users_registercodes SET status=-1 WHERE registercode= '".$_POST['registercode']."' ");	
	if (!$mail->Send()) { 
		// echo "邮件发送有误 <p>"; echo "邮件错误信息: " . $mail->ErrorInfo; 
		echo "-2";
	}
	else { 
		mysql_query("UPDATE users SET status_email=1 WHERE email= '".$_POST['email']."' "); // 确认邮件是否发出
		echo "邮件已经发送到你的邮箱，赶快去验证吧！"; 
	}
}
else {
	echo "-1";	
}
?>