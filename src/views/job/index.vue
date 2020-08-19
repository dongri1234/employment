<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar"/>
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <!-- <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div> -->
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        welcome to system
      </div>
    </template>
    <a-card :bordered="false">
      <div style="margin-bottom: 16px">
        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
          导出
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `已选择 ${selectedRowKeys.length} 条` }}
          </template>
        </span>
        <edit
          :text="add"
          @handleOK="addItem"
          ref="addData"
          style="display:inline-block;margin-left:10px float:right"
        ></edit>
      </div>
      <!-- <edit
      :text="add"
      @handleOK="addItem"
      ref="addData"
      style="display:inline-block;margin-left:10px"
    ></edit> -->
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :data-source="data"
        :columns="columns"
        :pagination="{ pageSize: 3 }"
        :scroll="{ x: 3500 }">
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            查询
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            重置
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
          <span v-if="searchText && searchedColumn === column.dataIndex">
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{ fragment }}</mark
              >
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <span>
            <edit
              :text="modify"
              @handleOK="edit"
              :data="record"
              style="display:inline-block"
            ></edit>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="DelData(record.id)">
              <a-button type="primary" style="margin-left:5px">删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      <!-- <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/> -->
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getRoleList, getServiceList } from '@/api/manage'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { baseMixin } from '@/store/app-mixin'
import { getRequest, delRequest, UpdateAlumnuInfo, AddAlumnuInfo, searchAlumnuInfo } from '@/api/job'
// import { delRequest, UpdateAlumnuInfo, AddAlumnuInfo, searchAlumnuInfo } from '../../api/studentInfo'
import edit from '@/views/job/components/edit.vue'
const editFrom = () => import('@/views/job/components/editForm.vue')
const search = () => import('@/views/job/components/search.vue')
// const data = [
//   {
//     key: 1,
//     sname: '张三一',
//     academy: '计算机与信息安全学院',
//     majorname: '软件工程',
//     sno: 1800300331,
//     educationBackground: '本科'
//   },
//     {
//     key: 2,
//     sname: '张三二',
//     academy: '计算机与信息安全学院',
//     majorname: '软件工程',
//     sno: 1800300332,
//     educationBackground: '本科'
//   },
//     {
//     key: 3,
//     sname: 'John Brown3',
//     academy: '计算机与信息安全学院',
//     majorname: '软件工程',
//     sno: 1800300333,
//     educationBackground: '本科'
//   },
//     {
//     key: 4,
//     sname: 'John Brown4',
//     academy: '计算机与信息安全学院',
//     majorname: '软件工程',
//     sno: 1800300334,
//     educationBackground: '研究生'
//   },
//     {
//     key: 5,
//     sname: 'John Brown5',
//     academy: '计算机与信息安全学院',
//     majorname: '软件工程',
//     sno: 1800300339,
//     educationBackground: '本科'
//   }
// ]

export default {
  name: 'Workplace',
   mixins: [baseMixin],
  components: {
    PageHeaderWrapper,
        edit,
    editFrom,
    search
  },
  data () {
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
       timeFix: timeFix(),
      avatar: '',
      user: {},
            data: {},
      datalength: '',
      params: {
        page: 1,
        pagesize: 10e10
      },
      modify: '编辑',
      del: '删除',
      add: '添加',
      searchText: '',
      searchInput: null,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      searchedColumn: '',
      count: 5,
      pageSize: 20,
      current: 4,
      columns: [
                {
          title: '学号',
          dataIndex: 'sno',
          width: 100,
          fixed: 'left',
          key: 'sno',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.sno
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '姓名',
          dataIndex: 'sname',
          width: 100,
          fixed: 'left',
          key: 'sname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
            //  customRender: 'name'
          },
          onFilter: (value, record) =>
            record.sname
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '学院',
          dataIndex: 'academy',
          // width: 80,
          // fixed: 'left',
          key: 'academy',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.academy
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '专业名称',
          dataIndex: 'majorname',
          key: 'majorname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.majorname
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '学历',
          dataIndex: 'educationBackground',
          key: 'educationBackground',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.educationBackground
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '就业状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.status
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '职业发展方向',
          dataIndex: 'employmentOrientation',
          key: 'employmentOrientation',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.employmentOrientation
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.phone
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: 'QQ',
          dataIndex: 'qq',
          key: 'qq',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.qq
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '技能',
          dataIndex: 'skill',
          key: 'skill',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.技能
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '挂科科目',
          dataIndex: 'failedCourse',
          key: 'failedCourse',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.failedCourse
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '意向城市1',
          dataIndex: 'intentionalityCity1',
          key: 'intentionalityCity1',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityCity1
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '意向城市2',
          dataIndex: 'intentionalityCity2',
          key: 'intentionalityCity2',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityCity2
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '意向城市3',
          dataIndex: 'intentionalityCity3',
          key: 'intentionalityCity3',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityCity3
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '意向职位1',
          dataIndex: 'intentionalityJob1',
          key: 'intentionalityJob1',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityJob1
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '意向职位2',
          dataIndex: 'intentionalityJob2',
          key: 'intentionalityJob2',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityJob2
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '意向职位3',
          dataIndex: 'intentionalityJob3',
          key: 'intentionalityJob3',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.intentionalityJob3
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '期望薪水',
          dataIndex: 'salary',
          key: 'salary',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.salary
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '考研分数',
          dataIndex: 'score',
          key: 'score',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.score
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '读研学校',
          dataIndex: 'school',
          key: 'school',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.school
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '读研专业',
          dataIndex: 'major',
          key: 'major',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.failedCourse
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '读研学校所在地',
          dataIndex: 'location',
          key: 'location',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.location
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '职业名称',
          dataIndex: 'jobName',
          key: 'jobName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.jobName
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '就业公司名称',
          dataIndex: 'company',
          key: 'company',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.company
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '就业公司地址',
          dataIndex: 'location2',
          key: 'location2',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.location2
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
                {
          title: '职位详细描述',
          dataIndex: 'details',
          key: 'details',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.details
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 190,
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  created () {
        console.log(this.queryData())
    this.queryData()
    getRoleList({ t: new Date() })
     this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })
    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    },
        ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    currentUser () {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    },
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
      async queryData() {
      const res = await getRequest('/api/job/findAll', this.params)
      console.log(res)
      this.data = res.data
      // this.data
    },
    async DelData(id) {
      // console.log('11')
      console.log(id)
      await delRequest('/api/job/deleteById', id)
      this.queryData()
      this.$message.success('删除成功', 1)
      console.log(id)
    },

    async edit(data, form) {
      await UpdateAlumnuInfo(data.id, form)
      console.log('this')
      this.$message.info('修改成功')
      // console.log(res);
      this.queryData()
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
      const res = await AddAlumnuInfo('/api/job/create', mydata)
      this.$message.info('添加成功')
      console.log(res)
      this.queryData()
    },

    async Search(name) {
      console.log('search')
      const res = await searchAlumnuInfo('/api/alumnus/findAlumnu?name=', name)
      var queryData = []
      queryData.push(res.data)
      this.data = queryData
    },
    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    async remove (key) {
      await delRequest('/api/job/deleteById', key)
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
      this.$message.info('删除成功')
    },
    // async edit (data, form) {
    //   // await UpdateAlumnuInfo(data.id, form)
    //   console.log('this')
    //   console.log(form)
    //   // console.log(data)
    //   this.$message.info('修改成功')
    //   // data = form.data
    //   data.sno = form.sno
    //   data.sname = form.sname
    //   data.academy = form.academy
    //   data.majorname = form.majorname
    //   data.educationBackground = form.educationBackground
    //   // data.sname = form.sname
    //   // data.sname = form.sname
    //   // data.sname = form.sname
    //   // data.sname = form.sname
    //   // data.sname = form.sname
    //   // data.age = form.student_id
    // },
    // async addItem (data, form) {
    //   // console.log('home')
    //   console.log(form)
    //   // console.log(this.count)
    //   // // const mydata = Object.assign({}, form) // 拷贝为对象
    //   // // const res = await AddAlumnuInfo('/api/alumnus/createAlumnu', mydata)
    //   this.$message.info('添加成功')
    //   //  const { count, data } = this
    //   const newData = {
    //     key: this.count,
    //     sno: form.sno,
    //     sname: form.sname,
    //     academy: form.academy,
    //     majorname: form.majorname,
    //     educationBackground: form.educationBackground

    //   }
    //   console.log(newData)
    //   console.log(this.data)
    //   this.data = [...this.data, newData]
    //   this.count = this.count + 1
    // },
    start () {
      this.loading = true
      // ajax request after empty completing
      console.log('选择', this.selectedRowKeys)
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
      this.$message.info('导出成功')
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
  .mobile {
    .project-list {
      .project-card-grid {
        width: 100%;
      }
    }
    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }
    .headerContent .title .welcome-text {
      display: none;
    }
  }
</style>
