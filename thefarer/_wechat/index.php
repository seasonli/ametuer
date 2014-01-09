<?php
$config_basedir="http://www.thefarer.com/"; $config_basedir_m="http://m.thefarer.com/";
$dbhost = "www.thefarer.com"; $dbuser = "root"; $dbpassword = "TFMYSQL0421715YNWA"; $dbdatabase = "farer";
$db=mysql_connect($dbhost,$dbuser,$dbpassword); mysql_select_db($dbdatabase,$db);
?>

<?php
define("TOKEN", "tfweixin0421715YNWA"); //define your token
$wechatObj= new wechatCallbackapiTest();
$wechatObj->responseMsg();

class wechatCallbackapiTest {
	public function responseMsg() {		
		$postStr=$GLOBALS["HTTP_RAW_POST_DATA"]; //get post data, May be due to the different environments
		if (!empty($postStr)) { //extract post data
			$postObj=simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
			
			$fromUsername=$postObj->FromUserName; // 用户
			$toUsername=$postObj->ToUserName; // TheFarer.com
			$keyword=trim($postObj->Content);
			$photo=$postObj->PicUrl;
			$time=time();

			session_id(md5($fromUsername)); session_start();

			$datetime=date("Y-m-d H:i:s");
			$myusersql="SELECT * FROM users WHERE wechat='".$fromUsername."' AND status!=-1 AND status_wechat=1"; $myuserresult=mysql_query($myusersql); $myusernumrow=mysql_num_rows($myuserresult); $myuserrow=mysql_fetch_assoc($myuserresult);

			if ($myusernumrow==1) { // 已关联的情况
				if ($keyword=="0") { // 返回
					$content=$myuserrow['name']."，欢迎回到更远

你可以随时发送----------
@   查看未处理的提醒
#   查看我的旅行计划
0   退回到这里";
					$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				} // 返回
				else if ($keyword=="@") { //查看提醒
					$atsql= "SELECT * FROM gos_ats WHERE users_id= '".$myuserrow['id']."' AND status=2 "; $numatrow=mysql_num_rows(mysql_query($atsql));
					if($numatrow!=0) { // 有提醒
						$atsql= "SELECT * FROM gos_ats WHERE users_id= '".$myuserrow['id']."' AND status=2 ORDER BY ID DESC LIMIT 1"; $atrow= mysql_fetch_assoc(mysql_query($atsql)); 					
						$gosql= "SELECT * FROM gos WHERE id= '".$atrow['gos_id']."' "; $gorow=mysql_fetch_assoc(mysql_query($gosql));
						$usersql= "SELECT * FROM users WHERE id= '".$atrow['subusers_id']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql));
						$url="http://m.thefarer.com/go/go/?go=".$gorow['id'];
						$description="你有1条@来自 ".$userrow['name']."
---------
".mb_substr($gorow['text'],0,50,"utf-8")."……
	
	
---------
".$userrow['name']."：".$atrow['text']."
		
可以发送----------
[内容]   可快速回复并@Ta
@   继续查看其他的提醒
0   退出";
						$_SESSION['MENU']="@"; $_SESSION['GO']=$atrow['gos_id']; $_SESSION['USER']=$atrow['subusers_id'];
						$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>1</ArticleCount><Articles><item><Title><![CDATA[$title]]></Title><Description><![CDATA[$description]]></Description><PicUrl><![CDATA[$picurl]]></PicUrl><Url><![CDATA[$url]]></Url></item></Articles></xml>";
						mysql_query("UPDATE gos_ats set status=0 WHERE users_id='".$myuserrow['id']."' AND gos_id='".$gorow['id']."' "); // 清空at
					} // 有提醒
					else { // 没提醒
						$content=$myuserrow['name']."，你暂时没有未处理的提醒";							
						$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
						$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";						
					} // 没提醒			
				} // 查看提醒
				
				else if ($keyword=="#") { // 查看我的计划
					$mygosql= "SELECT * FROM gos WHERE users_id= '".$myuserrow['id']."' AND status!=-1" ; $mygonumrow=mysql_num_rows(mysql_query($mygosql)); 					
					if($mygonumrow>0) { // 有计划
						for ($n=1; $n<$mygonumrow+1; $n++) {
							$o=$n-1;
							$mygosql= "SELECT * FROM gos WHERE users_id= '".$myuserrow['id']."' AND status!=-1 ORDER BY datetime DESC limit $o,1"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); 							
							$url[$n]="http://m.thefarer.com/go/go/?go=".$mygorow['id'];
							$title[$n]=$n.") ".$mygorow['title'];
							$spotsql="SELECT * FROM spots WHERE id= '".$mygorow['spot_0']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); $picurl[$n]="http://www.thefarer.com/_wechat/".$spotrow['areas_id'].".jpg";
						}
						$articlecount=$mygonumrow+1;
						$_SESSION['MENU']="#"; $_SESSION['GO']=""; $_SESSION['USER']="";
						$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>$articlecount</ArticleCount><Articles><item><Title>直接回复编号以进行更多操作</Title><Description><![CDATA[$description[0]]]></Description><PicUrl>http://www.thefarer.com/_wechat/a.jpg</PicUrl></item><item><Title><![CDATA[$title[1]]]></Title><PicUrl><![CDATA[$picurl[1]]]></PicUrl><Url><![CDATA[$url[1]]]></Url></item><item><Title><![CDATA[$title[2]]]></Title><PicUrl><![CDATA[$picurl[2]]]></PicUrl><Url><![CDATA[$url[2]]]></Url></item><item><Title><![CDATA[$title[3]]]></Title><PicUrl><![CDATA[$picurl[3]]]></PicUrl><Url><![CDATA[$url[3]]]></Url></item><item><Title><![CDATA[$title[4]]]></Title><PicUrl><![CDATA[$picurl[4]]]></PicUrl><Url><![CDATA[$url[4]]]></Url></item><item><Title><![CDATA[$title[5]]]></Title><PicUrl><![CDATA[$picurl[5]]]></PicUrl><Url><![CDATA[$url[5]]]></Url></item></Articles></xml>";
					}
					else { // 没计划
						$content=$myuserrow['name']."，你似乎还没有建立一条旅行计划";
						$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
						$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";						
					} // 没计划
				} // 查看我的计划

				
				
				else if ($_SESSION['MENU']=="@") { // 2级菜单(@) 
					$usersql= "SELECT * FROM users WHERE id= '".$_SESSION['USER']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql));
					$text="@".$userrow['name']." ".$keyword;
					mysql_query("INSERT INTO gos_replies (users_id, gos_id, text, datetime, status_wechat) VALUES ('".$myuserrow['id']."', '".$_SESSION['GO']."', '".$text."', '".$datetime."', 1)");
					mysql_query("UPDATE gos set datetime_renew= '".$datetime."' WHERE id = '".$_SESSION['GO']."'");
					$goreplysql= "SELECT * FROM gos_replies WHERE gos_id= '".$_SESSION['GO']."' AND users_id= '".$myuserrow['id']."' ORDER BY id DESC LIMIT 1"; $goreplyrow=mysql_fetch_assoc(mysql_query($goreplysql));
					preg_match_all("^@(\S+)( )^", $text, $users, PREG_SET_ORDER);
					for ($n=0; $n<$n+1; $n++) {
						if (isset($users[$n][1])==FALSE) { break; }
						else {
							$usersql= "SELECT * FROM users WHERE name= '".$users[$n][1]."' "; $userrow= mysql_fetch_assoc(mysql_query($usersql)); 
							if ($userrow['id']==0) { break; }
							else { mysql_query("INSERT INTO gos_ats (subusers_id, users_id, gos_id, gos_replies_id, text, datetime) VALUES ('".$myuserrow['id']."', '".$userrow['id']."', '".$_SESSION['GO']."', '".$goreplyrow['id']."', '".$text."','".$datetime."')"); }
						}
					}				
					$marksql= "SELECT * FROM gos_marks WHERE users_id= '".$myuserrow['id']."' and gos_id= '".$_SESSION['GO']."'";
					$markrow=mysql_fetch_assoc(mysql_query($marksql)); $marknumrows=mysql_num_rows(mysql_query($marksql));
					if ($marknumrows==0) {
						$gosql= "SELECT * FROM gos WHERE id= '".$_SESSION['GO']."' "; $gorow= mysql_fetch_assoc(mysql_query($gosql));
						if ($myuserrow['id']!=$gorow['users_id']) {
							mysql_query("INSERT INTO gos_marks (users_id, gos_id, subusers_id, status_reply) VALUES (".$myuserrow['id'].", '".$_SESSION['GO']."', '".$gorow['users_id']."', 1)");
						}
					}
					else { mysql_query("UPDATE gos_marks SET status_reply=status_reply+1 WHERE users_id= '".$myuserrow['id']."' and gos_id= '".$_SESSION['GO']."'" ); }	
					$content="回复成功！";						
					$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				} // 2级菜单(@) 
			
			
			
				else if ($_SESSION['MENU']=="#") { // 2级菜单(#) 
					if ($_SESSION['GO']=="") { // 2级菜单(#)->进入3级
						if ($keyword=="1" || $keyword=="2" || $keyword=="3" || $keyword=="4" || $keyword=="5") {
							$o=$keyword-1;
							$mygosql= "SELECT * FROM gos WHERE users_id= '".$myuserrow['id']."' AND status!=-1 ORDER BY datetime DESC limit $o,1"; $mygorow=mysql_fetch_assoc(mysql_query($mygosql)); 
							if (!empty($mygorow)) {
								$content="《".$mygorow['title']."》
								
可以发送---------
[内容]   文字直播你的旅途
[相片]   相片直播你的旅途
0   退出";
								$_SESSION['MENU']="#"; $_SESSION['GO']=$mygorow['id']; $_SESSION['USER']="";
								$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
							}
							else {
								$content="你发送的指令可能有误

可以发送----------
[编号]  以进行更多操作
0   退出";
								$_SESSION['MENU']="#"; $_SESSION['GO']=""; $_SESSION['USER']="";
								$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
							}
						}
						else {
							$content="你发送的指令可能有误

可以发送----------
[编号]  以进行更多操作
0   退出";
							$_SESSION['MENU']="#"; $_SESSION['GO']=""; $_SESSION['USER']="";
							$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
						}									
					} // 2级菜单(#)->进入3级
					else { // 3级菜单-2级菜单(#)
						if ($keyword!="") { // 3级菜单-2级菜单(#)->文字直播
							mysql_query("INSERT INTO gos_lives (users_id, gos_id, text, datetime, status_wechat) VALUES (".$myuserrow['id'].", '".$_SESSION['GO']."', '".$keyword."', '".$datetime."', 1)");						
							$content="成功加入一条文字
								
可以发送---------
[内容]   文字直播你的旅途
[相片]   相片直播你的旅途
0   退出";
							$_SESSION['MENU']="#"; $_SESSION['GO']=$_SESSION['GO']; $_SESSION['USER']="";
							$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
						} // 3级菜单-2级菜单(#)->文字直播
						else if ($photo!="") { // 3级菜单-2级菜单(#)->图片直播							
							$fp=fsockopen("www.thefarer.com", 80, &$errno, &$errstr, 30);
							if (!$fp) { echo "$errstr ($errno)<br />\n"; }
   							fputs($fp, "GET /_wechat/_uploadphoto.php?go=".$_SESSION['GO']."&my=".$myuserrow['id']."&photo=".$photo."\r\n"); 
							fclose($fp);
							$content="成功加入一张相片
								
可以发送---------
[内容]   文字直播你的旅途
[相片]   相片直播你的旅途
0   退出";
							$_SESSION['MENU']="#"; $_SESSION['GO']=$_SESSION['GO']; $_SESSION['USER']="";
							$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";						
						} // 3级菜单-2级菜单(#)->图片直播
					} // 3级菜单-2级菜单(#)				
				} // 2级菜单(#) 	
				
				else {
					$content="你发送的指令可能有误
					
你可以随时发送----------
@   查看未处理的提醒
#   查看我的旅行计划
0   退回到这里";
					$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				}				
			}
		
		
		
		
			
			else { // 未关联的情况
				if ($keyword=="0") { // 返回
					$content="欢迎来到更远，

你可以随时发送----------
*   关联微信到你的更远帐号
0   退回到这里";
					$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				} // 返回

				else if ($keyword=="*") { // 尝试关联
					$content=$sid."请发送你的
更远登录邮箱[空格]登录密码
即可关联微信到你的更远帐号

可以发送----------
0   退出"; 
					$_SESSION['MENU']="*"; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";	
				} // 尝试关联
				
				else if ($_SESSION['MENU']=="*") { // 2级菜单(关联)
					$verify=explode(" ", $keyword, 2); 
					if (isset($verify[0])==TRUE && isset($verify[1])==TRUE ) { // 2级菜单(关联)->关联成功
						$password=sha1(addslashes($verify[1]));
						$myusersql="SELECT * FROM users WHERE email = '".$verify[0]."' AND password='".$password."' "; $myuserresult=mysql_query($myusersql); $myusernumrow=mysql_num_rows($myuserresult); $myuserrow=mysql_fetch_assoc($myuserresult);
						if ($myusernumrow==1 and $myuserrow['status']!=-1) { 
							mysql_query("UPDATE users set status_wechat=1 WHERE id= '".$myuserrow['id']."'"); mysql_query("UPDATE users set wechat='".$fromUsername."' WHERE id= '".$myuserrow['id']."'"); 
							$content=$myuserrow['name']."，欢迎来到更远，关联微信帐号成功

你可以随时发送----------
@   查看未处理的提醒
#   查看我的旅行计划
0   退回到这里";							
							$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
							$textTpl="<xml><ToUserName><![CDATA[%s]]></ToUserName><FromUserName><![CDATA[TheFarer]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>"; 
						}
					} // 2级菜单(关联)->关联成功
					else { // 2级菜单(关联)->关联失败
						$content="你试图关联微信帐号到更远，但是失败了，请检查你的帐号信息或是输入格式
						
可以发送----------
0   退出"; 
						$_SESSION['MENU']="*"; $_SESSION['GO']=""; $_SESSION['USER']="";
						$textTpl="<xml><ToUserName><![CDATA[%s]]></ToUserName><FromUserName><![CDATA[TheFarer]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
					} // 2级菜单(关联)->关联失败
				} // 2级菜单(关联)
				
				else {
					$content="你发送的指令可能有误

你可以随时发送----------
*   关联微信到你的更远帐号
0   退回到这里";
					$_SESSION['MENU']=""; $_SESSION['GO']=""; $_SESSION['USER']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				}
			} // 未关联的情况
			
			
			
			
			
			$resultStr=sprintf($textTpl, $fromUsername, $toUsername);
			echo $resultStr;
		}
		else {
			echo ""; exit;
		}
	}
}
?>