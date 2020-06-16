<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a>
          </template>
        </span>
      </s-table>
      <step-by-step-modal ref="modal" @ok="handleOk" />-->

      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="finished" slot-scope="text">{{text===0?'进行中':'已结束'}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button-group>
            <a-button type="primary" @click="edit(record)">修改</a-button>
            <a-button type="danger" @click="remove(record)">删除</a-button>
          </a-button-group>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getRequest } from '../../api/request'
// import { STable, Ellipsis } from '@/components'
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '活动id',
    dataIndex: 'id'
  },
  {
    title: '活动主题',
    dataIndex: 'theme'
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: '活动开始时间',
    dataIndex: 'start_time'
    // sorter: true,
    // needTotal: true,
    // customRender: text => text + ' 次'
  },
  {
    title: '活动场地',
    dataIndex: 'venue'
    // scopedSlots: { customRender: 'status' }
  },
  {
    title: '活动简介',
    dataIndex: 'introduction'
    // sorter: true
  },
  {
    title: '活动截止时间',
    dataIndex: 'deadline'
  },
  {
    title: '活动容量',
    dataIndex: 'capacity'
  },
  {
    title: '当前人数',
    dataIndex: 'current_quantity'
  },
  {
    title: '活动状态',
    dataIndex: 'finished',
    scopedSlots: { customRender: 'finished' }
  },
  {
    title: '学分',
    dataIndex: 'credit'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Activity',
  components: {
    // STable,
    // Ellipsis,
    // StepByStepModal
  },
  data() {
    return {
      columns,
      loadData: []
    }
  },
  methods: {
    async queryData() {
      await getRequest('/activities', { page: 1, pagesize: 10 }).then(res => {
        this.loadData = res.data
      })
    },

    edit(record) {
      console.log(record)
    },

    remove(record) {
      console.log(record)
    }
  },
  created() {
    console.log(this.queryData())
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  }
}
</script>
