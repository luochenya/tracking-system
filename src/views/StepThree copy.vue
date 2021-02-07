<template>
  <div class="StepOne response">
    <Header />
    <h1 class="StepOne_h1">
      <span @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</span>
      <div></div>
    </h1>
    <h2 class="StepOne_h2">Create a tracking ID</h2>
    <div class="StepOne_box">
      <div class="StepOne_Left">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <div class="StepOne_right">
        <h3>STEP 1 Get the bracelet info</h3>
        <img src="@/assets/img/img3.png" alt="">
        <h4>
          Please starting up the bracelet first.
          Please scan the QR code on the box
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import { QrcodeStream } from 'vue-qrcode-reader'
import axios from "axios";
export default {
  name: "StepOne",
  components: {
    Header,
    QrcodeStream
  },
  data() {
    return {
      result: '',
      error: ''
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    onDecode (result) {
      this.result = result
      console.log(result)
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      axios.post('https://bt.twczw.website/web/Overt/check_user/' + JSON.parse(result).Bracelet['S/N']).then(res => {
        if (res.data.code == 200) {
          this.$router.push({
            path: "/StepFour",
            query: {
              major: JSON.parse(result).Bracelet.major,
              uuid: JSON.parse(result).Bracelet['S/N'],
              name: this.$route.query.name,
              sex: this.$route.query.sex,
              identityId: this.$route.query.identityId,
              country: this.$route.query.country,
              ethnicity: this.$route.query.ethnicity,
              level3seq: this.$route.query.level3seq,
              contactMobile: this.$route.query.contactMobile,
              Jalan: this.$route.query.Jalan,
              Area: this.$route.query.Area,
              District: this.$route.query.District,
              State: this.$route.query.State,
              address: this.$route.query.address,
              lat: this.$route.query.lat,
              lng: this.$route.query.lng,
              state: this.$route.query.state,
              arrival_time: this.$route.query.arrival_time
            }
          })
        } else {
          alert(res.data.msg)
          // return this.$message({
          //   message: res.data.msg,
          //   type: 'error'
          // });
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

<style lang="scss" scoped>
.StepOne {
  padding-bottom: 20px;
  .StepOne_h1 {
    padding: 30px 20px 50px 20px;
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
    .StepOne_Left {
      width: 370px;
      height: 370px;
      border: 1px solid #666666;
    }
    .StepOne_right {
      width: 30%;
      text-align: center;
      img {
        max-width: 100%;
      }
      h3 {
        margin-bottom: 20px;
        font-size: 26px;
        font-weight: bold;
      }
      h4 {
        margin-top: 20px;
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
}
</style>