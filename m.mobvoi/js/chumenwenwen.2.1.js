document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/zepto.1.0.min.js"></script>');
document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/template.syntax.1.0.min.js"></script>');
document.write('<script src="http://mobvoi-one-box.oss.aliyuncs.com/web/js/detectiveBrowser.2.0.js"></script>');

function getGoogleLocation(lat, lng) {
  var x = parseFloat(lng) - 0.0065;
  var y = parseFloat(lat) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);  
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
  lat = z * Math.sin(theta);
  lng = z * Math.cos(theta);
  return [lat, lng]
};

/* 
chumenwenwen.js 
To control all html5 pages by this javascripts files of chumenwenwen @ mobvoi
Edited by Season Li @ mobvoi.com
Version 2.0 revised at 2013/11/06
*/
function chumenwenwen() {
  var share = {};
  this.share = {};
  this.share.init = function(params) {
  	share = params;
  }
  this.share.wechatReady = function() {
	  var shareInWechat = function () {
	    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
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
	    WeixinJSBridge.on('menu:share:timeline', function (argv) {
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
  this.jump.dial = function(number) {
    var tpl;
    if(browser.versions.wechat == false) {
      tpl = '<div class="alert layout-16px" onClick="$(this).remove()"><div onClick="window.location.href=\'tel:' + number + '\'" class="alert_entire"><div>拨号给 ' + number + '</div></div></div>';
    } else {
      tpl = '<div class="alert layout-16px" onClick="$(this).remove()"><div class="alert_entire"><div>联系电话 ' + number + '</div></div></div>';
    }
    $("body").prepend(tpl);
    $(".alert").show();
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