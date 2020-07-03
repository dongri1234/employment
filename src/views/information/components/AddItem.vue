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
    >
      <p>
        <edit-form :data="form" ref="form"></edit-form>
        <!-- <atry :data="data"  ref="form"></atry> -->
      </p>
    </a-modal>
  </div>
</template>
<script>
const editForm = () => import('./editForm')

export default {
  props: ['text'],
  data() {
    return {
      content: this.text,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      form: {
        birthday: '1',
        card_id: '1',
        class: '1',
        college: '1',
        education: '1',
        employment_status: '1',
        grade: '1',
        id: '1',
        name: '1',
        phone: '1',
        post: '1',
        school: '1',
        sex: '男',
        speciality: '1',
        student_id: '1',
        student_status: '1',
        workplace: '1'
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(key) {
      this.$refs.form.onSubmit()

      console.log(this.$refs.form.isSubmit)
      const flag = this.$refs.form.isSubmit
      if (flag) {
        this.$emit('handleOK', this.data, this.$refs['form'].form)
          console.log(this.$refs['form'].form)
        this.visible = false
        this.$refs.form.resetForm()
      }
    },

    test() {
      console.log(this.$refs['form'].form, this.data.id)
    },

    handleCancel(e) {
      this.$refs.form.resetForm()
      console.log('Clicked cancel button')
      this.visible = false
    }
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
