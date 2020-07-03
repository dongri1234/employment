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
      label="姓名"
    >
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学号"
    >
      <a-input
        v-decorator="[
          'student_id',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="性别"
    >
      <a-select
        v-decorator="[
          'sex',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      >
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="出生日期"
      v-decorator="[
          'birthday',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
    >
      <a-date-picker
        v-decorator="[
          'birthday',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        type="date"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学院"
    >
      <a-input
        v-decorator="[
          'college',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="专业"
    >
      <a-input
        v-decorator="[
          'speciality',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="班级"
    >
      <a-input
        v-decorator="[
          'class',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="工作地点"
    >
      <a-input
      v-decorator="[
          'workplace',
        ]"
        class="length" />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="工作单位"
    >
      <a-input
      v-decorator="[
          'workunit',
        ]"
        class="length" />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="职务"
    >
      <a-input
      v-decorator="[
          'employment_status',
        ]"
        class="length" />
    </a-form-item>

    <!-- <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
      <a-button type="primary" @click="check">
        Check
      </a-button>
      <a-button type="primary" @click="commit">
        commit
      </a-button>
    </a-form-item>-->
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
  data() {
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
    check() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.myform = values
          this.flag = 1
        } else {
        }
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    commit() {
      console.log('commit')
      this.$emit('commit', this.myform)
    }
  },
  // 给表单赋初值
  created() {
    if (this.data === undefined) {
      this.isDefine = 0 // 父组件没有传值
      setTimeout(() => {
        this.form.setFieldsValue({
          id: 0
          // name:'',
          // student_id:'',
          // sex:'',
          // birthday:'',
          // college:'',
          // speciality:'',
          // class:'',
          // workplace:'',
          // workunit:'',
          // employment_status:''
        })
      }, 0)
    } else {
      setTimeout(() => {
        this.form.setFieldsValue({
          name: this.data.name,
          student_id: this.data.student_id,
          sex: this.data.sex,
          birthday: moment(this.data.birthday),
          college: this.data.college,
          speciality: this.data.speciality,
          class: this.data.class,
          workplace: this.data.workplace,
          workunit: this.data.workunit,
          employment_status: this.data.employment_status
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
