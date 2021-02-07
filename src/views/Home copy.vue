<template>
  <div class="home">
    <Header />
    <div class="home_box">
      <div class="home_box_left">
        <h2 class="home_box_left_h2">User List</h2>
        <el-table :data="tableData">
          <template slot="empty">
            No data available
          </template>
          <el-table-column header-align="center" align="center" width="100" prop="id" label="User ID"></el-table-column>
          <el-table-column header-align="center" align="center" width="130" prop="cardOwner.name" label="Name"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.identityId" label="IC/ Password"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.contactMobile" label="Phone number"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.Negeri" label="State"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.Daerah" label="District"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.Mukim" label="Area"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="uuid" label="Bracele"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" label="Detail">
            <template slot-scope="scope">
              <button class="tableButton" @click="handleClick(scope.row)">View</button>
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="home_box_right">
        <h2 class="home_box_right_h2">Updates Information</h2>
        <div class="home_box_right_div1">
          <p>{{AllTrackedUsers}}</p>
          <span>All tracked users</span>
        </div>
        <p class="home_box_right_p"></p>
        <div class="home_box_right_div2">
          <p>{{NewUsersToday}}</p>
          <span>New users today</span>
        </div>
        <button class="home_box_right_button1" @click="addNewCase()">
          <img src="@/assets/img/addImg.png" alt="" />
          Add new user
        </button>
        <div class="home_box_right_button2" @click="toUntie()">
          <button>Unbind</button>
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
  name: "Home",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      offset: 1,
      limit: 10,
      total: 0,
      tableData: [],
      AllTrackedUsers: 0,
      NewUsersToday: 0
    }
  },
  created() {
    this.getUserStatus()
    this.getDataList()
  },
  methods: {
    // 获取数据
    getDataList() {
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      var form = new FormData();
      form.append("limit", this.limit);
      form.append("page", this.offset);
      form.append("StaffID", sessionStorage.getItem('loginId'));
      axios.post('https://bt.twczw.website/web/Overt/get_api_data_list', form).then(res => {
        this.total = res.data.data.total
        this.tableData = res.data.data.data_list
      })
    },
    // 获取用户数据
    getUserStatus() {
      axios.post('https://bt.twczw.website/web/Overt/get_user_status', {StaffID: sessionStorage.getItem('loginId')}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(res => {
        if (res.data.code == 200) {
          this.AllTrackedUsers = res.data.data.total
          this.NewUsersToday = res.data.data.total_today
        }
      })
    },
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this.getDataList()
    },
    // 新增案例
    addNewCase() {
      this.$router.push('/StepOne')
    },
    // 解绑案例
    toUntie() {
      this.$router.push('/Untie')
    },
    // 編輯
    handleClick(row) {
      this.$router.push({
        path: '/UpdateInformation',
        query: {
          id: row.uuid
        }
      })
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  min-height: 100vh;
  .home_box {
    width: 100%;
    padding: 60px;
    display: flex;
    justify-content: space-between;
    .home_box_left {
      width: calc(100% - 450px);
      height: auto;
      padding: 50px 20px;
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E3E6F3;
      .home_box_left_h2 {
        font-size: 21px;
        font-weight: 600;
        color: #1A173B;
        line-height: 29px;
        margin-bottom: 20px;
      }
      .tableButton {
        width: 105px;
        height: 30px;
        background: #3B5CF8;
        box-shadow: 0px 8px 16px -4px rgba(59, 92, 248, 0.5);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 20px;
      }
    }
    .home_box_right {
      padding: 50px 28px;
      width: 390px;
      height: auto;
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E3E6F3;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .home_box_right_h2 {
        width: 100%;
        padding-bottom: 20px;
        font-size: 21px;
        font-weight: 600;
        color: #1A173B;
        line-height: 29px;
      }
      .home_box_right_div1 {
        width: 100%;
        padding: 15px 0 20px;
        text-align: center;
        p {
          margin-bottom: 4px;
          font-size: 28px;
          font-family: OPPOSans-H, OPPOSans;
          font-weight: normal;
          color: #F9A300;
          line-height: 44px;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: #8A96A0;
          line-height: 22px;
        }
      }
      .home_box_right_p {
        width: 220px;
        height: 1px;
        background: #EAEDF9;
      }
      .home_box_right_div2 {
        width: 100%;
        padding: 15px 0 20px;
        text-align: center;
        p {
          margin-bottom: 4px;
          font-size: 28px;
          font-family: OPPOSans-H, OPPOSans;
          font-weight: normal;
          color: #3B5CF8;
          line-height: 44px;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: #8A96A0;
          line-height: 22px;
        }
      }
      .home_box_right_button1 {
        margin-top: 25px;
        width: 100%;
        height: 50px;
        background: #F9A300;
        box-shadow: 0px 12px 25px -2px rgba(249, 163, 0, 0.3);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 24px;
        img {
          width: 23px;
          height: 18px;
          margin-right: 12px;
        }
      }
      .home_box_right_button2 {
        margin: 20px 0 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        button {
          width: 100%;
          height: 50px;
          background: rgba($color: #F9A300, $alpha: 0.1);
          border-radius: 8px;
          font-size: 17px;
          font-weight: 600;
          color: #F9A300;
          line-height: 24px;
        }
      }
    }
  }
}
</style>