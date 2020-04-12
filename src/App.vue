<template>
  <div id="app">
    <!-- <transition name='fade'>
      <router-view></router-view>
    </transition> -->
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
    // created() {
    //   this.$store.dispatch('getUserInfo')
    // },
    created() {
     if(localStorage.getItem("ele")) {
        const decode = jwt_decode(localStorage.getItem("ele"))
        console.log(decode)
        this.syncUserInfo(decode)
     }
      // this.$store.dispatch('getUserInfo')
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
