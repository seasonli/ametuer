(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_traffic_one");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_card arrowright gotoLink" data-link="{ val.link_url }"> <div class="cards_card_triple left"> <p><span class="layout-999">{ val.content[6] }</span></p> <p><span class="layout-666">{ val.content[7] }</span></p> </div> <div class="cards_card_triple center"> <p><span class="layout-green">{ val.content[2] }</span> <span>{ val.content[0] }</span></p> <p><span>{ val.content[3] }</span> <span>{ val.content[1] }</span></p> </div> <div class="cards_card_triple right"> <p><span class="layout-orange">{ val.content[5] }</span></p> </div> <div class="clear"></div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()