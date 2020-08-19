<template>
  <a-form :form="form">
    <!-- //只是为了能设置id的值，并不显示 -->
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="id"
      :style="{display:'none'}"
    >
      <a-input
        v-decorator="[
          'id',
        ]" />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学号"
    >
      <a-input
        v-decorator="[
          'sno',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="姓名"
    >
      <a-input
        v-decorator="[
          'sname',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学院"
    >
      <a-select
        v-decorator="[
          'academy',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      >
        <a-select-option value="计算机与信息安全学院">计算机与信息安全学院</a-select-option>
        <a-select-option value="外国语学院">外国语学院</a-select-option>
        <a-select-option value="材料学院">材料学院</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="专业名称"
    >
      <a-input
        v-decorator="[
          'majorname',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学历"
    >
      <a-select
        v-decorator="[
          'educationBackground',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      >
        <a-select-option value="本科">本科</a-select-option>
        <a-select-option value="研究生">研究生</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="就业状态"
    >
      <a-select
        v-decorator="[
          'status',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      >
        <a-select-option value="0">未签约</a-select-option>
        <a-select-option value="1">已签约</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="职业发展方向"
    >
      <a-input
        v-decorator="[
          'employmentOrientation',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="电话"
    >
      <a-input
        v-decorator="[
          'phone',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="姓名"
    >
      <a-input
        v-decorator="[
          'QQ',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="技能"
    >
      <a-input
        v-decorator="[
          'skill',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="挂科科目"
    >
      <a-input
        v-decorator="[
          'failedCourse',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向城市1"
    >
      <a-input
        v-decorator="[
          'intentionalityCity1',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向城市2"
    >
      <a-input
        v-decorator="[
          'intentionalityCity2',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向城市3"
    >
      <a-input
        v-decorator="[
          'intentionalityCity3',
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向职位1"
    >
      <a-input
        v-decorator="[
          'intentionalityJob1',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向职位2"
    >
      <a-input
        v-decorator="[
          'intentionalityJob2',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="意向职位2"
    >
      <a-input
        v-decorator="[
          'intentionalityJob2',
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="期望薪水"
    >
      <a-input
        v-decorator="[
          'salary',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="考研分数"
    >
      <a-input
        v-decorator="[
          'score',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="读研学校"
    >
      <a-input
        v-decorator="[
          'school',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="读研专业"
    >
      <a-input
        v-decorator="[
          'major',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="读研学校所在地"
    >
      <a-input
        v-decorator="[
          'location',
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="职业名称"
    >
      <a-input
        v-decorator="[
          'jobName',
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="就业公司名称"
    >
      <a-input
        v-decorator="[
          'company',
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="就业公司地址"
    >
      <a-input
        v-decorator="[
          'location2',
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="职位详细描述"
    >
      <a-input
        v-decorator="[
          'details',
        ]"
        class="length"
      />
    </a-form-item>

    <!-- <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
      <a-button type="primary" @click="check">
        Check
      </a-button>
      <a-button type="primary" @click="commit">
        commit
      </a-button>
    </a-form-item> -->
  </a-form>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}

export default {
  props: ['data'],
  data () {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      myform: '',
      flag: 0
    }
  },
  methods: {
    check () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.myform = values
          this.flag = 1
        } else {
        }
      })
    },
    handleChange (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    commit () {
      // console.log(this.myform)
      // this.$emit('commit', this.myform)
            // console.log(this.myform)
      this.$emit('commit', 'dhdhdhdhd')
    }
  },
  // 给表单赋初值
  created () {
    if (this.data === undefined) {
      this.isDefine = 0 // 父组件没有传值
      setTimeout(() => {
        this.form.setFieldsValue({
          id: 0
        })
      }, 0)
    } else {
      setTimeout(() => {
        this.form.setFieldsValue({
          sno: this.data.sno,
          sname: this.data.sname,
          academy: this.data.academy,
          majorname: this.data.majorname,
          educationBackground: this.data.educationBackground,
          // phone: this.data.phone,
          // qq: this.data.qq,
          // skill: this.data.skill,
          // failedCourse: this.data.failedCourse,
          // birthday: moment(this.data.birthday),
          // intentionalityCity1: this.data.intentionalityCity1,
          // intentionalityCity2: this.data.intentionalityCity2,
          // intentionalityCity3: this.data.intentionalityCity3,
          // intentionalityJob1: this.data.intentionalityJob1,
          // intentionalityJob2: this.data.intentionalityJob2,
          // intentionalityJob3: this.data.intentionalityJob3,
          // salary: this.data.salary,
          // score: this.data.score,
          // school: this.data.school,
          // major: this.data.major,
          // location: this.data.location,
          // jobName: this.data.jobName,
          // company: this.data.company,
          details: this.data.details
          // location2: this.data.location2
        })
      }, 0)
    }
  }
}
</script>

<style scoped>
.length {
  width: 400px;
}
</style>
