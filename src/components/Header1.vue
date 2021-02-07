<template>
  <div class="Header response">
    <p v-if="$route.path !== '/Login'">Unit：{{Unit}}</p>
    <button v-if="$route.path !== '/Login'" @click="logout()">Log out</button>
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
  padding: 0 20px;
  height: 50px;
  background: rgba(244, 244, 244, 1);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    font-size: 20px;
    font-weight: bold;
    color: royalblue;
    text-decoration: underline;
    margin-left: 20px;
  }
}
</style>