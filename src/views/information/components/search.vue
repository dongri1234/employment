<template>
  <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formInline.user" placeholder="请输入姓名" style="width:350px"></a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" :disabled="formInline.user === ''" @click="search">查找</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
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
      console.log(this.formInline)
    },
    search() {
      this.$emit('onClick', this.formInline.user)
    }
  },
  components: {}
}
</script>
