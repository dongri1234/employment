<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <template v-slot:content>
      学生按照步骤依序填写
    </template>
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="填写学生个人信息" />
        <a-step title="填写意向信息" />
        <a-step title="填写读研或就业信息" />
        <a-step title="完成" />
      </a-steps>
      <div class="content">
        <keep-alive>
          <step1 v-if="currentTab === 0" @nextStep="nextStep" />
          <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
          <step3 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" />
          <step4 v-if="currentTab === 3" @prevStep="prevStep" @finish="finish" />
        </keep-alive>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Step1 from '@/views/questionnaire/Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
export default {
  name: 'Index',
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data () {
    return {
      currentTab: 0,
      // form
      form: null
    }
  },
  methods: {

    // handler
    nextStep () {
      if (this.currentTab < 3) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
