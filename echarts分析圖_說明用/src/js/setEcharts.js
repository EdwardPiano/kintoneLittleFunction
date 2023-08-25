/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import * as echarts from 'echarts'

export const setEcharts = (chartsData) => {
  const chartDom = kintone.app.getHeaderSpaceElement()
  chartDom.style.width = '100%'
  chartDom.style.height = '1000px'
  const myChart = echarts.init(chartDom)

  const option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartsData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  option && myChart.setOption(option)
}
