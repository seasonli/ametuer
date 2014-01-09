$("label:eq(1)").append(" <b>留空则不追踪访问数据</b>");

if(window.location.href.indexOf("edit") > 0) {
	$.ajax({
	  async: true,
	  type: "GET",
	  url: "/blogs/" + url.id + ".json",
	  dataType: "json",
	  success: function(rawData) {
	  	$("[name='blog[wechat_app_id]']").val(rawData.wechat_app_id)
	    $("[name='blog[title]']").val(rawData.title);
	    if(rawData.content.split('ga("send", "event", "download", "')[1]) {
	    	$("#label").val(rawData.content.split('ga("send", "event", "download", "')[1].split('"')[0]);
	    }		
	    var a = rawData.content.replace(/<script.*?>.*?<\/script>/ig, '');
	    setTimeout("ue.setContent('" + a + "')", 1000);
	  },
	});
}
if(window.location.href.indexOf("new") > 0) {
	$("[name='blog[wechat_app_id]']").val(url.id)
}

$("form").submit(function() {
	if($.trim($("[name='blog[title]']").val()) == "") {
		alert("error: lose something");
		return false;
	} else {
		if($.trim($("#label").val()) != "") {
		var a = '<script src="http://mobvoi-one-box.oss.aliyuncs.com/js/detectiveBrowser.2.0.js"></script>';
			a += '<script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");';
			a += 'ga("create", "UA-46226479-2", "aliyuncs.com");';
			a += 'ga("send", "pageview", {title: \'' + $("#label").val() + '\'});</script>';
			a += $("[name='blog[content]']").val();
			a += '<script>$("a").click(function(){if($(this).attr("href").indexOf("{download}") > 0){';
			a += 'var b=$(this).attr("href").split("{download}")[0];';
			a += 'if(browser.browser=="wechat"){setTimeout("window.location.href=\'http://mobvoi-one-box.oss.aliyuncs.com/weiyuyi/production/blogs/android.html?url=" + b + "&title=' + $("#label").val() + '&download=instance\'", 500);}';
			a += 'else{ga("send", "event", "download", "' + $("#label").val() + '", browser.type + "/" + browser.os + "/" + browser.browser);setTimeout("window.location.href = \'" + b + "\'", 500);}return false;}});';
			a += 'var CMWW = new chumenwenwen();CMWW.share.init({title:$("title").html(), desc: $("title").html(), img: $("img")[0].src, url: window.location.href});CMWW.share.wechatReady();</script>';
			$("[name='blog[content]']").val(a);
			return true;
		}
	}
})
