<template>

  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="旧密码" prop="old">
        <a-input v-model="ruleForm.old" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="新密码" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认新密码" prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </a-form-model-item>
      <!-- <a-form-model-item has-feedback label="Age" prop="age">
      <a-input v-model.number="ruleForm.age" />
    </a-form-model-item> -->
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <p>密码尽量设置复杂</p>
      <!-- <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> -->
    </div>
  </a-card>
</template>

<script>
import { Modal } from 'ant-design-vue'
export default {
  data () {
    // let checkPending
    const checkAge = (rule, value, callback) => {
      // clearTimeout(checkPending)
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else { callback() }
      // checkPending = setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('Please input digits'))
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('Age must be greater than 18'))
      //     } else {
      //       callback()
      //     }
      //   }
      // }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入第一密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入第二此密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        old: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        old: [{ validator: checkAge, trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
                Modal.confirm({
        title: this.$t('提示'),
        content: this.$t('你真要修改该账号的密码吗'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          // return this.$store.dispatch('Logout').then(() => {
          //   this.$router.push({ name: 'login' })
          // })
          this.$message.info('修改成功')
          console.log('111')
        },
        onCancel () {}
      })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$message.info('重置成功')
    }
  }
}
</script>
