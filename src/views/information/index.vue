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

      <a-input
        placeholder="请输入姓名"
        style="width:300px;heigth:50px"
        v-model="search"
        @change="Search"
      />
      <edit :text="searchButton" :data="searchData" style="display:inline-block" ref="modifybtn">
        <edit
          :text="modify"
          @handleOK="fresh"
          :data="searchData"
          style="display:inline-block"
          :forceRender="true"
        ></edit>
        <a-popconfirm
          title="确定删除?"
          @confirm="() =>{
          DelData(searchData.id);
          this.$refs['modifybtn'].visible=false;
        } "
        >
          <a-button type="primary" style="margin-top:5px">删除</a-button>
        </a-popconfirm>
      </edit>
      <edit :text="add" @handleOK="addItem" ref="addData" style="display:inline-block;margin-left:10px"></edit>

      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="finished" slot-scope="text">{{text===0?'进行中':'已结束'}}</span>
        <span slot="operation" slot-scope="text, record">
          <a-button-group>
            <edit :text="modify" @handleOK="edit" :data="record"></edit>
            <a-popconfirm
              title="确定删除?"
              @confirm="() => DelData(record.id)"
            >
              <a-button type="primary" style="margin-top:5px">删除</a-button>
            </a-popconfirm>
          </a-button-group>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// import { STable, Ellipsis } from '@/components'

// import { Component, Vue } from 'vue-property-decorator'
import {
  getRequest,
  delRequest,
  UpdateAlumnuInfo,
  AddAlumnuInfo,
  searchAlumnuInfo
} from '../../api/studentInfo'
import edit from '@/views/information/components/edit.vue'
const editFrom = () => import('@/views/information/components/editForm.vue')
const addItem = () => import('@/views/information/components/AddItem.vue')

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '学号',
    dataIndex: 'student_id',
    width: '10%',
    scopedSlots: { customRender: 'student_id' },
    defaultSortOrder: 'descend'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '7%',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '13%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '学院',
    dataIndex: 'college',
    width: '15%',
    scopedSlots: { customRender: 'college' }
  },
  {
    title: '专业',
    dataIndex: 'speciality',
    width: '10%',
    scopedSlots: { customRender: 'speciality' }
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '10%',
    scopedSlots: { customRender: 'class' }
  },
  {
    title: '工作地点',
    dataIndex: 'workplace',
    width: '10%',
    scopedSlots: { customRender: 'workplace' }
  },
  {
    title: '工作单位',
    dataIndex: 'workunit',
    width: '10%',
    scopedSlots: { customRender: 'workunit' }
  },
  {
    title: '职务',
    dataIndex: 'post',
    width: '10%',
    scopedSlots: { customRender: 'post' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'Activity',
  components: {
    edit,
    editFrom,
    addItem
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
      data: [],
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
      const res = await getRequest('/api/alumnus', this.params)
      this.data = res.data.data
      console.log(this.data.length)
      console.log('return data', typeof this.data)
    },

    async DelData(id) {
      console.log(id)
      await delRequest('/api/alumnus', id)
      this.queryData()
      this.$message.success('删除成功', 1)

      console.log(id)
    },

    async edit(data, form) {
      await UpdateAlumnuInfo(data.id, form)
      console.log('this')
      // console.log(res);
      this.queryData()
    },

    // 添加数据 data为新增的信息
    async addItem(data, form) {
      console.log('home')
      console.log(form)
      const mydata = Object.assign({}, form) // 拷贝为对象
      const res = await AddAlumnuInfo('/api/alumnus/createAlumnu', mydata)
      console.log(res)
      this.queryData()
    },

    async Search() {
      console.log(this.search)
      if (this.search === '') {
        this.$message.error('This is an error message')
      }

      console.log('search')
      const res = await searchAlumnuInfo('/api/alumnus/findAlumnu?name=', this.search)
      this.searchData = res.data.data

      // console.log(res.data.data);
    },
    fresh(data, form) {
      this.edit(data, form)
      this.$refs['modifybtn'].visible = false
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
