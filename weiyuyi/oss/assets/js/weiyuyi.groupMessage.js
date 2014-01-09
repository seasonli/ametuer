$(":radio").prop("checked", false);
var write_at = 0
$("[name='group_message[wechat_app_id]']:eq(0)").val(url.id);
$("[name='group_message[wechat_app_id]']:eq(1)").val(url.id);
$("[name='group_message[wechat_app_id]']:eq(2)").val(url.id);
$("[name='group_message[wechat_app_id]']:eq(3)").val(url.id);

// Register Element
$(".wrapper_cover").delegate(".wrapper_cover_article", "click", function() {
  toggleArticle($(this).index());
  write_at = $(this).index();
})
$(".wrapper_cover").delegate(".wrapper_cover_article_remove", "click", function() {
  removeArticle($(this).parent().index())
  write_at = $(this).parent().index();
  event.stopPropagation(); // Important
})
$(".wrapper_content").keyup(function() {
  if(write_at == 0) {
    $(".wrapper_cover_article_top").html($.trim($("#title").val()));
    $(".wrapper_cover_article_title:eq(" + write_at + ")").html($.trim($("#description").val()).replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;"));
    $("[name='item[title]']:eq(" + write_at + ")").val($.trim($("#title").val()));
    $("[name='item[description]']:eq(" + write_at + ")").val($.trim($("#description").val()));
  } else {
    $(".wrapper_cover_article_title:eq(" + write_at + ")").html($("#description").val());
    $("[name='item[title]']:eq(" + write_at + ")").val($.trim($("#description").val()));
  }
})
$("#imageId").delegate("img", "click", function() {
  $("[name='item[image]']:eq(" + write_at + ")").val($.trim($(this).attr("data-url")));
  $(".wrapper_cover_article:eq(" + write_at + ") img").attr("src", $.trim($(this).attr("data-url")));
  $("#imageId").hide();
})
$("#blogId").change(function() {
  $("[name='item[blog]']:eq(" + write_at + ")").val($.trim($(this).val()));
  $(".wrapper_cover_article_blog:eq(" + write_at + ")").html("<a href='" + $.trim($(this).val()) + "'>原文链接</a>");
  $("#blogId").hide();
})
$("#imageUrlConfirm").click(function() {
  $("[name='item[image]']:eq(" + write_at + ")").val($.trim($("#imageUrlInput").val()));
  $(".wrapper_cover_article:eq(" + write_at + ") img").attr("src", $.trim($("#imageUrlInput").val()));
  $("#imageUrlInput").val("");
  $("#imageUrl").hide();
})
$("#blogUrlConfirm").click(function() {
  $("[name='item[blog]']:eq(" + write_at + ")").val($.trim($("#blogUrlInput").val()));
  $(".wrapper_cover_article_blog:eq(" + write_at + ")").html("<a href='" + $.trim($("#blogUrlInput").val()) + "'>原文链接</a>");
  $("#blogUrlInput").val("");
  $("#blogUrl").hide();
})
// Define Function
function addArticle() { 
  if($(".wrapper_cover_article").length == 10) {
    alert("error: no more than 10 cards");
  }
  else {
    $(".wrapper_cover_add").before('<div class="wrapper_cover_article small roundcorner"><div class="wrapper_cover_article_grey small"></div><img src="" alt="封面图片 400*400px" /><div class="wrapper_cover_article_title small"></div><div class="wrapper_cover_article_blog small"></div><input name="item[description]" type="hidden" /><input name="item[title]" type="hidden" /><input name="item[blog]" type="hidden" /><input name="item[image]" type="hidden" /><div class="wrapper_cover_article_remove small">X</div></div>');
  }
}   
function removeArticle(i) {
  if (i == write_at) {
    toggleArticle(0);
  }
  $(".wrapper_cover_article:eq(" + i + ")").remove();
}
function toggleArticle(i) {
  if(i == 0) {
    $(".wrapper_content fieldset:eq(0)").show();
  } else {
    $(".wrapper_content fieldset:eq(0)").hide();
  }
  $("#title").val("");
  $("#description").val("");
  $("#blogId, #blogUrl").hide();
  $("#imageId, #imageUrl").hide();
  $(":radio").prop("checked", false);
  // toggle to some article
  $(".wrapper_cover_article").removeClass("on");
  $(".wrapper_cover_article:eq(" + i + ")").addClass("on");
  // fill wrapper
  if(i == 0) {
    $("#title").val($("[name='item[title]']:eq(" + i + ")").val());
    $("#description").val($("[name='item[description]']:eq(" + i + ")").val());
  } else {
    $("#description").val($("[name='item[title]']:eq(" + i + ")").val());
  }
}

$.ajax({
  async: true,
  type: "GET",
  url: "/wechat_apps/" + url.id + "/blogs.json",
  dataType: "json",
  success: function(rawData) {
    var tmp = "<option value='0'>下拉选择模版</option>";
    for (var i in rawData) {
      tmp = tmp + "<option value='" + rawData[i].public_url + "'>标题：" + rawData[i].title + "</option>";
    }
    $("#blogId").html(tmp);
  },
});
$.ajax({
  async: true,
  type: "GET",
  url: "/wechat_apps/" + url.id + "/images.json",
  dataType: "json",
  success: function(rawData) {
    var tmp = "";
    for (var i in rawData) {
      tmp = tmp + '<img style="cursor: pointer" data-url="' + rawData[i].public_url + '" src="' + rawData[i].public_url + '" /><br/><br/>';
    }
    $("#imageId").html(tmp);
  }, 
});

$("form").submit(function() {
  switch($(this).attr("data-type")) {
    case "text":
      if($.trim($("[name='group_message[title]']:eq(0)").val()) == "") {
        alert("error: miss title");
        return false;
      } else if($.trim($("[name='group_message[content]']:eq(0)").val()) == "") {
        alert("error: miss content");
        return false;
      }
      else {
        return true;
      }
    break;
    case "hybrid":
      if($.trim($("[name='group_message[title]']:eq(1)").val()) == "") {
        alert("error: miss title");
        return false;
      }
      else {
        var content = [], flag = true;
        $(".wrapper_cover_article").each(function() {
          var title = $(this).find("[name='item[title]']").val();
          var description = $(this).find("[name='item[description]']").val();
          var image = $(this).find("[name='item[image]']").val();
          var blog = $(this).find("[name='item[blog]']").val();
          if(title == "" || image == "" || blog == "") {
            alert("error: miss something");
            flag = false;
          } else {
            content.push([title, description, image, blog]);
          }
        })
        if(flag == false) {
          return false;
        } else {
          $(".wrapper-hybrid form").append("<input type='hidden' value='" + $.trim($("[name='group_message[title]']:eq(1)").val()) + "' name='group_message[title]' />");
          $(".wrapper-hybrid form").append("<input type='hidden' value='" + JSON.stringify(content) + "' name='group_message[content]' />");          
          return true;
        }       
      }
    break;
    case "onebox":
      var title = $.trim($("[name='group_message[title]']:eq(2)").val());
      var task = $.trim($("[name='group_message[task]']").val());
      var query = $.trim($("[name='group_message[query]']").val());
      if ($.trim($("[name='group_message[title]']:eq(2)").val()) == "") {
        alert("error: miss title");
        return false;
      } else if($.trim($("[name='group_message[query]']").val()) == "") {
        alert("error: miss query");
        return false;
      } else {
        return true;
      }
    break;
    case "app":
      if($.trim($("[name='group_message[title]']:eq(3)").val()) == "") {
        alert("error: miss title");
        return false;
      }
      else {
        var content = [], flag = true;
        $(".wrapper_cover_article").each(function() {
          var title = $(this).find("[name='item[title]']").val();
          var description = $(this).find("[name='item[description]']").val();
          var image = $(this).find("[name='item[image]']").val();
          var blog = $(this).find("[name='item[blog]']").val();
          if(title == "" || image == "" || blog == "") {
            alert("error: miss something");
            flag = false;
          } else {
            content.push([title, description, image, blog]);
          }
        })
        if(flag == false) {
          return false;
        } else {
          $(".wrapper-app form").append("<input type='hidden' value='" + $.trim($("[name='group_message[title]']:eq(3)").val()) + "' name='group_message[title]' />");
          var postObj = {
            content: {
              title: $("#notification_title").val(),
              summary: $("#notification_summary").val(),
              tip: "",
              action: "showAnswer",
              img_url: $("#notification_img_url").val(),
              link_url: $("#notification_link_url").val(),
              is_alarm: true,
              is_clear: true,
              is_force_start: false,
              is_show: true,
              is_vibrate: true,     
              answer: {
                cardList: [
                  {
                    card: content
                  }
                ]
              },
              messages: [
                {
                  title: $("#notification_title").val(),
                  content: $("#notification_summary").val(),
                  img_url: $("#notification_img_url").val(),
                  task: "",
                  link_url: $("#notification_link_url").val(),
                  params: [
                    {
                      key: "key",
                      keyname: "keyname",
                      value: "value"
                    }
                  ]                  
                }
              ]
            },
            devicelist: []
          }          
          $(".wrapper-app form").append("<input type='hidden' value='" + JSON.stringify(postObj) + "' name='group_message[content]' />");          
          return true;
        }       
      }
    break;
  }
  return false;
})