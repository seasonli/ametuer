(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_market_three");
	script.innerHTML = '<ul class="cards noshadow"> <li class="cards_img gotoLink" data-link="{ body[0].link_url }"> <img src="{ body[0].img_url }" /> </li> </ul>';
	document.head.appendChild(script);
}) ()