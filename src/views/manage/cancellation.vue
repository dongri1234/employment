<template>

  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="学号">
        <a-input v-model="form.id" :disabled="true"/>
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="form.name" :disabled="true"/>
      </a-form-model-item>
      <a-form-model-item label="是否填写过问卷">
        <a-radio-group v-model="form.resource" :disabled="true" >
          <a-radio value="1">
            填写
          </a-radio>
          <a-radio value="2">
            没填写
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleLogout">
          注销
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <p>一旦注销账号你的填写过的问卷信息将不会保存</p>
      <p>你的账号信息将都会被注销掉</p>
    </div>
  </a-card>
</template>

<script>
import { Modal } from 'ant-design-vue'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '11',
        id: undefined,
        resource: ''
      }
    }
  },
  methods: {
        handleLogout (e) {
      Modal.confirm({
        title: this.$t('提示'),
        content: this.$t('你真要注销掉账号吗'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          // return this.$store.dispatch('Logout').then(() => {
          //   this.$router.push({ name: 'login' })
          // })
          this.$message.info('注销成功')
          console.log(this.form.name)
        },
        onCancel () {}
      })
    }
  }
}
</script>
