function charts() {
  //  ---------- Set parameter ---------- 
  var par = {};
  var intialize = {};
  switch(tab) {
    case "tasks":
      par.url = {};
      par.url.item = url.prefix + "/wechat_apps/" + url.id + "/widgets.json?flush_ready=true";
      par.url.request = url.prefix + "/wechat_apps/" + url.id + "/wechat_logs_count.json?flush_ready=true";
      par.url.event = url.prefix + "/big_tables.json?flush_ready=true";
      par.datapicker = [["Query", "line"], ["Active Users", "line"]];
      par.tab = "tasks";
    break;
  }

  // ---------- Define Charts Option ---------- 
  var option = {};

  option = {
    credits: {
      enabled: false,
    },
    chart: {
      borderWidth: 1,
      borderColor: "#cccccc",
      spacingTop: 20,
      spacingLeft: 0,
      spacingRight: 0,
      backgroundColor: "#f6f6f6",
      renderTo: "container",
    },
    plotOptions: {
      areaspline: {
        color: ["#cfdfe8", "#ebc1cd", "#dee7dd", "#e3e2cb"],
      },
    },
    title: {
      margin: 15,
      style:{color: "#333333", fontSize: "20px", }, 
    },
    subtitle: {
      text: "times",
    },    
    legend: {
      enabled: true,
      layout: "vertical",
      margin: 0,
      borderWidth: 0,
      verticalAlign: "top",
      align: "right",
      x: -10,
      y: -20,
    },
    navigator: { enabled: false, },
    rangeSelector: { enabled: false, },
    scrollbar: { enabled: false, },
  };
  option.yAxis = [];
  for (var i in par.datapicker) {
    var element = {
       title: {
        text: par.datapicker[i][0],
        margin: 20,
        style: {color:"#333333", fontSize:"16px", }, 
      },     
    };
    if (i > 0) { 
      element.opposite = true;
    }
    option.yAxis.push(element);
  }

  // ---------- Define Status ---------- 
  var query = {};
  query.item = [];
  query.data = [];

  //  ---------- Define Data ----------
  var totalData = []; 

  function requestData(y, type, name, total) {
    if (query.data[0].status == true) { // query request
      var url = par.url.request + "&where[msg_type][]=pcc&where[msg_type][]=text&where[msg_type][]=voice";
    }
    else if (query.data[1].status == true) { // query request
      var url = par.url.request + "&where[msg_type][]=pcc&where[msg_type][]=text&where[msg_type][]=voice&counter=wechat_user_id";
    }

    var today = new Date().getTime(); // for timestamp
    if (query.range == "today") { var from = (today-1*86400000)/1000; url = url + "&from=" + from; }
    else if (query.range == "week") { var from = (today-7*86400000)/1000; url = url + "&from=" + from; }
    else if (query.range == "month") { var from = (today-31*86400000)/1000; url = url + "&from=" + from; }

    if (name != "sum" && total != true) { // an item
      url = url + "&where[qa_classification]=" + name;
    }
    $.ajax({
      async: false, // to make sure that render after getting all the data
      type: "GET",
      url: url,
      dataType: "json",
      success: function(rawData) {
        var getData = []; var i = 0;
        if (query.view == "n") {
          for (var idx in rawData) {
            getData[i] = {};
            getData[i].x = idx * 1000 + 28800000; // consider the time zone
            getData[i].y = rawData[idx];
            if (total != true) {
              if (totalData[i].x == getData[i].x) { 
                getData[i].p = parseFloat(((getData[i].y / totalData[i].y) * 100).toFixed(2));
              }
            }
            i++;
          }
        } 
        else if (query.view == "p") {
          for (var idx in rawData) {
            getData[i] = {};
            getData[i].x = idx * 1000 + 28800000; // consider the time zone
            getData[i].n = rawData[idx];
            if (total != true) {
              if (totalData[i].x == getData[i].x) { 
                getData[i].y = parseFloat(((getData[i].n / totalData[i].n) * 100).toFixed(2));
              }
            }
            i++;
          }
        }
        if (total == true) {
          totalData = getData;
        }
        var ifSum;
        for (var i in query.item) {
          if (query.item[i] == "sum") {
            ifSum = true;
          }
        }
        if (name != "sum" || ifSum == true) {
          var element = {
            yAxis: y,
            type: type,
            name: name, 
            data: getData,
          }
          if(name == "") {
            element.name = "faq/error";
          }
          option.series.push(element);
        }
      },
      error: function() {
        $(".alert").append("<br/>error: wechat_logs_count.json (" + name + ")");
        $(".alert").show();
      }
    })
  }

  function defineData() { // Add all data to series
    switch(par.tab) {
      case "tasks":
        if (query.view == "n") {        
          option.tooltip = {
            shared: true,
            formatter: function() {
              var tooltip = (new Date(parseInt(this.x)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")).substring(0, 10) + "<br/>--------------------<br/>" ;
              for (var k in intialize.event) {
                if (intialize.event[k].date == this.x) {
                  tooltip = tooltip + intialize.event[k].text + "<br/>--------------------<br/>" ;
                }
              }                    
              for (var j in this.points) {
                if (this.points[j].series.name != "sum") {
                  tooltip = tooltip + "<br/>" + this.points[j].series.name + ": " + this.points[j].y + " (" + this.points[j].point.p + "%)";
                }
                else {
                  tooltip = tooltip + "<br/><b>" + this.points[j].series.name + "</b>: " + this.points[j].y;
                }
              }
              return tooltip;
            }
          } 
        } else if (query.view == "p") {
          option.tooltip = {
            shared: true,
            formatter: function() {
              var tooltip = (new Date(parseInt(this.x)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")).substring(0, 10) + "<br/>--------------------<br/>" ;
              for (var k in intialize.event) {
                if (intialize.event[k].date == this.x) {
                  tooltip = tooltip + intialize.event[k].text + "<br/>--------------------<br/>" ;
                }
              }                    
              for (var j in this.points) {
                if (this.points[j].series.name != "sum") {
                  tooltip = tooltip + "<br/>" + this.points[j].series.name + ": " + this.points[j].y + "% (" + this.points[j].point.n + ")";
                }
              }
              return tooltip;
            }
          } 
        }
    }
    option.series = []; // Set up option.series again due to it's cleaned every time rendering
    var type; var y;
    for (var j in query.data) { // Choose data
      if (query.data[j].status == true) {
        y = parseInt(j);   
        requestData(y, "areaspline", "sum", true); // for percent calculate         
      }
    }  
    for (var i in query.item) { // Choose item
      for (var j in query.data) { // Choose data
        if (query.data[j].status == true) {
          type = par.datapicker[j][1];
          y = parseInt(j);
          if (query.item[i] != "sum") {
            requestData(y, type, query.item[i], false);
          }          
        }
      }    
    }
    // Start rendering
    chart = new Highcharts.StockChart(option);
    $("#loading").hide()
  }

  //  ---------- Intialize ----------
  $(".itempicker_interval").after('<div class="itempicker_loading">Loading...</div>');
  $(".wrapper_center").append('<div class="btn-group viewpicker"><button id="n" class="btn disabled">times</button><button id="p" class="btn">Percent</button></div>');
  $(".wrapper_left").prepend('<div class="alert" style="margin-bottom: 20px">您的请求中包含未初始化的数据，请联系管理员检查相关数据</div>')
  $(".alert").hide();
  $(".itempicker_submit").hide();


  intialize.event = [];
  $.ajax({ // Request Event
    async: false,
    type: "GET",
    url: par.url.event,
    dataType: "json",
    success: function(rawData) {
      for (var i in rawData) {
        if (rawData[i].value != "") {
          var element = {};
          var tmp = rawData[i].key.split(".");
          element.date = tmp[2].substring(14, 24) * 1000 + 28800000;
          element.text = rawData[i].value;
          intialize.event.push(element);
        }
      }   
    },
    error: function() {
      $(".alert").append("<br/>error: big_tables.json");
      $(".alert").show();
    }
  }); 

  query.item = ["sum", ];

  query.range = "week"; // Define rangepicker

  query.view = "n"; // Define view

  $(".datapicker").html(template.render("datapicker", par)); // Define datapicker
  for (var i in par.datapicker) {
    var element = { name: par.datapicker[i][0] }
    query.data.push(element);
  }
  chooseData(query.data[0].name)

  defineData();

  requestItemsList(); // Request Item List

  //  ---------- Action ----------
  function allowChooseItem() {
    $(".itempicker input").click(function(){ // Choose concrete items
      function removeItem(value) {
        for (var i in query.item){
          if(query.item[i] == value) {
            query.item.splice(i,1);
            break;
          }
        }
      }
      var itemStatus = $(this).attr("data-status");
      if(!itemStatus || itemStatus == "off") {
        $(this).attr("data-status", "on");
        query.item.push(this.id);
      }
      else {
        $(this).attr("data-status", "off");
        removeItem(this.id);
      }
    })
    $(".itempicker_submit").click(function(){ // Request for specific data
      if(!query.item[0]) { 
        alert("Please choose items"); 
      }
      else {
        $("#loading").fadeIn(300, function(){
          defineData();
        })
      }
    })
  }

  $("#checkbox_data input").click(function(){ // Choose data
    chooseData(this.id);
  })
  function chooseData(data) {
    for (var i in query.data) {
      if (query.data[i].name == data) {
        query.data[i].status = true;
        option.title.text = data + " of Tasks";
      } else {
        query.data[i].status = false;
      }
    }
    $("#loading").fadeIn(300, function(){
      defineData();
    })
  }

  $(".rangepicker button").click(function(){ // Choose range (today, this week, this month, etc)
    $(this).parent().find("button").removeClass("disabled");
    $(this).addClass("disabled");
    query.range = this.id;
    $("#loading").fadeIn(300, function(){
      defineData();
    })
  })

  $(".viewpicker button").click(function(){ // Choose range (today, this week, this month, etc)
    $(this).parent().find("button").removeClass("disabled");
    $(this).addClass("disabled");
    query.view = this.id;
    if (this.id == "n") {
      option.subtitle.text = "times";
      $(".itempicker #sum").show();
    } 
    else if (this.id == "p") {
      option.subtitle.text = "percent";
      $(".itempicker #sum").hide();
    }
    $("#loading").fadeIn(300, function(){
      defineData();
    })
  })



  function requestItemsList() {
    if (par.tab == "tasks") {
      $.ajax({ // Request Menu
        async: false,
        type: "GET",
        url: par.url.item,
        dataType: "json",
        success: function(rawData1) {
          var weiyuyi = {};
          weiyuyi.response = rawData1;
          $.ajax({ // Request Total Query Sum
            async: false,
            type: "GET",
            url: par.url.request + "&where[msg_type][]=pcc&where[msg_type][]=text&where[msg_type][]=voice&step=total",
            dataType: "json",
            success: function(rawData2) {
              for (var jdx in rawData2) {
                weiyuyi.query = rawData2[jdx];
              }
            },
            error: function() {
              $(".alert").append("<br/>error: wechat_logs_count.json");
              $(".alert").show();
            }            
          });
          weiyuyi1 = {};
          weiyuyi1.query = weiyuyi.query
          renderItem(weiyuyi1);
          var i = 0; requestQueryNum(i);
          function requestQueryNum(i) {
            $.ajax({ // Request Total Query
              async: true, // async to load
              type: "GET",
              url: par.url.request + "&where[msg_type][]=pcc&where[msg_type][]=text&where[msg_type][]=voice&step=total&where[qa_classification]=" + weiyuyi.response[i].name,
              dataType: "json",
              success: function(rawData3) {
                for (var jdx in rawData3) {
                  weiyuyi.response[i].query = rawData3[jdx];
                  var percent = ((rawData3[jdx] / weiyuyi.query) * 100).toFixed(2) + "%";
                  weiyuyi.response[i].percent = percent;
                }
                if (i < weiyuyi.response.length - 1) {
                  requestQueryNum(i + 1);
                }
                else {
                  weiyuyi.response.sort(compare("query"))
                  renderItem(weiyuyi);
                }
              },
              error: function() {
                weiyuyi.response[i].query = "Failed";
                weiyuyi.response[i].percent = "Failed";
                if (i < weiyuyi.response.length - 1) {
                  requestQueryNum(i + 1);
                }
                else {
                  weiyuyi.response.sort(compare("query"))
                  renderItem(weiyuyi);
                }
                $(".alert").append("<br/>error: wechat_logs_count.json(" + weiyuyi.response[i].name + ")");
                $(".alert").show();
              }
            });         
          }
          function compare(propertyName) {
            return function (object1, object2) {
              var value1 = object1[propertyName];
              var value2 = object2[propertyName];
              if (value2 <= value1) {
                return -1;
              }
                else if (value2 > value1) {
                return 1;
              }
            }
          } 
          function renderItem(data) {
            $(".itempicker_checkbox").html(template.render("itempicker_checkbox", data));
            if (data == weiyuyi) {
              $(".itempicker_loading").hide();
              $(".itempicker_submit").show();
              allowChooseItem();
            }
          }
        },
        error: function() {
          $(".alert").append("<br/>error: widgets.json");
          $(".alert").show();
        } 
      });
    }
  }
}