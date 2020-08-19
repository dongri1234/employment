<template>
  <div>
    <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
      <div slot="extra" style="height: inherit;">
        <div class="analysis-salesTypeRadio">
          <a-input-search placeholder="输入查询的班级" @search="onSearch">
            <a-button slot="enterButton">
              查询
            </a-button>
          </a-input-search>
        </div>

      </div>
      <!-- <h4>销售额</h4> -->
      <div>
        <!-- style="width: calc(100% - 240px);" -->
        <div id="myChart" :style="{width:'1000px',height:'400px'}" style="float:left">
        </div>

      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Bart',
  data () {
    return {
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
   mounted () {
   this.drawLine()
 },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
 methods: {
   drawLine () {
     const myChart = this.$echarts.init(document.getElementById('myChart'))
     myChart.setOption({
        title: {
        text: '学生数据分析图',
        subtext: '学生数据分析图',
        sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
    },
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '2017', '2018', '2019', '2020'],
            ['考研', 41.1, 30.4, 65.1, 53.3],
            ['未签约', 86.5, 92.1, 85.7, 83.1],
            ['已签约', 24.1, 67.2, 79.5, 86.4]
        ]
    },
    xAxis: [
        { type: 'category', gridIndex: 0 },
        { type: 'category', gridIndex: 1 }
    ],
    yAxis: [
        { gridIndex: 0 },
        { gridIndex: 1 }
    ],
    grid: [
        { bottom: '55%' },
        { top: '55%' }
    ],
    series: [
        // These series are in the first grid.
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' },
        // These series are in the second grid.
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
    ]
     })
   },
   onSearch (value) {
      console.log(value)
      // console.log(this.setOption.title)
    }
 }
}
</script>
