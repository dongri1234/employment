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
import { delRequest, UpdateAlumnuInfo, AddAlumnuInfo, searchAlumnuInfo } from '../../api/studentInfo'
import edit from '@/views/information/components/edit.vue'
import { getRequest } from '@/api/studentInfo'
const editFrom = () => import('@/views/information/components/editForm.vue')
const search = () => import('@/views/information/components/search.vue')

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '7%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '学号',
    dataIndex: 'student_id',
    width: '7%',
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
    width: '10%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '学院',
    dataIndex: 'college',
    width: '10%',
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
  // name: 'Activity',
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
      const res = await getRequest('/api/alumnus', this.params)
      this.data = res.data.data
      console.log(this.data.data)
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
      const res = await AddAlumnuInfo('/api/alumnus/createAlumnu', mydata)
      this.$message.info('添加成功')
      console.log(res)
      this.queryData()
    },

    async Search(name) {
      console.log('search')
      const res = await searchAlumnuInfo('/api/alumnus/findAlumnu?name=', name)
      var queryData = []
      queryData.push(res.data.data)
      this.data = queryData
    },
    fresh(data, form) {
      this.edit(data, form)
      this.$refs['modifybtn'].visible = false
    },
    onReset() {
      this.$refs.search.formInline.user = ''
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
