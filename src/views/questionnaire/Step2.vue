<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form-model
      ref="ruleForm"
      :model="form1"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        ref="intentionalityCity1"
        label="意向城市1"
        prop="intentionalityCity1">
        <a-input
          v-model="form1.intentionalityCity1"
          placeholder="请填写你的意向城市1"
          @blur="
            () => {
              $refs.intentionalityCity1.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="intentionalityCity2"
        label="意向城市2"
        prop="intentionalityCity2">
        <a-input
          v-model="form1.intentionalityCity2"
          placeholder="请填写你的意向城市2（可以不填）"
          @blur="
            () => {
              $refs.intentionalityCity2.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="intentionalityCity3"
        label="意向城市3"
        prop="intentionalityCity3">
        <a-input
          v-model="form1.intentionalityCity3"
          placeholder="请填写你的意向城市3（可以不填）"
          @blur="
            () => {
              $refs.intentionalityCity3.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="intentionalityJob1"
        label="意向职位1"
        prop="intentionalityJob1">
        <a-input
          v-model="form1.intentionalityJob1"
          placeholder="请填写你的意向职位1"
          @blur="
            () => {
              $refs.intentionalityJob1.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="intentionalityJob2"
        label="意向职位2"
        prop="intentionalityJob2">
        <a-input
          v-model="form1.intentionalityJob2"
          placeholder="请填写你的意向职位2（可以不填）"
          @blur="
            () => {
              $refs.intentionalityJob2.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="intentionalityJob3"
        label="意向职位3"
        prop="intentionalityJob3">
        <a-input
          v-model="form1.intentionalityJob3"
          placeholder="请填写你的意向职位3（可以不填）"
          @blur="
            () => {
              $refs.intentionalityJob3.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="salary"
        label="期望薪水"
        prop="salary">
        <a-input
          v-model="form1.salary"
          placeholder="请填写你的期望薪水（可以不填）"
          @blur="
            () => {
              $refs.salary.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="nextStep">
          下一步
        </a-button>
        <a-button style="margin-left: 8px" @click="prevStep">
          上一步
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <p>如果你是已经就业或者考研成功可以在必选项中填无，然后跳到下一步骤</p>
      <!-- <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> -->
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      other: '',
      form1: {
        intentionalityCity1: '',
        intentionalityCity2: '',
        intentionalityCity3: '',
        intentionalityJob1: '',
        intentionalityJob2: '',
        intentionalityJob3: '',
        salary: ''
      },
      rules: {
        intentionalityCity1: [{ required: true, message: '请输入你的第一个意向城市', trigger: 'blur' }],
       intentionalityJob1: [{ required: true, message: '请输入你的第一个意向工作', trigger: 'blur' }]
      }
    }
  },
  methods: {
    nextStep () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
           this.$emit('nextStep')
           console.log(this.form1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    },
  resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
  .step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
    align-content: center;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
    align-content: center;
  }
  }
</style>
