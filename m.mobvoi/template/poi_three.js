(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_poi_three");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_card gotoLink" data-link="{ val.link_url }"> <div class="cards_card_img left"> <p><img src="{ val.img_url }" /></p> </div> <div class="cards_card_img right"> <p><span class="layout-16px">{ val.title }</span></p> </div> <div class="cards_card_img right"> { if val.content[0] != "" } <p><span class="rating layout-fleft">{ val.content[0] }</span> </p> { /if } <p><span class="layout-666 layout-fleft">{ val.content[1] }</span></p> <div class="clear"></div> <p><span class="layout-666">{ val.content[2] }</span></p> <p><span class="layout-666">{ val.content[3] }</span></p> <br/> <p><span class="layout-999 layout-12px">{ val.content[4] }</span></p> </div> <div class="clear"></div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()