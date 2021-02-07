<template>
  <div class="StepTwo response">
    <Header />
      
      <div class="StepTwo_box">
        <h1 class="StepTwo_box_h1">Confirm isolation address</h1>
        <div class="StepTwo_box_step">
          <div class="StepTwo_box_step_div active">
            <div>01</div>
            <p>
              Get passenger information
            </p>
          </div>
          <span></span>
          <div class="StepTwo_box_step_div active">
            <div>02</div>
            <p>
              Confirmed passenger
              <br />
              Isolation address
            </p>
          </div>
          <span></span>
          <div class="StepTwo_box_step_div">
            <div>03</div>
            <p>
              Get epidemic prevention
              <br />
              Bracele information
            </p>
          </div>
          <span></span>
          <div class="StepTwo_box_step_div">
            <div>04</div>
            <p>
              Bracele connection status test
            </p>
          </div>
          <span></span>
          <div class="StepTwo_box_step_div">
            <div>05</div>
            <p>
              Get passengers
              <br />
              Face photo
            </p>
          </div>
        </div>
        <div class="StepTwo_box_map">
          <div id="map"></div>
          <div class="button">
            <el-select v-model="arrival_time" placeholder="estimated time arrival">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <button @click="toStepThree()">Location confirmation</button>
          </div>
          <h2 class="StepTwo_box_h2">Please confirm whether the location shown on the left is his expected isolation locationIf not, please drag the left image to the correct place</h2>
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
  name: "StepTwo",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      flag: false,
      centers: {
          lat: "",
          lng: ""
      },
      markers: [{
        position: {
          lat: "",
          lng: ""
        }
      },{
        position: {
          lat: "",
          lng: ""
        }
      }],
      state: "",
      place: null,
      address: this.$route.query.Jalan + ' ' + this.$route.query.Area + ' ' + this.$route.query.District + ' ' + this.$route.query.State,
      options: [
        {
          value: '30',
          label: '30min'
        },
        {
          value: '60',
          label: '1hour'
        },
        {
          value: '90',
          label: '1hour30min'
        },
        {
          value: '120',
          label: '2hour'
        },
        {
          value: '150',
          label: '2hour30min'
        },
        {
          value: '180',
          label: '3hour'
        },
        {
          value: '210',
          label: '3hour30min'
        },
        {
          value: '240',
          label: '4hour'
        },
        {
          value: '270',
          label: '4hour30min'
        },
        {
          value: '300',
          label: '5hour'
        },
        {
          value: '330',
          label: '5hour30min'
        },
        {
          value: '360',
          label: '6hour'
        },
      ],
      arrival_time: '',

      // 地圖
      map_2d: "",
      cafemarker_2d: "",
      overlay_map_2d: "",
      markers2: []
    }
  },
  created() {
    this.getCoordinates()
  },
  methods: {
    
    googleFun() {
      var map_2d_op = {
        zoom: 20,
        center: { lat: this.centers.lat, lng: this.centers.lng },
        disableDefaultUI: true,
        streetViewControl: false,
        zoomControl: true,
        mapTypeId: "roadmap",
        // scrollwheel: false  //禁用鼠标CTRL放大缩小
      };

      this.map_2d = new google.maps.Map(
        document.getElementById("map"),
        map_2d_op
      );

      if (this.markers2 && this.markers2.length > 0) {
        for (var i = 0; i < this.markers2.length; i++) {
          this.markers2[i].setMap(null);
        }
      }
      this.cafemarker_2d = new google.maps.Marker({
        draggable: true,
        //animation: google.maps.Animation.DROP,
        position: this.map_2d.getCenter()
      });
      this.markers2.push(this.cafemarker_2d);
      //cafemarker_2d.setPosition(map_2d.getCenter());
      this.cafemarker_2d.setMap(this.map_2d);

      this.overlay_map_2d = new google.maps.OverlayView();
      this.overlay_map_2d.draw = function() {}; // empty function required
      this.overlay_map_2d.setMap(this.map_2d);

      let that = this;
      this.map_2d.addListener("center_changed", () => {
        that.cafemarker_2d.setPosition(that.map_2d.getCenter());
      });
      this.map_2d.addListener("dragend", () => {
        this.updateMaker(that.map_2d.getCenter())
      });
      this.cafemarker_2d.addListener("dragend", () => {
        this.updateMaker(that.cafemarker_2d.position)
      });
      this.map_2d.addListener("zoom_changed", () => {
        that.centers.lat = that.cafemarker_2d.position.lat()
        that.centers.lng = that.cafemarker_2d.position.lng()
      });
    },
    
    updateMaker(e) {
        this.centers.lat = e.lat()
        this.centers.lng = e.lng()
      // axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + e.lat() + "," + e.lng() + "&key=AIzaSyB6ktzg-WpW059p5LShkJ5WIafsAz0n-Ww").then(res => {
      //   console.log(res.data.results)
      //   this.centers.lat = e.lat()
      //   this.centers.lng = e.lng()
      //   // this.state = res.data.results[0].address_components[2].short_name
      //   // this.address = res.data.results[0].formatted_address
      // })
    },
    toHome() {
      this.$router.push('/')
    },
    getCoordinates() {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=AIzaSyB6ktzg-WpW059p5LShkJ5WIafsAz0n-Ww").then(res => {
        console.log(res.data.results)
        this.centers.lat = res.data.results[0].geometry.location.lat
        this.centers.lng = res.data.results[0].geometry.location.lng
        // this.state = res.data.results[0].address_components[2] ? res.data.results[0].address_components[2].short_name : res.data.results[0].address_components[1].short_name
        this.googleFun();
      }).catch(error => {
        this.$alert('Unrecognized Address', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          this.$router.push('/StepOne')
        });
      })
    },
    toStepThree() {
      if (!this.arrival_time) {
        return this.$alert('Please select estimated time arrival', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        })
      }
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
          address: this.address,
          lat: this.centers.lat,
          lng: this.centers.lng,
          state: this.state,
          arrival_time: this.arrival_time
        }
      })
    }
  }
}
</script>

<style lang="scss">
.StepTwo {
  width: 100%;
  min-height: 100vh;
  .StepTwo_box {
    padding: 50px 30px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepTwo_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 36px;
    }
    .StepTwo_box_step {
      display: flex;
      align-items: center;
      justify-content: center;
      .StepTwo_box_step_div {
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
    .StepTwo_box_map {
      width: 650px;
      margin: 80px auto 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      #map {
        width: 600px;
        height: 314px;
      }
      .button {
        width: 600px;
        margin: 40px 0 80px;
        display: flex;
        justify-content: space-between;
        .el-input {
          width: 282px;
          height: 50px;
          background: #FFFFFF;
          border-radius: 8px;
          border: 1px solid #EAEDF9;
        }
        .el-input__inner {
          height: 100%;
        }
        button {
          width: 282px;
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
    .StepTwo_box_h2 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #8A96A0;
      line-height: 22px;
    }
  }
}
</style>