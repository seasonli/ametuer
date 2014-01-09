(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_special_three");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_img layout-fff" style="position: relative"> <img src="{ val.img_url }" /> <p><span class="layout-18px layout-bold" style="position: absolute; left: 5%; top: 40px">{ val.title }</span><span style="position: absolute; right: 5%; top: 65px">{ val.content[0] }</span></p> </li> <li class="cards_card"> <div class="cards_card_double left layout-666"> <p><span>{ val.content[1] }</span></p> <p><span>{ val.content[3] }</span></p> </div> <div class="cards_card_double right layout-666"> <p><span>{ val.content[2] }</span></p> <p><span>{ val.content[4] }</span></p> </div> <div class="clear"></div> </li> <li class="cards_card"> <div class="cards_card_entire"> { each body[i].children as val1 i1 } <br/> <p><span class="layout-16px">{ val1.title }</span></p> <p><span class="layout-666 layout-12px">{ val1.content[0] }</span></p> { /each } </div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()