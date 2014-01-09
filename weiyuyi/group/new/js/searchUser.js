      var initialize = {};
      initialize.date = false;
      initialize.city = false; initialize.cityList = false;
      initialize.task = false; initialize.taskList = false;
      initialize.gender = false;

      var postObj = {};
      postObj.task = [];
      postObj.confirmTask = [];
      postObj.city = [];
      postObj.confirmCity = [];

      $("form").attr("action", urlPrefix + "/wechat_groups");
      $("[name='wechat_group[wechat_app_id]']").val(appId);

      $(":checkbox").prop("checked", false);

      requestCityList();
      requestTaskList();

      $(".necker ul li a").click(function() {
        $(".necker ul li").removeClass("active");
        $(this).parent().addClass("active");
        switch ($(this).attr("id")) {
          case "groupNull":
          initialize.date = true; toggleNav("date");
          initialize.city = true; initialize.cityList = false; toggleNav("city");
          initialize.task = true; initialize.taskList = false; toggleNav("task");
          initialize.gender = true; toggleNav("gender");
          $('[name="wechat_group[all_users]"]').remove();
          $('[name="wechat_group[update_wechat_users]"]').remove();
          $("#search").hide();
          break;
          case "groupAll":
          initialize.date = true; toggleNav("date");
          initialize.city = true; initialize.cityList = false; toggleNav("city");
          initialize.task = true; initialize.taskList = false; toggleNav("task");
          initialize.gender = true; toggleNav("gender");
          $("form").prepend("<input type='hidden' name='wechat_group[update_wechat_users]' value='true' />");
          $("form").prepend("<input type='hidden' name='wechat_group[all_users]' value='true' />");
          $("#search").hide();
          break;
          case "groupSpecific":
          $('[name="wechat_group[all_users]"]').remove();
          $("form").prepend("<input type='hidden' name='wechat_group[update_wechat_users]' value='true' />");
          $("#search").show();
          break;
        }
      })
      function requestCityList() {
        $.ajax({
          async: true,
          type: "GET",
          data: { with_count: true, min: 100 },
          url: urlPrefix + "/wechat_apps/" + appId + "/available_cities.json",
          dataType: "json",
          success: function(rawData) {
            initialize.cityList = true;
            var html = "";
            for(var idx in rawData) {
              postObj.city.push(idx);
              html = html + "<li class='checkbox'><input type='checkbox' id='" + idx + "' name='" + idx + "' />" + idx + " (" + rawData[idx] + ") </li>";
            }
            $("#dialogCity .dialog_content_content").html(html + "<div class='clear'></div>");
          }
        })
      }
      function requestTaskList() {
        $.ajax({
          async: true,
          type: "GET",
          url: urlPrefix + "/wechat_apps/" + appId + "/widgets.json",
          dataType: "json",
          success: function(rawData) {
            initialize.taskList = true;
            var html = "";
            for(var i in rawData) {
              if(rawData[i].nick_name == "faq / error") { // EDITED at 2013/10/15 HARDCODE FOR FAQ/ERROR
                rawData[i].name = "faq / error";
              }
              postObj.task.push(rawData[i].name);
              html = html + "<li class='checkbox'><input type='checkbox' id='" + rawData[i].name + "' name='" + rawData[i].name + "' />" + rawData[i].nick_name + "</li>";
            }
            $("#dialogTask .dialog_content_content").html(html + "<div class='clear'></div>");
          }
        }) 
      }
      function toggleNav(value) {
        if (initialize[value] == false) {
          $("#search .wrapper_content").append($("#wrapper_" + value + "Nav").html());
          if (value == "date") {
            $("#fromDate").datepicker();
            $("#fromDate").datepicker("option", "dateFormat", "yy/mm/dd");
            $("#toDate").datepicker();
            $("#toDate").datepicker("option", "dateFormat", "yy/mm/dd");            
          }
          initialize[value] = true;
        } else {
          $("#" + value + "Nav").remove();
          $("#" + value + "NavBool").prop("checked", false)
          initialize[value] = false;
        }
      }
      function invertDate() {
        var tmp = $("#fromDate").val() + " " + $("#fromTime").val();
        $("[name='wechat_group[wechat_user_updated_at]']").val(Date.parse(tmp) / 1000);
      }
      function openDialogCity() {
        if(initialize.cityList == false) {
          requestCityList();
          $("#dialogCity").show();
        } else {
          $("#dialogCity").show();
        }
      }
      function confirmDialogCity() {
        var tmp = "";
        postObj.confirmCity = [];
        for (var i in postObj.city) {
          if(document.getElementById(postObj.city[i]).checked == true) {
            postObj.confirmCity.push(postObj.city[i]);
            tmp = tmp + "<input type='hidden' name='wechat_group[wechat_user_wechat_cities][]' value='" + postObj.city[i] + "' />" + postObj.city[i] + ", ";
          }
        }
        $("#dialogCity").hide();
        $("#cityNav .wrapper_content_nav_content").html(tmp)
      }
      function openDialogTask() {
        if(initialize.taskList == false) {
          requestTaskList();
          $("#dialogTask").show();
        } else {
          $("#dialogTask").show();
        }
      }
      function confirmDialogTask() {
        var tmp = "";
        postObj.confirmTask = [];
        for (var i in postObj.task) {
          if(document.getElementById(postObj.task[i]).checked == true) {
            postObj.confirmTask.push(postObj.task[i]);
            if(postObj.task[i] == "faq / error") { // EDITED at 2013/10/15 HARDCODE FOR FAQ/ERROR
              tmp += "<input type='hidden' name='wechat_group[wechat_log_qa_classifications][]' value='' />faq / error, ";
            } else {
              tmp = tmp + "<input type='hidden' name='wechat_group[wechat_log_qa_classifications][]' value='" + postObj.task[i] + "' />" + postObj.task[i].split("public.")[1] + ", ";              
            }
          }
        }
        $("#dialogTask").hide();
        $("#taskNav .wrapper_content_nav_content:eq(1)").html(tmp)
      }
      function checkForm() {
        if($("[name='wechat_group[name]']").val().length == 0) {
          alert("请为分组取名");
          return false;
        } else if ($(".necker ul li:eq(2)").attr("class") == "active" && initialize.date == false && initialize.city == false && initialize.task == false && initialize.gender == false) {
          alert("请至少选择一种筛选方式");
          return false;
        } else if (initialize.city == true && !$("[name='wechat_group[wechat_user_wechat_cities][]']").val()) {
          alert("请至少选择一个城市");
          return false;
        } else if (initialize.task == true && !$("[name='wechat_group[wechat_log_qa_classifications][]']").val()) {
          alert("请至少选择一个Task");
          return false;
        } else if($("[name='wechat_group[wechat_user_updated_at]']").val().length == 0) {
          alert("请选择时间范围");
          return false;
        } else {
          return true;
        }
      }