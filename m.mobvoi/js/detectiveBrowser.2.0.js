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
if(browser.versions.mobile == true) {
  browser.type = "mobile";
} else {
  browser.type = "desktop";
}
if(browser.versions.android == true) {
  browser.os = "android";
} else if(browser.versions.ios == true) {
  browser.os = "ios";
} else {
  browser.os = "others"
}
if(browser.versions.wechat == true) {
  browser.browser = "wechat";
} else if(browser.versions.yixin == true) {
  browser.browser = "yixin";
} else {
  browser.browser = "others";
}