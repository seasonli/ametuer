(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_web_three");
	script.innerHTML = '<iframe class="iframe" src="{ body[0].link_url }"></iframe>'; // .replace("www.baidu.com", "m.baidu.com").replace("?wd", "?word") }&pu=sz%401320_480&wpo=base"
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	web_three: function(ul) {
		$(".wrapper").children("*").eq(ul).css("height", $(window).height() - 45 + "px");
	}
}