<template>
  <div class="home">
    <Header />
    <div class="home_box">
      <div class="home_box_top">
        <h2 class="home_box_top_h2">Updates Information</h2>
        <div class="home_box_top_div">
          <button class="home_box_top_div_left" @click="AllTrackedUsersClick()">
            <p>{{AllTrackedUsers}}</p>
            <span>All tracked users</span>
          </button>
          <h3 class="home_box_top_div_center"></h3>
          <button class="home_box_top_div_right" @click="NewUsersTodayClick()">
            <p>{{NewUsersToday}}</p>
            <span>New users today</span>
          </button>
        </div>
        <div class="home_box_top_button">
          <button class="home_box_top_button_left" @click="addNewCase()">
            <img src="@/assets/img/addImg.png" alt="" />
            Add new user
          </button>
          <button class="home_box_top_button_right" @click="toUntie()">Unbind</button>
        </div>
      </div>

      <div class="home_box_left">
        <div class="home_box_left_div">
          <h2 class="home_box_left_h2">User List</h2>
          <div class="home_box_left_input">
            <button class="tableButton" @click="Search()">Search</button>
            <input type="text" v-model="search_txt" @keyup.enter="Search()">
          </div>
        </div>
        <el-table :data="tableData">
          <template slot="empty">
            No data available
          </template>
          <el-table-column header-align="center" align="center" width="100" prop="id" label="User ID"></el-table-column>
          <el-table-column header-align="center" align="center" width="130" prop="cardOwner.name" label="Name"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.identityId" label="IC/ Password"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.contactMobile" label="Phone number"></el-table-column>
          <el-table-column header-align="center" align="center" width="150" prop="cardOwner.Daerah" label="State"></el-table-column>
          <el-table-column header-align="center" align="center" width="140" prop="cardOwner.Negeri" label="District"></el-table-column>
          <el-table-column header-align="center" align="center" width="170" prop="cardOwner.Mukim" label="Area"></el-table-column>
          <el-table-column header-align="center" align="center" width="140" prop="uuid" label="Bracele"></el-table-column>
          <el-table-column header-align="center" align="center" label="Detail">
            <template slot-scope="scope">
              <button class="tableButton" @click="handleClick(scope.row)">View</button>
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="home_pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          hide-on-single-page
          :pager-count="5"
          :page-size="limit"
          :total="total"
          :current-page="offset"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="home_dialog_input">
        <input type="text" v-model="search_txts" @keyup.enter="Searchs()">
        <button class="tableButton" @click="Searchs()">Search</button>
      </div>
      <el-table :data="tableDatas">
        <template slot="empty">
          No data available
        </template>
        <el-table-column header-align="center" align="center" width="100" prop="id" label="User ID"></el-table-column>
        <el-table-column header-align="center" align="center" width="130" prop="cardOwner.name" label="Name"></el-table-column>
        <el-table-column header-align="center" align="center" width="150" prop="cardOwner.identityId" label="IC/ Password"></el-table-column>
        <el-table-column header-align="center" align="center" width="150" prop="cardOwner.contactMobile" label="Phone number"></el-table-column>
        <el-table-column header-align="center" align="center" width="150" prop="cardOwner.Daerah" label="State"></el-table-column>
        <el-table-column header-align="center" align="center" width="140" prop="cardOwner.Negeri" label="District"></el-table-column>
        <el-table-column header-align="center" align="center" width="170" prop="cardOwner.Mukim" label="Area"></el-table-column>
        <el-table-column header-align="center" align="center" width="140" prop="uuid" label="Bracele"></el-table-column>
        <el-table-column header-align="center" align="center" label="Detail">
          <template slot-scope="scope">
            <button class="tableButton" @click="handleClick(scope.row)">View</button>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">Detail</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="home_pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          hide-on-single-page
          :pager-count="5"
          :page-size="limits"
          :total="totals"
          :current-page="offsets"
          @current-change="handleCurrentChanges"
        >
        </el-pagination>
      </div>
    </el-dialog>


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
      search_txt: "",
      search_txts: "",
      dialogVisible: false,
      title: "",
      offset: 1,
      limit: 10,
      total: 0,
      tableData: [],
      offsets: 1,
      limits: 5,
      totals: 0,
      today: 0,
      tableDatas: [],
      AllTrackedUsers: 0,
      NewUsersToday: 0
    }
  },
  created() {
    this.getUserStatus()
    this.getDataList()
  },
  methods: {
    // 查看所有
    AllTrackedUsersClick() {
      this.dialogVisible = true
      this.title = 'All tracked users'
      this.today = 0
      this.getDataLists()
    },
    // 查看今日新增
    NewUsersTodayClick() {
      this.dialogVisible = true
      this.title = 'New users today'
      this.today = 1
      this.getDataLists()
    },
    // 关闭弹窗
    handleClose(done) {
      this.search_txts = ""
      this.tableDatas = [];
      this.offsets = 1
      done();
    },
    // 弹窗分页切换
    handleCurrentChanges(val) {
      this.offsets = val;
      this.getDataLists()
    },
    // 首頁搜索
    Searchs() {
      this.offsets = 1
      this.getDataLists();
    },
    // 获取弹窗数据
    getDataLists() {
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      var form = new FormData();
      form.append("limit", this.limits);
      form.append("page", this.offsets);
      form.append("search_txt", this.search_txts)
      if (this.today == 1) {
        form.append("today", 1);
      }
      axios.post('https://bt.twczw.website/web/Overt/get_api_data_list', form).then(res => {
        this.totals = res.data.data.total
        this.tableDatas = res.data.data.data_list
      })
    },
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this.getDataList()
    },
    // 首頁搜索
    Search() {
      this.offset = 1
      this.getDataList();
    },
    // 获取数据
    getDataList() {
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      var form = new FormData();
      form.append("limit", this.limit);
      form.append("page", this.offset);
      form.append("search_txt", this.search_txt)
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
  .el-dialog {
    width: 1500px;
    .home_dialog_input {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      input {
        padding: 0 20px;
        margin-right: 20px;
        width: 200px;
        height: 40px;
        background: #F5F6FA;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 400;
        color: #37394C;
        line-height: 20px;
      }
    }
  }
  .home_box {
    margin: 60px auto;
    width: 1500px;
    .home_box_top {
      width: 100%;
      height: auto;
      padding: 30px 20px;
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E3E6F3;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .home_box_top_h2 {
        font-size: 21px;
        font-weight: 600;
        color: #1A173B;
        line-height: 29px;
      }
      .home_box_top_div {
        display: flex;
        align-items: center;
        .home_box_top_div_left {
          p {
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
        .home_box_top_div_center {
          margin: 0 50px;
          width: 1px;
          height: 50px;
          background: #EAEDF9;
        }
        .home_box_top_div_right {
          p {
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
      }
      .home_box_top_button {
        display: flex;
        align-items: center;
        .home_box_top_button_left {
          margin-right: 30px;
          width: 200px;
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
            margin-right: 10px;
          }
        }
        .home_box_top_button_right {
          width: 200px;
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
    .home_box_left {
      width: 100%;
      height: auto;
      padding: 50px 20px;
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E3E6F3;
      .home_box_left_div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .home_box_left_h2 {
          font-size: 21px;
          font-weight: 600;
          color: #1A173B;
          line-height: 29px;
          margin-bottom: 20px;
        }
        .home_box_left_input {
          display: flex;
          align-items: center;
          input {
            padding: 0 20px;
            margin-left: 20px;
            width: 200px;
            height: 40px;
            background: #F5F6FA;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #37394C;
            line-height: 20px;
          }
        }
      }
    }
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
  .home_pagination {
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }
}
@media only screen and (max-width: 1500px) {
  .home {
    .el-dialog {
      width: 1300px;
    }
    .home_box {
      width: 1300px;
    }
  }
}
</style>