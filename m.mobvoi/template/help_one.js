(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_help_one");
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	help_one: function(ul) {
		window.location.href = "http://mobvoi-one-box.oss.aliyuncs.com/wechat/help/help.html";
	}
}