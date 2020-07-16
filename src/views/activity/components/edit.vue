<template>
  <div>
    <a-button type="primary" @click="showModal">{{text}}</a-button>
    <a-modal
      :title="myTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="700px"
      destroyOnClose
      okText="确定"
      cancelText="取消"
    >
      <p>
        <edit-form ref="form" :data="data" @commit="test"></edit-form>
      </p>
      <slot></slot>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
// import { Model } from 'vue-property-decorator'
const editForm = () => import('./editForm')
moment.locale('zh-cn')
export default {
  props: ['data', 'text', 'search'],
  data() {
    return {
      content: this.text,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal() {
      if (this.text === '查找' && this.$parent.search === '') {
        console.log('ttt')
      } else {
        this.visible = true
      }
    },
    handleOk(key) {
      console.log('edit')
      this.$refs.form.check()
      if (this.$refs.form.flag === 1) {
        this.$refs.form.myform.start_time = moment(this.$refs.form.myform.start_time).format('YYYY-MM-DD HH:mm')
        this.$refs.form.myform.deadline = moment(this.$refs.form.myform.deadline).format('YYYY-MM-DD HH:mm')
        this.$emit('handleOK', this.data, this.$refs['form'].myform)
        this.visible = false
        this.forceRender = true
      }
    },
    getData(form) {
      console.log('我是form')
      this.mydata = form
      console.log(this.mydata)
    },

    test(data) {
      console.log('edit test')
      console.log(data)
    },

    handleCancel(e) {
      this.visible = false
    }

    // getData(data) {
    //   this.mydata = data
    // }
  },
  components: {
    editForm
  },
  computed: {
    myTitle() {
      return this.text + '信息'
    }
  }
}
</script>
