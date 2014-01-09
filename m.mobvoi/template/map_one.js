(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_map_one");
	script.innerHTML = '<ul class="cards"> <li class="cards_card"> <div class="cards_card_entire layout-16px"> <p><span>{ body[0].title }</span></p> </div> <div class="clear"></div> </li> <li class="cards_img showMap markMap layout-fff" style="height: 240px">[[[{ body[0].content[0] }, { body[0].content[1] }]]]</li> <li class="cards_card"> <div class="cards_card_double left"> <p><button class="gotoMark layout-bwhite layout-left layout-blue layout-bold" type="button" data-point="{body[0].content[2]}, {body[0].content[0]}, {body[0].content[1]}">获取路线<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/gps.png" style="margin-left: 5px; height: 12px"></button></p> </div> <div class="clear"></div> </li> </ul>';
	document.head.appendChild(script);
}) ()