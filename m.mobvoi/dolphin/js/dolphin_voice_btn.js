document.write('<link rel="stylesheet" href="http://onebox.oss.aliyuncs.com/css/layout.css" />')
document.write('<script language="javascript" src="http://mobvoi-one-box.oss.aliyuncs.com/common/zepto.min.js"></script>');
document.write('<script language="javascript" src="http://api.map.baidu.com/api?v2.0&ak=342fa60a35f6c77db6449090a7007787"></script>');

window.onload = function() {
  $("body").append("<button class='sonar_btn'></button>");

  var GEO = {}; 
  GEO.bd = {};
  GEO.gg = {};
  GEO.bd.location = new BMap.Geolocation();

  var QUERY = {};

  if(window.location.href.split("address=")[1].split(",")[5] && window.location.href.split("address=")[1].split(",")[5] == "") {
    GEO.bd.location.getCurrentPosition(function(p) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        GEO.bd.lat = p.point.lat;
        GEO.bd.lng = p.point.lng;
        GEO.bd.position = new BMap.Point(p.point.lng, p.point.lat);
        GEO.bd.geocoder = new BMap.Geocoder();
        GEO.bd.geocoder.getLocation(GEO.bd.position, function(r) {
          GEO.bd.province = r.addressComponents.province;
          GEO.bd.city = r.addressComponents.city.replace(/市/, "");
          GEO.bd.district = r.addressComponents.district;
          GEO.bd.street = r.addressComponents.street;
          GEO.bd.streetNumber = r.addressComponents.streetNumber;
          QUERY.address = "中国," + GEO.bd.province + "," + GEO.bd.city + "," + GEO.bd.district + "," + GEO.bd.street + "," + GEO.bd.streetNumber + "," + GEO.bd.lat + "," + GEO.bd.lng;
          $(".footer_lbs").html(GEO.bd.city + " " + GEO.bd.district + " " + GEO.bd.street + " " + GEO.bd.streetNumber);
          GEO.bd.status = true; // make sure adress has been valued
        }); 
      }
      else {
        GEO.bd.status = false;
      }        
    }, {enableHighAccuracy: true} );
    function showPosition(p) {
      GEO.gg.lat = p.coords.latitude;
      GEO.gg.lon = p.coords.longitude;
      GEO.gg.status = true;
    }
    function showError(e) {
      GEO.gg.status = false;     
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
      GEO.gg.status = false;
    }
  }
  else if(window.location.href.split("address=")[1].split(",")[5] && window.location.href.split("address=")[1].split(",")[5] != "") {
    GEO.bd.status == true;
    GEO.gg.status == true;
    QUERY.address = window.location.href.split("address=")[1].split("&")[0];
  }

  function getUserid() { // catch userid
    var cookie = document.cookie.split("; ");
    for (var i=0, c; i < cookie.length; i++) {
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

  var waitTimes = 0;
  function requestCheckAddress() { // judge if address is needed
    QUERY.user = getUserid();
    QUERY.msg = "msg" + new UUID(); // create msgid
    var requestCheckAddressUrl = "m.mobvoi.com/search/qa/?query=" + QUERY.query
      + "&query_type=location"
      + "&address=,,,,,,0,0"
      + "&user_id=" + QUERY.user
      + "&msg_id=" + QUERY.msg
      + "&appkey=dolphin&output=json";

    $.ajax({ // Request Event
      async: false,
      type: "GET",
      url: requestCheckAddressUrl,
      dataType: "json",
      success: function(rawData) {
        QUERY.checkaddress = rawData.location_option.is_need;
        QUERY.example = rawData.location_option.content;
        requesSearch();
      }
    })
  }
  function requestSearch() {
    QUERY.user = getUserid();
    QUERY.msg = "msg" + new UUID(); // create msgid
    if(GEO.bd.status == true) {
      requestUrl = "http://m.mobvoi.com/search/qa/?query=" + QUERY.query
        + "&query_type=" + QUERY.type
        + "&address=" + QUERY.address
        + "&user_id=" + QUERY.user
        + "&msg_id=" + QUERY.msg
        + "&appkey=dolphin&output=html_page";
      window.location.href = requestUrl;
    }
    else {
      if(QUERY.checkaddress == false) {
        requestUrl = "http://m.mobvoi.com/search/qa/?query=" + QUERY.query
          + "&query_type=" + QUERY.type
          + "&address=,,,,,,0,0"
          + "&user_id=" + QUERY.user
          + "&msg_id=" + QUERY.msg
          + "&appkey=dolphin&output=html_page";
      window.location.href = requestUrl;
      }
      else {       
        if (waitTimes >= 3) {
          alert("由于某些原因暂时无法获取你的位置，可能无法给你想要的答案，但你可以这样像这样提问：" + QUERY.example);
        }
        else {
          waitTimes = waitTimes + 1;
          setTimeout(arguments.callee, 1000);                
        }
      }
    }
  }

  $(".text_input").keyup(function(e) {
    if ($('.text_input').val() != "" && e.keyCode == "13") {
      QUERY.type = "text";
      QUERY.query = $('.text_input').val();
      requestCheckAddress();
    }
  });
  $(".sonar_btn").click(function() {
    var txt = "明天下雨么？, 上海好吃的牛肉面, 中关村附近找一家快捷酒店, 下午去上海的高铁, 从虹桥火车站到东方明珠怎么走, 边上有没有工行";
    var voiceResult = dolphin.getVoiceInputResult(txt);
    if(voiceResult != "") {
      QUERY.type = "voice";
      QUERY.query = voiceResult;
      requestCheckAddress();
    }
  });


  function UUID() { 
    this.id = this.createUUID();
  }
  UUID.prototype.valueOf = function() { 
    return this.id;
  }
  UUID.prototype.toString = function() { 
    return this.id;
  }
  UUID.prototype.createUUID = function() {
    var c = new Date(1582,10,15,0,0,0,0);
    var f = new Date();
    var h = f.getTime()-c.getTime();
    var i = UUID.getIntegerBits(h,0,31);
    var g = UUID.getIntegerBits(h,32,47);
    var e = UUID.getIntegerBits(h,48,59)+"2";
    var b = UUID.getIntegerBits(UUID.rand(4095),0,7);
    var d = UUID.getIntegerBits(UUID.rand(4095),0,7);
    var a = UUID.getIntegerBits(UUID.rand(8191),0,7) + UUID.getIntegerBits(UUID.rand(8191), 8, 15) + UUID.getIntegerBits(UUID.rand(8191), 0, 7) + UUID.getIntegerBits(UUID.rand(8191),8,15) + UUID.getIntegerBits(UUID.rand(8191), 0, 15);
    return i + g + e + b + d + a
  }
  UUID.getIntegerBits = function(f, g, b){
    var a = UUID.returnBase(f,16);
    var d=new Array();var e="";
    var c=0;
    for(c=0; c < a.length; c++) {
      d.push(a.substring(c,c+1))
    }
    for(c = Math.floor(g/4); c <= Math.floor(b/4); c++) { 
      if(!d[c]||d[c]==""){ 
        e += "0"
      } 
      else { 
        e+= d[c];
      }
    } 
      return e 
  }; 
  UUID.returnBase=function(c,d) { 
    var e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    if(c < d) { 
      var b=e[c];
        } 
    else {
      var f = "" + Math.floor(c/d);
      var a=c-f*d;
      if(f>=d) {
        var b = this.returnBase(f,d)+e[a]
      }
      else {
        var b=e[f]+e[a]
      }
    }
    return b  
  }
  UUID.rand=function(a){
    return Math.floor(Math.random()*a)
  };
}

