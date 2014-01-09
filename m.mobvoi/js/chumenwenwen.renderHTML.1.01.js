$(".wrapper").html(template.render("wrapper", response));
$("title").prepend(response.content[0].direct.header.task_name);

// Share in Wechat
(function () {
  var dataForWechat = {
    appId: "",
    fakeid: "",
    title: "出门问问",
    desc: "出门问问",
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
        "img_width": "",
        "img_height": "",
        "link": dataForWechat.url,          
      });
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      WeixinJSBridge.invoke('shareTimeline', {
        "appid": dataForWechat.appId,
        "title": dataForWechat.title,
        "desc": "",
        "img_url": dataForWechat.TLImg,
        "img_width": "",
        "img_height": "",
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
  alert()
}) ();

$(function() {
  if(response.content[0].direct.header.is_show_header == true) {
    var tmp = '<li class="cards_card result"><div class="cards_card_entire"><p><span class="layout-444">' + response.content[0].direct.header.search_query + '</span></p>';
    if(response.content[0].direct.header.page.length > 0) {
      tmp += '<p><span id="total" class="layout-999">' + response.content[0].direct.header.page.length + ' 条结果</span></p>';
    }
    tmp += '</div></li>';
    $(".cards").prepend(tmp);
  }  
  switch(response.content[0].direct.header.type) {
    case "poi_one":
    case "poi_two":
    $(".dial").click(function() {
      if($(this).attr("data-tel") != "") {
        new chumenwenwen.dial($(this).attr("data-tel"), "dolphin");
      }
    })
    $(".point").click(function() {
      var i = this.id.split("_")[1];
      new chumenwenwen.map.jumpToMap("point", [[response.content[0].direct.body[i].action.navigation.start, response.content[0].direct.body[i].action.navigation.start_point.split(",")[0], response.content[0].direct.body[i].action.navigation.start_point.split(",")[1]]], "");
    })
    break;
    case "map_one":
    $(".point").click(function() {
      new chumenwenwen.map.jumpToMap("point", [[response.content[0].direct.body[0].content[2], response.content[0].direct.body[0].content[0], response.content[0].direct.body[0].content[1]]], "dolphin");
    })       
    break;
    case "map_two":
    $(".navigation").click(function() {
      new chumenwenwen.map.jumpToMap("navigation", [[response.content[0].direct.body[0].content[0], response.content[0].direct.body[0].content[5].split(",")[0], response.content[0].direct.body[0].content[5].split(",")[1]], [response.content[0].direct.body[0].content[1], response.content[0].direct.body[0].content[6].split(",")[0], response.content[0].direct.body[0].content[6].split(",")[1]], "driving"], "dolphin");
    })       
    break;
    case "traffic_four":
    var mapObj = new AMap.Map("showMap", {  
      center: new AMap.LngLat(response.content[0].direct.header.map_option.items[0].content[0].split(",")[1], response.content[0].direct.header.map_option.items[0].content[0].split(",")[0]),
      level: 13,
    });   
    var trafficLayer = new AMap.TileLayer.Traffic({zIndex:10});  
    trafficLayer.setMap(mapObj);
    break;
    case "traffic_two":
    case "traffic_six":
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
  }
  for(var i = 0; i < response.content[0].direct.header.page.length; i ++) {
    if($("#rating_" + i).attr("data-rating") == "") {
       $("#rating_" + i).parent().remove();
    } else {
      var rating = $("#rating_" + i).attr("data-rating") * 21.6;
    }
    $("#rating_indicator_" + i).css("width", rating + "px");  
  };
  $(".share").click(function() {
    $("body").prepend('<div id="share" onClick="$(this).remove()"><img src="http://mobvoi-one-box.oss.aliyuncs.com/html/img/share.png" /></div>');
    if($(window).height() > $(document).height()) {
      $("#share").css("height", $(window).height() + "px");
    } else {
      $("#share").css("height", $(document).height() + "px");
    }
  })  
} ())

// Render in Browser
  if((browser.versions.mobile == true && browser.versions.chrome == true) || browser.versions.dolphin == true || (browser.versions.gecko == true && browser.versions.mobile == false)) {
    $(".wrapper").before('<div class="header"><input id="query" class="header_input" type="text" placeholder="出门问问" /><nav id="querySearch" class="header_search" onTouchStart="$(this).addClass(\'touch\')" onTouchEnd="$(this).removeClass(\'touch\')"></nav></div>');
    $(".wrapper").css({"margin-top": parseInt($(".wrapper").css("margin-top")) + 48 + "px"});
    if(browser.versions.dolphin == true) {
      $(".wrapper").after("<div class='footer'></div>");
      $(".wrapper").css({"margin-bottom": parseInt($(".wrapper").css("margin-bottom")) + 48 + "px"});
      $(".footer").prepend("<nav class='footer_center' id='dolphinSpeak'></nav>");
      $(".footer_center").css({"background-image": "url(http://mobvoi-one-box.oss.aliyuncs.com/web/img/speak.png)", "left": document.body.clientWidth / 2 - 20 + "px"});
    }
    // $(".footer").prepend("<nav class='footer_left'></nav>");
    // $(".footer_left").css({"background-image": "url(http://mobvoi-one-box.oss.aliyuncs.com/web/img/help.png)"})
    // $(".footer").prepend("<nav class='footer_right'></nav>");
    // $(".footer_right").css({"background-image": "url(http://mobvoi-one-box.oss.aliyuncs.com/web/img/home.png)"})
    if(window.location.host != "m.mobvoi.com") {
      new chumenwenwen().search("query", "querySearch", "test606");
    } else {
      new chumenwenwen().search("query", "querySearch", response.content[0].direct.header.appkey);
    }
    $("#query").val(response.content[0].direct.header.query);
  }