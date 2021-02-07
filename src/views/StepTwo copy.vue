<template>
  <div class="StepTwo response">
    <Header />
    <h1 class="StepTwo_h1">
      <span @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</span>
      <div>
        <!-- <p>Paired bracelet ID：{{$route.query.uuid}}</p> -->
      </div>
    </h1>
    <h2 class="StepTwo_h2">Create a tracking ID</h2>
    <div class="StepTwo_box">
      <div class="StepTwo_box_left" id="map">
        <!-- <gmap-map
          :center="centers"
          :zoom="11"
          map-type-id="terrain"
          style="width: 100%; height: 100%"
      >
          <gmap-marker
            @dragend="updateMaker"
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="centers=m.position"
          ></gmap-marker>
      </gmap-map> -->
      </div>
      <div class="StepTwo_box_center">
        <el-form class="StepTwo_box_center_div">
          <el-form-item label="estimated time arrival">
            <el-select v-model="arrival_time" placeholder="estimated time arrival">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="toStepThree()">Confirm Correct</el-button>
      </div>
      <div class="StepTwo_box_right">
        <h3>STEP 2 Confirm the  quarantine  location</h3>
        <img src="@/assets/img/img2.png" alt="" />
        <h4>
          Please let the arrival to make sure the location is correct.
          If negative, please drag the location icon to correct  location, or input the correct address  on the registration url. 
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import axios from "axios";

export default {
  name: "StepTwo",
  components: {
    Header
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
        mapTypeId: "roadmap"
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
    },
    
    updateMaker(e) {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + e.lat() + "," + e.lng() + "&key=AIzaSyB6ktzg-WpW059p5LShkJ5WIafsAz0n-Ww").then(res => {
        console.log(res.data.results)
        this.centers.lat = e.lat()
        this.centers.lng = e.lng()
        this.state = res.data.results[0].address_components[2].short_name
        // this.address = res.data.results[0].formatted_address
      })
    },
    toHome() {
      this.$router.push('/')
    },
    getCoordinates() {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=AIzaSyB6ktzg-WpW059p5LShkJ5WIafsAz0n-Ww").then(res => {
        console.log(res.data.results)
        this.centers.lat = res.data.results[0].geometry.location.lat
        this.centers.lng = res.data.results[0].geometry.location.lng
        this.state = res.data.results[0].address_components[2].short_name
        this.googleFun();
      })
    },
    toStepThree() {
      if (!this.arrival_time) {
        return this.$message({
          message: 'Please select estimated time arrival',
          type: 'warning'
        });
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
  padding-bottom: 20px;
  .StepTwo_h1 {
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
  .StepTwo_h2 {
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
      width: 450px;
      height: 450px;
      border: 1px solid #666666;
    }
    .StepTwo_box_center {
      .StepTwo_box_center_div {
        margin-bottom: 100px;
        .el-form-item__label {
          font-weight: bold;
          font-size: 16px;
          color: #000000;
        }
      }
      .el-button {
        padding: 20px 50px;
      }
    }
    .StepTwo_box_right {
      width: 30%;
      text-align: center;
      img {
        max-width: 100%;
      }
      h3 {
        margin-bottom: 10px;
        font-size: 26px;
        font-weight: bold;
      }
      h4 {
        margin-top: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>