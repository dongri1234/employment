<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- <searchItem :data="searchData" @delete="DelData" @modify="edit"></searchItem> -->
      <search @onClick="Search" ref="search"></search>
      <a-button type="primary" style="margin-left:5px" @click="onReset">重置</a-button>
      <edit
        :text="add"
        @handleOK="addItem"
        ref="addData"
        style="display:inline-block;margin-left:10px"
        :search="search"
      ></edit>

      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="finished" slot-scope="text">{{text===0?'进行中':'已结束'}}</span>
        <span slot="operation" slot-scope="text, record">
          <edit
            :text="modify"
            @handleOK="edit"
            :data="record"
            :search="search"
            style="display:inline-block"
          ></edit>
          <a-popconfirm
            title="确定删除?"
            okText="确定"
            cancelText="取消"
            @confirm="() => {
              DelData(record.id)
              this.$message.info('删除成功');
            }"
          >
            <a-button type="primary" style="margin-left:5px">删除</a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// import { STable, Ellipsis } from '@/components'

// import { Component, Vue } from 'vue-property-decorator'

import { delRequest, UpdateAlumnuInfo, AddAlumnuInfo, searchAlumnuInfo } from '../../api/activity'
import edit from '@/views/activity/components/edit.vue'
import { getRequest } from '@/api/activity'
const editFrom = () => import('@/views/activity/components/editForm.vue')
const search = () => import('@/views/activity/components/search.vue')

const columns = [
  {
    title: '名称',
    dataIndex: 'theme',
    width: '10%',
    scopedSlots: { customRender: 'theme' }
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    width: '13%',
    scopedSlots: { customRender: 'start_time' },
    defaultSortOrder: 'descend'
  },
  {
    title: '结束时间',
    dataIndex: 'deadline',
    width: '13%',
    scopedSlots: { customRender: 'deadline' }
  },
  {
    title: '地点',
    dataIndex: 'venue',
    width: '7%',
    scopedSlots: { customRender: 'venue' }
  },
  {
    title: '介绍',
    dataIndex: 'introduction',
    width: '10%',
    scopedSlots: { customRender: 'introduction' }
  },
  {
    title: '类型',
    dataIndex: 'remarks',
    width: '10%',
    scopedSlots: { customRender: 'remarks' }
  },
  {
    title: '容量',
    dataIndex: 'capacity',
    width: '5%',
    scopedSlots: { customRender: 'capacity' }
  },
  {
    title: '当前容量',
    dataIndex: 'current_quantity',
    width: '5%',
    scopedSlots: { customRender: 'current_quantity' }
  },
  {
    title: '状态',
    dataIndex: 'finished',
    width: '7%',
    scopedSlots: { customRender: 'finished' }
  },
  {
    title: '学分',
    dataIndex: 'credit',
    width: '6%',
    scopedSlots: { customRender: 'credit' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  components: {
    edit,
    editFrom,
    search
  },
  data() {
    return {
      columns,
      show: false,
      modify: '修改',
      del: '删除',
      add: '添加',
      search: '',
      searchButton: '查找',
      searchData: '',
      loading: false,
      data: {},
      datalength: '',
      params: {
        page: 1,
        pagesize: 10e10
      },
      editingKey: ''
    }
  },
  methods: {
    async queryData() {
      const res = await getRequest('/api/activities', this.params)
      console.log(res)
      this.data = res.data
    },

    async DelData(id) {
      console.log(id)
      await delRequest('/api/activity', id)
      this.queryData()
      this.$message.success('删除成功', 1)
      console.log(id)
    },

    async edit(data, form) {
      await UpdateAlumnuInfo(data.id, form)
      console.log('this')
      this.$message.info('修改成功')
      // console.log(res);
      if (this.$refs.search.formInline.user === '') {
        this.queryData()
      } else {
        this.Search(this.$refs.search.formInline.user)
      }
    },

    // 添加数据 data为新增的信息
    async addItem(data, form) {
      console.log('home')
      console.log(form)
      const mydata = Object.assign({}, form) // 拷贝为对象
      const res = await AddAlumnuInfo('/api/activity/createActivity', mydata)
      this.$message.info('添加成功')
      console.log(res)
      this.queryData()
    },

    async Search(name) {
      console.log('search')
      const res = await searchAlumnuInfo('/api/activity?theme=', name)

var queryData = []
      queryData.push(res.data[0])
      this.data = queryData
    },
    fresh(data, form) {
      this.edit(data, form)
      this.$refs['modifybtn'].visible = false
    },
    onReset() {
      this.$refs.search.form.user = ''
      this.queryData()
      this.$message.info('已重置')
    }
  },
  created() {
    console.log(this.queryData())
    this.queryData()
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
