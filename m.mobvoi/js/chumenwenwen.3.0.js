/* ==================================================
 * chumenwenwen.js v3.0
 * Copyright 2013 Mobvoi, Inc.
 * ==================================================
 * Edited by Season Li @ season.li@mobvoi.com
 * Version 3.0 revised at 2014/01/06
 * ================================================== */



// Add a Loading Mask Once Entering this Page
document.write('<style>.mask{z-index:999;position:absolute;top:0;left:0;width:100%;height:1000%;background:#f9f9f9 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAAEl21yRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUQzQUJDNUY2RjYzMTFFM0E1MzM4QUNEMzlDMzc5MjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUQzQUJDNjA2RjYzMTFFM0E1MzM4QUNEMzlDMzc5MjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRDNBQkM1RDZGNjMxMUUzQTUzMzhBQ0QzOUMzNzkyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRDNBQkM1RTZGNjMxMUUzQTUzMzhBQ0QzOUMzNzkyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtnoXzYAAAvsSURBVHjaYvz//z8D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") 50% 200px no-repeat;background-size:96px;transition:0.50s;-moz-transition:0.50s;-webkit-transition:0.50s;-o-transition:0.50s;}.mask.hide{opacity:0;}</style>');
document.write('<div class="mask"></div>'); 



// Load js Necessary
document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/zepto.1.0.min.js"></script>');
document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/template.syntax.1.0.min.js"></script>');
document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/detectiveBrowser.2.0.js"></script>');
document.write('<script src="http://api.map.baidu.com/api?v=2.0&ak=342fa60a35f6c77db6449090a7007787"></script>');



// Baidu Latitude to Google's
function getGoogleLocation(lat, lng) {
  var x = parseFloat(lng) - 0.0065;
  var y = parseFloat(lat) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);  
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
  lat = z * Math.sin(theta);
  lng = z * Math.cos(theta);
  return [lat, lng]
};



// Offer chumenwenwen HTML js api
function chumenwenwen() {
  // for Register Events
  $("body").children().eq(0).wrap('<div data-event="CMWW"></div>');
  var share = {};
  this.share = {};
  this.share.init = function(params) {
  	share = params;
  }
  this.share.wechatReady = function() {
	  var shareInWechat = function () {
	    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
	      WeixinJSBridge.invoke('sendAppMessage', {
	        "appid": "",
	        "title": share.title,
	        "desc": share.desc,
	        "img_url": share.img,
	        "img_width": "120px",
	        "img_height": "120px",
	        "link": share.url,
	      });
	    });
	    WeixinJSBridge.on('menu:share:timeline', function(argv) {
	      WeixinJSBridge.invoke('shareTimeline', {
	        "appid": "",
	        "title": share.title,
	        "desc": "",
	        "img_url": share.img,
	        "img_width": "120px",
	        "img_height": "120px",
	        "link": share.url,    
	      });
	    });
	  }
	  if (document.addEventListener) {
	    document.addEventListener('WeixinJSBridgeReady', shareInWechat, false);
	  } else if (document.attachEvent) {
	    document.attachEvent('WeixinJSBridgeReady', shareInWechat);
	    document.attachEvent('onWeixinJSBridgeReady', shareInWechat);
	  }
  }
  this.jump = {};

  this.brower = function() {
    if(document.cookie.indexOf("BLOWERFLAG=1") == -1) {
      $(".necker").before('<div class="brower"><div class="brower_icon"><img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/logo-brower.png" /></div><div class="brower_slogan"><img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/slogan-brower.png" /></div><button type="button" id="downloadApp">下载安卓版</button><nav id="shutBrower" class="brower_shut">X</nav><div class="clear"></div></div>');
    }
    document.getElementById("shutBrower").onclick = function() {
      document.getElementById("shutBrower").parentNode.parentNode.removeChild(document.getElementById("shutBrower").parentNode);
      document.cookie += "BLOWERFLAG=1";
    }
    document.getElementById("downloadApp").onclick = function() {
      window.location.href = "http://res.mobvoi.com/apk/chumenwenwen.apk";
    }
  }

  this.showDialog = function(title, listArr) {
    var $div = $("<div>").addClass("dialog");
    $div.append($("<div>").addClass("dialog_bg"));
    $div.append($("<div>").addClass("dialog_content"));
    $div.find(".dialog_content").append($("<div>").addClass("dialog_content_title").html(title));
    if(listArr.length > 0) {
      for(var i in listArr[1]) {
        $div.find(".dialog_content").append($("<hr/>"));
        $div.find(".dialog_content").append($("<div>").addClass("dialog_content_text").addClass(listArr[0]));
        $div.find(".dialog_content_text").eq(i).attr("data-params", JSON.stringify(listArr[2][i]).replace(/"/g, "'")).html(listArr[1][i]);
      }
    }
    $('[data-event="CMWW"]').prepend($div);
    setTimeout('$(".dialog").addClass("show")', 50);
    // Close Dialog
    $(".dialog_bg").click(function() {
      $(".dialog").removeClass("show");
      setTimeout('$(".dialog").remove()', 500);
    });   
  }

  this.jump.dial = function(a) {
    if(browser.versions.chumenwenwen) {
      window.location.href = "tel:" + a;
    } else {
      var $div = $("<div>").addClass("dialog");
      $div.append($("<div>").addClass("dialog_bg"));
      $div.append($("<div>").addClass("dialog_content"));
      $div.find(".dialog_content").append($("<div>").addClass("dialog_content_title").html("拨打电话"));
      $div.find(".dialog_content").append($("<hr/>"));
      $div.find(".dialog_content").append($("<div>").addClass("dialog_content_text").html(a).attr("onClick", "window.location.href = 'tel:" + a + "'"));
      $('[data-event="CMWW"]').prepend($div);
      setTimeout('$(".dialog").addClass("show")', 50);
      // Close Dialog
      $(".dialog_bg").click(function() {
        $(".dialog").removeClass("show");
        setTimeout('$(".dialog").remove()', 500);
      });
    }
  }

  this.jump.share = function(title, desc, url, img) {
    var $div = $("<div>").addClass("dialog");
    $div.append($("<div>").addClass("dialog_bg"));
    $div.append($("<div>").addClass("dialog_content"));
    $div.find(".dialog_content").append($("<div>").addClass("dialog_content_title").html("分享给朋友"));
    $div.find(".dialog_content").append($("<hr/>")).append($("<div>").addClass("dialog_content_text").html("短信分享").attr("onClick", "window.location.href = 'sms:?body=" + title + " " + desc.replace(/\n/g, " ") + "'"));
    $div.find(".dialog_content").append($("<hr/>")).append($("<div>").addClass("dialog_content_text").html("分享到QQ好友").attr("onClick", "window.open('http://connect.qq.com/widget/shareqq/index.html?url=" + url + "&desc=" + desc.replace(/\n/g, " ") + "&pics=" + img + "&site=chumenwenwen', '', 'height=640, width=960, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')"));
    $div.find(".dialog_content").append($("<hr/>")).append($("<div>").addClass("dialog_content_text").html("分享到人人网").attr("onClick", "window.open('http://widget.renren.com/dialog/share?title=" + title + "&srcUrl=" + url + "&resourceUrl=" + url + "&description=" + desc.replace(/\n/g, " ") + "&pic=" + img + "&site=chumenwenwen', '', 'height=640, width=960, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')"));
    $('[data-event="CMWW"]').prepend($div);
    setTimeout('$(".dialog").addClass("show")', 50);
    // Close Dialog
    $(".dialog_bg").click(function() {
      $(".dialog").removeClass("show");
      setTimeout('$(".dialog").remove()', 500);
    });    
  }

  this.jump.navigation = function(pointArr) {
    var tpl = '<div onClick="$(this).remove()" class="alert layout-16px" style="display: block"><div class="alert_entire"><div>请选择打开方式</div></div>';
    if(browser.versions.wechat == false) {
      tpl += '<div class="alert_entire">';
      if(browser.versions.android == true) {
        tpl += '<li onClick="window.location.href=\'bdapp://map/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&origin_region=' + pointArr[0][3] + '&destination_region=' + pointArr[1][3] + '&src=mobvoi|chumenwenwen\'" >百度地图</li>';   
      } else if(browser.versions.iPhone == true || browser.versions.iPad == true) {
        tpl += '<li onClick="window.location.href=\'baidumap://map/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&origin_region=' + pointArr[0][3] + '&destination_region=' + pointArr[1][3] + '&src=mobvoi|chumenwenwen\'" >百度地图</li>';
      }
      tpl += '</div>';
    }
    tpl += '<div class="alert_entire"><li onClick="window.location.href=\'http://api.map.baidu.com/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&origin_region=' + pointArr[0][3] + '&destination_region=' + pointArr[1][3] + '&output=html&src=mobvoi|chumenwenwen\'">在网页中打开</li></div></div>'
    $("body").prepend(tpl);
  }

  this.jump.mark = function(pointArr) {
    var tpl = '<div onClick="$(this).remove()" class="alert layout-16px" style="display: block"><div class="alert_entire"><div>请选择打开方式</div></div>';
    if(browser.versions.wechat == false) {
      tpl += '<div class="alert_entire">';
      if(browser.versions.android == true) {
        tpl += '<li onClick="window.location.href=\'bdapp://map/marker?location=' + pointArr[0][1] + ',' + pointArr[0][2] + '&title=' + pointArr[0][0] + '&content=' + pointArr[0][0] +'&src=mobvoi|chumenwenwen\'" >百度地图</li>';   
      } else if(browser.versions.iPhone == true || browser.versions.iPad == true) {
        tpl += '<li onClick="window.location.href=\'baidumap://map/marker?location=' + pointArr[0][1] + ',' + pointArr[0][2] + '&title=' + pointArr[0][0] + '&content=' + pointArr[0][0] +'&src=mobvoi|chumenwenwen\'" >百度地图</li>';
      }
      if(browser.versions.android == true) {
        tpl += '<li onClick="window.location.href=\'androidamap://viewMap?poiname=' + pointArr[0][0] + '&lat=' + getGoogleLocation(pointArr[0][1], pointArr[0][2])[0] + '&lon=' + getGoogleLocation(pointArr[0][1], pointArr[0][2])[1] + '&dev=0&sourceApplication=chumenwenwen\'" >高德地图</li>';
      } else if(browser.versions.iPhone == true || browser.versions.iPad == true) {
        tpl += '<li onClick="window.location.href=\'iosamap://viewMap?poiname=' + pointArr[0][0] + '&lat=' + getGoogleLocation(pointArr[0][1], pointArr[0][2])[0] + '&lon=' + getGoogleLocation(pointArr[0][1], pointArr[0][2])[1] + '&dev=0&sourceApplication=chumenwenwen&backScheme=chumenwenwen\'" >高德地图</li>';
      }
      tpl += '</div>';
    }
    tpl += '<div class="alert_entire"><li onClick="window.location.href=\'http://api.map.baidu.com/marker?location=' + pointArr[0][1] + ',' + pointArr[0][2] + '&title=' + pointArr[0][0] + '&content=' + pointArr[0][0] +'&src=mobvoi|chumenwenwen&output=html\'">在网页中打开</li></div></div>'
    $("body").prepend(tpl); 
  }

  this.searchpcAjax = function(ul, params) {
    $(".mask").show();
    $(".mask").removeClass("hide");
    $(".dialog").removeClass("show");
    setTimeout('$(".dialog").remove()', 500);
    var QUERY = {};
    QUERY.protocol = "http://";
    QUERY.host = "m.mobvoi.com";
    QUERY.path = "/search/pc/" + params.task.split(".")[1];
    $.ajax({
      async: true,
      type: "GET",
      url: QUERY.protocol + QUERY.host + QUERY.path,
      data: params,
      dataType: "json",
      success: function(res) {
        if(res.content[0].direct.header.type != "eav_one" && res.content[0].direct.header.type != "tip_one" && res.content[0].direct.header.type != "guide_one") {
          renderResponse(res.content[0].direct, ul, "change");
        } else {
          renderResponse(res.content[0].relevant[0], ul, "change");
        }
        renderStyle();
        $(".mask").addClass("hide");
        setTimeout('$(".mask").hide()', 500);
      }
    })    
  }
  
  this.searchpc = function(params) {
    var QUERY = {}
    QUERY.protocol = "http://";
    QUERY.host = "m.mobvoi.com";
    QUERY.path = "/search/pc/" + params.task.split(".")[1] + "?";
    QUERY.params = "";
    for(var idx in params) {
      if(idx == "output") {
        QUERY.params += "output=html_page&"
      } else {
        QUERY.params += idx + "=" + params[idx] + "&";
      }
    }
    window.location.href = QUERY.protocol + QUERY.host + QUERY.path + QUERY.params;
  }

  this.search = function(i, b, a) {
    document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/uuid.js"></script>');
    document.write('<script src="http://api.map.baidu.com/api?v2.0&ak=342fa60a35f6c77db6449090a7007787"></script>');
    var GEO = {}, QUERY = {};
    if(a == "test606") {
      QUERY.host = "http://121.197.1.222:30000/mobvoibackendcontroller";
    } else {
      QUERY.host = "http://m.mobvoi.com";
    }
    GEO.bd = {}, GEO.gg = {}, GEO.interval = 0;
    GEO.bd.status = false;
    window.onload = function () {
      GEO.bd.location = new BMap.Geolocation();
      GEO.bd.location.getCurrentPosition(function(p) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          GEO.bd.lat = p.point.lat, GEO.bd.lng = p.point.lng;
          GEO.bd.position = new BMap.Point(p.point.lng, p.point.lat), GEO.bd.geocoder = new BMap.Geocoder();
          GEO.bd.geocoder.getLocation(GEO.bd.position, function(r) {
            GEO.bd.province = r.addressComponents.province, GEO.bd.city = r.addressComponents.city.replace(/市/, ""), GEO.bd.district = r.addressComponents.district, GEO.bd.street = r.addressComponents.street, GEO.bd.streetNumber = r.addressComponents.streetNumber, QUERY.address = "中国," + GEO.bd.province + "," + GEO.bd.city + "," + GEO.bd.district + "," + GEO.bd.street + "," + GEO.bd.streetNumber + "," + GEO.bd.lat + "," + GEO.bd.lng;
            GEO.bd.status = true;
          }); 
        }      
      }, {enableHighAccuracy: true} );
    }

    var getUserid = function() {
      var cookie = document.cookie.split("; ");
      for (var i = 0, c; i < cookie.length; i++) {
        c = cookie[i].split("=");
        if (c[0] == "USERID") {
          return c[1];
        }
        else {
          var value = new UUID();
          var expire = new Date((new Date()).getTime() + 99999 * 3600000);
          expire = ";path=/;expires=" + expire.toGMTString();
          document.cookie = "USERID=" + value + expire;
          return value;
        }
      }   
    }

    var requestCheckAddress = function() { // judge if address is needed
      QUERY.user = getUserid();
      QUERY.msg = "msg" + new UUID(); // create msgid
      var requestCheckAddressUrl;
      if(a == "test606") { // for test
        requestCheckAddressUrl = "/search/qa/?query=" + QUERY.query + "&query_type=location" + "&address=,,,,,,0,0" + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=wechat_chumenwenwen&output=json";
      } else {
        requestCheckAddressUrl = "/search/qa/?query=" + QUERY.query + "&query_type=location" + "&address=,,,,,,0,0" + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=" + a + "&output=json";
      }
      $.ajax({
        async: false,
        type: "GET",
        url: requestCheckAddressUrl,
        dataType: "json",
        success: function(res) {
          QUERY.checkaddress = res.location_option.is_need;
          QUERY.example = res.location_option.content;
          requesSearch();
        }, 
        error: function(err) {
          if(a == "test606") { // for test
            if(GEO.bd.status == false) {
              GEO.bd.status = true;
              QUERY.address = "中国,陕西省,西安市,,,,34.264642646862,108.95108518068";
            } 
            QUERY.checkaddress = true;
            requesSearch();
          }
        }
      })
    }

    var requesSearch = function () {
      QUERY.user = getUserid();
      QUERY.msg = "msg" + new UUID(); // create msgid
      if(GEO.bd.status == true) {
        var requestUrl;
        if(a == "test606") { // for test
          requestUrl = QUERY.host + "/search/qa/?query=" + QUERY.query + "&query_type=" + QUERY.type + "&address=" + QUERY.address + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=wechat_chumenwenwen&output=html_page";
        } else {
          requestUrl = QUERY.host + "/search/qa/?query=" + QUERY.query + "&query_type=" + QUERY.type + "&address=" + QUERY.address + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=" + a + "&output=html_page";
        }
        window.location.href = requestUrl;
      }
      else {
        if(QUERY.checkaddress == false) {
          var requestUrl;
          if(a == "test606") { // for test
            requestUrl = QUERY.host + "/search/qa/?query=" + QUERY.query + "&query_type=" + QUERY.type + "&address=,,,,,,0,0" + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=wechat_chumenwenwen&output=html_page";
          } else {
            requestUrl = QUERY.host + "/search/qa/?query=" + QUERY.query + "&query_type=" + QUERY.type + "&address=,,,,,,0,0" + "&user_id=" + QUERY.user + "&msg_id=" + QUERY.msg + "&appkey=" + a + "&output=html_page";
          }
          window.location.href = requestUrl;
        }
        else {
          if(GEO.interval == 0) {
            $(".wrapper").after('<div class="alert" style="display: block"><div class="alert_entire"><ul>正在努力为你加载中<br/><br/>......</ul></div></div>');
          } if (GEO.interval >= 3) {
            GEO.interval = 0;
            $(".alert").remove();   
            $(".wrapper").after("<div class='alert' style='display: block' onClick='this.remove()'><div class='alert_entire'><div>换一种方式提问</div><li>由于某些原因暂时无法获取你的位置，可能无法给你想要的答案<br/>但你可以这样像这样提问<p><b>“" + QUERY.example + "</b>”</p></li><li>为什么出门问问得不到你的地址<br/><br/>1. 检查你的浏览器设置及手机设置<br/>2. 在更空旷的地方或许有更好的信号<br/>3. 可能你的浏览器不支持地理信息的获取</li></div></div>");
          }
          else {
            GEO.interval = GEO.interval + 1;
            setTimeout(arguments.callee, 1000);                
          }
        }
      }
    }
    $("#" + i).keyup(function(e) {
      if ($("#" + i).val() != "" && e.keyCode == "13") {
        QUERY.type = "text";
        QUERY.query = $("#" + i).val();
        requestCheckAddress();
      }
    });
    $("#" + b).click(function() {
      if ($("#" + i).val() != "") {
        QUERY.type = "text";
        QUERY.query = $("#" + i).val();
        requestCheckAddress();
      }
    });
    $("#dolphinSpeak").click(function() {
      var txt = "明天下雨么？, 上海好吃的牛肉面, 中关村附近找一家快捷酒店, 下午去上海的高铁, 从虹桥火车站到东方明珠怎么走, 边上有没有工行";
      var voiceResult = dolphin.getVoiceInputResult(txt);
      if(voiceResult != "") {
        QUERY.type = "voice";
        QUERY.query = voiceResult;
        requestCheckAddress();
      }
    });  
  }
}



/********** Render Header **********/
function Render(responseObj) {
  this.header = {
    init: function() {
      var $li = $("<li>").addClass("cards_card result");
      var $div = $("<div>").addClass("cards_card_entire");
      var $li = $li.append($div);
      return $li;
    }, 
    showSearchquery: function() {
      var $span = $("<span>").addClass("layout-444").html(responseObj.header.search_query);
      var $p = $("<p>").prepend($span);
      return $p; 
    }, 
    showResultnumber: function() {
      var $span = $("<span>").addClass("layout-999").html(responseObj.header.page.total + " 条结果");
      var $p = $("<p>").prepend($span);
      var $div = $("<div>").addClass("cards_card_double left").prepend($p);
      return $div;
    },
    showSortbutton: function() {
      var $span = $("<span>").addClass("alter gotoShowDialog").attr("data-title", "请选择排序方式");
      var _a_ = []; var _b_ = [];
      for(var i in responseObj.header.pc_option.options[0].pc_items) {
        _a_.push(responseObj.header.pc_option.options[0].pc_items[i].name);
      }
      $span.attr("data-list-html", JSON.stringify(_a_).replace(/"/g, "'")).attr("data-list-class", "gotoSortList");
      for(var i in responseObj.header.pc_option.options[0].pc_items) {
        if(responseObj.header.pc_option.options[0].pc_items[i].is_selected == true) {
          var _c_ = responseObj.header.pc_option.options[0].pc_items[i].name;
        }
        _b_.push({
          output: "app",
          version: responseObj.header.version,
          appkey: responseObj.header.appkey,
          task: responseObj.header.task,
          address: responseObj.header.address
        });
        for(var j in responseObj.header.params) {
          if(responseObj.header.params[j].key != "ranking_condition") {
            _b_[i][responseObj.header.params[j].key] = responseObj.header.params[j].value;
          }
        }
        _b_[i][responseObj.header.pc_option.options[0].pc_items[i].params[0].key] = responseObj.header.pc_option.options[0].pc_items[i].params[0].value;
      }
      $span.prepend(_c_).attr("data-list-params", JSON.stringify(_b_).replace(/"/g, "'"));
      var $p = $("<p>").prepend($span);
      var $div = $("<div>").addClass("cards_card_double right layout-right").prepend($p);
      return $div;    
    },
    showMap: function() {
      var $ele_map = $("<li>").addClass("cards_img showMap markMap layout-fff").css("width", "100%").css("height","240px").css("font-size", "0px");
      return $ele_map;
    }
  }
}



/********** Render Style **********/
function renderStyle() {
  $(".rating").each(function() { // Render .rating
    if(!isNaN($(this).html())) {
      $(this).html('<span class="rating_indicator" style="width: ' + $(this).html() * 21.6 + 'px">32</span>');
    }
  })
  $(".gotoDial").each(function() {
    if($(this).attr("data-tel") == "") {
      $(this).addClass("grey")
    }
  })
  if($(".showMap").length > 0) {
    var script = document.createElement("script");
    script.src = "http://webapi.amap.com/maps?v=1.2&key=34829261c99d4d03198ed5ff56a56840&callback=initMap";  
    document.head.appendChild(script);
  }
}

function initMap() {
  $(".cards").each(function() {
    if($(this).find(".showMap").html()) {
      $(".cards").eq($(this).index()).find(".showMap").attr("id", "showMap_" + $(this).index());
      showMap($(this).index());
      if($(".cards").eq($(this).index()).find(".markMap").html()) {
        markMap($(this).index());
      } 
      if($(".cards").eq($(this).index()).find(".routeMap").html()) {
        var start_xy, end_xy
        routeMap($(this).index());
      }
      if($(".cards").eq($(this).index()).find(".trafficMap").html()) {
        trafficMap($(this).index());
      }
    }
  })
}

function showMap(v) {
  mapObj.point[v] = JSON.parse($("#showMap_" + v).html());
  if(!mapObj.point[v][0][0]) {
    mapObj.point[v][0][0] = [0, 0];
    $("#showMap_" + v).hide();
  }
  mapObj.map[v] = new AMap.Map("showMap_" + v, {
    center: new AMap.LngLat(getGoogleLocation(mapObj.point[v][0][0][0], mapObj.point[v][0][0][1])[1], getGoogleLocation(mapObj.point[v][0][0][0], mapObj.point[v][0][0][1])[0]),
      level: 15,
      resizeEnable: true,
      dragEnable: false,
      doubleClickZoom: false,
      scrollWheel: false,
      touchZoom: false,
  });
  // To Solve the Problem That Could't Scroll If Touch on the Map
  var $div = $("<div>").css({
    "z-index": 7,
    "position": "relative",
    "top": 0,
    "left": 0,
    "height": $("#showMap_" + v).height() + "px",
    "width": "100%",
  })
  $("#showMap_" + v).before($div);
  $("#showMap_" + v).css("margin-top", "-" + $("#showMap_" + v).height() + "px");
}

function markMap(v) {
  for(var i in mapObj.point[v][0]) {
    //@2014/01/04   Add a Limitation to Limit 5 Points at Map 
    if(i < 5) {
      if(isNaN(mapObj.point[v][0][i][0]) == false && isNaN(mapObj.point[v][0][i][1]) == false) {
        if(mapObj.point[v][0].length > 1) {
          var marker = new AMap.Marker({                  
            content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/point.png" style="width: 30px" /><span style="position: relative; top: -39px; left: 12px; font-size: 12px; color: #808080; font-weight: bold">' + (parseInt(i) + 1) + '</span>',
            position: new AMap.LngLat(getGoogleLocation(mapObj.point[v][0][i][0], mapObj.point[v][0][i][1])[1], getGoogleLocation(mapObj.point[v][0][i][0], mapObj.point[v][0][i][1])[0]),
            offset: {x: -14, y: -25}
          });
        } else {
          var marker = new AMap.Marker({                  
            content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/point.png" style="width: 30px" />',
            position: new AMap.LngLat(getGoogleLocation(mapObj.point[v][0][i][0], mapObj.point[v][0][i][1])[1], getGoogleLocation(mapObj.point[v][0][i][0], mapObj.point[v][0][i][1])[0]),
            offset: {x: -14, y: -25}
          });          
        }
        marker.setMap(mapObj.map[v]);
        if(i != 0) {
          mapObj.map[v].setFitView();
        }
      }
    }
  }
  for(var i = 1; i < 3; i ++) {
    if(mapObj.point[v][i] && isNaN(parseFloat(mapObj.point[v][i][0])) == false && isNaN(parseFloat(mapObj.point[v][i][1])) == false) {
      var marker = new AMap.Marker({                  
        content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/point-' + i + '.png" style="width: 16px" />',
        position: new AMap.LngLat(getGoogleLocation(mapObj.point[v][i][0], mapObj.point[v][i][1])[1], getGoogleLocation(mapObj.point[v][i][0], mapObj.point[v][i][1])[0])
      });
      marker.setMap(mapObj.map[v]);
    }
  }
}

function driving_route(v) {
  var MDrive;
  mapObj.map[v].plugin(["AMap.Driving"], function() {  
    var DrivingOption = {  
      policy: AMap.DrivingPolicy.LEAST_TIME   
    };          
    MDrive = new AMap.Driving(DrivingOption);
    AMap.event.addListener(MDrive, "complete", driving_routeCallBack); 
    MDrive.search(start_xy, end_xy); 
  });
}

function driving_routeCallBack(data) {
  console.log("done");
  var routes = data.routes;  
  for(var i = 0; i < routes.length; i++) {  
    steps = routes[i].steps;
    var route_count = steps.length;  
    var distance = routes[i].distance;  
  }
  drivingDrawLine(mapObj.v);
}

function drivingDrawLine(v) {
  var startmarker = new AMap.Marker({
    content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/start.png" style="width: 30px" />',
    visible: true,
    position: start_xy,
    map: mapObj.map[v],
    offset: {x: -14, y: -30}
  }); 
  var endmarker = new AMap.Marker({  
    content: '<img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/end.png" style="width: 30px" />',
    visible: true,
    position : end_xy,
    map: mapObj.map[v],
    offset: {x: -14, y: -30}
  });
  var drawpath = new Array();  
  for(var i = 0; i < steps.length; i ++){  
    drawpath = steps[i].path;  
    var polyline = new AMap.Polyline({  
      map: mapObj.map[v],
      path: drawpath,
      strokeColor: "#2c80d6",
      strokeWeight: 5, 
    });  
  }
  mapObj.map[v].setFitView();
}

function routeMap(v) {
  start_xy = new AMap.LngLat(getGoogleLocation(mapObj.point[v][0][0][0], mapObj.point[v][0][0][1])[1], getGoogleLocation(mapObj.point[v][0][0][0], mapObj.point[v][0][0][1])[0]);
  end_xy = new AMap.LngLat(getGoogleLocation(mapObj.point[v][0][1][0], mapObj.point[v][0][1][1])[1], getGoogleLocation(mapObj.point[v][0][1][0], mapObj.point[v][0][1][1])[0]);
  mapObj.v = v;
  driving_route(v);
}

function trafficMap(v) { 
  var trafficLayer = new AMap.TileLayer.Traffic({zIndex: 10});
  trafficLayer.setMap(mapObj.map[v]);
}



// Shut Down mask If Loading Finished or More than 5s
window.onload = function() {
  setTimeout('$(".mask").addClass("hide")', 250);
  setTimeout('$(".mask").hide()', 750);
}
setTimeout('$(".mask").addClass("hide")', 4750);
setTimeout('$(".mask").hide()', 5250);