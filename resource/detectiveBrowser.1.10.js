/*
detecetiveUserAgent.js
Edited by Season Li @ mobvoi.com
Version 1.10 Updated at 2013/10/19
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