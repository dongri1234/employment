<template>
  <div>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}" style="padding: 20px; margin-bottom: 20px;">
      <bart />
    </a-card>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}" style="padding: 20px; margin-bottom: 20px">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <!-- <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a> -->
              <a-input-search placeholder="输入查询的院名" @search="onSearch">
                <a-button slot="enterButton">
                  查询
                </a-button>
              </a-input-search>
            </div>
            <!-- <a-range-picker :style="{width: '256px'}" /> -->
          </div>
          <a-tab-pane loading="true" tab="本科" key="1">
            <a-row>
              <a-col :xl="14" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>志愿职位</h4>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="志愿城市排行榜" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="研究生" key="2">
            <a-row>
              <a-col :xl="14" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>志愿职位</h4>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="志愿城市排行榜" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}" style="padding: 20px; margin-bottom: 20px">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <!-- <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a> -->
              <a-input-search placeholder="输入查询的院名" @search="onSearch">
                <a-button slot="enterButton">
                  查询
                </a-button>
              </a-input-search>
            </div>
            <!-- <a-range-picker :style="{width: '256px'}" /> -->
          </div>
          <a-tab-pane loading="true" tab="本科" key="1">
            <a-row>
              <a-col :xl="14" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>就业职位</h4>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="就业城市排行榜" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="研究生" key="2">
            <a-row>
              <a-col :xl="14" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>就业职位</h4>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="就业城市排行榜" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
// import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { baseMixin } from '@/store/app-mixin'
import Bart from '@/views/analysis/components/Bart'

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '北京 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'JAVA工程师', count: 32.2 },
  { item: '算法工程师', count: 21 },
  { item: '架构师', count: 17 },
  { item: '清洁工', count: 13 },
  { item: '老师', count: 9 },
  { item: '其他', count: 7.8 }
]

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

export default {
  name: 'Index',
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    Bart
  },
  data () {
    return {
      loading: true,
      rankList,
      searchTableColumns,
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
       onSearch (value) {
      console.log(value)
      // console.log(this.setOption.title)
    }
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
