<?php date_default_timezone_set('Asia/Shanghai'); error_reporting(E_ALL & ~E_NOTICE); ?>

<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd"><html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<meta name="format-detection" content="telephone=no"/>
<link href="book.css" rel="stylesheet" type="text/css">
</head>

<?php
function parseNamespaceXml($xmlstr) {
	$xmlstr=preg_replace('/\sxmlns="(.*?)"/', ' _xmlns="${1}"', $xmlstr);
	$xmlstr=preg_replace('/<(\/)?(\w+):(\w+)/', '<${1}${2}_${3}', $xmlstr);
	$xmlstr=preg_replace('/(\w+):(\w+)="(.*?)"/', '${1}_${2}="${3}"', $xmlstr);
	$xmlobj=simplexml_load_string($xmlstr);
	return json_decode(json_encode($xmlobj), true);
}
	$soap=new SoapClient("http://202.120.96.99:3355/wxservice.asmx?wsdl", array(trace=>1));
	$soap->BookDetail(array(bookid=>$_GET['book']));
	$soapString=$soap->__getLastResponse();
	$soapArray=parseNamespaceXml($soapString);
	$bookDetail=$soapArray[soap_Body][BookDetailResponse][BookDetailResult][NewDataSet][Result];
?>

<body>

<div id="book-top">
	<div id="book_title"><h1><?php echo trim($bookDetail[0][Title]) ?></h1></div>
	<div id="book_details">
		<p><?php echo $_GET['author'] ?></p>
		<p><?php echo $_GET['publish'] ?></p>
	</div>
</div>
<div id="book-body">
	<div id="book_callno"><p><h3>索书号：<?php echo trim($bookDetail[0][Callno]) ?></h3></p></div>
	<div id="book_copies">
		<p>华东理工大学馆藏 <font class="highlight"><?php echo trim($bookDetail[0][Copies]) ?></font> 册</p>
		<p>其中现在在馆的有 <font class="highlight"><?php echo trim($bookDetail[0][InCopies]) ?></font> 册</p>
	</div>
	<div id="book_addresses">
		<?php for ($i=0; $i<$i+1; $i++) { 
			if (trim($bookDetail[$i][Address])=="") { break; }
			echo "<p>1册在".trim($bookDetail[$i][Address])."：".trim($bookDetail[$i][DueTime])."</p>"; 
		} ?>
	</div>	
</div>

<div id="footer">
	<div id="footer_ecust"><p>华东理工大学图书馆微信公众平台<p></div>
	<div id="footer_author"<p>Created by Season <a href="weixin://qr/hvGLkw-EzlKxrUvw96SU">联系作者</a></p></div>
</div>

</body>
</html>