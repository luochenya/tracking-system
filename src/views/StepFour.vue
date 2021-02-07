<template>
  <div class="StepFour">
    <Header />
    
      <div class="StepFour_box">
        <h1 class="StepFour_box_h1">Bracele connection status test</h1>
        <div class="StepFour_box_step">
          <div class="StepFour_box_step_div active">
            <div>01</div>
            <p>
              Get passenger information
            </p>
          </div>
          <span></span>
          <div class="StepFour_box_step_div active">
            <div>02</div>
            <p>
              Confirmed passenger
              <br />
              Isolation address
            </p>
          </div>
          <span></span>
          <div class="StepFour_box_step_div active">
            <div>03</div>
            <p>
              Get epidemic prevention
              <br />
              Bracele information
            </p>
          </div>
          <span></span>
          <div class="StepFour_box_step_div active">
            <div>04</div>
            <p>
              Bracele connection status test
            </p>
          </div>
          <span></span>
          <div class="StepFour_box_step_div">
            <div>05</div>
            <p>
              Get passengers
              <br />
              Face photo
            </p>
          </div>
        </div>
        <div class="StepFour_box_title">
          <p>Paired bracelet ID：{{$route.query.uuid}}</p>
          <!-- <p>Tracked user ID：{{$route.query.name}}</p> -->
          <p>Tracked user IC/ Passport No.：{{$route.query.identityId}}</p>
        </div>
        <div class="StepFour_box_button">
          <img class="img" src="@/assets/img/StepFour1.png" alt="" />
          <div class="div">
            <button @click="connectionTest()">Click me to test the connection</button>
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
  name: "StepFour",
  components: {
    Header,
    Bottom
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
      axios.get('https://trackerdynamic.openlife.co/checkBraceletStatus?bracelet_id=' + this.$route.query.major).then(res => {
        if (res.data.success) {
          this.$alert('This bracelet is connected', 'Prompt', {
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
          // alert('This bracelet not connected yet')
          // this.$message({
          //   message: res.data.error,
          //   type: 'error'
          // });
          return this.$alert('This bracelet not connected yet', 'Prompt', {
            confirmButtonText: 'Confirm',
            type: 'warning'
          }).then(() => {
            // this.reload()
          }).catch(() => {   
            // this.reload()      
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.StepFour {
  width: 100%;
  min-height: 100vh;
  .StepFour_box {
    padding: 50px 30px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepFour_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 36px;
    }
    .StepFour_box_step {
      display: flex;
      align-items: center;
      justify-content: center;
      .StepFour_box_step_div {
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
    .StepFour_box_title {
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
    .StepFour_box_button {
      width: 100%;
      text-align: center;
      .img {
        width: 162px;
        height: 280px;
      }
      .div {
        margin: 50px 0;
        display: flex;
        justify-content: center;
        button {
          width: 314px;
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
}
</style>