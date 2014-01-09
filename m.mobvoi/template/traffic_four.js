(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_traffic_four");
	script.innerHTML = '<ul class="cards"> <li class="cards_img showMap layout-fff trafficMap" style="height: 320px">[[[{ header.map_option.items[0].content[0] }]]]</li> <li class="cards_card gotoLink" data-link="{ body[0].link_url }"> { each body as val i } <div class="cards_card_entire"> <p><span class="layout-16px">{ val.title }</span></p> { each val.children as val1 i1 } <p><span class="layout-666">{ val1.title }</span></p> { each val1.content as val2 i2} <p><span class="layout-12px layout-999">{ val2 }</span></p> { /each} { /each } </div> <div class="clear"></div> { /each } </li> </ul>';
	document.head.appendChild(script);
}) ()