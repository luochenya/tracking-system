<template>
  <div class="StepOne response">
    <Header />
    <h1 class="StepOne_h1">
      <span @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</span>
      <div>
        <!-- <p>Paired bracelet ID：{{$route.query.uuid}}</p> -->
      </div>
    </h1>
    <h2 class="StepOne_h2">Create a tracking ID</h2>
    <div class="StepOne_box">
      <div class="StepOne_box_left">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <div class="StepOne_box_right">
        <h3>STEP 1 Get the arrival’s info</h3>
        <img src="@/assets/img/img2.png" alt="" />
        <h4>Please scan the arrival’s QR code</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "StepOne",
  components: {
    Header,
    QrcodeStream
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    onDecode (result) {
      this.result = result
      console.log(result)
      this.$router.push({
        path: "/StepTwo",
        query: {
          name: JSON.parse(result).Registration.Name,
          sex: JSON.parse(result).Registration.Gender,
          identityId: JSON.parse(result).Registration['Passpord Number'],
          country: JSON.parse(result).Registration.Country,
          ethnicity: JSON.parse(result).Registration.Ethnicity,
          level3seq: JSON.parse(result).Registration.addr.Area.id ? JSON.parse(result).Registration.addr.Area.id : JSON.parse(result).Registration.addr.Area,
          contactMobile: JSON.parse(result).Registration['Phone Number'],
          Jalan: JSON.parse(result).Registration.addr.Address,
          Area: JSON.parse(result).Registration.addr.Area.name ? JSON.parse(result).Registration.addr.Area.name : JSON.parse(result).Registration.addr.Area,
          District: JSON.parse(result).Registration.addr.District.name ? JSON.parse(result).Registration.addr.District.name : JSON.parse(result).Registration.addr.District,
          State: JSON.parse(result).Registration.addr.State.name ? JSON.parse(result).Registration.addr.State.name : JSON.parse(result).Registration.addr.State,
        }
      })
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style lang="scss">
.StepOne {
  padding-bottom: 20px;
  .StepOne_h1 {
    padding: 30px 0 50px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    span {
      cursor: pointer;
      font-size: 26px;
      font-weight: bold;
      text-decoration: underline;
    }
    div {
      width: 30%;
      p {
        line-height: 24px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .StepOne_h2 {
    margin-bottom: 100px;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }
  .StepOne_box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .StepOne_box_left {
      width: 450px;
      height: 450px;
      border: 1px solid #666666;
    }
    .StepOne_box_center {
      .el-button {
        padding: 20px 50px;
      }
    }
    .StepOne_box_right {
      width: 30%;
      text-align: center;
      img {
        max-width: 100%;
      }
      h3 {
        margin-bottom: 10px;
        font-size: 26px;
        font-weight: bold;
      }
      h4 {
        margin-top: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>