<?php
	preg_match('|\/.+\/(\w+)\.apk|', $_SERVER['REQUEST_URI'], $res); // 构造形如 getUrl.php/{key}.apk的url以获取下载链接
	$key = $res ? $res[1]: exit("Url format error!");
	$url = $referer = "http://share.weiyun.com/$key";
	 
	$src = curl_get_contents($url, "");
	preg_match('|shareInfo = (.*);|Ui', $src, $res);
	 
	function curl_get_contents($url, $referer) {
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_HEADER, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_REFERER, $referer);
		curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us)");
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$src = curl_exec($curl);
		curl_close($curl);
		return $src;
	}
?>

<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telephone=no" />
</head>

<body>
	<div id="shareInfo"><?php echo $res[1] ?></div>
	<script>
		var jsonObj = JSON.parse(document.getElementById("shareInfo").innerHTML);
		var postObj = {
			sharekey: jsonObj.sharekey,
			fid: jsonObj.file_list[0].file_id,
			dir: "",
			zn: jsonObj.file_list[0].file_name,
			pdir: jsonObj.pdir_key,
			uin: jsonObj.uin,
			skey: "",
			os_info: "android",
			browser: "chrome",
			ver: 12			
		};
		var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("enctype", "application/x-www-form-urlencoded");
		form.setAttribute("action", "http://web.cgi.weiyun.com/share_dl.fcg");
		document.body.appendChild(form);
		for(var idx in postObj) {
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", idx);
			input.setAttribute("value", postObj[idx]);
			document.getElementsByTagName("form")[0].appendChild(input);
		}
	</script>
</body>
</html>