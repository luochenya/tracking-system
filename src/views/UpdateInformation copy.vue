<template>
  <div class="UpdateInformation response">
    <Header />
    <h1 class="UpdateInformation_h1" @click="toHome()">Malaysia boarder entry  tracking system for COVID-19 control</h1>
    <div class="UpdateInformation_box">
      <h2 class="UpdateInformation_box_h2">Tracked user’s info </h2>
      <el-form class="UpdateInformation_box_content">
        <el-form-item label="Case #">
          <el-input v-model="dataForm.id" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Passport Number">
          <el-input v-model="dataForm.cardOwner.identityId" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="dataForm.cardOwner.name" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Tracking Watch code">
          <el-input v-model="dataForm.uuid" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Registered Unit">
          <el-input v-model="unit" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Time of boarder entry">
          <el-input v-model="dataForm.cardOwner.birthdayTime" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Gender">
          <el-input v-model="dataForm.cardOwner.sex" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Phone number">
          <el-input v-model="dataForm.cardOwner.contactMobile" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Ethnicity">
          <el-input v-model="dataForm.cardOwner.ethnicity" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Country">
          <el-input v-model="dataForm.cardOwner.country" clearable disabled='disabled'></el-input>	
        </el-form-item>
        <el-form-item label="Quarantine Address" class="max_input">
          <el-input v-model="dataForm.cardOwner.address" clearable disabled='disabled'></el-input>	
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import axios from "axios";
export default {
  name: "UpdateInformation",
  components: {
    Header
  },
  data() {
    return {
      dataForm: {
        cardOwner: {
          identityId: ""
        }
      },
      unit: sessionStorage.getItem('loginId')
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
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
  .UpdateInformation_h1 {
    display: inline-block;
    cursor: pointer;
    padding: 20px 30px;
    font-size: 26px;
    font-weight: bold;
    text-decoration: underline;
  }
  .UpdateInformation_box {
    padding: 0 30px;
    .UpdateInformation_box_h2 {
      padding-left: 20px;
      font-size: 30px;
      line-height: 50px;
      font-weight: bold;
      border-bottom: 1px solid #666666;
    }
    .UpdateInformation_box_content {
      padding: 50px 30px 0;
      .el-form-item {
        padding: 0 5%;
        width: 50%;
        display: inline-block;
        margin-bottom: 30px;
        .el-form-item__label {
          font-weight: bold;
          font-size: 20px;
          color: #000000;
        }
        .el-input__inner {
          color: #000000;
        }
      }
      .max_input {
        width: 100%;
      }
    }
  }
}
</style>