var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
xAxis: {
type: 'category',
data: ['5/30','5/29','5/28','5/27','5/26','5/25','5/24','5/23','5/22','5/21','5/20','5/19','5/18','5/17','5/16']
},
yAxis: {
type: 'value',
min: 1230000,
max: 1310000
},
series: [
{
  data: [1301743, 1297569, 1297569, 1297569, 1297569, 1269809, 1248416, 1256025, 1272078, 1265790, 1265790, 1265790, 1268884, 1250057, 1234305 ],
  type: 'line',
  lineStyle: {color: '#DF0101'},
  color:'#DF0101'
}
]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);