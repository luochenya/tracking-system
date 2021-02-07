<template>
  <div class="Header">
    <!-- top -->
    <div class="Header_top">
      <div class="Header_top_left">
        <button @click="toBack()" v-if="$route.path != '/'">
          <img src="@/assets/img/back.png" alt="" />
          Back
        </button>
      </div>
      <div class="Header_top_right">
        <p>Unit：{{Unit}}</p>
        <button @click="logout()">Log out</button>
      </div>
    </div>
    <!-- bottom -->
    <div class="Header_bottom">
      <div class="Header_bottom_left">
        <img src="@/assets/img/logoMin.png" alt="" />
        <div>
          <p>Malaysia boarder entry  tracking system for COVID-19 control</p>
          <span>kerajaan malaysia</span>
        </div>
      </div>
      <div class="Header_bottom_right">
        <button @click="toHome()" v-if="$route.path != '/'">
          <img src="@/assets/img/toHome.png" alt="" />
          Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      Unit: sessionStorage.getItem('loginId')
    }
  },
  mounted() {
    if (!sessionStorage.getItem('loginId') && this.$route.path !== '/Login') {
      this.$router.push('/Login')
    }
  },
  methods: {
    // 返回上一頁
    toBack() {
      this.$router.go(-1)
    },
    // 返回首頁
    toHome() {
      this.$router.push('/')
    },
    // 登出
    logout() {
      this.$confirm('Confirm whether to log out of the system?', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Sign out successfully!'
        });
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loginId')
        this.$router.push('/Login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Header {
  width: 100%;
  .Header_top {
    width: 100%;
    height: 60px;
    background: #2C343F;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .Header_top_left {
      button {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
        img {
          margin-right: 13px;
          width: 20px;
          height: 12px;
        }
      }
    }
    .Header_top_right {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
      }
      button {
        margin-left: 40px;
        width: 80px;
        height: 30px;
        background: rgba($color: #ffffff, $alpha: 0.2);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 20px;
      }
    }
  }
  .Header_bottom {
    width: 100%;
    height: 120px;
    background: #FFFFFF;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .Header_bottom_left {
      display: flex;
      align-items: center;
      img {
        width: 100px;
        height: 80px;
      }
      div {
        margin-left: 20px;
        p {
          margin-bottom: 2px;
          font-size: 28px;
          font-weight: 600;
          color: #37394C;
          line-height: 40px;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: #B4BAC6;
          line-height: 22px;
        }
      }
    }
    .Header_bottom_right {
      button {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        color: #3B5CF8;
        line-height: 25px;
        text-decoration: underline;
        img {
          margin-right: 8px;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>