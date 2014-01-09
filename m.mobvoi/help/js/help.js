var browser = {
  versions: function() {
    var u = navigator.userAgent, app = navigator.appVersion;
    return { // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1 , // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
    };
  } (),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function getRopeHeight(i) {
  var ropeHeight=parseFloat($(".bars_bar").eq(i).css("height"));
  return ropeHeight;
}
function getTotalRopeHeight(n) {
  var totalRopeHeight=0;
  for(var i=0; i<n; i++) {
    totalRopeHeight=totalRopeHeight+getRopeHeight(i);
  }
  return totalRopeHeight;
}
function setRopeHeight() {
  for(var i=0; i<10; i++) {
    var ropeHeight=getRopeHeight(i);
    $(".rope").eq(i).css("height", ropeHeight+"px");
    if(browser.versions.ios==true) {  $(".lines").addClass("ios"); }
    else { $(".lines_line").eq(i).css("width", ropeHeight/2+"px"); }
  }
  var lastHeight=parseFloat($(".rope:last").css("height"))+55;
  $(".rope:last").css("height",lastHeight+"px");
}
function swipeLine(){
  var wrapperTop=parseFloat($(".wrapper").css("top"))+parseFloat($(".footer").css("height"));
  var passedRope=document.body.scrollTop+document.body.clientHeight-wrapperTop;   
  for(var n=0; n<10; n++) {
    var totalRopeHeight=getTotalRopeHeight(n);
    if(passedRope<totalRopeHeight) {
      $(".lines").attr("data-css-visible",n); 
      break; 
    }
  }
}
function moveLine() {
  var wrapperTop=parseFloat($(".wrapper").css("top"))+parseFloat($(".footer").css("height"));
  var passedRope=document.body.scrollTop+document.body.clientHeight-wrapperTop;
  var lineLeft=0-passedRope-10;
  $(".lines").css("left",lineLeft/2+"px");
  setTimeout(arguments.callee,15)
}
function intializeLayout() {
  setRopeHeight();
  if(browser.versions.ios==true) { 
    swipeLine();
    window.onscroll=function(){
      swipeLine();
    }
  }
  else { 
    moveLine(); 
  }
}

function togglePage(p) {
  $(".wrapper").html(template.render("wrapper_" + p, response));
  $(".sider").html(template.render("sider_" + p, response));
  $(".footer").html(template.render("footer_" + p, response));
  $(".tablet span").removeClass("on"); $(".tablet ." + p).addClass("on");
  intializeLayout();
  $(".bars_bar_onebox_title").click(function(){
    var oneboxDetail=$(this).parent().find(".bars_bar_onebox_content").css("display");
    $(".bars_bar_onebox_content").hide();
    $(".bars_bar_onebox").removeClass("on");
    if (oneboxDetail=="none") {
      $(this).parent().addClass("on");
      $(this).parent().find(".bars_bar_onebox_content").show();
  }
  setTimeout(function(){setRopeHeight()},300)
  })
}

var view = window.location.href.split("#")[1];
togglePage("newest");