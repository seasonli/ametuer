/*
detecetiveBrowser.js
Edited by Season Li @ mobvoi.com
Version 1.20 Updated at 2013/11/06
*/
var browser = {
  versions: function() {
    var u = navigator.userAgent;
    return {
      // Detective Desktop/Mobile
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // Mobile

      // Dectective Device
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // Android/UC Browser
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios
      iPhone: u.indexOf("iPhone") > -1 , // iPhone/qqHD
      iPad: u.indexOf("iPad") > -1, // iPad

      // Detective Core
      trident: u.indexOf("Trident") > -1, // IE Core
      presto: u.indexOf("Presto") > -1, // Opera Core
      webKit: u.indexOf("AppleWebKit") > -1, // Apple/Google Core
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, // Firefox Core

      // Detective Browser
      chumenwenwen: u.indexOf("com.mobvoi.baiding") > -1, // chumenwenwen
      qq: u.indexOf("QQ") > -1, // Wechat
      wechat: u.indexOf("MicroMessenger") > -1, // Wechat
      chrome: u.indexOf("Chrome") > -1, // Chrome
      dolphin: function() { // Dolphin
        try {
          if(dolphin) {
            return true;
          }
        } catch(err) {
          return false;
        }        
      } (),
    };
  } (),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/* 
chumenwenwen.js 
To control all html5 pages by this javascripts
Edited by Season Li @ mobvoi.com
Version 1.01 revised at 2013/10/28
*/
function chumenwenwen() {
  var getGoogleLocation = function(lat, lng) {
    var x = lng - 0.0065;
    var y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);  
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
    lat = z * Math.sin(theta);
    lng = z * Math.cos(theta);
    return [lat, lng]
  };
  this.map = {};
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
  this.map.navigation = function(pointArr) {
    var tpl = '<div onClick="$(this).remove()" class="alert layout-16px" style="display: block"><div class="alert_entire"><div>请选择打开方式</div></div>';
    if(browser.versions.wechat == false && browser.versions.qq == false) {
      tpl += '<div class="alert_entire">';
      if(browser.versions.android == true) {
        tpl += '<li onClick="window.location.href=\'bdapp://map/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&region=中国&src=mobvoi|chumenwenwen\'" >百度地图</li>';   
      } else if(browser.versions.iPhone == true || browser.versions.iPad == true) {
        tpl += '<li onClick="window.location.href=\'baidumap://map/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&region=中国&src=mobvoi|chumenwenwen\'" >百度地图</li>';
      }
      tpl += '</div>';
    }
    tpl += '<div class="alert_entire"><li onClick="window.location.href=\'http://api.map.baidu.com/direction?origin=name:' + pointArr[0][0] + '|latlng:' + pointArr[0][1] + ',' + pointArr[0][2] + '&destination=' + 'name:' + pointArr[1][0] + '|latlng:' + pointArr[1][1] + ',' + pointArr[1][2] + '&mode=' + pointArr[2] + '&region=中国&output=html&src=mobvoi|chumenwenwen\'">在网页中打开</li></div></div>'
    $("body").prepend(tpl);
  }
  this.map.point = function(pointArr) {
    var tpl = '<div onClick="$(this).remove()" class="alert layout-16px" style="display: block"><div class="alert_entire"><div>请选择打开方式</div></div>';
    if(browser.versions.wechat == false && browser.versions.qq == false) {
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
  this.dial = function(number) {
    var tpl;
    if(browser.versions.wechat == false && browser.versions.qq == false) {
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
    var getUserid = function () {
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
    var requestCheckAddress = function () { // judge if address is needed
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