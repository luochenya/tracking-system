<template>
  <div class="Untie">
    <Header />

    <div class="Untie_box">
      <div class="Untie_box_left">
        <h2 class="Untie_box_left_h2">Untie</h2>
        <div class="Untie_box_left_div">
          <div class="qrcode">
            <qrcode-stream @decode="onDecode" @init="onInit" />
          </div>
        </div>
        <h4 class="Untie_box_left_h4">Please scan the Qr Code on the outer box of the epidemic prevention watch</h4>
      </div>
      <div class="Untie_box_right">
        <div class="Untie_box_right_top">
          <h2 class="Untie_box_right_top_h2">Personal message</h2>

          <div class="Untie_box_right_top_img">
            <img :src="barcodeUrl" alt="" />
          </div>
        </div>
        <div class="Untie_box_right_div">
          <div class="smallInput">
            <p>Name</p>
            <div>{{ dataForm.cardOwner.name }}</div>
          </div>
          <div class="smallInput">
            <p>Bracele</p>
            <div>{{ dataForm.uuid }}</div>
          </div>
          <div class="smallInput">
            <p>Passport number</p>
            <div>{{ dataForm.cardOwner.identityId }}</div>
          </div>
          <div class="smallInput">
            <p>Phone number</p>
            <div>{{ dataForm.cardOwner.contactMobile }}</div>
          </div>
          <div class="smallInput">
            <p>Gender</p>
            <div>{{ dataForm.cardOwner.sex }}</div>
          </div>
          <div class="smallInput">
            <p>Ethnicity</p>
            <div>{{ dataForm.cardOwner.ethnicity }}</div>
          </div>
          <div class="smallInput">
            <p>Country</p>
            <div>{{ dataForm.cardOwner.country }}</div>
          </div>
          <div class="smallInput">
            <p>State</p>
            <div>{{ dataForm.cardOwner.Negeri }}</div>
          </div>
          <div class="smallInput">
            <p>District</p>
            <div>{{ dataForm.cardOwner.Daerah }}</div>
          </div>
          <div class="smallInput">
            <p>Area</p>
            <div>{{ dataForm.cardOwner.Mukim }}</div>
          </div>
          <div class="smallInput maxInput">
            <p>Address</p>
            <div>{{ dataForm.cardOwner.address }}</div>
          </div>
          <div class="button">
            <button @click="SureUnbind()">Unbind</button>
          </div>
        </div>
      </div>
    </div>

    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Bottom from "@/components/Bottom.vue"
import axios from "axios";
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "Untie",
  components: {
    Header,
    Bottom,
    QrcodeStream
  },
  data() {
    return {
      imgUrl: "https://mytracking.openlife.co/covid19/api/v1/file/",
      barcodeUrl: require("@/assets/img/headerImgMin.png"),
      dataForm: {
        cardOwner: {
          name: ""
        }
      },
      form: {
        major: "",
        minor: "",
      },
      result: "",
      error: ""
    }
  },
  methods: {
    async getImgUrl() {
      const { data: result } = await axios.get(
        "https://mytracking.openlife.co/covid19/api/v1/file/" + this.dataForm.avatar,
        {
            //设定接收类型为blob,头部什么的自行添加
          responseType:'blob',
          headers: {
            "Authorization": 'Bearer ' + sessionStorage.getItem("token")
          }
        }
      );
      //赋值给变量
      this.barcodeUrl = URL.createObjectURL(result);
    },
    toHome() {
      this.$router.push('/')
    },
    onDecode (result) {
      this.result = result
      axios.post('https://bt.twczw.website/web/Overt/get_user_info/' + JSON.parse(result).Bracelet['S/N']).then(res => {
        if (res.data.code == 200) {
          this.dataForm = res.data.data
          this.getImgUrl()
          this.form.major = JSON.parse(result).Bracelet.major
          this.form.minor = JSON.parse(result).Bracelet.minor
        } else {
          return this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    },
    // 解除绑定
    SureUnbind() {
      if (!this.dataForm.id) {
        return false
      }
      
      axios.defaults.headers.post["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
      axios.post('https://mytracking.openlife.co/covid19/api/v1/card/gpsWatchUnBinding', this.form).then(res => {
        if (res.data.data) {
          axios.post('https://bt.twczw.website/web/Overt/del_user_info/' + this.dataForm.id).then(res => {
            if (res.data.code == 200) {
              alert(res.data.msg)
              this.$router.push('/')
            } else {
              return this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        }
      }).catch(error => {
        return this.$message({
          message: "this watch is unBinded",
          type: 'error'
        });
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
.Untie {
  width: 100%;
  min-height: 100vh;
  .Untie_box {
    padding: 60px;
    display: flex;
    justify-content: space-between;
    .Untie_box_left {
      padding: 50px 30px;
      width: calc(50% - 30px);
      background: #FFFFFF;
      border-radius: 8px;
      border: 1px solid #E3E6F3;
      .Untie_box_left_h2 {
        font-size: 21px;
        font-weight: 600;
        color: #1A173B;
        line-height: 29px;
      }
      .Untie_box_left_div {
        height: calc(100% - 51px);
        display: flex;
        justify-content: center;
        align-items: center;
        .qrcode {
          width: 280px;
          height: 280px;
        }
      }
      .Untie_box_left_h4 {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: #8A96A0;
        line-height: 22px;
      }
    }
    .Untie_box_right {
      padding: 50px 30px;
      width: calc(50% - 30px);
      background: #FFFFFF;
      border-radius: 8px;
      border: 1px solid #E3E6F3;
      .Untie_box_right_top {
        display: flex;
        justify-content: space-between;
        .Untie_box_right_top_h2 {
          font-size: 21px;
          font-weight: 600;
          color: #1A173B;
          line-height: 29px;
        }
        .Untie_box_right_top_img {
          width: 98px;
          height: 98px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
      .Untie_box_right_div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .smallInput {
          width: calc(33% - 8px);
          margin-top: 30px;
          p {
            font-size: 15px;
            font-weight: 600;
            color: #8A96A0;
            line-height: 21px;
          }
          div {
            width: 100%;
            margin-top: 8px;
            padding: 10px 20px;
            height: 40px;
            background: #F5F6FA;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #37394C;
            line-height: 20px;
          }
        }
        .maxInput {
          width: 100%;
        }
        .button {
          margin-top: 30px;
          width: 100%;
          display: flex;
          justify-content: center;
          button {
            width: calc(33% - 8px);
            height: 40px;
            background: #F9A300;
            box-shadow: 0px 12px 25px -2px rgba(249, 163, 0, 0.3);
            border-radius: 8px;
            font-size: 17px;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>