(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_image_one");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_img gotoLink" data-link="{ val.link_url }"> <img src="{ val.img_url }" /> </li> <li class="cards_card gotoLink" data-link="{ val.link_url }"> <div class="cards_card_entire"> <p><span>{ val.content[0] }</span></p> </div> <div class="cards_card_double left layout-12px layout-999"> <p><span>{ val.content[1] }</span></p> </div> <div class="cards_card_double right layout-999 layout-12px layout-right"> <p><span>{ val.content[2] }</span></p> <br/><br/> </div> <div class="clear"></div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()