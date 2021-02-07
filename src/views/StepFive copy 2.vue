<template>
  <div class="StepFive">
    <Header />
    
      <div class="StepFive_box">
        <h1 class="StepFive_box_h1">Bracele connection status test</h1>
        <div class="StepFive_box_step">
          <div class="StepFive_box_step_div active">
            <div>01</div>
            <p>
              Get passenger information
            </p>
          </div>
          <span></span>
          <div class="StepFive_box_step_div active">
            <div>02</div>
            <p>
              Confirmed passenger
              <br />
              Isolation address
            </p>
          </div>
          <span></span>
          <div class="StepFive_box_step_div active">
            <div>03</div>
            <p>
              Get epidemic prevention
              <br />
              Bracele information
            </p>
          </div>
          <span></span>
          <div class="StepFive_box_step_div active">
            <div>04</div>
            <p>
              Bracele connection status test
            </p>
          </div>
          <span></span>
          <div class="StepFive_box_step_div active">
            <div>05</div>
            <p>
              Get passengers
              <br />
              Face photo
            </p>
          </div>
        </div>
        <div class="StepFive_box_title">
          <p>Paired bracelet ID：{{$route.query.uuid}}</p>
          <!-- <p>Tracked user ID：{{$route.query.name}}</p> -->
          <p>Tracked user IC/ Passport No.：{{$route.query.identityId}}</p>
        </div>
        <div class="StepFive_box_headerImg">
          <div class="StepFive_box_headerImg_left">
            <div class="left_headerImg">
              <img class="img" src="@/assets/img/HeaderImgbox.png" alt="" />
              <!--canvas截取流-->
              <canvas ref="canvas" width="360px" height="240px" style="display:none"></canvas>
              <!--图片展示-->
              <video ref="video" width="360px" height="240px" autoplay></video>
            </div>
            <div class="left_button">
              <button @click="photograph()">Click me to take a photo</button>
            </div>
            <p class="left_p">Please take a clear face photo of the user</p>
          </div>

          <div class="StepFive_box_headerImg_right">
            <img :src="headImgSrc" alt="" />
            <p>Photo result</p>
          </div>
        </div>
        <div class="StepFive_box_add">
          <button @click="addForm()">ADD</button>
        </div>
      </div>

    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Bottom from "@/components/Bottom.vue"
import { dataURLtoFile } from "@/assets/js/dataURLtoFile.js";
import { POST_HeaderImgUpload, POST_GpsWatchBinding } from "@/api/api.js";
import axios from "axios";

export default {
  name: "StepFive",
  components: {
    Header,
    Bottom
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
      axios.defaults.headers.post["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
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
      axios.defaults.headers.post["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
      axios.post('https://mytracking.openlife.co/covid19/api/v1/card/gpsWatchBinding', form1).then(res => {
        if (res.data.data) {
          axios.post('https://bt.twczw.website/web/Overt/api_add', form2, {headers: {"Content-Type": 'application/x-www-form-urlencoded'}}).then(res => {
            this.$router.push('/')
          })
        }
      }).catch(error => {
        this.$alert(error.response.data.message, 'Prompt', {
            confirmButtonText: 'Confirm',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: "/StepThree",
              query: {
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
                minuteForHome: this.$route.query.arrival_time,
              }
            })
          });
      })
    }
  },
}
</script>

<style lang="scss">
.StepFive {
  width: 100%;
  min-height: 100vh;
  .StepFive_box {
    padding: 50px 30px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepFive_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 36px;
    }
    .StepFive_box_step {
      display: flex;
      align-items: center;
      justify-content: center;
      .StepFive_box_step_div {
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
    .StepFive_box_title {
      padding: 0 38px;
      margin: 74px auto;
      width: 1130px;
      height: 50px;
      background: rgba($color: #F9A300, $alpha: 0.05);
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 13px;
        font-weight: 400;
        color: #F9A300;
        line-height: 18px;
      }
    }
    .StepFive_box_headerImg {
      display: flex;
      justify-content: space-around;
      .StepFive_box_headerImg_left {
        .left_headerImg {
          width: 360px;
          height: 240px;
          position: relative;
          .img {
            position: absolute;
            left: 20px;
            top: 0;
            width: 320px;
            height: 240px;
          }
        }
        .left_button {
          margin: 55px 0 30px;
          display: flex;
          justify-content: center;
          button {
            width: 320px;
            height: 50px;
            background: #F9A300;
            box-shadow: 0px 12px 25px -2px rgba(249, 163, 0, 0.3);
            border-radius: 8px;
            font-size: 17px;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 24px;
          }
        }
        .left_p {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          color: #8A96A0;
          line-height: 22px;
        }
      }
      .StepFive_box_headerImg_right {
        width: 360px;
        text-align: center;
        // img {
        //   width: 280px;
        //   height: 280px;
        // }
        p {
          margin-top: 70px;
          font-size: 17px;
          font-weight: 600;
          color: #37394C;
          line-height: 24px;
        }
      }
    }
    .StepFive_box_add {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      button {
        width: 320px;
        height: 50px;
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
</style>