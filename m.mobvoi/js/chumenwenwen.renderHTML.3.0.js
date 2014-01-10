/* ==================================================
 * chumenwenwen.renderHTML.js v3.0
 * Copyright 2013 Mobvoi, Inc.
 * ==================================================
 * Edited by Season Li @ season.li@mobvoi.com
 * Version 3.0 revised at 2014/01/06
 * ================================================== */



function renderResponse(responseObj, ul, method) {
  renderObj[ul] = new render(responseObj);
  // Load Template
  var script = document.createElement("script");
  script.src = "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/template/" + responseObj.header.type + ".js?random=" + new Date().toLocaleString(); 
  document.head.appendChild(script);
  script.onload = function() {

    // Render .cards_card
    switch(method) {
      case "append":
        // Render .cards
        $(".wrapper").append(template.render("wrapper_" + responseObj.header.type, responseObj));
      break;
      case "change":
        $(".wrapper ul").eq(ul).replaceWith(template.render("wrapper_" + responseObj.header.type, responseObj));
      break;
    }
    // Render .showMap
    if(responseObj.header.map_option.has_header_map == true) {
      var $ele_map = renderObj[ul].header.showMap(ul);
      $ele_map.prependTo($(".cards").eq(ul));
    }    
    // Render .cards_card .result
    if(responseObj.header.is_show_header == true && responseObj.header.search_query != "") {
      var $ele_header = renderObj[ul].header.init();
      if(responseObj.header.search_query != "") {
        $ele_header.find(".cards_card_entire").append(renderObj[ul].header.showSearchquery());
      }
      // Render .cards_card .result {length}
      if(responseObj.header.page.length > 0) {
        $ele_header.append(renderObj[ul].header.showResultnumber());
      }
      // Render .cards_card .gotoSortList
      if(responseObj.header.pc_option.options.length > 0) {
        $ele_header.append(renderObj[ul].header.showSortbutton(ul));
      }
      $div = $("<div>").addClass("clear");
      $ele_header.append($div);
      $ele_header.prependTo($(".cards").eq(ul));
    }

    // Specifically Render
    switch(responseObj.header.type) {
      case "poi_one":
      case "poi_two":
        var _a = [[]];
        for(var i in responseObj.body) {
          if(parseInt(responseObj.body[i].content[6]) != 0 && parseInt(responseObj.body[i].content[7]) != 0) {
            _a[0].push([
              parseFloat(responseObj.body[i].content[6]),
              parseFloat(responseObj.body[i].content[7])
            ]);
          }
        }
        if(responseObj.body[0].action.navigation.start_point) {
          _a.push([
            parseFloat(responseObj.body[0].action.navigation.start_point.split(",")[0]),
            parseFloat(responseObj.body[0].action.navigation.start_point.split(",")[1])
          ]);
        } else {
          _a.push([0, 0])
        }
        if(responseObj.header.map_option.items[0]) {
          _a.push([
            parseFloat(responseObj.header.map_option.items[0].content[0].split(",")[0]),
            parseFloat(responseObj.header.map_option.items[0].content[0].split(",")[1])
          ]);
        }
        $(".cards").eq(ul).find(".showMap").html(JSON.stringify(_a));
      break;
      case "traffic_six":
        var _a = [[]];
        for(var i in responseObj.body) {
          if(parseInt(responseObj.body[i].content[3].split(",")[0]) != 0 && parseInt(responseObj.body[i].content[3].split(",")[1]) != 0) {
            _a[0].push([
              parseFloat(responseObj.body[i].content[3].split(",")[0]),
              parseFloat(responseObj.body[i].content[3].split(",")[1])
            ]);
          }
        }
        $(".cards").eq(ul).find(".showMap").html(JSON.stringify(_a));
      break;
    }

    // Render Callback
    if(typeof(renderObj[ul].callback) == "object") {
      if(typeof(renderObj[ul].callback[responseObj.header.type]) == "function") {
        renderObj[ul].callback[responseObj.header.type](ul);
      }
    }    
    // Render Next Response If Exists
    if(response.content[0].relevant[ul + 1]) {
      renderResponse(response.content[0].relevant[ul + 1], ul + 1, "append");
    } else {
      // Render Style
      renderStyle();
      // RenderResponse Callback
      if(typeof(renderResponseCallback) == "function") {
        renderResponseCallback();
      }
    }
  }
}



// Define Paramaters Using
var CMWW = new chumenwenwen(), mapObj = {
  map: [],
  point: []
}, renderObj = [];
// Wrap a Container to Solve the Strange Action Handler in iOS Safari
// All Action Below Register on This Container
$(".wrapper").wrap('<div data-event="CMWW"></div>');

// Render Response
if(typeof(response) == "object") {
  // Render Depending on Status
  if(response.status) {
    switch(response.status) {
      case "success": // Success
        if(response) {
          response.content[0].relevant.unshift(response.content[0].direct);
          renderResponse(response.content[0].relevant[0], 0, "append");
        }    
      break;
      case "need_location": // Need location
        renderResponse({
          header: {
            type: "error_two"
          } 
        }, 0, "append");
      break;
      default: // undifined error
        renderResponse({
          header: {
            type: "error_one"
          } 
        }, 0, "append");
      break;
    }
  }
}



// Actions
$('[data-event="CMWW"]').delegate(".gotoToggle", "click", function() {
  if(this.nextElementSibling.className.indexOf("gotoToggled") > -1) {
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
$('[data-event="CMWW"]').delegate(".gotoLink", "click", function() {
  if($.trim($(this).attr("data-link")) != "") {
    window.location.href = $(this).attr("data-link");
  }
})
$('[data-event="CMWW"]').delegate(".gotoShowDialog", "click", function() {
  CMWW.showDialog($(this).attr("data-title"), [$(this).attr("data-list-class"), $(this).attr("data-list-html"), $(this).attr("data-list-params")])
})
$('[data-event="CMWW"]').delegate(".gotoDial", "click", function() {
  if($(this).attr("data-tel") && $.trim($(this).attr("data-tel")) != "") {
    new chumenwenwen().jump.dial($.trim($(this).attr("data-tel")));
  }
})
$('[data-event="CMWW"]').delegate(".gotoMark", "click", function() {
  if($(this).attr("data-point") && $(this).attr("data-point") != "") {
    new chumenwenwen().jump.mark([eval("[" + "'" + $.trim($(this).attr("data-point").split(",")[0]) + "','" + $.trim($(this).attr("data-point").split(",")[1]) + "','" + $.trim($(this).attr("data-point").split(",")[2]) + "']")]);
  }
})
$('[data-event="CMWW"]').delegate(".gotoNavigation", "click", function() {
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
$('[data-event="CMWW"]').delegate(".gotoPlay", "click", function() {
  if($(this).parent().find("audio")[0].paused) {
    $("audio").each(function(i) {
      if(!$(this)[0].paused) {
        $(this).parent().children("img").attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play-black.png");
        $(this)[0].pause();
      }
    })
    $(this).parent().children("img").attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/pause-black.png");    
    $(this).parent().find("audio")[0].play();
  } else {
    $(this).parent().children("img").attr("src", "http://mobvoi-one-box.oss.aliyuncs.com/web/img/play-black.png");
    $(this).parent().find("audio")[0].pause();
  }
})
$('[data-event="CMWW"]').delegate(".gotoVoice", "click", function() {
  $(this).parent().find("audio")[0].play();
})
// Sort List
$('[data-event="CMWW"]').delegate(".gotoSortList", "click", function() {
  CMWW.searchpcAjax($('[data-title="请选择排序方式"]').parent().parent().parent().parent().index(), JSON.parse($(this).attr("data-params").replace(/'/g, '"')))
})   
//if(browser.versions.wechat == true) {
//  CMWW.share.init({title: responseObj.header.task_name + " 出门问问", desc: "我在出门问问找到了 “" + responseObj.header.query + "”", img: "http://mobvoi-one-box.oss.aliyuncs.com/web/img/logo-white.png", url: window.location.href});
//  CMWW.share.wechatReady();
//}



/*
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
      CMWW.search("query", "querySearch", responseObj.header.appkey);
    }
    $("#query").val(responseObj.header.query);
  }
*/