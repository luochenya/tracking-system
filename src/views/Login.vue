<template>
  <div class="Login">
    <div class="Login_response response">
      <div class="Login_box">
        <div class="Login_box_left">
          <img src="@/assets/img/logo.png" alt="">
          <p>Kerajaan Malaysia</p>
        </div>
        <div class="Login_box_right">
          <div class="Login_box_right_div">
            <h1 class="Login_box_right_h1">Log in</h1>
            <p class="Login_box_right_p">E-mail</p>
            <div class="Login_box_right_input">
              <input type="text" v-model="dataForm.loginId">
            </div>
            <p class="Login_box_right_p">Password</p>
            <div class="Login_box_right_input">
              <input type="password" v-model="dataForm.password">
            </div>
            <div class="Login_box_right_checkbox">
              <el-checkbox v-model="checked">Remember Me</el-checkbox>
            </div>
            <button class="Login_box_right_button" @click="Login()">Log in</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="Login_box">
      <h2 class="Login_box_h2">Login</h2>
      <div class="Login_box_input">
        <p class="Login_box_input_p">Account</p>
        <div class="Login_box_input_div">
          <input type="text" placeholder="Please input account ID" v-model="dataForm.loginId">
        </div>
      </div>
      <div class="Login_box_input">
        <p class="Login_box_input_p">Password</p>
        <div class="Login_box_input_div">
          <input type="password" placeholder="Please input password" v-model="dataForm.password">
        </div>
      </div>
    </div> -->
    
    <!-- <div class="Login_button">
      <el-button type="primary" @click="Login()">Login</el-button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      dataForm: {
        loginId: "",
        password: ""
      },
      checked: false
    }
  },
  mounted() {
    if (window.localStorage.getItem("loginId")) {
      this.dataForm.loginId = window.localStorage.getItem("loginId");
      this.dataForm.password = window.localStorage.getItem("password");
      this.checked = true;
    }
  },
  methods: {
    Login() {
      axios.post('https://mytracking.openlife.co/covid19/api/v1/login', this.dataForm).then(res => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("loginId", this.dataForm.loginId);
        if (this.checked) {
          localStorage.setItem("loginId", this.dataForm.loginId);
          localStorage.setItem("password", this.dataForm.password);
        } else {
          localStorage.removeItem("loginId");
          localStorage.removeItem("password");
        }
        this.$router.push('/')
      }).catch(err => {
        this.$message({
          message: 'Incorrect username or password',
          type: 'error'
        });
      })
    }
  }
}
</script>

<style lang="scss">
.Login {
  min-height: 100vh;
  width: 100%;
  background-image: url('../assets/img/main_bg.png');
  .Login_response {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .Login_box {
      background-color: rgba(121, 171, 229, 0.5);
      padding: 60px 0px 60px;
      border-radius: 5px;
      width: 70%;
      max-width: 1000px;
      min-width: 750px;
      max-height: 655px;
      display: flex;
      .Login_box_left {
        height: 562px;
        border-right: 1px solid rgb(30, 57, 84);
        text-align: center;
        width: 24%;
        min-width: 180px;
        max-width: 247px;
        img {
          width: 160px;
        }
        p {
          font-size: 20px;
          color: rgb(17, 125, 212);
          margin-top: 20px;
        }
      }
      .Login_box_right {
        width: 76%;
        max-width: 753px;
        .Login_box_right_div {
          max-width: 400px;
          margin: 0px auto;
          .Login_box_right_h1 {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: rgb(30, 57, 84);
          }
          .Login_box_right_p {
            margin-top: 32px;
            font-size: 18px;
            font-weight: bold;
            line-height: 25px;
          }
          .Login_box_right_input {
            width: 100%;
            height: 40px;
            input {
              width: 100%;
              height: 100%;
              padding: 4px 11px;
              color: rgba(0,0,0,.65);
              font-size: 14px;
              line-height: 1.5;
              background-color: #fff;
              background-image: none;
              border: 1px solid #d9d9d9;
              border-radius: 4px;
              -webkit-transition: all .3s;
              transition: all .3s;
            }
            input:focus {
              -webkit-box-shadow: 0 0 0 2px rgba(24,144,255,.2);
              box-shadow: 0 0 0 2px rgba(24,144,255,.2);
            }
          }
          .Login_box_right_checkbox {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 51px;
            margin-top: 17px;
          }
          .Login_box_right_button {    
            font-size: 16px;
            height: 40px;
            width: 100%;
            min-width: 290px;
            font-weight: bold;
            color: rgb(255, 255, 255);
            background-color: rgb(30, 57, 84);
            border: 1px solid rgb(30, 57, 84);
            line-height: 1.13;
          }
          .Login_box_right_button:hover {
            background-color: rgb(63, 91, 119);
            color: rgb(255, 255, 255);
            border: 1px solid rgb(63, 91, 119);
          }
        }
      }
    }
  }
}
</style>