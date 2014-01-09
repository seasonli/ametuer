// judge net environment
var urlPrefix, appId;
if (window.location.host == "localhost.mobvoi") {
  urlPrefix = "/w";
} else {
  urlPrefix = "";
}

function tree() {
  var leaf;
  var times = 0;
  this.init = function(params) {
    document.write('<link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/weiyuyi.tree.css" />')
    var addChildren = function () {
      for(var i in leaf) {
        if ((typeof(leaf[i]) == "object" && leaf[i].parent_id != null) || (typeof(leaf[i]) == "object" && leaf[i].parent_id != "")) {
          if(checkParent(leaf[i].parent_id) == true) {
            $("#tree_ul_" + leaf[i].parent_id).append("<li id='" + leaf[i].id + "' class='" + leaf[i].parent_id + "'><span id='tree_span_" + leaf[i].id + "'></span><label class='checkbox'><input type='checkbox' name='" + leaf[i].id + "' />" + leaf[i].name + "</label><ul id='tree_ul_" + leaf[i].id + "'></ul></li>")
            $("#tree_ul_" + leaf[i].parent_id).addClass("enabledSpread");
            $("#tree_span_" + leaf[i].parent_id).html("<img id='tree_img_" + leaf[i].parent_id + "' src='http://www.weiyuyi.com/oss/assets/img/plus.png' />");
            $("#tree_span_" + leaf[i].parent_id).addClass("on");
            leaf.splice(i, 1, leaf[i].id);
          }
        }
      }
      times ++;
      if(times < 5) {
        addChildren();
      }      
    }
    var checkParent = function(parent_id) {
      var r = false;
      for(var i in leaf) {
        if(parent_id == leaf[i]) {
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
      url: urlPrefix + "/wechat_apps/" + params.appId + "/wechat_groups.json",
      dataType: "json",
      success: function(rawData) {
        leaf = rawData;
        var html = "";
        for(var i in leaf) {
          if((typeof(leaf[i]) == "object" && leaf[i].parent_id == null) || (typeof(leaf[i]) == "object" && leaf[i].parent_id == "")) {
            html += "<li id='" + leaf[i].id + "'><span id='tree_span_" + leaf[i].id + "'></span><label class='checkbox'><input type='checkbox' name='" + leaf[i].id + "' />" + leaf[i].name + "</label><ul id='tree_ul_" + leaf[i].id + "'></ul></div></li>";
            leaf.splice(i, 1, leaf[i].id);
          }
        }
        $("#" + params.container).append('<div id="tree_window"></div>');
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
              num ++;
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


