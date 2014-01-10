<?php
	
$postObj = array();
$postObj["url"] = "http://202.120.96.42:8081/webpac/querybook.aspx";
$postObj["params"] = array();
$postObj["params"]["Button1"] = "È·¶¨";
$postObj["params"]["DropDownList1"] = 6;
$postObj["params"]["DropDownList2"] = "³ö°æÈÕÆÚ";
$postObj["params"]["DropDownList3"] = "Ðì»ã·îÏÍ";
$postObj["params"]["RadioButtonList1"] = 0;
$postObj["params"]["RadioButtonList2"] = 1;
$postObj["params"]["TextBox1"] = "a";
$postObj["params"]["__EVENTARGUMENT"] = "";
$postObj["params"]["__EVENTTARGET"] = "";
$postObj["params"]["__EVENTVALIDATION"] = "/wEWIQLK8ZAoAufjiL0BAvjjiL0BAvnjiL0BAvrjiL0BAvvjiL0BAveMotMNAo2LpYsGApKLpYsGApOLpYsGApCLpYsGApGLpYsGApaLpYsGApeLpYsGAuzRsusGAoznisYGAufjzK8PAvjjzK8PAveM5sEDAvms+MEHApzV65sHAqCoyCACr46vsAcC8quwfgKu3dWGDAKUx9aGDAL3jPqcDAKf5I/lCgKC2IUeAorAi+kMAtPNn+QGAs3q4eUOAqqT/LYKioVlF4nWVZtkCGQTayHegdo6qh0=";
$postObj["params"]["__LASTFOCUS"] = "";
$postObj["params"]["__VIEWSTATE"] = "/wEPDwULLTIwNTEyNTg3NzEPZBYCAgMPZBYEAgEPEA9kFgIeB29uY2xpY2sFEWNoZWNrcmFkaW9saXN0MSgpZGRkAhcPPCsADQBkGAEFCUdyaWRWaWV3MQ9nZFzyD3mD2qzlqQi8zU2vmYoQt9Dm";

$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_URL, $postObj["url"]);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postObj["params"]);
$result = curl_exec($curl);
curl_close($curl);
echo $result;
?>