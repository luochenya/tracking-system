<template>
  <div class="StepOne">
    <Header />

    <div class="StepOne_box">
      <h1 class="StepOne_box_h1">Scan user registration information</h1>
      <div class="StepOne_box_step">
        <div class="StepOne_box_step_div active">
          <div>01</div>
          <p>
            Get passenger information
          </p>
        </div>
        <span></span>
        <div class="StepOne_box_step_div">
          <div>02</div>
          <p>
            Confirmed passenger
            <br />
            Isolation address
          </p>
        </div>
        <span></span>
        <div class="StepOne_box_step_div">
          <div>03</div>
          <p>
            Get epidemic prevention
            <br />
            Bracele information
          </p>
        </div>
        <span></span>
        <div class="StepOne_box_step_div">
          <div>04</div>
          <p>
            Bracele connection status test
          </p>
        </div>
        <span></span>
        <div class="StepOne_box_step_div">
          <div>05</div>
          <p>
            Get passengers
            <br />
            Face photo
          </p>
        </div>
      </div>
      <div class="StepOne_box_qrcode">
        <div class="qrcode">
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
        <img src="@/assets/img/StepOne1.png" alt="" />
      </div>
      <h2 class="StepOne_box_h2">Please scan the Qr Code provided by the passenger</h2>
    </div>

    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Bottom from "@/components/Bottom.vue"
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "StepOne",
  inject: ['reload'], 
  components: {
    Header,
    Bottom,
    QrcodeStream
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
      if (result.indexOf('Registration') == -1) {
        return this.$alert('This QRcode is invalid', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          this.reload()
        }).catch(() => {   
          this.reload()      
        });
      }
      if (!JSON.parse(result).Registration['Passpord Number'] || !JSON.parse(result).Registration.addr.Area) {
        return this.$alert('Passpord Number or Area is required', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          this.reload()
        }).catch(() => {   
          this.reload()      
        });
      }
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
  width: 100%;
  min-height: 100vh;
  .StepOne_box {
    padding: 50px 30px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepOne_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 36px;
    }
    .StepOne_box_step {
      display: flex;
      align-items: center;
      justify-content: center;
      .StepOne_box_step_div {
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
    .StepOne_box_qrcode {
      margin: 80px 0 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .qrcode {
        width: 280px;
        height: 280px;
      }
    }
    .StepOne_box_h2 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #8A96A0;
      line-height: 22px;
    }
  }
}
</style>