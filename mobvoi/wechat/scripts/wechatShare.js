// for share in wechat
  var dataForWeixin = {
    appId: "",
    MsgImg: "http://mobvoi-one-box.oss.aliyuncs.com/wechat/img/h5-logo-240x240.png",
    TLImg: "http://mobvoi-one-box.oss.aliyuncs.com/wechat/img/h5-logo-240x240.png",
    url: "http://mobvoi-one-box.oss.aliyuncs.com/wechat/help/help.html",
    desc: "我在出门问问找到了“" + response.query + "”",
    title: "出门问问 - " + response.taskName,
    fakeid: "",
  };
  var onBridgeReady = function () {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid": dataForWeixin.appId,
        "img_url": dataForWeixin.MsgImg,
        "img_width": "120",
        "img_height": "120",
        "link": dataForWeixin.url,
        "desc": dataForWeixin.desc,
        "title": dataForWeixin.title,
      });
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      WeixinJSBridge.invoke('shareTimeline', {
        "appid": dataForWeixin.appId,
        "img_url": dataForWeixin.TLImg,
        "img_width": "120",
        "img_height": "120",
        "link": dataForWeixin.url,
        "desc": dataForWeixin.desc,
        "title": dataForWeixin.desc + "\n来自出门问问",
      });
    });
  };
  if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  } else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  }