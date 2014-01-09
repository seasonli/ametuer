(function() {
	var script = document.createElement("script");
	script.setAttribute("type", "text/html");
	script.setAttribute("id", "wrapper_train_one");
	script.innerHTML = '<ul class="cards"> <li class="cards_card layout-666" trainCalendar="true"> <div class="cards_card_triple left layout-left"> <p><span class="gotoChangeDate" data-params=\'&#123; { each header.params as val i } { if i != 0 } , { /if } "{ val.key }": "{ val.value }" { /each } , "address": "{ header.address }","task": "{ header.task }" , "appkey": "{ header.appkey }" , "version": "{ header.version }" , "output": "html_page" &#125;\'>< 前一天</span></p> </div> <div class="cards_card_triple center layout-center"> <p><span class="gotoShowCalendar">{ body[0].content[12].replace(/年/, "-").replace(/月/, "-").replace(/日/, "") }</span></p> </div> <div class="cards_card_triple right layout-right"> <p><span class="gotoChangeDate">后一天 ></span></p> </div> <div class="clear"></div> </li> { each body as val i } <li class="cards_card" train="true"> <div class="cards_card_entire"> <p><span class="layout-16px">{ val.title }</span>&nbsp;&nbsp;&nbsp;<span class="layout-999 layout-bold">{ val.content[1] }</span></p> </div> <div class="cards_card_double left layout-16px"> <p><span class="layout-green">{ val.content[2] }</span> <span class="layout-bold">{ val.content[3] }</span></p> <p><span>{ val.content[4] }</span> <span class="layout-bold">{ val.content[5] }</span></p> </div> { if val.content[0] == "ticket_failed"} <div class="cards_card_double right layout-right"><p><span class="layout-16px layout-999">获取余票失败</span></p></div> { else if val.content[0] == "already_start"} <div class="cards_card_double right layout-center"><p><span class="layout-16px layout-999">已发车</span></p></div> { else if val.content[0] == "sold_out"} <div class="cards_card_double right"><p><span>已售完</span></p></div> { else if val.content[0] == "not_reservable"} <div class="cards_card_double right"><p><span>不可预定</span></p></div> { else if val.content[0] == "not_on_sale" } <div class="cards_card_double right gotoJsCallJava"> <p><span data-alarm-timestamp="{ val.content[13] }" data-alarm-title="{ val.content[12].split("年")[1] }从{ val.content[3] }开往{ val.content[5] }的{ val.title }开始售票" class="gotoAlarm layout-block layout-bggrey layout-round10 layout-12px" style="padding: 5px 0; width: 80%; text-align: center"><span class="layout-orange">{ val.content[6] }</span><br/><img src="http://mobvoi-one-box.oss.aliyuncs.com/web/img/alarm.png" style="width: 12px; vertical-align: middle" /> 设置提醒</span></p> </div> { else } <div class="cards_card_double right"> { if val.content[8] != "" } <p><span>{ val.content[8] }</span> { if val.content[9] == 0 } <span class="layout-fff layout-bggrey layout-padding3 layout-round10">&nbsp;已售完&nbsp;</span> { else if val.content[9] > 0 && val.content[9] < 41 } <span class="layout-fff layout-borange layout-padding3 layout-round10">&nbsp;仅剩{ val.content[9] }张&nbsp;</span> { else } <span>&nbsp;{ val.content[9] }张&nbsp;</span> { /if } </p> { /if } { if val.content[10] != "" } <p><span>{ val.content[10] }</span> { if val.content[11] == 0 } <span class="layout-fff layout-bggrey layout-padding3 layout-round10">&nbsp;已售完&nbsp;</span> { else if val.content[11] > 0 && val.content[11] < 41 } <span class="layout-fff layout-borange layout-padding3 layout-round10">&nbsp;仅剩{ val.content[11] }张&nbsp;</span> { else } <span>&nbsp;{ val.content[11] }张&nbsp;</span> { /if } </p> { /if } </div> { /if } <div class="clear"></div> </li> { /each } <input type="hidden" name="date" /> </ul>';
	document.head.appendChild(script);
  script = document.createElement("script");
  script.setAttribute("src", "http://mobvoi-one-box.oss-cn-hangzhou.aliyuncs.com/web/js/train.sale.datepicker.js");
  document.head.appendChild(script);
}) ()

function renderResponseCallback() {
  if(!browser.versions.chumenwenwen) {
    $(".gotoJsCallJava").hide("");
  } else {
    $('[train="true"]').click(function() {
      if(response.content[0].direct.header.type == "train_one") {
        console.dir(response.content[0].direct.body[$(this).index() - 2]);
        window.WenwenJsOnClickHanddler.onClickJumpToTrainDetail(JSON.stringify(response.content[0].direct.body[$(this).index() - 2]));
      }
      for(var i in response.content[0].relevant) {
        if(response.content[0].relevant[i].header.type == "train_one") {
          window.WenwenJsOnClickHanddler.onClickJumpToTrainDetail(JSON.stringify(response.content[0].relevant[i].body[$(this).index() - 2]));
        }
      }
    })   
    $(".gotoAlarm").click(function(e) {
      window.WenwenJsOnClickHanddler.onClickJumpToReminderEdit($(this).attr("data-alarm-title"), parseInt($(this).attr("data-alarm-timestamp")));
      e.stopPropagation();
    })       
  }
  var params = $('[trainCalendar="true"]').find("span").eq(0).attr("data-params").replace(/\n/g, "").replace(/ /g, "").replace(/'/g,'"');
  params = JSON.parse(params);
  var _timestamp_ = new Date(params.departure_date.replace("-", "/").replace("-", "/")).getTime();
  params.departure_date = new Date((_timestamp_ - 86400000)).getFullYear() + "-" + (new Date((_timestamp_ - 86400000)).getMonth() + 1) + "-" + new Date((_timestamp_ - 86400000)).getDate();
  $('[trainCalendar="true"]').find("span").eq(0).attr("data-params", JSON.stringify(params));
  params.departure_date = new Date((_timestamp_ + 86400000)).getFullYear() + "-" + (new Date((_timestamp_ + 86400000)).getMonth() + 1) + "-" + new Date((_timestamp_ + 86400000)).getDate();
  $('[trainCalendar="true"]').find("span").eq(2).attr("data-params", JSON.stringify(params));

  $(".gotoChangeDate").click(function() {
    var params = $(this).attr("data-params").replace(/\n/g, "").replace(/ /g, "").replace(/'/g,'"');
    params = JSON.parse(params);
    params.departure_time = "0-24";
    var QUERY = {};
    QUERY.protocol = "http://";
    QUERY.host = "m.mobvoi.com";
    QUERY.path = "/search/pc/" + params.task.split(".")[1];
    QUERY.search = "?";
    for(var idx in params) {
      QUERY.search += idx + "=" + params[idx] + "&";     
    }
    window.location.href = QUERY.protocol + QUERY.host + QUERY.path + QUERY.search;
  })

  $(".gotoShowCalendar").click(function() {
    $("<div>").addClass("dialog_bg")
    .prependTo($("<div>")
    .addClass("dialog")
    .prependTo($('[data-event="CMWW"]')));
    $("<div>").addClass("dialog_content").appendTo($(".dialog"));
    $('[name="date"]').datepicker();
    $(".dialog").addClass("show");
    $(".dialog_bg").click(function() {
      $(".dialog").removeClass("show");
      setTimeout('$(".dialog").remove()', 500);
    })
  })
  $('[name="date"]').change(function() {
    var params = $('[trainCalendar="true"]').find("span").eq(0).attr("data-params").replace(/\n/g, "").replace(/ /g, "").replace(/'/g,'"');
    params = JSON.parse(params);
    params.departure_date = $(this).val();
    params.departure_time = "0-24";
    var QUERY = {};
    QUERY.protocol = "http://";
    QUERY.host = "m.mobvoi.com";
    QUERY.path = "/search/pc/" + params.task.split(".")[1];
    QUERY.search = "?";
    for(var idx in params) {
      QUERY.search += idx + "=" + params[idx] + "&"; 
    }
    window.location.href = QUERY.protocol + QUERY.host + QUERY.path + QUERY.search;
  })
  $(".calendar div").click(function() {
    $(".dialog").removeClass("show");
    setTimeout('$(".dialog").remove()', 500);
  })
}