(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_web_one");
	script.innerHTML = '<ul>{ body[0].link_url }</ul>';
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	web_one: function(ul) {
		window.location.href = $(".wrapper").children("*").eq(ul).html();
	}
}