(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_tip_one");
	script.innerHTML = '<ul class="cards"> <li class="cards_card"> <div class="cards_card_entire"> <p><span>{ body[0].title }</span></p> </div> </li> </ul>';
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	tip_one: function(ul) {
		$(".wrapper").children("*").eq(ul).find("li.cards_card div.cards_card_entire p span").each(function() {
      $(this).html($(this).html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
    })		
	}
}