(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_source_one");
	script.innerHTML = '{ if header.task != "public.navigation" }<ul class="cards source"> <li class="cards_source layout-12px"> <p> <span>数据来自 { each body as val i }{ /each } { body[0].title } </span> </p> </li> </ul>{ /if }';
	document.head.appendChild(script);
}) ()