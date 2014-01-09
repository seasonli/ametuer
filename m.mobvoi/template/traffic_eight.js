(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_traffic_eight");
	script.innerHTML = '<ul class="cards"> <li class="cards_card"> <div class="cards_card_double left"> <p><span class="layout-16px">{ body[0].title }</span></p> <p><span class="layout-666">{ body[0].content[0] }</span></p> </div> <div class="cards_card_double left"> <p><span class="layout-fright layout-center layout-bgreen layout-fff" style="width: 60px; line-height: 60px; font-size: 20px">{ body[0].content[1] }</span></p> </div> <div class="clear"></div> </li> <li class="cards_card"> <div class="cards_card_entire layout-666"> <p><span>{ body[0].content[2] }</span></p> <p><span class="layout-12px">{ body[0].content[3] }</span></p> </div> </li> </ul>';
	document.head.appendChild(script);
}) ()