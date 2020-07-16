<template>
  <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="form.user" placeholder="请输入活动名称" style="width:350px"></a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" :disabled="form.user === ''" @click="search">查找</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: ''
      },
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      modify: '修改',
      searchData: ''
    }
  },
  methods: {
    handleSubmit(e) {
      console.log(this.form)
    },
    search() {
      this.$emit('onClick', this.form.user)
    }
  },
  components: {}
}
</script>
