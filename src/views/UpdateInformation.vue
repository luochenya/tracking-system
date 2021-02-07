<template>
  <div class="UpdateInformation">
    <Header />
    <div class="UpdateInformation_box">
      <h1 class="UpdateInformation_box_h1">Track case information</h1>
      <div class="UpdateInformation_box_flex">
        <div class="UpdateInformation_box_img">
          <img :src="barcodeUrl" alt="" />
        </div>
        <div class="UpdateInformation_box_div">
          <div class="UpdateInformation_box_smallInput">
            <p>Case #</p>
            <div>{{ dataForm.id }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Passport Number</p>
            <div>{{ dataForm.cardOwner.identityId }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Name</p>
            <div>{{ dataForm.cardOwner.name }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Tracking Watch code</p>
            <div>{{ dataForm.uuid }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Registered Unit</p>
            <div>{{ dataForm.StaffID }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Time of boarder entry</p>
            <div>{{ dataForm.created_at }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Gender</p>
            <div>{{ dataForm.cardOwner.sex }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Phone number</p>
            <div>{{ dataForm.cardOwner.contactMobile }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Ethnicity</p>
            <div>{{ dataForm.cardOwner.ethnicity }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput">
            <p>Country</p>
            <div>{{ dataForm.cardOwner.country }}</div>
          </div>
          <div class="UpdateInformation_box_smallInput UpdateInformation_box_maxInput">
            <p>Quarantine Address</p>
            <div>{{ dataForm.cardOwner.address }}</div>
          </div>
        </div>
      </div>
    </div>

    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Bottom from "@/components/Bottom.vue"
import axios from "axios";
export default {
  name: "UpdateInformation",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      imgUrl: "https://mytracking.openlife.co/covid19/api/v1/file/",
      img: require("@/assets/img/headerImgMin.png"),
      dataForm: {
        cardOwner: {
          identityId: ""
        }
      },
      unit: sessionStorage.getItem('loginId'),
      barcodeUrl: require("@/assets/img/headerImgMin.png"),
    }
  },
  created() {
    this.getUserInfo()
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
    // 跳转首页
    toHome() {
      this.$router.push('/')
    },
    // 获取数据
    getUserInfo() {
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      axios.post('https://bt.twczw.website/web/Overt/get_user_info/' + this.$route.query.id).then(res => {
        if (res.data.code == 200) {
          this.dataForm = res.data.data
          this.getImgUrl()
        } else {
          return this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss">
.UpdateInformation {
  width: 100%;
  min-height: 100vh;
  .UpdateInformation_box {
    padding: 50px 60px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .UpdateInformation_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 4px;
    }
    .UpdateInformation_box_flex {
      display: flex;
      .UpdateInformation_box_img {
        margin-top: 23px;
        margin-right: 72px;
        width: 98px;
        height: 98px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .UpdateInformation_box_div {
        width: calc(100% - 170px);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .UpdateInformation_box_smallInput {
          width: 310px;
          margin-top: 20px;
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
            background: #F5F6FA;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #37394C;
            line-height: 20px;
          }
        }
        .UpdateInformation_box_maxInput {
          width: 100%;
        }
      }
    }
  }
}
</style>