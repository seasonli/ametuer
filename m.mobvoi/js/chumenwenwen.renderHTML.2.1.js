var CMWW = new chumenwenwen();



/********** Render Data **********/
$(".wrapper").html(template.render("wrapper", response)); // Render .wrapper
/********** Render Data(Just for App-response) **********/
if(response.content[0].direct) {
  $("title").prepend(response.content[0].direct.header.task_name); // Render title
  if(response.content[0].direct.header.is_show_header == true) { // Render .cards_card.result
    var tmp = '<li class="cards_card result"><div class="cards_card_entire"><p><span class="layout-444">' + response.content[0].direct.header.search_query + '</span></p><p>';
    if(response.content[0].direct.header.page.length > 0) {
      tmp += '<span id="total" class="layout-999">' + response.content[0].direct.header.page.total + ' 条结果</span>';
    }
    if(response.content[0].direct.header.map_option.has_map_marker == true) {
      tmp += '<span class="gotoSpread layout-fright"><img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/button-marker.png" style="vertical-align: top; width: 25px" /></span>';
      $(".cards").prepend('<li class="cards_img showMap markMap gotoSpreaded layout-fff" style="position: absolute; opacity: 0; width: 100%; height: 270px"></li>')
    }
    tmp += '</p></div></li>';
    $(".cards").prepend(tmp);
  }
  switch(response.content[0].direct.header.type) {
    case "poi_one":
    case "poi_two":
      var c = "[";
      for(var i in response.content[0].direct.body) {
        if(response.content[0].direct.body[i].content[6] != 0 && response.content[0].direct.body[i].content[7] != 0) {
          c += "[" + response.content[0].direct.body[i].content[6] + ", " + response.content[0].direct.body[i].content[7] + ", " + response.content[0].direct.body[i].title + ", 离我" + response.content[0].direct.body[i].content[5] + ", " + response.content[0].direct.body[i].link_url + "], ";
        }
      }
      c += '<div id="mapBoard" class="gotoLink" style="display: none; z-index: 1; position: absolute; left: 0; top: 0; padding: 5px 10px; width: 150px; -moz-box-shadow: 1px 1px 3px #777777; -webkit-box-shadow: 1px 1px 3px #777777; box-shadow: 1px 1px 3px #777777; background: #ffffff; color: #333333"></div>';
      $(".cards_img.showMap").html(c);
    break;
    case "traffic_six":
      var c = "[";
      for(var i in response.content[0].direct.body) {
        if(response.content[0].direct.body[i].content[3].split(",")[0] != 0 && response.content[0].direct.body[i].content[3].split(",")[1] != 0) {
          c += "[" + response.content[0].direct.body[i].content[3].split(",")[0] + ", " + response.content[0].direct.body[i].content[3].split(",")[1] + ", " + response.content[0].direct.body[i].title + ", " + response.content[0].direct.body[i].content[2] + ", " + response.content[0].direct.body[i].link_url + "], ";
        }
      }
      c += '<div id="mapBoard" class="gotoLink" style="display: none; z-index: 1; position: absolute; left: 0; top: 0; padding: 5px 10px; width: 150px; -moz-box-shadow: 1px 1px 3px #777777; -webkit-box-shadow: 1px 1px 3px #777777; box-shadow: 1px 1px 3px #777777; background: #ffffff; color: #333333"></div>';
      $(".cards_img.showMap").html(c);
    break;
  }  
}



/********** Render Style **********/
$(".rating").each(function(){ // Render .rating
  if($(this).attr("data-rating")) {
    console.log($(this).attr("data-rating"))
    $(this).html('<span class="rating_indicator" style="width: ' + $(this).attr("data-rating") * 21.6 + 'px"></span>');
  } else {
    $(this).html('<span class="rating_indicator" style="width: ' + $(this).html() * 21.6 + 'px"></span>');
  }
})
if(browser.versions.wechat == false) { // Render .gotoShareInWechat
  $('.gotoShareInWechat').remove();
}
for(var i = 0; i < $(".gotoDial").length; i ++) { // Render .gotoDial
  if($(".gotoDial")[i].attributes[0].value == "") {
    $(".gotoDial")[i].className += " grey";
  }
}
if($(".showMap")[0]) {
  var mapObj;
  $(".showMap").attr("id", "showMap");
  var d = $("#showMap").html().replace(/\[/g, "").replace(/]/g, "");
  document.write('<script src="http://webapi.amap.com/maps?v=1.2&key=34829261c99d4d03198ed5ff56a56840"></script>');
  function showMap() {
    mapObj = new AMap.Map("showMap", {  
      center: new AMap.LngLat(getGoogleLocation(parseFloat(d.split(",")[0]), parseFloat(d.split(",")[1]))[1], getGoogleLocation(parseFloat(d.split(",")[0]), parseFloat(d.split(",")[1]))[0]), level: 15, dragEnable: false, zoomEnable: false, doubleClickZoom: false, scrollWheel: false
    });
  }
  try {
    showMap();
  } catch(err) {
    setTimeout(showMap, 1000);
  }
}
if($(".markMap")[0]) {
  function markMap() {
    for(var i = 0; i < d.split(",").length - 1; i = i + 5) {
      if(isNaN(parseFloat(d.split(",")[i])) == false && isNaN(parseFloat(d.split(",")[i+1])) == false) {
        console.log(d.split(",")[i] + "," + d.split(",")[i+1] + "," + d.split(",")[i+2] + "," + d.split(",")[i+3] + "," + d.split(",")[i+4] + ",")
        var marker = new AMap.Marker({                  
          content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/point.png" style="width: 32px" onClick="$(\'#mapBoard\').css(\'display\', \'block\'); $(\'#mapBoard\').attr(\'data-link\', \'' + d.split(",")[i+4] + '\'); $(\'#mapBoard\').html(\'' + d.split(",")[i+2] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>" + d.split(",")[i+3] + "</b>" + '\')" />',
          position: new AMap.LngLat(getGoogleLocation(parseFloat(d.split(",")[i]), parseFloat(d.split(",")[i+1]))[1], getGoogleLocation(parseFloat(d.split(",")[i]), parseFloat(d.split(",")[i+1]))[0])
        });
        marker.setMap(mapObj);
        mapObj.setFitView();
      }
    }    
  }
  try {
    markMap();
  } catch(err) {
    setTimeout(markMap, 1000);
  }
}
if($(".routeMap")[0]) {
  var start_xy, end_xy;
  function driving_route() {
    var MDrive;  
    mapObj.plugin(["AMap.Driving"], function() {  
      var DrivingOption = {  
        policy: AMap.DrivingPolicy.LEAST_TIME   
      };          
      MDrive = new AMap.Driving(DrivingOption);
      AMap.event.addListener(MDrive, "complete", driving_routeCallBack); 
      MDrive.search(start_xy, end_xy); 
    });  
  }
  function driving_routeCallBack(data) {
    var routes = data.routes;  
    for(var v = 0; v < routes.length; v++) {  
      steps = routes[v].steps;
      var route_count = steps.length;  
      var distance = routes[v].distance;  
    }   
    drivingDrawLine();               
  }
  function drivingDrawLine(s) {    
    var startmarker = new AMap.Marker({  
      content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/start.png" style="width: 32px" />', visible : true, position : start_xy, map: mapObj, offset: {x: -20, y: -45}
    }); 
    var endmarker = new AMap.Marker({  
      content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/end.png" style="width: 32px" />', visible : true, position : end_xy, map: mapObj, offset: {x: -20, y: -40}
    });
    var drawpath = new Array();  
    for(var s = 0; s < steps.length; s ++){  
      drawpath = steps[s].path;  
      var polyline = new AMap.Polyline({  
        map: mapObj, path: drawpath, strokeColor: "#2c80d6", strokeWeight: 6, 
      });  
    }
    mapObj.setFitView();  
  }
  function routeMap() {
    start_xy = new AMap.LngLat(getGoogleLocation(parseFloat(d.split(",")[0]), parseFloat(d.split(",")[1]))[1], getGoogleLocation(parseFloat(d.split(",")[0]), parseFloat(d.split(",")[1]))[0]);
    end_xy = new AMap.LngLat(getGoogleLocation(parseFloat(d.split(",")[2]), parseFloat(d.split(",")[3]))[1], getGoogleLocation(parseFloat(d.split(",")[2]), parseFloat(d.split(",")[3]))[0]);
    driving_route();        
  }
  try {
    routeMap();
  } catch(err) {
    setTimeout(routeMap, 1000)
  }
}
if($(".trafficMap")[0]) {
  function trafficMap() { 
    var trafficLayer = new AMap.TileLayer.Traffic({zIndex: 10});
    trafficLayer.setMap(mapObj);
  }
  try {
    trafficMap();
  } catch(err) {
    setTimeout(trafficMap, 1000)
  }  
}
/********** Render Style(Just for App-response) **********/
if(response.content[0].direct) {
  switch(response.content[0].direct.header.type) {
    case "poi_one":
    case "poi_two":
    case "traffic_six":
      function marker() {
        var marker = new AMap.Marker({
          content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/point-me.png" style="width: 48px" />',
          position: new AMap.LngLat(getGoogleLocation(response.content[0].direct.header.address.split(",")[6], response.content[0].direct.header.address.split(",")[7])[1], getGoogleLocation(response.content[0].direct.header.address.split(",")[6], response.content[0].direct.header.address.split(",")[7])[0])
        });
        marker.setMap(mapObj);
      }
      try {
        marker();
      } catch(err) {
        setTimeout(marker, 1000)
      }  
    break;
    case "traffic_seven":
      $(".cards_card_double.right span").addClass("layout-bgreen");
      $(".cards_card_double.right span").css("width", "auto");
      $(".cards_card_double.right span").css("min-width", "50px");
      $(".cards_card_double.right span").css("padding-left", "5px");
      $(".cards_card_double.right span").css("padding-right", "5px");
    break;
    case "music_one":
      $(".control").click(function() {
        var v = this.id.split("_")[1];
        if(document.getElementById("audio_" + v).paused) {
          for(var i in response.content[0].direct.body) {
            if(!document.getElementById("audio_" + i).paused) {   
              if(i == 0 && response.content[0].direct.body[0].img_url != "") {
                $("#control_" + i).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play-black.png"); 
              } else {
                $("#control_" + i).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play.png");              
              }
              document.getElementById("audio_" + i).pause();
            }
          }
          if(v == 0 && response.content[0].direct.body[0].img_url != "") {        
            $("#control_" + v).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/pause-black.png");
          } else {
            $("#control_" + v).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/pause.png");
          }
          document.getElementById("audio_" + v).play();
        } else {
          if(v == 0 && response.content[0].direct.body[0].img_url != "") { 
            $("#control_" + v).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play-black.png");
          } else {
            $("#control_" + v).attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play.png");
          }
          document.getElementById("audio_" + v).pause();        
        }
      }) 
    break;
    case "text_one":
      $("img").click(function() {
        document.getElementById("audio").play();
      })
    break;
    case "special_one":
      $("#special_one_1").removeClass("center").addClass("left");
      $("#special_one_5").removeClass("center").addClass("right");
    break;
    case "special_two":
      $("#special_two_0, #special_two_4, #special_two_8, #special_two_12").removeClass("center").addClass("left");
      $("#special_two_3, #special_two_7, #special_two_11, #special_two_15").removeClass("center").addClass("right");
    break;
    case "web_one":
      window.location.href = response.content[0].direct.body[0].link_url;
    break;
    case "web_two":
      $(".iframe").attr("src", response.content[0].direct.body[0].link_url);
      $(".iframe").css("height", $(window).height() - 5 + "px");
    break;
    case "web_three":
      $(".iframe").attr("src", response.content[0].direct.body[0].link_url);
      $(".iframe").css("margin-top", "-90px");
      $(".iframe").css("height", $(window).height() + 85 + "px");
    break;
    case "help_one":
      window.location.href = "http://mobvoi-one-box.oss.aliyuncs.com/wechat/help/help.html";
    break;
  }

  if((browser.versions.mobile == true && browser.versions.chrome == true) || browser.versions.dolphin == true) { // Render in browser
    $("body").prepend('<div class="lipper"></div>');
    $(".lipper").css("margin-top", "48px");
    $(".lipper").after('<div class="header"><input id="query" class="header_input" type="text" placeholder="出门问问" /><nav id="querySearch" class="header_search" onTouchStart="$(this).addClass(\'touch\')" onTouchEnd="$(this).removeClass(\'touch\')"></nav></div>');
    $(".iframe").css("height", parseInt($(".iframe").css("height")) - 48 + "px");
    if(browser.versions.dolphin == true) {
      $("body").append("<div class='footer'></div>");
      $(".wrapper").css({"margin-bottom": parseInt($(".wrapper").css("margin-bottom")) + 48 + "px"});
      $(".iframe").css("height", parseInt($(".iframe").css("height")) - 48 + "px");
      $(".footer").prepend("<nav class='footer_center' id='dolphinSpeak'></nav>");
      $(".footer_center").css({"background-image": "url(http://mobvoi-one-box.oss.aliyuncs.com/web/img/speak.png)", "left": document.body.clientWidth / 2 - 20 + "px"});
    }
    if(window.location.host != "m.mobvoi.com") {
      CMWW.search("query", "querySearch", "test606");
    } else {
      CMWW.search("query", "querySearch", response.content[0].direct.header.appkey);
    }
    $("#query").val(response.content[0].direct.header.query);
  }
}



// Activity
$(".gotoToggle").click(function() {
  if(this.nextElementSibling.className.indexOf(".gotoToggled") > -1) {
    if ($(this).next().css("display") == "none") {
      $(".gotoToggle").removeClass("arrowup");
      $(this).addClass("arrowup");
      $(".gotoToggled").hide();
      $(this).next().css("display", "block");
    } else {
      $(this).removeClass("arrowup");
      $(this).next().css("display", "none");
    }
  } else if(this.nextElementSibling.nextElementSibling.className.indexOf("gotoToggled") > -1) {
    if ($(this).next().next().css("display") == "none") {
      $(".gotoToggle").removeClass("arrowup");
      $(this).addClass("arrowup");
      $(".gotoToggled").hide();
      $(this).next().next().css("display", "block");
    } else {
      $(this).removeClass("arrowup");
      $(this).next().next().css("display", "none");
    }
  }
})
$(".gotoLink").click(function() {
  if($.trim($(this).attr("data-link")) != "") {
    window.location.href = $(this).attr("data-link");
  }
})
$(".gotoSpread").click(function() {
  if($(".gotoSpreaded").css("opacity") == 0) {
    $(".gotoSpreaded").css({"position": "relative", "opacity": "1"});
  } else {
    $(".gotoSpreaded").css({"position": "absolute", "opacity": "0"});    
  }  
})
$(".gotoDial").click(function () {
  if($(this).attr("data-tel") && $.trim($(this).attr("data-tel")) != "") {
    new chumenwenwen().jump.dial($.trim($(this).attr("data-tel")));
  }
})
$(".gotoMark").click(function () {
  if($(this).attr("data-point") && $(this).attr("data-point") != "") {
    new chumenwenwen().jump.mark([eval("[" + "'" + $.trim($(this).attr("data-point").split(",")[0]) + "','" + $.trim($(this).attr("data-point").split(",")[1]) + "','" + $.trim($(this).attr("data-point").split(",")[2]) + "']")]);
  }
})
$(".gotoNavigation").click(function() {
  new chumenwenwen().jump.navigation([eval("[" + "'" + $.trim($(this).attr("data-point-from").split(",")[0]) + "','" + $.trim($(this).attr("data-point-from").split(",")[1]) + "','" + $.trim($(this).attr("data-point-from").split(",")[2]) + "','" + $.trim($(this).attr("data-point-from").split(",")[3]) + "']"), eval("[" + "'" + $.trim($(this).attr("data-point-to").split(",")[0]) + "','" + $.trim($(this).attr("data-point-to").split(",")[1]) + "','" + $.trim($(this).attr("data-point-to").split(",")[2]) + "','" + $.trim($(this).attr("data-point-to").split(",")[3]) + "']"), $.trim($(this).attr("data-point-mode"))]);
}); 
$(".gotoShareInWechat").click(function() {
  $("body").prepend('<div id="share" onClick="$(this).remove()"><img src="http://mobvoi-one-box.oss.aliyuncs.com/html/img/share.png" /></div>');
  if($(window).height() > $(document).height()) {
    $("#share").css("height", $(window).height() + "px");
  } else {
    $("#share").css("height", $(document).height() + "px");
  }
})
if(browser.versions.wechat == true) {
  CMWW.share.init({title: response.content[0].direct.header.task_name + " 出门问问", desc: "我在出门问问找到了 “" + response.content[0].direct.header.query + "”", img: "http://mobvoi-one-box.oss.aliyuncs.com/web/img/logo-white.png", url: window.location.href});
  CMWW.share.wechatReady();
}