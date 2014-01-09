<?php

class wechat {
	public function receiveMsg() {
		$postStr=$GLOBALS["HTTP_RAW_POST_DATA"]; //get post data, May be due to the different environments
		if (!empty($postStr)) { //extract post data
			$postObj=simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
			return $postObj;
		}
	}

	public function responseTextMsg($fromUserName, $toUserName, $content) {
		$textTpl="<xml><ToUserName><![CDATA[$fromUserName]]></ToUserName><FromUserName><![CDATA[$toUserName]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
		$resultStr=sprintf($textTpl, $fromUserName, $toUserName);
		echo $resultStr;
	}

	public function responseMedMsg($fromUserName, $toUserName, $articles) {
		$textTpl="<xml><ToUserName><![CDATA[$fromUserName]]></ToUserName><FromUserName><![CDATA[$toUserName]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[news]]></MsgType><Content><![CDATA[$content]]></Content></xml>";
		$resultStr=sprintf($textTpl, $fromUserName, $toUserName);
		echo $resultStr;
	}
}

?>