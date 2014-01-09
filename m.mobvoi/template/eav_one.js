(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_eav_one");
	script.innerHTML = '<ul class="cards"> <li class="cards_card"> <div class="cards_card_entire"> <p><span class="layout-orange">{ body[0].children[0].title }</span></p> <p><span class="layout-12px layout-666">{ body[0].children[0].content[0] }</span></p> <p><span class="layout-12px layout-666">{ body[0].children[0].content[1] }</span></p> </div> </li> </ul>';
	document.head.appendChild(script);
}) ()

render.prototype.callback = {
	eav_one: function(ul) {
		$(".wrapper").children("*").eq(ul).find("li.cards_card div.cards_card_entire p span").each(function() {
      $(this).html($(this).html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
    })
	}
}