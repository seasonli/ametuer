(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_text_one");
	script.innerHTML = '<ul class="cards"> { each body as val i } <li class="cards_card gotoDial" data-tel="{ val.link_url.replace(/tel:/g, \'\').replace(/-/g, \'\').split(\',\')[0] }"> <br/> <div class="cards_card_entire layout-666"> <p><span>{ val.title }</span></p> </div> <div class="cards_card_entire layout-999"> <p><span>{ val.content[0] }</span></p> </div> { if val.res_url && val.res_url != "" } <div class="cards_card_entire layout-right"> <p><span><img class="gotoVoice" src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/volume.png" style="width: 30px" /><audio id="audio" src="{ body[0].res_url }" preload="preload">您的浏览器不支持该功能</audio></span></p> </div> { /if } <br/> <div class="clear"></div> </li> { /each } </ul>';
	document.head.appendChild(script);
}) ()