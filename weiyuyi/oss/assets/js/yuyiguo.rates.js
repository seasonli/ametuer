$(".chart").parent().addClass("chart-container").html("");
$(".chart-container").append($("<div>").addClass("chart-container-0")).append($("<div>").addClass("chart-container-1")).append($("<div>").addClass("chart-container-2"));
$(".chart-container-0").eq(0).append($("<div>").addClass("e2e_rate chart"));
$(".chart-container-1").append($("<div>").addClass("speech_error_rate span4 chart"));
$(".chart-container-1").append($("<div>").addClass("task_error_rate span4 chart"));
$(".chart-container-1").append($("<div>").addClass("pattern_error_rate span4 chart"));
$(".chart-container-2").append($("<div>").addClass("result_error_rate span4 chart"));
$(".chart-container-2").append($("<div>").addClass("garbage_rate span4 chart"));
$(".chart-container-2").append($("<div>").addClass("todo_rate span4 chart"));
$(".chart").css("height", "240px");
$(".chart").eq(0).css("height", "360px");

var option = {
  credits: {
    enabled: false,
  },
  chart: {
    backgroundColor: "#f0f0f0",
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
    ], shared: true,
    formatter: function() {
      for(var i in this.points) {
        if(i == 0) {
          tooltip = this.points[i].x + "<br/>";
        }
        tooltip += this.points[i].series.name + ": " + this.points[i].y.toFixed(2) + "%<br/>";
      } 
      return tooltip;
    } 
  }, 
  series: [
    {
      type: "line",
      data: [],      
      marker: {
        enabled: false
      }    
    }
  ],
  legend: {
    enabled: false
  }
}, optionArr = {};

$.ajax({
  async: false,
  type: "GET",
  url: url.prefix + "/logs/rates.json",
  contentType: "application/json",
  dataType: "json",
  success: function(res) {
    for(var idx in res) {
      if(idx != "eav_error_rate" && idx != "normalization_error_rate" && idx != "processed_count") {
        if(idx == "pattern_error_rate") { 
          option.title.text = idx + "(eav_error_rate, normalization_error_rate)";
        } else {
          option.title.text = idx;
        }
        option.xAxis.categories = [];
        option.series[0].data = [];
        option.series[0].name = idx;
        for(var idx1 in res[idx]) {
          option.xAxis.categories.unshift(idx1);
          if(idx == "pattern_error_rate") {
            option.series[0].data.unshift(parseFloat(((res[idx][idx1] + res.eav_error_rate[idx1] + res.normalization_error_rate[idx1]) * 100).toFixed(2)));
          } else {
            option.series[0].data.unshift(parseFloat((res[idx][idx1] * 100).toFixed(2)));
          }
        }
        $("." + idx).highcharts(option);
      }
    }
  }
})