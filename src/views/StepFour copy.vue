<template>
  <div class="StepOne response">
    <Header />
    <h1 class="StepOne_h1">
      <span @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</span>
      <div>
        <p>Paired bracelet ID：{{$route.query.uuid}}</p>
      </div>
    </h1>
    <h2 class="StepOne_h2">Watch connection status test</h2>
    <div class="StepOne_box">
      <div class="StepOne_Left">
        <img src="@/assets/img/img5.png" alt="">
      </div>
      <div class="StepOne_center">
        <el-button type="primary" @click="connectionTest()">Click me to test the connection</el-button>
      </div>
      <div class="StepOne_right">
        <h3>STEP 1-2</h3>
        <img src="@/assets/img/img4.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import axios from "axios";
export default {
  name: "StepOne",
  components: {
    Header
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
    connectionTest() {
      axios.get('https://trackerdynamicssl.openlife.co:4010/checkBraceletStatus?bracelet_id=' + this.$route.query.major).then(res => {
        if (res.data.success) {
          this.$alert('This bracelet is connecting', 'Prompt', {
            confirmButtonText: 'Confirm',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: "/StepFive",
              query: {
                major: this.$route.query.major,
                uuid: this.$route.query.uuid,
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
          });
        } else {
          alert('This bracelet not connected yet')
          // this.$message({
          //   message: res.data.error,
          //   type: 'error'
          // });
        }
      })
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
      img {
        max-width: 80%;
      }
    }
    .StepOne_center {
      .el-button {
        padding: 20px 30px;
      }
    }
    .StepOne_right {
      width: 30%;
      text-align: center;
      img {
        max-width: 80%;
      }
      h3 {
        margin-bottom: 20px;
        font-size: 26px;
        font-weight: bold;
      }
      h4 {
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }
}
</style>