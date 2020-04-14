<template>
    <div class="select-login">
      <div class="bottom">
        <img src="./images/logo1.png" alt="" width="200">
      </div>
      <router-link tag="button" to="/login">手机登录</router-link>
    </div>
</template>

<script>
    export default {
        name: "SelectLogin"
    }
</script>

<style scoped lang="stylus">
  .select-login
    background-color #f5f5f5
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 1000
    display flex
    justify-content center
    align-items center
    button
      height 38px
      background #FFBB00
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top -50px
      width 80%
    .bottom
      position fixed
      top 130px
      left 50%
      margin-left -68.5px
      img
        width 137px
        height 49px
</style>
