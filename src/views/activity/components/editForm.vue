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
      label="名称"
    >
      <a-input
        v-decorator="[
          'theme',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="开始时间"
      v-decorator="[
          'start_time',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
    >
      <a-date-picker
        v-decorator="[
          'start_time',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        type="date"
        class="length"
        show-time
        format="YYYY-MM-DD HH:mm"
      />
    </a-form-item>

     <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="结束时间"
    >
      <a-date-picker
        v-decorator="[
          'deadline',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        type="date"
        class="length"
        show-time
        format="YYYY-MM-DD HH:mm"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="地点"
    >
      <a-input
        v-decorator="[
          'venue',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="介绍"
    >
      <a-input
        v-decorator="[
          'introduction',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="类型"
    >
      <a-input
        v-decorator="[
          'remarks',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="容量"
    >
      <a-input
        v-decorator="[
          'capacity',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="当前容量"
    >
      <a-input
        v-decorator="[
          'current_quantity',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="状态"
    >
      <a-select
        v-decorator="[
          'finished',
          { rules: [{ required: true, message: '该项为必填项' }] },
        ]"
        class="length"
      >
        <a-select-option value="未开始">未开始</a-select-option>
        <a-select-option value="进行中">进行中</a-select-option>
        <a-select-option value="已结束">已结束</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="学分"
    >
      <a-input
        v-decorator="[
          'credit',
          { rules: [{ required: true, message: '该项为必填项' }] },
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
        })
      }, 0)
    } else {
      this.visible = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue({
            theme: this.data.theme,
            start_time: this.data.start_time,
            venue: this.data.venue,
            introduction: this.data.introduction,
            deadline: this.data.deadline,
            remarks: this.data.remarks,
            current_quantity: this.data.current_quantity,
            finished: this.data.finished,
            credit: this.data.credit,
            capacity: this.data.capacity
          })
        }, 0)
      })
    }
  }
}
</script>

<style scoped>
.length {
  width: 400px;
}
</style>
