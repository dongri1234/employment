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
        ref="score"
        label="考研分数"
        prop="score">
        <a-input
          v-model="form1.score"
          placeholder="请填写你的考研分数（可以不填）"
          @blur="
            () => {
              $refs.score.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="school"
        label="读研学校"
        prop="school">
        <a-input
          v-model="form1.school"
          placeholder="请填写你的读研的学校（可以不填）"
          @blur="
            () => {
              $refs.school.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="major"
        label="读研专业"
        prop="major">
        <a-input
          v-model="form1.major"
          placeholder="请填写你的读研的专业（可以不填）"
          @blur="
            () => {
              $refs.major.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="location"
        label="读研学校所在地"
        prop="location">
        <a-input
          v-model="form1.location"
          placeholder="请填写你的读研的学校的地址（可以不填）"
          @blur="
            () => {
              $refs.location.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="jobName"
        label="职业名称"
        prop="jobName">
        <a-input
          v-model="form1.jobName"
          placeholder="请填写你的职位名称（可以不填）"
          @blur="
            () => {
              $refs.jobName.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="company"
        label="就业公司名称"
        prop="company">
        <a-input
          v-model="form1.company"
          placeholder="请填写你的就业公司名称（可以不填）"
          @blur="
            () => {
              $refs.company.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="location2"
        label="就业公司地址"
        prop="location2">
        <a-input
          v-model="form1.location2"
          placeholder="请填写你的就业公司的地址（可以不填）"
          @blur="
            () => {
              $refs.location2.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="职位详细描述" prop="details">
        <a-input v-model="form1.details" placeholder="请详细描述你的职位（可以不填）" type="textarea" />
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
      <p>如果你是已经填写过意向信息，可以直接点击下一步，跳到下一步骤</p>
      <!-- <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> -->
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'Step3',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      other: '',
      form1: {
        score: '',
        school: '',
        major: '',
        location: '',
        jobName: '',
        company: '',
       location2: '',
        details: ''
      },
      rules: {
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
