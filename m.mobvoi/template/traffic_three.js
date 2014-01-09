(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_traffic_three");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_card gotoDial" data-tel="{ val.content[4] }"> <div class="cards_card_entire"> <p><span class="layout-12px layout-999">{ val.content[0] }</span></p> <p><span class="layout-16px layout-green">{ val.content[1] }</span> <span class="layout-16px">{ val.content[2] }</span><span class="layout-fright layout-orange">{ val.content[3] }</span></p> <p><span class="layout-666">{ val.content[4] }</span></p> </div> <div class="clear"></div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()