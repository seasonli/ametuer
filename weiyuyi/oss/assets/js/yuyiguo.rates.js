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
      if(idx != "eav_error" && idx != "normalization_error") {
        if(idx == "pattern_error") { 
          option.title.text = idx + "(eav_error, normalization_error)";
        } else {
          option.title.text = idx;
        }
        option.xAxis.categories = [];
        option.series[0].data = [];
        option.series[0].name = idx;
        for(var idx1 in res[idx]) {
          option.xAxis.categories.unshift(idx1);
          if(idx == "pattern_error") {
            option.series[0].data.unshift(parseFloat(((res[idx][idx1] + res.eav_error[idx1] + res.normalization_error[idx1]) * 100).toFixed(2)));
          } else {
            option.series[0].data.unshift(parseFloat((res[idx][idx1] * 100).toFixed(2)));
          }
        }
        $("#" + idx).highcharts(option);
      }
    }
  }
})