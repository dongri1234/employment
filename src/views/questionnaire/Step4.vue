<template>
  <div>
    <a-form>
      <a-result title="操作成功" :is-success="true" style="max-width: 560px; margin: 40px auto 0;">
        <div class="information">
          <a-row>
            你填写的信息已经提交成功
          </a-row>
          <a-row>
            感谢你的配合
          </a-row>
          <!-- <a-row>
            <a-col :sm="8" :xs="24">收款人姓名：</a-col>
            <a-col :sm="16" :xs="24">辉夜</a-col>
          </a-row> -->
        </div>
        <template #extra>
          <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
          <a-button type="primary" @click="finish">重新填写</a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step4',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    finish () {
      this.$emit('finish')
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>
<style lang="less" scoped>
  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
