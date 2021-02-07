<template>
  <div class="Untie response">
    <Header />
    <h1 class="Untie_h1" @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</h1>
    <div class="Untie_box">
      <div class="Untie_box_left">
        <h2 class="Untie_box_left_h2">Untie</h2>
        <h3 class="Untie_box_left_h3">Please scan the QR code on the box</h3>
        <div class="Untie_box_left_div">
          <div>
            <qrcode-stream @decode="onDecode" @init="onInit" />
          </div>
          <img src="@/assets/img/img3.png" alt="">
        </div>
      </div>
      <el-form class="Untie_box_right">
        <el-form-item label="Name">
          <el-input v-model="dataForm.cardOwner.name" disabled></el-input>	
        </el-form-item>
        <el-form-item label="Passport number">
          <el-input v-model="dataForm.cardOwner.identityId" disabled></el-input>	
        </el-form-item>
        <el-form-item label="Phone number">
          <el-input v-model="dataForm.cardOwner.contactMobile" disabled></el-input>	
        </el-form-item>
        <el-form-item label="Gender">
          <el-input v-model="dataForm.cardOwner.sex" disabled></el-input>	
        </el-form-item>
        <el-form-item label="Ethnicity">
          <el-input v-model="dataForm.cardOwner.ethnicity" disabled></el-input>	
        </el-form-item>
        <el-form-item label="Country">
          <el-input v-model="dataForm.cardOwner.country" disabled></el-input>	
        </el-form-item>
        <el-form-item label="state">
          <el-input v-model="dataForm.cardOwner.Negeri" disabled></el-input>	
        </el-form-item>
        <el-form-item label="district">
          <el-input v-model="dataForm.cardOwner.Daerah" disabled></el-input>	
        </el-form-item>
        <el-form-item label="area">
          <el-input v-model="dataForm.cardOwner.Mukim" disabled></el-input>	
        </el-form-item>
        <el-form-item label="address" class="max_input">
          <el-input v-model="dataForm.cardOwner.address" disabled></el-input>	
        </el-form-item>
        <div class="Untie_box_right_button">
          <el-button type="primary" @click="SureUnbind()">Confirm</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import axios from "axios";
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "Untie",
  components: {
    Header,
    QrcodeStream
  },
  data() {
    return {
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
    toHome() {
      this.$router.push('/')
    },
    onDecode (result) {
      this.result = result
      console.log(result)
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      axios.post('https://bt.twczw.website/web/Overt/get_user_info/' + JSON.parse(result).Bracelet['S/N']).then(res => {
        if (res.data.code == 200) {
          this.dataForm = res.data.data
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
      
      axios.post('https://mytracking.openlife.co/covid19/api/v1/card/gpsWatchUnBinding', this.form).then(res => {
        if (res.data.data) {
          axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
  .Untie_h1 {
    cursor: pointer;
    padding: 20px 30px;
    font-size: 26px;
    font-weight: bold;
    text-decoration: underline;
  }
  .Untie_box {
    padding: 50px 20px;
    display: flex;
    .Untie_box_left {
      padding-right: 3%;
      width: 50%;
      .Untie_box_left_h2 {
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .Untie_box_left_h3 {
        margin: 30px 0;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .Untie_box_left_div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          width: 250px;
          height: 250px;
        }
        img {
          width: 334px;
          height: 240px;
        }
      }
    }
    .Untie_box_right {
      width: 50%;
      .el-form-item {
        padding: 0 3%;
        width: 33.33%;
        display: inline-block;
        margin-bottom: 20px;
        .el-form-item__label {
          font-weight: bold;
          font-size: 20px;
          color: #000000;
        }
        .el-input__inner {
          color: #000000;
        }
      }
      .max_input {
        width: 100%;
      }
      .Untie_box_right_button {
        padding-top: 30px;
        display: flex;
        justify-content: center;
        .el-button {
          padding: 20px 30px;
        }
      }
    }
  }
}
</style>