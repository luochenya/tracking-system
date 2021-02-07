<template>
  <div class="StepSix">
    <Header />
    <div class="StepSix_box">
      <h1 class="StepSix_box_h1">Track case information</h1>
      <div class="StepSix_box_flex">
        <div class="StepSix_box_img">
          <div class="StepSix_box_header">
            <img :src="barcodeUrl" id="imgs" alt="">
          </div>
          <div class="StepSix_box_map">
            <div id="map"></div>
          </div>
        </div>
        <div class="StepSix_box_div">
          <div class="StepSix_box_smallInput">
            <p>Passport Number</p>
            <input type="text" v-model="identityId">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Name</p>
            <input type="text" v-model="name">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Tracking Watch code</p>
            <input type="text" v-model="uuid">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Gender</p>
            <input type="text" v-model="sex">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Phone number</p>
            <input type="text" v-model="contactMobile">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Ethnicity</p>
            <input type="text" v-model="ethnicity">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Country</p>
            <input type="text" v-model="country">
          </div>
          <div class="StepSix_box_smallInput">
            <p>Country</p>
            <el-select v-model="arrival_time" placeholder="estimated time arrival">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="StepSix_box_smallInput">
            <p>State</p>
            <!-- <input type="text" v-model="State" @change="addrBlur()"> -->
            <el-select v-model="State" @change="StateChange()" placeholder=" " no-data-text="no data">
              <el-option
                v-for="item in addressList1"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="StepSix_box_smallInput">
            <p>District</p>
            <!-- <input type="text" v-model="District" @input="addrBlur()"> -->
            <el-select v-model="District" @change="DistrictChange()" placeholder=" " no-data-text="no data">
              <el-option
                v-for="item in addressList2"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="StepSix_box_smallInput">
            <p>Area</p>
            <!-- <input type="text" v-model="Area" @input="addrBlur()"> -->
            <el-select v-model="Area" @change="AreaChange()" placeholder=" " no-data-text="no data">
              <el-option
                v-for="item in addressList3"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="StepSix_box_smallInput">
            <p>Address</p>
            <!-- <input type="text" v-model="Jalan" @input="addrBlur()"> -->
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <input class="input" type="text" v-model="Jalans">
              <div style="text-align: right; margin: 0">
                <i class="el-icon-circle-close" @click="JalanClick(1)"></i>
                <i class="el-icon-circle-check" @click="JalanClick(2)"></i>
              </div>
              <div class="div" slot="reference">{{ Jalan }}</div>
            </el-popover>
          </div>
          <div class="StepSix_box_smallInput StepSix_box_maxInput">
            <p>Quarantine Address</p>
            <div class="div">{{ address }}</div>
          </div>
        </div>
      </div>
      <div class="StepSix_box_button">
        <button @click="addForm()">Add</button>
        <button @click="Cancel()">Cancel</button>
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
  name: "StepSix",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      visible: false,
      imgUrl: "https://mytracking.openlife.co/covid19/api/v1/file/",
      img: require("@/assets/img/headerImgMin.png"),
      // 地圖
      map_2d: "",
      cafemarker_2d: "",
      overlay_map_2d: "",
      markers2: [],
      barcodeUrl: "",
      centers: {
        lat: Number(this.$route.query.lat),
        lng: Number(this.$route.query.lng)
      },
      identityId: this.$route.query.identityId,
      name: this.$route.query.name,
      uuid: this.$route.query.uuid,
      sex: this.$route.query.sex,
      contactMobile: this.$route.query.contactMobile,
      ethnicity: this.$route.query.ethnicity,
      country: this.$route.query.country,
      level3seq: this.$route.query.level3seq,
      address: this.$route.query.address,
      arrival_time: this.$route.query.arrival_time,
      State: this.$route.query.State,
      District: this.$route.query.District,
      Area: this.$route.query.Area,
      Jalan: this.$route.query.Jalan,
      Jalans: this.$route.query.Jalan,
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
      addrStatus: false,
      addressList1: [],
      addressList2: [],
      addressList3: [],
    }
  },
  created() {
    this.getImgUrl()
    this.getAddress()
  },
  methods: {
    // 獲取地址API
    getAddress() {
      axios.get("https://mytracking.openlife.co/covid19/api/v1/districtSet/all").then(res => {
        this.addressList1 = res.data.data
        this.addressList1.forEach(item => {
          if (item.name == this.State) {
            this.addressList2 = item.childs
          }
        })
        this.addressList2.forEach(items => {
          if (items.name == this.District) {
            this.addressList3 = items.childs
          }
        })
      })
    },
    // State地址變動
    StateChange() {
      this.District = ""
      this.Area = ""
      this.addressList1.forEach(item => {
        if (item.name == this.State) {
          this.addressList2 = item.childs
        }
      })
      this.address = this.Jalan + ' ' + this.Area + ' ' + this.District + ' ' + this.State
    },
    // District地址變動
    DistrictChange() {
      this.Area = ""
      this.addressList2.forEach(item => {
        if (item.name == this.District) {
          this.addressList3 = item.childs
        }
      })
      this.address = this.Jalan + ' ' + this.Area + ' ' + this.District + ' ' + this.State
    },
    AreaChange() {
      this.addressList3.forEach(item => {
        if (item.name == this.Area) {
          this.level3seq = item.id
        }
      })
      this.address = this.Jalan + ' ' + this.Area + ' ' + this.District + ' ' + this.State
      this.addrBlur()
    },
    JalanClick(type) {
      this.visible = false
      if (type == 1) {
        this.Jalans = this.Jalan
      } else {
        this.Jalan = this.Jalans
        this.address = this.Jalan + ' ' + this.Area + ' ' + this.District + ' ' + this.State
        this.addrBlur()
      }
    },
    // 輸入地址改變地圖
    addrBlur() {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=AIzaSyB6ktzg-WpW059p5LShkJ5WIafsAz0n-Ww").then(res => {
        this.centers.lat = res.data.results[0].geometry.location.lat
        this.centers.lng = res.data.results[0].geometry.location.lng
        this.googleFun();
        this.addrStatus = false
      }).catch(error => {
        this.addrStatus = true
        this.$alert('Unrecognized Address', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          
        });
      })
    },

    // 獲取頭像圖片
    async getImgUrl(row) {
      const { data: result } = await axios.get(
        "https://mytracking.openlife.co/covid19/api/v1/file/" + this.$route.query.avatar,
        {
            //设定接收类型为blob,头部什么的自行添加
          responseType:'blob',
          headers: {
            "Authorization": 'Bearer ' + sessionStorage.getItem("token")
          }
        }
      );
      this.googleFun()
      //赋值给变量
      this.barcodeUrl = URL.createObjectURL(result);
    },
    // 谷歌地圖
    googleFun() {
      var map_2d_op = {
        zoom: 18,
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
    // 地圖修改位置
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

    // 跳转首页
    toHome() {
      this.$router.push('/')
    },
    // 添加数据
    addForm() {
      if (!this.Jalan || !this.Area || !this.District) {
        return this.$alert('Address cannot be empty', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          
        });
      }
      if (this.addrStatus) {
        return this.$alert('Unrecognized Address', 'Prompt', {
          confirmButtonText: 'Confirm',
          type: 'warning'
        }).then(() => {
          
        });
      }
      const form1 = {
        major: this.$route.query.major,
        uuid: this.uuid,
        lat: Number(this.centers.lat),
        lng: Number(this.centers.lng),
        minuteForHome: Number(this.arrival_time),
        cardOwner: {
          address: this.address,
          avatar: this.$route.query.avatar,
          birthdayTime: 0,
          contactMobile: this.contactMobile,
          country: this.country,
          ethnicity: this.ethnicity,
          identityId: this.identityId,
          level3seq: Number(this.level3seq),
          name: this.name,
          sex: this.sex == 'Male' ? 1 : 0,
        }
      }
      const form2 = {
        major: this.$route.query.major,
        uuid: this.uuid,
        lat: this.centers.lat,
        lng: this.centers.lng,
        minuteForHome: Number(this.arrival_time),
        StaffID: sessionStorage.getItem('loginId'),
        cardOwner: {
          address: this.address,
          avatar: this.$route.query.avatar,
          birthdayTime: 0,
          contactMobile: this.contactMobile,
          country: this.country,
          ethnicity: this.ethnicity,
          identityId: this.identityId,
          level3seq: Number(this.level3seq),
          name: this.name,
          sex: this.sex,
          Jalan: this.Jalan,
          Mukim: this.Area,
          Daerah: this.State,
          Negeri: this.District,
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
                lat: this.centers.lat,
                lng: this.centers.lng,
                state: this.$route.query.state,
                minuteForHome: this.$route.query.arrival_time,
              }
            })
          });
      })
    },
    // 取消添加
    Cancel() {
       this.$router.push('/StepOne')
    }
  }
}
</script>

<style lang="scss">
.el-popover {
  width: 360px !important;
  left: 1180px !important;
  .input {
    width: 100%;
    margin-bottom: 8px;
    padding: 10px 20px;
    background: #F5F6FA;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    color: #37394C;
    line-height: 20px;
  }
  .el-icon-circle-close {
    cursor: pointer;
    font-size: 30px;
  }
  .el-icon-circle-check {
    cursor: pointer;
    font-size: 30px;
  }
}
.StepSix {
  width: 100%;
  min-height: 100vh;
  .StepSix_box {
    padding: 50px 60px;
    margin: 60px auto;
    min-width: 900px;
    max-width: 1300px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E3E6F3;
    .StepSix_box_h1 {
      font-size: 21px;
      font-weight: 600;
      color: #1A173B;
      line-height: 29px;
      margin-bottom: 4px;
    }
    .StepSix_box_flex {
      display: flex;
      .StepSix_box_img {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 400px;
        padding-top: 23px;
        padding-right: 60px;
        .StepSix_box_header {
          width: 150px;
          height: 150px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        .StepSix_box_map {
          width: 100%;
          height: 200px;
          #map {
            width: 100%;
            height: 100%;
          }
        }
      }
      .StepSix_box_div {
        width: calc(100% - 400px);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .StepSix_box_smallInput {
          width: 360px;
          margin-top: 20px;
          p {
            font-size: 15px;
            font-weight: 600;
            color: #8A96A0;
            line-height: 21px;
          }
          input,
          .div {
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
          .el-select {
            width: 100%;
            margin-top: 8px;
            input {
              margin-top: 0;
              background: #F5F6FA;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 400;
              color: #37394C;
            }
          }
        }
        .StepSix_box_maxInput {
          width: 100%;
        }
      }
    }
    .StepSix_box_button {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      button {
        margin: 0 20px;
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