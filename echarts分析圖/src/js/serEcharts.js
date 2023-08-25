import * as echarts from 'echarts';

let myChart;
export const setEcharts = (chartsData) => {
  // 清除圖表
  myChart && myChart.dispose()

  const chartDom = kintone.app.getHeaderSpaceElement()
  chartDom.style.width = '100%';
  chartDom.style.height = '1000px';
  myChart = echarts.init(chartDom);
  let option;

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle: { fontSize: 18 }
    },
    grid: {
      left: '4%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: chartsData.name,
        axisLabel: { textStyle: { fontSize: 18 } },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: { textStyle: { fontSize: 18 } },
      }
    ],
    series: [
      {
        name: 'IG觸及數',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: chartsData.follow
      },
      {
        name: 'IG平均按讚數',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: chartsData.like
      },
      {
        name: 'CPE',
        type: 'bar',
        data: chartsData.CPE,
        emphasis: {
          focus: 'series'
        },
      },
    ]
  };
  // 設定圖表
  option && myChart.setOption(option);
}
