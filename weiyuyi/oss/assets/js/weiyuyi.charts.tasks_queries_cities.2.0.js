$("html").attr("ng-app", "")

$("#fromDate").datepicker();
$("#fromDate").datepicker("option", "dateFormat", "yy/mm/dd");
$("#toDate").datepicker();
$("#toDate").datepicker("option", "dateFormat", "yy/mm/dd");

var option = {
  credits: {
    enabled: false,
  },
  chart: {
    title: "shit",
    backgroundColor: "#f6f6f6",
    renderTo: "chart",
  },
  title: {
    text: ""
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: "",
      style: {color: "#333333", fontSize: "16px"}
    }         
  },
  tooltip: {
    crosshairs: [
      true, true
    ], shared: true
  }, series: []
};

var renderObj = {};
renderObj.topSeries = [];
renderObj.cat = ["周边信息类", "旅游类", "优惠类", "城市出行类", "饮食类", "娱乐类", "生活类"];

function getKey($scope, $http) {
  $http({method: "post", url: "http://elasticsearch.mobvoi.com/weiyuyi_*/_search?pretty=true", data: '{"facets":{"terms":{"terms":{"field":"task","order":"count","size":100},"facet_filter":{"fquery":{"query":{"filtered":{"filter":{"bool":{"must":[{"terms":{"message_type":["voice","text"]}}]}}}}}}}}}'}).success(function(data) {
    $scope.keys = data.facets.terms.terms;
  });
}
$.ajax({
  async: false,
  type: "POST",
  url: "http://elasticsearch.mobvoi.com/weiyuyi_*/_search?pretty=true",
  contentType: "application/json",
  data: JSON.stringify({facets:{terms:{terms:{field:"city",size:20,order:"count"},facet_filter:{fquery:{query:{filtered:{filter:{bool:{must:[{range:{time:{from:new Date($("#fromDate").val()).getTime(),to:new Date($("#toDate").val()).getTime()}}},{terms:{app_id:[url.id]}},{terms:{message_type:["voice","text"]}}]}}}}}}}}}),
  dataType: "json",
  success: function(res) {
    for(var i in res.facets.terms.terms) {
      renderObj.topSeries.push(res.facets.terms.terms[i].term);
    }
  }
})
$.ajax({
  async: false,
  type: "POST",
  url: "http://elasticsearch.mobvoi.com/weiyuyi_*/_search?pretty=true",
  contentType: "application/json",
  data: JSON.stringify({facets:{terms:{terms:{field:"task",size:100,order:"term"},facet_filter:{fquery:{query:{filtered:{filter:{bool:{must:[{range:{time:{from:new Date($("#fromDate").val()).getTime(),to:new Date($("#toDate").val()).getTime()}}},{terms:{app_id:[url.id]}},{terms:{message_type:["voice","text"]}}]}}}}}}}}}),
  dataType: "json",
  success: function(res) {
    for(var i in res.facets.terms.terms) {
      renderObj.cat.push(res.facets.terms.terms[i].term);
    }
  }
})

document.getElementById("cityname_input").onkeydown = function(e) {
  if(e.keyCode == 13 && $.trim($("#cityname_input").val()) != "") {
    $("#cityname_container").append('<span onclick="$(this).remove()" class="label label-info" style="margin: 0 10px 5px 0; line-height: 20px; font-size: 14px; cursor: pointer">' + $.trim($("#cityname_input").val()) + '</span>');
    $("#cityname_input").val("");
  } else if(e.keyCode == 8 && $("#cityname_input").val() == "") {
    $("#cityname_container span:last").remove();
  }
}
$(".series_title span").click(function() {
  var tmp = "";
  for(var i = 0; i < $(this).attr("data-num"); i ++) {
    tmp += '<span onclick="$(this).remove()" class="label label-info" style="margin: 0 10px 5px 0; line-height: 20px; font-size: 14px; cursor: pointer">' + renderObj.topSeries[i] + '</span>';
  }
  $("#cityname_container").html(tmp);
})
$(".key").delegate("input", "click", function() {
  showChart();
})

function reflashData() {
  renderObj.series = [];
  renderObj.data = [];
  renderObj.totalData = [];
  $("#cityname_container span").each(function() {
    renderObj.series.push($(this).html());
  })
  for(var i in renderObj.series) {
    console.log(i)
    var postObj = 3;
    $.ajax({
      async: false,
      type: "POST",
      url: "http://elasticsearch.mobvoi.com/weiyuyi_*/_search?pretty=true",
      contentType: "application/json",
      data: JSON.stringify({facets:{terms:{terms:{field:"task",size:100,order:"term"},facet_filter:{fquery:{query:{filtered:{filter:{bool:{must:[{range:{time:{from:new Date($("#fromDate").val()).getTime(),to:new Date($("#toDate").val()).getTime()}}},{terms:{app_id:[url.id]}},{terms:{message_type:["voice","text"]}},{terms:{city:[renderObj.series[i]]}}]}}}}}}}}}),
      dataType: "json",
      success: function(res) {
        if(res.facets.terms.terms.length > 0) {
          renderObj.data[i] = [];
          renderObj.totalData[i] = res.facets.terms.total;
          renderObj.data[i] = [0, 0, 0, 0, 0, 0, 0]
          for(var j in res.facets.terms.terms) {
            switch(res.facets.terms.terms[j].term) {
              case "public.poi": case "public.restaurant": case "public.hotel":
                renderObj.data[i][0] += res.facets.terms.terms[j].count;
              break;
              case "public.flight": case "public.travelguide": case "public.flight_info": case "public.train":
                renderObj.data[i][1] += res.facets.terms.terms[j].count;
              break;
              case "public.groupcoupon": case "public.coupon":
                renderObj.data[i][2] += res.facets.terms.terms[j].count;
              break;
              case "public.bus": case "public.subway": case "public.coach": case "public.roadcondition": case "public.xianxing": case "public.daijia": case "public.violation": case "public.navigation": case "public.where": case "where_am_i":
                renderObj.data[i][3] += res.facets.terms.terms[j].count;
              break;
              case "public.recipe": case "public.recommendation":
                renderObj.data[i][4] += res.facets.terms.terms[j].count;
              break;
              case "public.music": case "cinema": case "public.zhaibo": case "public.localevent": case "public.beauty": case "public.constellation": case "public.joke":
                renderObj.data[i][5] += res.facets.terms.terms[j].count;
              break;
              case "public.yellowpage": case "public.translate": case "public.weather": case "public.delivery": case "current_time":
                renderObj.data[i][6] += res.facets.terms.terms[j].count;
              break;
            }
          }
          for(var j in renderObj.cat) {
            if(!renderObj.data[i][j]) {
              renderObj.data[i][j] = 0;
            }
            for(var k in res.facets.terms.terms) {
              if(renderObj.cat[j] == res.facets.terms.terms[k].term) {
                renderObj.data[i][j] = res.facets.terms.terms[k].count;
              }
            }
          }
        } else {
          renderObj.series[i] = "errorCityName";
        }
      }
    })
  }
  showChart();
}

function showChart() {
  console.dir(renderObj)
  option.xAxis.categories = [];
  option.series = [];
  $(".key :checkbox").each(function() {
    if($(this).prop("checked") == true) {
      option.xAxis.categories.push($(this).val());
    }
  })
  for(var i in renderObj.series) {
    if(renderObj.series[i] != "errorCityName") {
      var ele = {
        type: "line",
        name: renderObj.series[i],
        data: [],
        marker: {
          enabled: false
        }    
      }
      var tip = "";
      for(var j in option.xAxis.categories) {
        for(var k in renderObj.cat) {
          if(renderObj.cat[k] == option.xAxis.categories[j]) {
            ele.data.push({x: j, y: renderObj.data[i][k] / renderObj.totalData[i] * 100});
            tip += (renderObj.data[i][k] / renderObj.totalData[i] * 100).toFixed(2) + "%<br/>";
          }
        }
      }
      option.series.push(ele);
    }
  }
  option.tooltip = {
    shared: true,
    formatter: function() {
      for(var i in this.points) {
        if(i == 0) {
          tooltip = this.points[i].x + "<br/>";
        }
        tooltip += this.points[i].series.name + ": " + this.points[i].y.toFixed(2) + "%<br/>";
      } 
      return tooltip;
    }
  };  
  $("#chart").highcharts(option);
}