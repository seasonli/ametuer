(function() {
	var style = document.createElement("link");
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("href", "http://mobvoi-one-box.oss.aliyuncs.com/web/css/chumenwenwen.navigation.css");
	document.head.appendChild(style);
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_map_two");
	script.innerHTML = '<ul class="cards main noshadow"> <li class="cards_card" style="height: 105px"> <div class="cards_card_entire"> <p><span class="layout-16px layout-bold">{ body[0].content[2] } - { body[0].content[3] }</span></p><p><span class="layout-666 layout-12px" id="route"></span></p><p><span class="layout-666">{ body[0].content[17] }</span></p></div><span id="toggle" class="layout-padding5 layout-round5 on">路线详情</span><span id="typeSwitcher" class="layout-fright"><button type="button" class="driving"></button><button type="button" class="transit"></button><button type="button" class="walking"></button></span></li> <li class="cards_img showBdMap" style="height: 480px; background: #fff">[[[{ body[0].content[5].split(",")[0] }, { body[0].content[5].split(",")[1] }], [{ body[0].content[6].split(",")[0] }, { body[0].content[6].split(",")[1] }]]]</li><li id="mainer"></li><li id="sub"><div></div></li></ul>';
	document.head.appendChild(script);
}) ()

Render.prototype.callback = {
	map_two: function(ul, responseObj) {
		$("ul").eq(ul).find(".showBdMap").attr("id", "showBdMap_" + ul);
		
		// Adjust Height
		$("#showBdMap_" + ul).css("height", (document.documentElement.clientHeight - 120) + "px");
		$("#showBdMap_" + ul).next().css("min-height", (document.documentElement.clientHeight - 120) + "px");
		$("#showBdMap_" + ul).next().next().css("min-height", (document.documentElement.clientHeight - 120) + "px");

		// Set Origin and Destination
		var origin_x = JSON.parse($("#showBdMap_" + ul).html())[0][0][0], 
			origin_y = JSON.parse($("#showBdMap_" + ul).html())[0][0][1],
			destination_x = JSON.parse($("#showBdMap_" + ul).html())[0][1][0], 
			destination_y = JSON.parse($("#showBdMap_" + ul).html())[0][1][1];
		if(origin_x == 0 || origin_y == 0) {
			var origin = responseObj.body[0].content[0];
		} else {
			var origin = new BMap.Point(origin_y, origin_x);
		}
		if(destination_x == 0 || destination_y == 0) {
			var destination = responseObj.body[0].content[1];
		} else {
			var destination = new BMap.Point(destination_y, destination_x);
		}

		// Set Map
		var map = new BMap.Map("showBdMap_" + ul);
		map.centerAndZoom(origin, 12);
		map.enableScrollWheelZoom();

		////////// Event 
		// Change Type of Navigation
		$("#typeSwitcher button").click(function() {
			$("#typeSwitcher button").removeClass("light");
			$(this).addClass("light");
			switch($(this).index()) {
				case 0:
		    	driving();
		    	break;
		  	case 1:
		    	transit();
		    	break;
		  	case 2:
		    	walking();
		    	break;
			}
		})

		// My Location
		function MyLocation() {
		  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
		  this.defaultOffset = new BMap.Size(20, 20);
		}
		MyLocation.prototype = new BMap.Control();
		MyLocation.prototype.initialize = function(map) {
		  var div = document.createElement("div");
		  div.classList.add("layout-round5");
		  div.style.cursor = "pointer";
		  div.style.width = "42px";
		  div.style.height = "42px";
		  div.style.border = "1px solid #d6d6d6"
		  div.style.backgroundImage = "url(http://mobvoi-one-box.oss.aliyuncs.com/web/img/navigation/mylocation.png)";
		  div.style.backgroundSize = "22px 22px";
		  div.style.backgroundPosition = "center center";
		  div.style.backgroundRepeat = "no-repeat";
		  div.style.backgroundColor = "#ffffff";
		  div.onclick = function(e) {
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
				  if(this.getStatus() == BMAP_STATUS_SUCCESS){
				    var mk = new BMap.Marker(r.point);
				    map.addOverlay(mk);
				    map.panTo(r.point);
				  }     
				}, {enableHighAccuracy: true});
		  }
		  map.getContainer().appendChild(div);
		  return div;
		}
		var myLocation = new MyLocation();
		map.addControl(myLocation);

		function driving() {
			var drivingRoute = new BMap.DrivingRoute(map, {renderOptions: {map: map},
				onSearchComplete: function(results) {
				  var plan = results.getPlan(0);
				  $("#route").html(plan.getDuration(true) + "/" + plan.getDistance(true));
				  var route = plan.getRoute(0);
		      for (var i = 0; i < route.getNumSteps(); i ++) {
		      	if(i == 0) {
			        var $div = $("<div>").addClass("cards_card_mark left");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html($("<img>")
			        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_origin.png")
			        	.attr("style", "width: 12px; vertical-align: middle")));
			        $("#sub > div").html($div);		      		
			        $div = $("<div>").addClass("cards_card_mark right");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(responseObj.body[0].content[2]));
			        $("#sub > div").append($div);
			        $("#sub > div").append($("<div>").addClass("clear"));
		      	}
		        var step = route.getStep(i);
		        $("#sub > div").append($("<hr/>"));
		        $div = $("<div>").addClass("cards_card_mark left");
		        $div.append($("<p>"));
		        $div.children("p").append($("<span>").html(i + 1));
		        $("#sub > div").append($div);
		        $div = $("<div>").addClass("cards_card_mark right");
		        $div.append($("<p>"));
		        $div.children("p").append($("<span>").html(step.getDescription(false)));
		        $("#sub > div").append($div);
		        $("#sub > div").append($("<div>").addClass("clear"));
		      	if(i == route.getNumSteps() - 1) {
		      		$("#sub > div").append($("<hr/>"));
			        var $div = $("<div>").addClass("cards_card_mark left");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html($("<img>")
			        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_destination.png")
			        	.attr("style", "width: 12px; vertical-align: middle")));
			        $("#sub > div").append($div);		      		
			        $div = $("<div>").addClass("cards_card_mark right");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(responseObj.body[0].content[3]));
			        $("#sub > div").append($div);
			        $("#sub > div").append($("<div>").addClass("clear"));
		      	}		        
		      }
		      // Delete Anchor
		      $(".anchorBL img").hide();
					$(".BMap_cpyCtrl.BMap_noprint.anchorBL").hide();
					// Layout
					$("#mainer").hide();
					$("#sub").hide();
					$("#toggle").show();
				}
			});
			map.clearOverlays();
			drivingRoute.search(origin, destination);
		}

		function walking() {
			var walkingRoute = new BMap.WalkingRoute(map, {renderOptions: {map: map},
				onSearchComplete: function(results) {
				  var plan = results.getPlan(0);
				  $("#route").html(plan.getDuration(true) + "/" + plan.getDistance(true));
				  var route = plan.getRoute(0);
		      for(var i = 0; i < route.getNumSteps(); i ++) {
		      	if(i == 0) {
			        var $div = $("<div>").addClass("cards_card_mark left");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html($("<img>")
			        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_origin.png")
			        	.attr("style", "width: 12px; vertical-align: middle")));
			        $("#sub > div").html($div);		      		
			        $div = $("<div>").addClass("cards_card_mark right");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(responseObj.body[0].content[2]));
			        $("#sub > div").append($div);
			        $("#sub > div").append($("<div>").addClass("clear"));
		      	}
		        var step = route.getStep(i);
		        $("#sub > div").append($("<hr/>"));
		        $div = $("<div>").addClass("cards_card_mark left");
		        $div.append($("<p>"));
		        $div.children("p").append($("<span>").html(i + 1));
		        $("#sub > div").append($div);
		        $div = $("<div>").addClass("cards_card_mark right");
		        $div.append($("<p>"));
		        $div.children("p").append($("<span>").html(step.getDescription(false)));
		        $("#sub > div").append($div);
		        $("#sub > div").append($("<div>").addClass("clear"));
		      	if(i == route.getNumSteps() - 1) {
		      		$("#sub > div").append($("<hr/>"));
			        var $div = $("<div>").addClass("cards_card_mark left");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html($("<img>")
			        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_destination.png")
			        	.attr("style", "width: 12px; vertical-align: middle")));
			        $("#sub > div").append($div);		      		
			        $div = $("<div>").addClass("cards_card_mark right");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(responseObj.body[0].content[3]));
			        $("#sub > div").append($div);
			        $("#sub > div").append($("<div>").addClass("clear"));
		      	}		        
		      }
		      // Delete Anchor
		      $(".anchorBL img").hide();
					$(".BMap_cpyCtrl.BMap_noprint.anchorBL").hide();
					// Layout
					$("#mainer").hide();
					$("#sub").hide();
					$("#toggle").show();
				}
			});
			map.clearOverlays();
			walkingRoute.search(origin, destination);

		}		

		var transitDesc = [];
		var bounds = [];
		function transit() {
			var transitRoute = new BMap.TransitRoute(map, {renderOptions: {},
				onSearchComplete: function(results) {
				  $("#route").html("共" + results.getNumPlans() + "个公交方案");
		      for(var i = 0; i < results.getNumPlans(); i ++) {
		      	var plan = results.getPlan(i);
		      	if(i == 0) {
		      		$("#mainer").html("");
		      	}
		      	var $li = $("<li>").addClass("cards_card");
				    $li.append($("<div>").addClass("cards_card_entire"));
			      $li.find(".cards_card_entire").append($("<p>"));
			      var routeDesc = plan.getDescription(false).split("步行");
			      transitDesc[i] = [];
			      for(var j in routeDesc) {
			      	if(routeDesc[j] != "") {
			      		routeDesc[j] = "步行" + routeDesc[j];
			      		var lineDese = routeDesc[j].split("乘坐");
			      		for(var k in lineDese) {
			      			if(lineDese[k] != "") {
			      				if(lineDese[k].indexOf("步行") < 0) {
			      					lineDese[k] = "乘坐" + lineDese[k];
			      				}
			      				lineDese[k] = lineDese[k].replace(/，$/g, "");
			      				transitDesc[i].push(lineDese[k]);
			      			}
			      		}
			      	}
			      }
		        for(var j = 0; j < plan.getNumLines(); j ++) {
		        	var line = plan.getLine(j);
		        	if(j != 0) {
		        		$li.find("p").append($("<span>").append(" → "));
		        	}
		        	$li.find("p").append($("<span>").append(line.title.replace(/\(.*\)/g, "")));
		        }
		        $li.find(".cards_card_entire").append($("<p>"));
		        var totalRouteDistance = 0;
		        for(var j = 0; j < plan.getNumRoutes(); j ++) {
		        	var route = plan.getRoute(j);
		        	totalRouteDistance += route.getDistance(false);
		        }
		        $li.find("p").eq(1).append($("<span>").addClass("layout-12px layout-666").html("<img src='http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/mark_duration.png' />" + plan.getDuration(true) + "&nbsp;&nbsp;&nbsp;<img src='http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/mark_distance.png' />" + plan.getDistance(true) + "&nbsp;&nbsp;&nbsp;<img src='http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/mark_walk.png' />步行" + totalRouteDistance + "米"));
		        $("#mainer").append($li);
		      }
		      // Draw Route
					$("#mainer .cards_card").click(function() {
						drawTransit($(this).index(), results, origin, destination);
						$("#mainer").hide();
			      for(var i in transitDesc[$(this).index()]) {
			      	if(i == 0) {
				        var $div = $("<div>").addClass("cards_card_mark left");
				        $div.append($("<p>"));
				        $div.children("p").append($("<span>").html($("<img>")
				        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_origin.png")
				        	.attr("style", "width: 12px; vertical-align: middle")));
				        $("#sub > div").html($div);		      		
				        $div = $("<div>").addClass("cards_card_mark right");
				        $div.append($("<p>"));
				        $div.children("p").append($("<span>").html(responseObj.body[0].content[2]));
				        $("#sub > div").append($div);
				        $("#sub > div").append($("<div>").addClass("clear"));
			      	}
			        $("#sub > div").append($("<hr/>"));
			        $div = $("<div>").addClass("cards_card_mark left");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(parseInt(i) + 1));
			        $("#sub > div").append($div);
			        $div = $("<div>").addClass("cards_card_mark right");
			        $div.append($("<p>"));
			        $div.children("p").append($("<span>").html(transitDesc[$(this).index()][i]));
			        $("#sub > div").append($div);
			        $("#sub > div").append($("<div>").addClass("clear"));
			      	if(i == transitDesc[$(this).index()].length - 1) {
			      		$("#sub > div").append($("<hr/>"));
				        var $div = $("<div>").addClass("cards_card_mark left");
				        $div.append($("<p>"));
				        $div.children("p").append($("<span>").html($("<img>")
				        	.attr("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/sub_destination.png")
				        	.attr("style", "width: 12px; vertical-align: middle")));
				        $("#sub > div").append($div);		      		
				        $div = $("<div>").addClass("cards_card_mark right");
				        $div.append($("<p>"));
				        $div.children("p").append($("<span>").html(responseObj.body[0].content[3]));
				        $("#sub > div").append($div);
				        $("#sub > div").append($("<div>").addClass("clear"));
			      	}		        
			      }
						$("#route").html($(this).find("p").eq(0).html() + "<br/>" + $(this).find("p").eq(1).children("span").html().split("&nbsp;&nbsp;&nbsp;")[0].replace(/\<img.*\>/g, "") + " / " + $(this).find("p").eq(1).children("span").html().split("&nbsp;&nbsp;&nbsp;")[1].replace(/\<img.*\>/g, "") + " / " + $(this).find("p").eq(1).children("span").html().split("&nbsp;&nbsp;&nbsp;")[2].replace(/\<img.*\>/g, ""));
						$("#toggle").show();
					})
		      // Delete Anchor
		      $(".anchorBL img").hide();
					$(".BMap_cpyCtrl.BMap_noprint.anchorBL").hide();
					// Layout
					if(results.getNumPlans() == 0) {
						CMWW.showDialog("未查询到结果", []);
					} else {
						$("#mainer").show();
						$("#sub").hide();
						$("#toggle").hide();						
					}
				}
			});
			map.clearOverlays();
			transitRoute.search(origin, destination);
		}

		function drawTransit(n, results, origin, destination) {
		  // Draw Route
		  map.clearOverlays();
			var drawPlan = results.getPlan(n);
			for(var i = 0; i < drawPlan.getNumRoutes(); i ++) {    
				var walk = drawPlan.getRoute(i);
				drawBounds(walk.getPath());
				if (walk.getDistance(false) > 0) {
					map.addOverlay(new BMap.Polyline(walk.getPath(), {strokeColor: "#1cbd24"}));    
				}    
			}
			for (i = 0; i < drawPlan.getNumLines(); i ++) {    
				var line = drawPlan.getLine(i);
				drawBounds(line.getPath());
				map.addOverlay(new BMap.Polyline(line.getPath(), {strokeColor: "#2360dd"})); 
        if(line.type == BMAP_LINE_TYPE_BUS) {
        	map.addOverlay(new BMap.Marker(line.getGetOnStop().point, {icon: new BMap.Icon("http://map.baidu.com/image/trans_icons.png", new BMap.Size(22, 21), {offset: new BMap.Size(10, 12), imageOffset: new BMap.Size(0, -55)})}));
        	map.addOverlay(new BMap.Marker(line.getGetOffStop().point, {icon: new BMap.Icon("http://map.baidu.com/image/trans_icons.png", new BMap.Size(22, 21), {offset: new BMap.Size(10, 12), imageOffset: new BMap.Size(0, -55)})}));
        } else if(line.type == BMAP_LINE_TYPE_SUBWAY) {
        	map.addOverlay(new BMap.Marker(line.getGetOnStop().point, {icon: new BMap.Icon("http://map.baidu.com/image/trans_icons.png", new BMap.Size(22, 21), {offset: new BMap.Size(10, 12), imageOffset: new BMap.Size(0, -76)})}));
        	map.addOverlay(new BMap.Marker(line.getGetOffStop().point, {icon: new BMap.Icon("http://map.baidu.com/image/trans_icons.png", new BMap.Size(22, 21), {offset: new BMap.Size(10, 12), imageOffset: new BMap.Size(0, -76)})}));
        }				    
			}
			map.addOverlay(new BMap.Marker(origin, {icon: new BMap.Icon("http://map.baidu.com/image/dest_markers.png", new BMap.Size(42, 34), {offset: new BMap.Size(14, 32), imageOffset: new BMap.Size(0, 0)})}));
			map.addOverlay(new BMap.Marker(destination, {icon: new BMap.Icon("http://map.baidu.com/image/dest_markers.png", new BMap.Size(42, 34), {offset: new BMap.Size(14, 32), imageOffset: new BMap.Size(0, -34)})}));
			map.setViewport(bounds);			
		}

		function drawBounds(p) {
			for(var i = 0; i < p.length; i++) {
				bounds.push(p[i]);
			}			
		}

		// Toggle Map and Plan
		$("#toggle").click(function() {
			$("#sub").toggle();
			$(this).toggleClass("on layout-fff");
			if($(this).html() == "路线详情") {
				$(this).html("<img src='http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/img/navigation/btn_navi.png' style='margin-right: 5px; width: 12px; vertical-align: center' />开始导航");
			} else {
				$(this).html("路线详情");
			}
		})

		////////// Initialize
		switch(responseObj.body[0].content[7]) {
			case "驾车":
				$("#typeSwitcher button").eq(0).addClass("light");
				driving();
			break;
			case "公交":
				$("#typeSwitcher button").eq(1).addClass("light");
				transit();
			break;
			case "步行":
				$("#typeSwitcher button").eq(2).addClass("light");
				walking();
			break;
		}
		
	}
}