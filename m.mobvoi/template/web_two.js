(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_web_two");
	script.innerHTML = '<iframe class="iframe" src="{ body[0].link_url }"></iframe>';
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	web_two: function(ul) {
		$(".wrapper").children("*").eq(ul).css("height", $(window).height() - 45 + "px");
	}
}