      // Intialize 
      var postObj = {};
      postObj.group = [];

      // Intialize POST Paramters
      $("form").attr("action", urlPrefix + "/wechat_groups/" + appId);

      // Intialize Data
      requestGroup();
      window.onload = function () {
        $(".necker ul li a").click(function() {
          $(".necker ul li").removeClass("active"); $(this).parent().addClass("active");
          $('[name="wechat_group[set_operation]"]').remove();
          $('[name="wechat_group[new_name]"]').remove();
          $('[name="wechat_group[number]"]').remove();
          $("#container-back").remove();
          $("#container-filter").remove();
          $("#alert").remove();
          switch ($(this).attr("id")) {
            case "rename":
            $(".alerter").html("合并：合并当前组与其他组用户");
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="rename" />'); // 增加改名
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称
            break;
            case "clone":
            $(".alerter").html("将新建一个分组并复制所有用户");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="clone" />'); // 增加复制
            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称
            break;
            case "intersection":
            $(".alerter").html("将选中的组与本组的用户<b>合并</b>，并<b>覆盖</b>本组用户");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="intersection" />'); // 增加交集
            $("#group").show(); // 增加分组
// 10/29            $(".legger div:eq(0)").css("display", "block"); // 增加继承
// 10/29            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称
            break;
            case "union":
            $(".alerter").html("将选中的组与本组的用户取<b>交集</b>，并<b>覆盖</b>本组用户");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="union" />'); // 增加合并
            $("#group").show(); // 增加分组
// 10/29            $(".legger div:eq(0)").css("display", "block"); // 增加继承
// 10/29            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称
            break;
            case "remove":
            $(".alerter").html("从本组的用户中剔除选中的组的用户，并<b>覆盖</b>本组用户");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="remove" />'); // 增加剔除
            $("#group").show(); // 增加分组
// 10/29            $(".legger div:eq(0)").css("display", "block"); // 增加继承
// 10/29            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称
            break;
            case "sample":
            $(".alerter").html("从本组的用户中<b>随机</b>抽样给定数量的用户，并<b>覆盖</b>本组用户");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="sample" />');
            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
// 10/29            $(".legger div:eq(0)").css("display", "block"); // 增加继承
// 10/29            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称     
            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[number]" placeholder="取样个数" style="width: 60px; margin-right: 5px" />'); // 增加取样个数
            break;
            case "split":
            $(".alerter").html("将本组用户<b>均分</b>为给定数量个组，成为本组的<b>子组</b>");
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="split" />');
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
// 10/29            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[number]" placeholder="组数" style="width: 60px" />'); // 均分组数
            break;
            case "back":
            $(".alerter").html("选取在12/24/36/48小时内被本组推送<b>激活</b>的用户，成为本组的<b>子组</b>");
            $('[name="wechat_group[born]"]').remove(); $(".legger div:eq(0)").css("display", "none"); // 取消继承
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="back" />');
            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
// 10/29            $(".legger div:eq(0)").css("display", "block"); // 增加继承
// 10/29            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '_back" />'); // 增加名称
            $("form").prepend('<div class="wrapper" id="container-back"><label>推送时间</label><input id="date" type="text" onChange="invertDate()" /><select style="margin: 0 0 0 10px; width: 100px" id="time" onChange="invertDate()"><option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select><input name="wechat_group[time]" type="hidden" /></div>');
            $("#date").datepicker();
            $("#date").datepicker("option", "dateFormat", "yy/mm/dd");
            break;
            case "filtered_back":
            $(".alerter").html("选取在给定推送时间内被本组推送激活的用户并根据query与task<b>筛选</b>，成为本组的<b>子组</b>");
            $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="filtered_back" />');
            $('[name="wechat_group[wechat_group_ids][]"]').remove(); $("#group :checkbox").prop("checked", false); $("#group").hide(); // 取消多组
// 10/30            $(".legger div:eq(0)").css("display", "block"); // 增加继承
            $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + ' filtered" />'); // 增加名称
            $("form").prepend('<div class="wrapper" id="container-back"><label>推送时间</label><input id="date" type="text" onChange="invertDate()" /><select style="margin: 0 0 0 10px; width: 100px" id="time" onChange="invertDate()"><option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select><br/><br/><label>时长（小时）</label><input value="12" name="wechat_group[duration]" type="text" /><br/><br/><label>Query</label><input name="wechat_group[query]" type="text" /><br/><br/><label>Task</label><input id="datetime" name="wechat_group[task]" type="text" placeholder="task.restaurant" /><br/><br/><label class="checkbox"><input id="fuzzy" type="checkbox" onClick="toggleFuzzy()" />模糊搜索</label><input name="wechat_group[time]" type="hidden" /><input name="wechat_group[fuzzy]" value="false" type="hidden" /></div>');
            $("#date").datepicker();
            $("#date").datepicker("option", "dateFormat", "yy/mm/dd");  
            break;
          }
        })
      }
      function requestGroup() {
        $.ajax({
          async: true,
          type: "GET",
          url: urlPrefix + "/wechat_groups/" + appId + ".json",
          dataType: "json",
          success: function(rawData0) {
            $(".necker").before("<h3>" + rawData0.name + "</h3>")
            $.ajax({
              async: true,
              type: "GET",
              data: { per: 1000 },
              url: urlPrefix + "/wechat_apps/" + rawData0.wechat_app_id + "/wechat_groups.json",
              dataType: "json",
              success: function(rawData) {
                var tmp = "";
                for(var i in rawData) {
                  var tmpArray = {};
                  tmpArray.id = rawData[i].id;
                  tmpArray.name = rawData[i].name;
                  postObj.group.push(tmpArray);
                  if(rawData[i].id == appId) {
                    postObj.groupName = rawData[i].name;
                    $('[name="wechat_group[new_name]"]').val(rawData[i].name);
                  }
                  if(rawData[i].id != appId) {
                    tmp = tmp + "<tr><td><label class='checkbox'><input onClick='addGroup(this.id)' type='checkbox' id='" + rawData[i].id + "' /><lable>" + rawData[i].name + "</td><td>" + rawData[i].created_at.substr(0, 19) + "</td><td>" + rawData[i].updated_at.substr(0, 19) + "</td></tr>";
                  }
                }
                $("#group table").append(tmp);
              }
            })
          }
        })
      }
      function addGroup(value) {
        if($("#wechat_group_" + value).val()) {
          $("#wechat_group_" + value).remove();
        } else {
          $("form").prepend('<input id="wechat_group_' + value + '" type="hidden" name="wechat_group[wechat_group_ids][]" value="' + value + '" />');
        }
      }
//      $("#born").click(function() {
//        if($('[name="wechat_group[born]"]').val()) {
//          $('[name="wechat_group[born]"]').remove();
//          $('[name="wechat_group[new_name]"]').css("display", "none");
//        } else {
//          $("form").prepend('<input type="hidden" name="wechat_group[born]" value="true" />');
//          $('[name="wechat_group[new_name]"]').css("display", "inline");
//        }
//      })
      function invertDate() {
        var tmp = $("#date").val() + " " + $("#time").val();
        $("[name='wechat_group[time]']").val(Date.parse(tmp) / 1000);
      }
      function toggleFuzzy() {
        if($("#fuzzy").prop("checked") == true) {
          $('[name="wechat_group[fuzzy]"]').val("true");
        } else {
          $('[name="wechat_group[fuzzy]"]').val("false");
        }
      }
      function checkForm() {
        if(($("[name='wechat_group[set_operation]']").val() == "rename" || $("[name='wechat_group[set_operation]']").val() == "clone" || $("[name='wechat_group[set_operation]']").val() == "filtered_back") && $.trim($("[name='wechat_group[new_name]']").val()) == "") {
          alert("请为分组取名");
          return false;
        } else if($("[name='wechat_group[set_operation]']").val() == "filtered_back" || $("[name='wechat_group[set_operation]']").val() == "clone" ) {
          for(var i in postObj.group) {
            if($("[name='wechat_group[new_name]']").val() == postObj.group[i].name) {
              alert("这个名字已经存在，请换个名字");
              return false;
            } 
          }
        } 
        if($("[name='wechat_group[set_operation]']").val() == "sample" && (isNaN($.trim($("[name='wechat_group[number]']").val())) == true || $.trim($("[name='wechat_group[number]']").val()) == "" || parseInt($.trim($("[name='wechat_group[number]']").val())) !=  $.trim($("[name='wechat_group[number]']").val()))) {
          alert("请输入正确的取样个数");
          return false;
        } else if($("[name='wechat_group[set_operation]']").val() == "split" && (isNaN($.trim($("[name='wechat_group[number]']").val())) == true || $.trim($("[name='wechat_group[number]']").val()) == "" || parseInt($.trim($("[name='wechat_group[number]']").val())) !=  $.trim($("[name='wechat_group[number]']").val()))) {
          alert("请输入正确的组数");
          return false;
        } else if($("[name='wechat_group[set_operation]']").val() == "back" && $("#date").val() == "") {
          alert("请选择推送日期");
          return false;
        } else if($("[name='wechat_group[set_operation]']").val() == "filtered_back") {
          if($("#date").val() == "") {
            alert("请选择推送日期");
            return false;
          } else if(isNaN($.trim($("[name='wechat_group[duration]']").val())) == true || $.trim($("[name='wechat_group[duration]']").val()) == "" || parseInt($.trim($("[name='wechat_group[duration]']").val())) != $.trim($("[name='wechat_group[duration]']").val())) {
            alert("请输入正确时长");
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }


/*  EDITED AT 2013/10/23
    Add option of rename and clone
*/
      $(".necker .nav.nav-tabs li:eq(0)").remove();
      $(".necker .nav.nav-tabs").prepend('<li class="active"><a id="rename" href="javascript:void(0)">改名</a><li><li><a id="clone" href="javascript:void(0)">复制</a><li>');

/*  EDITED AT 2013/10/24
    Add option of sample and slice
*/
      $('[name="wechat_group[new_name]"]').remove();
      $(".necker .nav.nav-tabs").append('<li><a id="sample" href="javascript:void(0)">抽样</a><li><li><a id="split" href="javascript:void(0)">均分</a><li>');
      

/*  EDITED AT 2013/10/25
    Add option of back and filtered_back
*/
    document.write('<link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/searchUser.css" /><link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/jquery.ui.theme.css" /><link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/jquery.ui.core.css" /><link rel="stylesheet" href="http://www.weiyuyi.com/oss/assets/css/jquery.ui.datepicker.css" /><script src="http://onebox.oss.aliyuncs.com/js/urlPrefix.js"></script><script src="http://www.weiyuyi.com/oss/assets/js/ui/jquery.ui.core.js"></script><script src="http://www.weiyuyi.com/oss/assets/js/ui/jquery.ui.widget.js"></script><script src="http://www.weiyuyi.com/oss/assets/js/ui/jquery.ui.datepicker.js"></script>');
    $(".necker .nav.nav-tabs").append('<li><a id="back" href="javascript:void(0)">激活</a><li><li><a id="filtered_back" href="javascript:void(0)">筛选</a><li>');

    // Intialize Style
    $("#born").prop("checked", false);
    $(".legger div:eq(0)").css("display", "none");
    $("form").prepend('<input type="hidden" name="wechat_group[set_operation]" value="rename" />'); // 增加改名
    $("form").before('<div class="alerter alert alert-info">将更变该分组的名称</div>');
    $(".legger div:eq(1)").prepend('<input type="text" name="wechat_group[new_name]" placeholder="分组名称" style="width: 360px" value="' + postObj.groupName + '" />'); // 增加名称