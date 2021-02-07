<template>
  <div class="StepThree">
    <Header />

      <div class="StepThree_box">
        <h1 class="StepThree_box_h1">Scan code for epidemic prevention watch</h1>
        <div class="StepThree_box_step">
          <div class="StepThree_box_step_div active">
            <div>01</div>
            <p>
              Get passenger information
            </p>
          </div>
          <span></span>
          <div class="StepThree_box_step_div active">
            <div>02</div>
            <p>
              Confirmed passenger
              <br />
              Isolation address
            </p>
          </div>
          <span></span>
          <div class="StepThree_box_step_div active">
            <div>03</div>
            <p>
              Get epidemic prevention
              <br />
              Bracele information
            </p>
          </div>
          <span></span>
          <div class="StepThree_box_step_div">
            <div>04</div>
            <p>
              Bracele connection status test
            </p>
          </div>
          <span></span>
          <div class="StepThree_box_step_div">
            <div>05</div>
            <p>
              Get passengers
              <br />
              Face photo
            </p>
          </div>
        </div>
        <div class="StepThree_box_qrcode">
          <div class="qrcode">
            <qrcode-stream @decode="onDecode" @init="onInit" />
          </div>
        </div>
          <h2 class="StepThree_box_h2">Please scan the Qr Code on the outer box of the epidemic prevention bracelet</h2>
      </div>
    
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Bottom from "@/components/Bottom.vue"
import { QrcodeStream } from 'vue-qrcode-reader'
import axios from "axios";
export default {
  name: "StepThree",
  inject: ['reload'], 
  components: {
    Header,
    Bottom,
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
      if (!result) {
        return false
      }
      if (result.indexOf('Bracelet') == -1) {
        return this.$alert('This QRcode is invalid', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          this.reload()
        }).catch(() => {   
          this.reload()      
        });
      }
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
.StepThree {
  width: 100%;
  min-height: 100vh;
  .StepThree_box {
    padding: 50px 30px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepThree_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 36px;
    }
    .StepThree_box_step {
      display: flex;
      align-items: center;
      justify-content: center;
      .StepThree_box_step_div {
        position: relative;
        div {
          width: 60px;
          height: 60px;
          background: #EAEDF9;
          border: 8px solid #FFFFFF;
          font-size: 18px;
          font-family: OPPOSans-H, OPPOSans;
          font-weight: normal;
          color: #FFFFFF;
          line-height: 44px;
          text-align: center;
          border-radius: 50%;
        }
        p {
          width: 220px;
          height: 40px;
          position: absolute;
          left: 50%;
          top: 80px;
          transform: translate(-50%, -50%);
          font-size: 16px;
          font-weight: 400;
          color: #B4BAC6;
          line-height: 20px;
          text-align: center;
        }
      }
      .active {
        div {
          background: #3B5CF8;
        }
        p {
          color: #3B5CF8;
        }
      }
      span {
        width: 200px;
        height: 5px;
        background: #EAEDF9;
        border-radius: 3px;
      }
    }
    .StepThree_box_qrcode {
      width: 650px;
      margin: 80px auto 70px;
      display: flex;
      justify-content: center;
      .qrcode {
        width: 280px;
        height: 280px;
      }
    }
    .StepThree_box_h2 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #8A96A0;
      line-height: 22px;
    }
  }
}
</style>