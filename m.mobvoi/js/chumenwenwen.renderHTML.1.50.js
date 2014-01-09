$(".wrapper").html(template.render("wrapper", response));
$("title").prepend(response.content[0].direct.header.task_name);
// Share in Wechat
(function () {
  var dataForWechat = {
    appId: "",
    fakeid: "",
    title: response.content[0].direct.header.task_name + " 出门问问",
    desc: "我在出门问问找到了 “" + response.content[0].direct.header.query + "”",
    MsgImg: "http://mobvoi-one-box.oss.aliyuncs.com/web/img/logo-white.png",
    TLImg: "http://mobvoi-one-box.oss.aliyuncs.com/web/img/logo-white.png",
    url: window.location.href,
  };
  var shareInWechat = function () {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid": dataForWechat.appId,
        "title": dataForWechat.title,
        "desc": dataForWechat.desc,
        "img_url": dataForWechat.MsgImg,
        "img_width": "120px",
        "img_height": "120px",
        "link": dataForWechat.url,          
      });
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      WeixinJSBridge.invoke('shareTimeline', {
        "appid": dataForWechat.appId,
        "title": dataForWechat.title,
        "desc": "",
        "img_url": dataForWechat.TLImg,
        "img_width": "120px",
        "img_height": "120px",
        "link": dataForWechat.url,        
      });
    });
  };
  if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', shareInWechat, false);
  } else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', shareInWechat);
    document.attachEvent('onWeixinJSBridgeReady', shareInWechat);
  }
}) ();

$(function() {
  if(response.content[0].direct.header.is_show_header == true) { // Render .cards_card.result
    var tmp = '<li class="cards_card result"><div class="cards_card_entire"><p><span class="layout-444">' + response.content[0].direct.header.search_query + '</span></p><p>';
    if(response.content[0].direct.header.page.length > 0) {
      tmp += '<span id="total" class="layout-999">' + response.content[0].direct.header.page.total + ' 条结果</span>';
    }
    if(response.content[0].direct.header.map_option.has_map_marker == true) {
      document.write('<script src="http://webapi.amap.com/maps?v=1.2&key=34829261c99d4d03198ed5ff56a56840"></script>');
      tmp += '<span class="layout-fright gotoSpreadMarks"><img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/button-marker.png" style="vertical-align: top; width: 25px" /></span>';
    }
    tmp += '</p></div></li>';
    $(".cards").prepend(tmp);
  }
  switch(response.content[0].direct.header.type) {
    case "poi_one":
    case "poi_two":
      $(".dial").click(function() {
        if($(this).attr("data-tel") != "") {
          new chumenwenwen().dial($(this).attr("data-tel"));
        }
      });
      $(".point").click(function() {
        new chumenwenwen().map.point([eval("[" + $(this).attr("data-point") + "]")]);
      }); 
      break;
    case "map_one":
      $(".cards_img img").attr("src", "http://api.map.baidu.com/staticimage?center=" + response.content[0].direct.body[0].content[1] + "," + response.content[0].direct.body[0].content[0] + "&markers=" + response.content[0].direct.body[0].content[2].substr(0,4) + "|" + response.content[0].direct.body[0].content[1] + "," + response.content[0].direct.body[0].content[0] + "&width=640&height=320&zoom=15")
      $(".point").click(function() {
        new chumenwenwen().map.point([eval("[" + $(this).attr("data-point") + "]")]);
      });      
      break;
    case "map_two":
      var mapObj = new AMap.Map("showMap", {  
        center: new AMap.LngLat(response.content[0].direct.body[0].content[5].split(",")[1], response.content[0].direct.body[0].content[5].split(",")[0]),
        level: 13,
        dragEnable: false,
        zoomEnable: false,
        doubleClickZoom: false,
        scrollWheel: false,
      });
      var start_xy = new AMap.LngLat(response.content[0].direct.body[0].content[5].split(",")[1], response.content[0].direct.body[0].content[5].split(",")[0]); 
      var end_xy = new AMap.LngLat(response.content[0].direct.body[0].content[6].split(",")[1], response.content[0].direct.body[0].content[6].split(",")[0]);
      function driving_route() {  
        var MDrive;  
        mapObj.plugin(["AMap.Driving"], function() {  
          var DrivingOption = {  
            policy: AMap.DrivingPolicy.LEAST_TIME   
          };          
          MDrive = new AMap.Driving(DrivingOption); //构造驾车导航类   
          AMap.event.addListener(MDrive, "complete", driving_routeCallBack); //返回导航查询结果  
          MDrive.search(start_xy, end_xy); //根据起终点坐标规划驾车路线  
        });  
      }  
      //导航结果展示  
      function driving_routeCallBack(data) {  
        console.log(data);  
        var routeS = data.routes;  
        for(var v =0; v< routeS.length;v++) {  
          steps = routeS[v].steps  
          var route_count = steps.length;  
          var distance = routeS[v].distance;  
        }   
        drivingDrawLine();               
      }  
      //绘制驾车导航路线  
      function drivingDrawLine(s) {    
        var sicon = new AMap.Icon({  
          image: "http://www.amap.com/images/poi.png",  
          size:new AMap.Size(44,44),  
          imageOffset: new AMap.Pixel(-334, -180)  
        });  
        var startmarker = new AMap.Marker({  
          icon : sicon, //复杂图标  
          visible : true,   
          position : start_xy,  
          map:mapObj,  
          offset: {  
            x : -16,  
            y : -40  
          }  
        });  
        var eicon = new AMap.Icon({  
          image: "http://www.amap.com/images/poi.png",  
          size:new AMap.Size(44,44),  
          imageOffset: new AMap.Pixel(-334, -134)  
        });  
        var endmarker = new AMap.Marker({  
          icon: eicon, //复杂图标  
          visible : true,   
          position : end_xy,  
          map:mapObj,  
          offset: {  
            x: -16,  
            y: -40  
          }  
        });  
        //起点到路线的起点 路线的终点到终点 绘制无道路部分  
        var extra_path1 = new Array();  
        extra_path1.push(start_xy);  
        extra_path1.push(steps[0].path[0]);  
        var extra_line1 = new AMap.Polyline({  
          map: mapObj,  
          path: extra_path1,  
          strokeColor: "#9400D3",  
          strokeOpacity: 0.7,  
          strokeWeight: 4,  
          strokeStyle: "dashed",  
          strokeDasharray: [10, 5]  
        });  
      
        var extra_path2 = new Array();  
        var path_xy = steps[(steps.length-1)].path;  
        extra_path2.push(end_xy);  
        extra_path2.push(path_xy[(path_xy.length-1)]);  
        var extra_line2 = new AMap.Polyline({  
          map: mapObj,  
          path: extra_path2,  
          strokeColor: "#9400D3",  
          strokeOpacity: 0.7,  
          strokeWeight: 4,  
          strokeStyle: "dashed",  
          strokeDasharray: [10, 5]  
        });  
          
        var drawpath = new Array();  
        for(var s=0; s<steps.length; s++){  
          drawpath = steps[s].path;  
          var polyline = new AMap.Polyline({  
            map: mapObj,  
            path: drawpath,  
            strokeColor: "#9400D3",  
            strokeOpacity: 0.7,  
            strokeWeight: 4,  
            strokeDasharray: [10, 5]  
          });  
        }  
        mapObj.setFitView();  
      }
      driving_route();
      $(".navigation").click(function() {
        new chumenwenwen().map.navigation([eval("[" + $(this).attr("data-point-from") + "]"), eval("[" + $(this).attr("data-point-to") + "]"), $(this).attr("data-point-mode")]);
      });    
      break;
    case "traffic_four":
      document.write('<script src="http://webapi.amap.com/maps?v=1.2&key=34829261c99d4d03198ed5ff56a56840"></script>');
      var loadMap = function () {
        var mapObj = new AMap.Map("showMap", {  
          center: new AMap.LngLat(response.content[0].direct.header.map_option.items[0].content[0].split(",")[1], response.content[0].direct.header.map_option.items[0].content[0].split(",")[0]),
          level: 13,
          dragEnable: false,
          zoomEnable: false,
          doubleClickZoom: false,
          scrollWheel: false,
        });
        var trafficLayer = new AMap.TileLayer.Traffic({zIndex:10});
        trafficLayer.setMap(mapObj);
      }
      setTimeout(loadMap, 2500);
      break;
    case "traffic_two":
      $(".cards_card").click(function () {
        var i = this.id.split("cards_card_")[1];
        if ($("#cards_toggle_" + i).css("display") == "none") {
          $(".cards_card").removeClass("arrowup");
          $(this).addClass("arrowup");
          $(".cards_toggle").hide();
          $("#cards_toggle_" + i).show();
        }
        else {
          $(this).removeClass("arrowup");
          $("#cards_toggle_" + i).hide();
        }
      })
      break;
    case "traffic_five":
    case "traffic_six":
      $(".point").click(function() {
        new chumenwenwen().map.point([eval("[" + $(this).attr("data-point") + "]")]);
      });    
      $(".cards_card").click(function () {
        var i = this.id.split("cards_card_")[1];
        if ($("#cards_toggle_" + i).css("display") == "none") {
          $(".cards_card").removeClass("arrowup");
          $(this).addClass("arrowup");
          $(".cards_toggle").hide();
          $("#cards_toggle_" + i).show();
        }
        else {
          $(this).removeClass("arrowup");
          $("#cards_toggle_" + i).hide();
        }
      })
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
      $(".dial").click(function() {
        if($(this).attr("data-tel") != "") {
          new chumenwenwen().dial($(this).attr("data-tel"));
        }
      });    
      $("img").click(function() {
        $(this).parent().find("audio")[0].play();
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
  for(var i = 0; i < response.content[0].direct.header.page.length; i ++) {
    if($("#rating_" + i).attr("data-rating") == "") {
       $("#rating_" + i).parent().remove();
    } else {
      var rating = $("#rating_" + i).attr("data-rating") * 21.6;
    }
    $("#rating_indicator_" + i).css("width", rating + "px");  
  };
  if(browser.versions.wechat == true) {
    $(".share").click(function() {
      $("body").prepend('<div id="share" onClick="$(this).remove()"><img src="http://mobvoi-one-box.oss.aliyuncs.com/html/img/share.png" /></div>');
      if($(window).height() > $(document).height()) {
        $("#share").css("height", $(window).height() + "px");
      } else {
        $("#share").css("height", $(document).height() + "px");
      }
    });
  } else {
    $('.share').remove();
  }
} ())

// Render in Browser
  if((browser.versions.mobile == true && browser.versions.chrome == true) || browser.versions.dolphin == true) {
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
      new chumenwenwen().search("query", "querySearch", "test606");
    } else {
      new chumenwenwen().search("query", "querySearch", response.content[0].direct.header.appkey);
    }
    $("#query").val(response.content[0].direct.header.query);
  }



// Activity
$(".gotoSpreadMarks").click(function () {
  if(!$("#showMap").html()) {
    $(".cards_card.result").after('<li id="showMap" class="cards_img" style="height: 300px"></li>')
    var mapObj, marker;  
    mapObj = new AMap.Map("showMap", {  
      center: new AMap.LngLat(116.397428,39.90923), 
      level: 13,
      dragEnable: false,
      zoomEnable: false,
      doubleClickZoom: false,
      scrollWheel: false,
    });
    for(var i in response.content[0].direct.body) {
      marker = new AMap.Marker({                  
        icon: "http://webapi.amap.com/images/marker_sprite.png",  
        position: new AMap.LngLat(response.content[0].direct.body[i].content[7], response.content[0].direct.body[i].content[6])  
      });  
      marker.setMap(mapObj);
      mapObj.setFitView();
    }
  }
})
















