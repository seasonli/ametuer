(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_traffic_seven");
	script.innerHTML = '<ul class="cards"><li class="cards_card"><div class="cards_card_double left"><p><span class="layout-18px">{body[0].title}</span></p><p><span class="layout-666"><img src="{ body[0].img_url }"style="width: 15px"/>{body[0].content[0]}</span></p></div><div class="cards_card_double right"><p><span class="layout-fright layout-center layout-fff layout-bgreen"style="width: auto; min-width: 50px; padding-left: 5px; padding-right: 5px; line-height: 60px; font-size: 20px">{body[0].content[1]}</span></p></div><div class="clear"></div></li><li class="cards_card">{each body[0].children as val i}<div class="cards_card_entire layout-666"><p><span>{val.title}</span></p></div><div class="cards_card_entire"><p><span class="layout-16px">{val.content[0]}</span><span class="layout-12px layout-666">{val.content[1]}{val.content[2]}</span></p><p><span>{body[0].content[2]}</span></p></div>{/each}</li></ul>';
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	traffic_seven: function(ul) {
		$(".wrapper").children("*").eq(ul).find("li.cards_card div.cards_card_entire p span").each(function() {
      $(this).html($(this).html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
    })
	}
}