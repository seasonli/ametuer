<?php
require("wechatLib.class.php")

function parseNamespaceXml($xmlstr) {
	$xmlstr=preg_replace('/\sxmlns="(.*?)"/', ' _xmlns="${1}"', $xmlstr);
	$xmlstr=preg_replace('/<(\/)?(\w+):(\w+)/', '<${1}${2}_${3}', $xmlstr);
	$xmlstr=preg_replace('/(\w+):(\w+)="(.*?)"/', '${1}_${2}="${3}"', $xmlstr);
	$xmlobj=simplexml_load_string($xmlstr);
	return json_decode(json_encode($xmlobj), true);
}

$wechat=new wechat();

$postObj=$receiveMsg->receiveMsg();
$fromUserName=$postObj->FromUserName; // 用户
$toUserName=$postObj->ToUserName; // 公共平台
$keyword=trim($postObj->Content);

session_id(md5($fromUserName)); session_start(); // session初始化，important
$config_basedir="http://www.thefarer.com/ecust/book/"; 






// 不论是否关联
if ($keyword=="0") { // 返回
	$content="华东理工大学图书馆，你可以发送-----
1   书目查询
2   借还信息/续借
		
你可以随时发送-----
0   退回到这里";
	$_SESSION['MENU']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
	$responseTextMsg->responseTextMsg($fromUserName, $toUserName, $content);
} // 返回
else if ($_SESSION['MENU']=="" && $keyword=="1") {
	$content="直接回复内容检索，最多等待6秒，若长时间没有响应尝试再次发送";
	$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=""; $_SESSION['PAGE']=""; $_SESSION['BOOK']="";
	$responseTextMsg->responseTextMsg($fromUserName, $toUserName, $content);
}											
else if ($_SESSION['MENU']=="1" && $keyword!="#") {
	$soap=new SoapClient("http://202.120.96.99:3355/wxservice.asmx?wsdl", array(trace=>1));
	$soap->QueryBook(array(word=>$keyword));
	$soapString=$soap->__getLastResponse();
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
			$url[$i]=$config_basedir."?book=".trim($queryBook[$i][SerialNumber]);
		}
	}
	
	$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=$keyword; $_SESSION['PAGE']="1"; $_SESSION['BOOK']="";
	$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>".$num."</ArticleCount><Articles><item><Title>“".$keyword."” ".$bookNum."个结果 回复#查看下一页</Title><PicUrl>http://www.thefarer.com/ecust/search.jpg</PicUrl><Url></Url></item><item><Title>".$title[0]."</Title><PicUrl></PicUrl><Url>".$url[0]."</Url></item><item><Title>".$title[1]."</Title><PicUrl></PicUrl><Url>".$url[1]."</Url></item><item><Title>".$title[2]."</Title><PicUrl></PicUrl><Url>".$url[2]."</Url></item><item><Title>".$title[3]."</Title><PicUrl></PicUrl><Url>".$url[3]."</Url></item><item><Title>".$title[4]."</Title><PicUrl></PicUrl><Url>".$url[4]."</Url></item></Articles></xml>";
}	
else if ($_SESSION['MENU']=="1" && $_SESSION['KEYWORD']!="" && $keyword=="#") {
	$soap=new SoapClient("http://202.120.96.99:3355/wxservice.asmx?wsdl", array(trace=>1));
	$soap->QueryBook(array(word=>$_SESSION['KEYWORD']));
	$soapString=$soap->__getLastResponse();
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
			$title[$i]="《".trim($queryBook[$j][Title])."》 ".trim($queryBook[$j][Author])." ——".trim($queryBook[$j][Publish])." ".trim($queryBook[$j][Callno]); $url[$i]=$config_basedir."?book=".trim($queryBook[$j][SerialNumber]);
		}
	}
	$_SESSION['MENU']="1"; $_SESSION['KEYWORD']=$_SESSION['KEYWORD']; $_SESSION['PAGE']=$_SESSION['PAGE']+1; $_SESSION['BOOK']="";
	$textTpl="<xml><ToUserName><![CDATA[$fromUsername]]></ToUserName><FromUserName><![CDATA[$toUsername]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>".$num."</ArticleCount><Articles><item><Title>“".$_SESSION['KEYWORD']."” ".$bookNum."个结果 第".$_SESSION['PAGE']."页</Title><PicUrl>http://www.thefarer.com/ecust/search.jpg</PicUrl><Url></Url></item><item><Title>".$title[0]."</Title><PicUrl></PicUrl><Url>".$url[0]."</Url></item><item><Title>".$title[1]."</Title><PicUrl></PicUrl><Url>".$url[1]."</Url></item><item><Title>".$title[2]."</Title><PicUrl></PicUrl><Url>".$url[2]."</Url></item><item><Title>".$title[3]."</Title><PicUrl></PicUrl><Url>".$url[3]."</Url></item><item><Title>".$title[4]."</Title><PicUrl></PicUrl><Url>".$url[4]."</Url></item></Articles></xml>";
}					

?>