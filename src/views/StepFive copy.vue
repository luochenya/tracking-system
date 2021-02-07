<template>
  <div class="StepThree response">
    <Header />
    <h1 class="StepThree_h1">
      <span @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</span>
      <div>
        <p>Paired bracelet ID：{{$route.query.uuid}}</p>
        <!-- <p>Tracked user ID：{{$route.query.name}}</p> -->
        <p>Tracked user IC/ Passport No.：{{$route.query.identityId}}</p>
      </div>
    </h1>
    <h2 class="StepThree_h2">Create a tracking ID</h2>
    <div class="StepTwo_box">
      <div class="StepTwo_box_left">
        <!-- <img class="StepTwo_box_left_img" src="@/assets/img/logo.png" alt=""> -->
        <div class="StepTwo_box_left_img"></div>
        <!--canvas截取流-->
        <canvas ref="canvas" width="360px" height="240px" style="display:none"></canvas>
        <!--图片展示-->
        <video ref="video" width="360px" height="240px" autoplay></video>
      </div>
      <div class="StepTwo_box_center">
        <el-button type="primary" @click="photograph()">Take photo</el-button>
      </div>
      <div class="StepTwo_box_right">
        <h3>STEP 3 Take a facial photo</h3>
        <img :src="headImgSrc" alt="" />
        <h4>Please take a front facial photo</h4>
      </div>
    </div>
    <div class="StepTwo_button">
      <el-button type="primary" @click="addForm()">ADD</el-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import { dataURLtoFile } from "@/assets/js/dataURLtoFile.js";
import { POST_HeaderImgUpload, POST_GpsWatchBinding } from "@/api/api.js";
import axios from "axios";

export default {
  name: "StepThree",
  components: {
    Header
  },
  data() {
    return {
      avatar: "",
      headImgSrc: require("@/assets/img/headerImg.png")
    }
  },
  mounted() {
    this.callCamera()
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    // 调用权限（打开摄像头功能）
    callCamera () {
      // H5调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },// 拍照
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 360, 240)
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
      
　　　 // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
　　　 // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)
      this.headImgSrc = imgBase64
 　　 // 上传拍照信息  调用接口上传图片 ........
      var forms = new FormData()
      forms.append('img',dataURLtoFile(imgBase64, '旅客臉部照片'))
      // POST_HeaderImgUpload(forms).then(res => {
      //   this.avatar = res.data
      // })
      axios.defaults.headers.common["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
      axios.post('https://mytracking.openlife.co/covid19/api/v1/upload', forms).then(res => {
        // this.$router.push('/')
        this.avatar = res.data.data
      })
      // 保存到本地
      // this.dialogCamera = false
      // let ADOM = document.createElement('a')
      // ADOM.href = this.headImgSrc
      // ADOM.download = new Date().getTime() + '.jpeg'
      // ADOM.click()
    },
    // 添加数据
    addForm() {
      // const form = {
      //   major: this.$route.query.major,
      //   uuid: this.$route.query.uuid,
      //   lat: this.$route.query.lat,
      //   lng: this.$route.query.lng,
      //   StaffID: sessionStorage.getItem('loginId'),
      //   arrival_time: this.$route.query.arrival_time,
      //   cardOwner: {
      //     avatar: this.avatar,
      //     name: this.$route.query.Name,
      //     sex: 1,
      //     birthdayTime: "324195258000",
      //     county: " ",
      //     district: " ",
      //     village: " ",
      //     identityId: this.$route.query.identityId,
      //     contactMobile: this.$route.query.contactMobile,
      //     Gender: this.$route.query.Gender,
      //     Ethnicity: this.$route.query.Ethnicity,
      //     Country: this.$route.query.Country,
      //     address: this.$route.query.address,
      //     Jalan: this.$route.query.Jalan,
      //     Mukim: this.$route.query.Mukim,
      //     Daerah: this.$route.query.Daerah,
      //     Negeri: this.$route.query.Negeri,
      //     state: this.$route.query.state
      //   }
      // }
      const form1 = {
        major: this.$route.query.major,
        uuid: this.$route.query.uuid,
        lat: Number(this.$route.query.lat),
        lng: Number(this.$route.query.lng),
        minuteForHome: Number(this.$route.query.arrival_time),
        cardOwner: {
          address: this.$route.query.address,
          avatar: this.avatar,
          birthdayTime: 0,
          contactMobile: this.$route.query.contactMobile,
          country: this.$route.query.country,
          ethnicity: this.$route.query.ethnicity,
          identityId: this.$route.query.identityId,
          level3seq: Number(this.$route.query.level3seq),
          name: this.$route.query.name,
          sex: this.$route.query.sex == 'Male' ? 1 : 0,
        }
      }
      const form2 = {
        major: this.$route.query.major,
        uuid: this.$route.query.uuid,
        lat: this.$route.query.lat,
        lng: this.$route.query.lng,
        minuteForHome: Number(this.$route.query.arrival_time),
        StaffID: sessionStorage.getItem('loginId'),
        cardOwner: {
          address: this.$route.query.address,
          avatar: this.avatar,
          birthdayTime: 0,
          contactMobile: this.$route.query.contactMobile,
          country: this.$route.query.country,
          ethnicity: this.$route.query.ethnicity,
          identityId: this.$route.query.identityId,
          level3seq: Number(this.$route.query.level3seq),
          name: this.$route.query.name,
          sex: this.$route.query.sex,
          Jalan: this.$route.query.Jalan,
          Mukim: this.$route.query.Area,
          Daerah: this.$route.query.State,
          Negeri: this.$route.query.District,
        }
      }
      axios.defaults.headers.common["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
      axios.post('https://mytracking.openlife.co/covid19/api/v1/card/gpsWatchBinding', form1).then(res => {
        if (res.data.data) {
          axios.post('https://bt.twczw.website/web/Overt/api_add', form2, {headers: {"Content-Type": 'application/x-www-form-urlencoded'}}).then(res => {
            this.$router.push('/')
          })
        }
      }).catch(error => {
        alert('The Bracelet has been binded')
      })
    }
  },
}
</script>

<style lang="scss">
.StepThree {
  padding-bottom: 20px;
  .StepThree_h1 {
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
  .StepThree_h2 {
    margin-bottom: 100px;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }
  .StepTwo_box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .StepTwo_box_left {
      width: 360px;
      height: 240px;
      position: relative;
      .StepTwo_box_left_img {
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        // width: 200px;
        // height: 200px;
        // border: 3px solid red;
        // border-radius: 50%;
      }
    }
    .StepTwo_box_center {
      .el-button {
        padding: 20px 50px;
      }
    }
    .StepTwo_box_right {
      width: 30%;
      text-align: center;
      img {
        width: 360px;
        height: 240px;
      }
      h3 {
        margin-bottom: 30px;
        font-size: 26px;
        font-weight: bold;
      }
      h4 {
        margin-top: 30px;
        font-size: 16px;
      }
    }
  }
  .StepTwo_button {
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