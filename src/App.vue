<template>
  <div id="app">
     <router-view></router-view>
    <TabBar v-show="$route.meta.showBottomTabBar" />
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";
   import {mapActions} from 'vuex'
  import TabBar from './components/TabBar/TabBar'
  export default {
    name: "App",
    created() {
     if(localStorage.getItem("ele")) {
       // 解析 localStorage中存储的数据
        const decode = jwt_decode(localStorage.getItem("ele"))
        console.log(decode)
       // 同步用户的数据
        this.syncUserInfo(decode)
     }
    },
    methods:{
      ...mapActions(['syncUserInfo'])
    },
    components: {
      TabBar
    }
  }
</script>

<style scoped lang="stylus">
  #app
    width: 100%
    height: 100%
    background: #f5f5f5
    .fade-enter
      opacity 0
      transform translateX(100%)
    .fade-leave-to
      opacity 0
      transform translateX(-100%)
    .fade-enter-active,.fade-leave-active
      transition all 0.5s ease
</style>
