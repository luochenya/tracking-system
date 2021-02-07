<template>
  <div class="Operation response">
    <Header />
    <h1 class="Operation_h1" @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control </h1>
    <div class="Operation_box">
      <!-- 第一步 -->
      <div class="Operation_box_div">
        <h2>Step1：Scan the  QR code on a bracelet</h2>
        <el-button type="primary" @click="toStepOne()">Click to scan</el-button>
        <div>Bracelet info</div>
        <p></p>
        <p></p>
      </div>
      <!-- 第二步 -->
      <div class="Operation_box_div">
        <h2>Step2：Scan the  QR code on an arrival’s phone for registration info</h2>
        <el-button type="primary" @click="toStepTwo()" disabled>Click to scan</el-button>
        <div>Personal info</div>
        <p></p>
        <p></p>
      </div>
      <!-- 第三步 -->
      <div class="Operation_box_div">
        <h2>Step3：Take a personal photo</h2>
        <el-button type="primary" @click="toStepThree()" disabled>Click to take photo</el-button>
        <div>
          <img src="https://olxure.openlife.co/gsc/2M1D9H/bb/32/40/bb32402ad7754eeabccec8a7864f0dbd/images/正確頁面/u155.svg?token=c0847853e96fd657eb81febe44c95f047a38c2d14b19fef344e553b3ff1c8bfc" alt="">
        </div>
      </div>
    </div>
    <div class="Operation_button">
      <el-button type="primary" disabled>ADD</el-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  name: "Operation",
  components: {
    Header
  },
  methods: {
    // 跳转首页
    toHome() {
      this.$router.push('/')
    },
    // 第一步
    toStepOne() {
      this.$router.push("/StepOne")
    },
    // 第二步
    toStepTwo() {
      // this.$router.push("/StepTwo")
    },
    // 第三步
    toStepThree() {
      // this.$router.push("/StepThree")
    }
  }
}
</script>

<style lang="scss">
.Operation {
  .Operation_h1 {
    display: inline-block;
    cursor: pointer;
    padding: 30px 20px 70px;
    font-size: 26px;
    font-weight: bold;
    text-decoration: underline;
  }
  .Operation_box {
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    .Operation_box_div {
      width: 30%;
      text-align: center;
      h2 {
        height: 90px;
        font-size: 22px;
        line-height: 25px;
      }
      .el-button {
        width: 90%;
        padding: 20px;
        font-size: 16px;
      }
      div {
        margin-top: 40px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
      }
      p {
        height: 70px;
        border-bottom: 2px solid #000000;
        font-size: 18px;
        line-height: 23px;
      }
      img {
        cursor: pointer;
        margin-top: 40px;
      }
    }
  }
  .Operation_button {
    display: flex;
    justify-content: center;
    padding: 30px;
    .el-button {
      padding: 20px 50px;
      font-size: 16px;
    }
  }
}
</style>