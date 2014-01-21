// judge net environment
var urlPrefix, appId;
if (window.location.host == "localhost.weiyuyi") {
  urlPrefix = "/y";
} else {
  urlPrefix = "";
}

function tree() {
  var leaf;
  var times = 0;
  this.init = function(params) {
    document.write('<link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/yuyiguo.tree.css" />')
    var addChildren = function () {
      for(var i in leaf) {
        if ((typeof(leaf[i]) == "object" && leaf[i].party != null) || (typeof(leaf[i]) == "object" && leaf[i].party != "")) {
          if(checkParent(leaf[i].party) == true) {
            $("#tree_ul_" + leaf[i].party.replace(/public./g, "public_dot_")).append("<li id='" + leaf[i].name.replace(/public./g, "public_dot_") + "' class='" + leaf[i].party + "'><span id='tree_span_" + leaf[i].name.replace(/public./g, "public_dot_") + "'></span><label class='checkbox'><input type='checkbox' name='" + leaf[i].id + "' />" + leaf[i].name + " (" + leaf[i].comment + ") </label><ul id='tree_ul_" + leaf[i].name.replace(/public./g, "public_dot_") + "'></ul></li>")
            $("#tree_ul_" + leaf[i].party.replace(/public./g, "public_dot_")).addClass("enabledSpread");
            $("#tree_span_" + leaf[i].party.replace(/public./g, "public_dot_")).html("<img id='tree_img_" + leaf[i].party.replace(/public./g, "public_dot_") + "' src='http://www.weiyuyi.com/oss/assets/img/plus.png' />");
            $("#tree_span_" + leaf[i].party.replace(/public./g, "public_dot_")).addClass("on");
            leaf.splice(i, 1, leaf[i].name);
          }
        }
      }
      times ++;
      console.dir(leaf)
      if(times < 5) {
        addChildren();
      }
    }
    var checkParent = function(party) {
      var r = false;
      for(var i in leaf) {
        if(party == leaf[i]) {
          return true;
        }
      }
      if(r == true) {
        return true;
      } else {
        return false;
      }
    }
    $.ajax({
      async: true,
      type: "GET",
      url: urlPrefix + "/apps/" + params.appId + "/tasks.json",
      dataType: "json",
      success: function(rawData) {
        leaf = rawData;
        console.dir(leaf)
        var html = "";
        for(var i in leaf) {
          if((typeof(leaf[i]) == "object" && leaf[i].party == null) || (typeof(leaf[i]) == "object" && leaf[i].party == "")) {
            html += "<li id='" + leaf[i].name.replace(/public./g, "public_dot_") + "'><span id='tree_span_" + leaf[i].name.replace(/public./g, "public_dot_") + "'></span><label class='checkbox'><input type='checkbox' name='" + leaf[i].id + "' />" + leaf[i].name + " (" + leaf[i].comment + ") </label><ul id='tree_ul_" + leaf[i].name.replace(/public./g, "public_dot_") + "'></ul></div></li>";
            leaf.splice(i, 1, leaf[i].name);
          }
        }
        $("#" + params.container).html('<div id="tree_window"></div>');
        $("#tree_window").html(html);
        addChildren();
        if(params.spread == true) {
          $("#tree_window ul.enabledSpread").css("display", "block");
          $("#tree_window img").attr("src", "http://www.weiyuyi.com/oss/assets/img/minus.png");
        }
        $("#tree_window input").click(function() {
          var html = "", num = 0;
          for(var i = 0; i < leaf.length; i ++) {
            if($("#tree_window input:eq(" + i + ")").prop("checked") == true) {
              html += "<input type='hidden' name='" + params.name + "' value='" + $("#tree_window input:eq(" + i + ")").attr("name") + "' />";
            }
          }
          $("#" + params.form + " #leafs-container").remove();
          $("#" + params.form).append('<div id="leafs-container" style="display: none"></div>');
          $("#" + params.form + " #leafs-container").html(html);
        })
        $("#tree_window img").click(function() {
          var n = $(this).attr("id").split("tree_img_")[1];
          if($("#tree_ul_" + n).css("display") == "none") {
            $("#tree_ul_" + n).css("display", "block");
            $("#tree_img_" + n).attr("src", "http://www.weiyuyi.com/oss/assets/img/minus.png");
          } else {
            $("#tree_ul_" + n).css("display", "none");
            $("#tree_img_" + n).attr("src", "http://www.weiyuyi.com/oss/assets/img/plus.png");
          }
        })        
      }
    });
  }
}