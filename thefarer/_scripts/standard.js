$(function() { 
	$.post(config_basedir+"verify/_ajax_verify.php", function(data) {
		if(data!=-1) { 
			$.post(config_basedir+"_ajax_checkmails.php", function(data) { 
				if(data!=0) { $(".topnav ul.mail .news").html(data); $(".topnav ul.mail .news").css("display","block"); }
			})
			$.post(config_basedir+"_ajax_checkats.php", function(data) { 
				if(data!=0) { 
					$.post(config_basedir+"_ajax_checkat.php", function(data0) { 
						$(".topnav").append("<a href='"+config_basedir+"travel/go/"+data0+"'><ul class='at'><div class='news'></div></ul></a><div></div>"); $(".topnav ul.at .news").html(data); $(".topnav ul.at .news").css("display","block");
					})
				}
			})
		}
	})	
})
$(function() { $(".readspot").blur(function() { $('.sugspot').fadeOut(300) }) })
function check() {
	var height=$(document).height();
	var text0=$("form textarea").val(); var text1=$("form :text").val();
	if (text0.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else if (text1.length<5) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else {return true;}
}
function checktextarea() {
	var height=$(document).height();
	var text0=$("form:first textarea").val();
	if (text0.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else {return true;}
}
function checktext() {
	var height=$(document).height();
	var text1=$("form :text").val()
	if (text1.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else {return true;}
}
function checkalerttextarea() {
	var height=$(document).height();
	var text0=$("#alert_outer form textarea").val();
	if (text0.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else {return true;}
}
function checkalerttext() {
	var height=$(document).height();
	var text1=$("#alert_outer form :text").val();
	if (text1.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); return false; }
	else {return true;}
}
function closealert() { $("#alert_outer").hide(); $("#alert").html(""); $("#alert_outer").height("0"); } 

/*browsego统配,妈妈再也不用担心我学习*/
/*快速回复*/
function browsego(value) {
	$(".go_input"+value).slideToggle(300);
}
/*回复出发*/
function replygo(value) {
	var height=$(document).height(); 
	$.post(config_basedir+"verify/_ajax_verify.php", function(data) {
		if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你可能还没有登录"); }
		else { 
			var text=$(".replygo"+value).val();
			if (text.length<10) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("更远主张有用有价值的信息，请再丰富一下你的内容吧"); }
			else { 
				$.post(config_basedir+"travel/_ajax_go/_ajax_replygo.php", {text:text, id:value}, function(data) {
					$(".replygo"+value).val(""); $("#alert_outer").show(); $("#alert").html("回复成功"); $(".go_input"+value).slideUp(300); $("#alert_outer").delay(1000).hide(1);			
				})
			}
		}
	})
}
/*关注行程*/
function showslidedown(value) { $(".go_slidedown"+value).show(); }
function hideslidedown(value) { $(".go_slidedown"+value).hide(); }
function lovego(value) { 
	var height=$(document).height(); 
	$.post(config_basedir+"verify/_ajax_verify.php", function(data) {
		if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你可能还没有登录"); }
		else { 
			$.post(config_basedir+"travel/_ajax_go/_ajax_lovego.php", {go:value}, function(data) {
				if (data==0) { $("#alert_outer").show(); $("#alert").html("已取消关注"); $("#alert_outer").delay(1000).hide(1); $(".shouldernav ul.love"+value).toggleClass("on"); $(".go_sign_love"+value).toggleClass("on"); }
				else if (data==1) { $("#alert_outer").show(); $("#alert").html("已关注"); $("#alert_outer").delay(1000).hide(1); $(".shouldernav ul.love"+value).toggleClass("on"); $(".go_sign_love"+value).toggleClass("on"); } }) } }) }
function removego(value) { 
	var height=$(document).height(); 
	$("#alert_outer").show(); 
	$("#alert_outer").height(height+"px"); 
	$("#alert").html("确认删除吗，无法恢复<br/><br/><form action='"+config_basedir+"travel/go/-removego.php' method='post'><input name='mygo' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	


