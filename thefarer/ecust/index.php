<?php
function connectwebservice($keyword) {
	$soap=new SoapClient("http://202.120.96.99:3355/wxservice.asmx?wsdl", array(trace=>1));
	$soap->QueryBook(array(word=>$keyword));
	$soapString=$soap->__getLastResponse();
	return $soapString;
}
function parseNamespaceXml($xmlstr) {
	$xmlstr=preg_replace('/\sxmlns="(.*?)"/', ' _xmlns="${1}"', $xmlstr);
	$xmlstr=preg_replace('/<(\/)?(\w+):(\w+)/', '<${1}${2}_${3}', $xmlstr);
	$xmlstr=preg_replace('/(\w+):(\w+)="(.*?)"/', '${1}_${2}="${3}"', $xmlstr);
	$xmlobj=simplexml_load_string($xmlstr);
	return json_decode(json_encode($xmlobj), true);
}
function responseTextMsg($fromUsername, $toUsername, $content) {
	$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
	$resultStr=sprintf($textTpl, $fromUsername, $toUsername);
	echo $resultStr;
}
function responseNewsMsg($fromUsername, $toUsername, $articles) {
	$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType>$articles</xml>";
	$resultStr=sprintf($textTpl, $fromUserName, $toUserName);
	echo $resultStr;
}

$postStr=$GLOBALS["HTTP_RAW_POST_DATA"]; //get post data, May be due to the different environments
if (!empty($postStr)) { //extract post data
	$postObj=simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);			
	$fromUsername=$postObj->FromUserName; // 用户
	$toUsername=$postObj->ToUserName; // 公共平台
	$keyword=trim($postObj->Content);
			
	session_id(md5($fromUsername)); session_start(); // session初始化，important
	$config_basedir="http://www.thefarer.com/ecust/book/"; 
			 

	// 不论是否关联
	if ($keyword=="0") { // 返回
		$content="华东理工大学图书馆，你可以发送：
1   书目检索
2   借还信息/续借
			
你可以随时发送：
0   退回到这里";
		$_SESSION['MENU']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
		responseTextMsg($fromUsername, $toUsername, $content);
	} // 返回
	else if ($_SESSION['MENU']=="" && $keyword=="1") {
		$content="书目检索：请输入关键词";
		$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
		responseTextMsg($fromUsername, $toUsername, $content);
	}											
	else if ($_SESSION['MENU']=="1" && $keyword!="#") {
		$soapString=connectwebservice($keyword);
		$soapArray=parseNamespaceXml($soapString);
		$bookNum=$soapArray[soap_Body][QueryBookResponse][QueryBookResult][NewDataSet][ResultCount][ncount];
		$queryBook=$soapArray[soap_Body][QueryBookResponse][QueryBookResult][NewDataSet][Result];
						
		if ($bookNum==0) { $num=2; $title[0]="没有检索到有关“".$keyword."”的书目"; $url[0]=""; } 
		else if ($bookNum==1) { $num=2; $title[0]="《".trim($queryBook[Title])."》 ".trim($queryBook[Author])." ——".trim($queryBook[Publish])." ".trim($queryBook[Callno]); $url[0]=$config_basedir."?book=".trim($queryBook[SerialNumber]); }
		else {
			for ($i=0; $i<5; $i++) {
				if ($bookNum>5) { $num=6; }
				else { $num=$bookNum+1; }
				$title[$i]="《".trim($queryBook[$i][Title])."》 ".trim($queryBook[$i][Author])." ——".trim($queryBook[$i][Publish])." ".trim($queryBook[$i][Callno]);
				$url[$i]=$config_basedir."?book=".trim($queryBook[$i][SerialNumber])."&amp;author=".trim($queryBook[$i][Author])."&amp;publish=".trim($queryBook[$i][Publish]);
			}
		}
					
		$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=$keyword; $_SESSION['PAGE']="1"; $_SESSION['BOOK']="";
		$articles="<ArticleCount>".$num."</ArticleCount><Articles><item><Title>“".$keyword."” ".$bookNum."个结果 回复#查看下一页</Title><PicUrl>http://www.thefarer.com/ecust/search.jpg</PicUrl><Url></Url></item><item><Title>".$title[0]."</Title><PicUrl></PicUrl><Url>".$url[0]."</Url></item><item><Title>".$title[1]."</Title><PicUrl></PicUrl><Url>".$url[1]."</Url></item><item><Title>".$title[2]."</Title><PicUrl></PicUrl><Url>".$url[2]."</Url></item><item><Title>".$title[3]."</Title><PicUrl></PicUrl><Url>".$url[3]."</Url></item><item><Title>".$title[4]."</Title><PicUrl></PicUrl><Url>".$url[4]."</Url></item></Articles>";
		responseNewsMsg($fromUsername, $toUsername, $articles);
	}	
	else if ($_SESSION['MENU']=="1" && $_SESSION['KEYWORD']!="" && $keyword=="#") {			
		$soapString=connectwebservice($_SESSION['KEYWORD']);
		$soapArray=parseNamespaceXml($soapString);
		$bookNum=$soapArray[soap_Body][QueryBookResponse][QueryBookResult][NewDataSet][ResultCount][ncount];
		$queryBook=$soapArray[soap_Body][QueryBookResponse][QueryBookResult][NewDataSet][Result];
		$requestNum=$_SESSION['PAGE']*5+1;
		if ($requestNum>$bookNum) { $num=2; $title[0]="没有更多了"; $url[0]=""; }
		else {
			for ($i=0; $i<5; $i++) {
				if ($bookNum-$_SESSION['PAGE']*5>5) { $num=6; }
				else { $num=$bookNum-$_SESSION['PAGE']*5+1; }
				$j=$i+5*$_SESSION['PAGE'];
				$title[$i]="《".trim($queryBook[$j][Title])."》 ".trim($queryBook[$j][Author])." ——".trim($queryBook[$j][Publish])." ".trim($queryBook[$j][Callno]);
				$url[$i]=$config_basedir."?book=".trim($queryBook[$j][SerialNumber])."&amp;author=".trim($queryBook[$j][Author])."&amp;publish=".trim($queryBook[$j][Publish]);
			}
		}
		$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=$_SESSION['KEYWORD']; $_SESSION['PAGE']=$_SESSION['PAGE']+1; $_SESSION['BOOK']="";
		$articles="<ArticleCount>".$num."</ArticleCount><Articles><item><Title>“".$_SESSION['KEYWORD']."” ".$bookNum."个结果 第".$_SESSION['PAGE']."页</Title><PicUrl>http://www.thefarer.com/ecust/search.jpg</PicUrl><Url></Url></item><item><Title>".$title[0]."</Title><PicUrl></PicUrl><Url>".$url[0]."</Url></item><item><Title>".$title[1]."</Title><PicUrl></PicUrl><Url>".$url[1]."</Url></item><item><Title>".$title[2]."</Title><PicUrl></PicUrl><Url>".$url[2]."</Url></item><item><Title>".$title[3]."</Title><PicUrl></PicUrl><Url>".$url[3]."</Url></item><item><Title>".$title[4]."</Title><PicUrl></PicUrl><Url>".$url[4]."</Url></item></Articles>";
		responseNewsMsg($fromUsername, $toUsername, $articles);
	}		
} ?>


			<!-- 检查关联
			/* else if ($numRow!=1) { // 未关联
				if ($_SESSION['MENU']=="" && $keyword=="2") {
					$content="你还没有绑定你的学生证，请发送你的学生证号";
					$_SESSION['MENU']="9"; $_SESSION['KEYWORD']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
					$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				}
				else if ($_SESSION['MENU']=="9") { 
					if ($_SESSION['KEYWORD']=="") {
						$content="请再发送你的读者密码";
						$_SESSION['MENU']="9"; $_SESSION['KEYWORD']=$keyword; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
					}
					else {
						$soap=new SoapClient("http://202.120.96.99:3355/wxservice.asmx?wsdl", array(trace=>1));
						$soap->QueryLoad(array(idno=>$_SESSION['KEYWORD'], psw=>$keyword));
						$soapString=$soap->__getLastResponse();
						$soapArray=parseNamespaceXml($soapString);
						$content="绑定成功";
						$_SESSION['MENU']=""; $_SESSION['KEYWORD']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
					}
				}				
				else {
					$content="你发送的指令可能有误，你可以发送-----
1   书目检索
2   借还信息/续借
			
你可以随时发送-----
0   退回到这里";
						$_SESSION['MENU']=""; $_SESSION['KEYWORD']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
						$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
				}
			}
			else { // 关联
			} */
				-->			




			
