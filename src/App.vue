<template>
  <div id="app">
    <router-view v-if="isReloadAlive" />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isReloadAlive : true
    }
  },
  methods: {
    reload() {
      this.isReloadAlive = false;
      this.$nextTick(function(){
        this.isReloadAlive = true;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  min-width: 1440px;
  background: #F5F6FA;
}
</style>