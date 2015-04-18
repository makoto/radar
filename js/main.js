App = {}
App.init = function(csv){
  var header = csv.map(function(d){return d['Row Labels']})
  var data = []
  csv.forEach(function(row){
    var array = []
    for (key in row) {
      if (key != 'Row Labels') {
        array.push({
          axis:key,
          value:row[key]
        })
      }
    }
    data.push({
      className:row['Row Labels'],
      axes: array
    })
  })

  var color = d3.scale.category10();
  var chart = RadarChart.chart().config({
    w: 400,
    h: 400,
    color: color,
    radius: 1
    // circles: false
  });
  var cfg = chart.config();
  var id  = '.chart-container';
  var svg = d3.select(id)
    .append("svg")
    .attr("width", cfg.w)
    .attr("height", cfg.h)
    .datum(data)
    .call(chart);

  function update(id, cfg, data, cart){
    d3.select('svg')
      .attr("width", cfg.w)
      .attr("height", cfg.h)
      .datum(data)
      .call(chart);
  }
  data.forEach(function(d){
    var text = '<input type="checkbox" checked value="' + d.className + '"/>'
    text+='<span style="padding-left:1em;padding-right:1em;background-color:' + color(d.className) + '">' + d.className + '</span><br>'
    $('.chart-legend').append(text)
  })

  $('.chart-legend :checkbox').click(function(){
    var filtered = []
    $('.chart-legend input:checked').each(function(){
      var value = this.value
      filtered.push(data.filter(function(d){
        return value == d.className
      })[0])
    })
    update(id,cfg,filtered,chart)
  })
}
