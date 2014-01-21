// judge net environment
var url = {};
if (window.location.host == "localhost.weiyuyi") {
	url.prefix = "/w";
	url.id = 2;
}
else {
	url.prefix ="";
	url.id = parseInt(window.location.href.split("/")[4]);
}