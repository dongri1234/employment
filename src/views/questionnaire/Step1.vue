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
        ref="sno"
        label="学号"
        prop="sno">
        <a-input
          v-model="form1.sno"
          placeholder="请填写你的学号"
          @blur="
            () => {
              $refs.sno.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="sname"
        label="姓名"
        prop="sname">
        <a-input
          v-model="form1.sname"
          placeholder="请填写你的姓名"
          @blur="
            () => {
              $refs.sname.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="学院" prop="academy">
        <a-select v-model="form1.academy" placeholder="请选择你所属的学院" >
          <a-select-option value="计算机与信息安全学院">
            计算机与信息安全学院
          </a-select-option>
          <a-select-option value="外国语学院">
            外国语学院
          </a-select-option>
          <a-select-option value="材料学院">
            材料学院
          </a-select-option>
          <!-- <a-select-option value="boshi">
            博士
          </a-select-option> -->
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        ref="majorname"
        label="专业名称"
        prop="majorname">
        <a-input
          v-model="form1.majorname"
          placeholder="请填写你的专业名称"
          @blur="
            () => {
              $refs.majorname.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="学历" prop="educationBackground">
        <a-select v-model="form1.educationBackground" placeholder="请选择你的学历" >
          <a-select-option value="本科">
            本科
          </a-select-option>
          <a-select-option value="研究生">
            研究生
          </a-select-option>
          <!-- <a-select-option value="boshi">
            博士
          </a-select-option> -->
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="就业状态" prop="status">
        <a-select v-model="form1.status" placeholder="请选择你的就业状态" >
          <a-select-option value="0">
            未签约
          </a-select-option>
          <a-select-option value="1">
            已签约
          </a-select-option>
          <!-- <a-select-option value="boshi">
            博士
          </a-select-option> -->
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        ref="employmentOrientation"
        label="职业发展方向"
        prop="employmentOrientation">
        <a-input
          v-model="form1.employmentOrientation"
          placeholder="请填写你的职业发展方向（可以不填）"
          @blur="
            () => {
              $refs.employmentOrientation.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="phone"
        label="电话"
        prop="phone">
        <a-input
          v-model="form1.phone"
          placeholder="请填写你的QQ（可以不填）"
          @blur="
            () => {
              $refs.phone.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        ref="qq"
        label="QQ"
        prop="qq">
        <a-input
          v-model="form1.qq"
          placeholder="请填写你的QQ（可以不填）"
          @blur="
            () => {
              $refs.qq.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="技能" prop="skill">
        <a-input v-model="form1.skill" placeholder="请填写你的会的技能（可以不填）" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="挂科科目" prop="failedCourse">
        <a-input v-model="form1.failedCourse" placeholder="请填写你的挂科科目（可以不填）" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="nextStep">
          下一步
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <p>请认真确认个人信息是否填写正确</p>
      <!-- <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> -->
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      other: '',
      form1: {
        sno: '',
        sname: '',
        academy: undefined,
        majorname: '',
        educationBackground: undefined,
        status: undefined,
        employmentOrientation: '',
        phone: '',
        qq: '',
        skill: '',
        failedCourse: ''
      },
      rules: {
        sno: [
          { required: true, message: '请输入你的学号', trigger: 'blur' },
          { min: 8, max: 12, message: '长度在8到10位', trigger: 'blur' }
        ],
        sname: [{ required: true, message: '请输入你的姓名', trigger: 'blur' }],
        academy: [{ required: true, message: '请选择你的学院', trigger: 'change' }],
        majorname: [{ required: true, message: '请输入你的专业', trigger: 'blur' }],
        educationBackground: [{ required: true, message: '请选择你的学历', trigger: 'change' }],
        status: [{ required: true, message: '请选择你的就业状态', trigger: 'change' }]
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
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
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
  }
}
</style>
