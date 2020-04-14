<template>
  <div class="hot">
    <!--1.轮播图-->


    <van-pull-refresh v-model="isLoading" @refresh="hotRefresh">
       <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="recommend">
        <ShopList
          tag="li"
          v-for="(item, index) in recommendshoplist"
          :key="index"
          :item="item"
          :clickCellBtn="dealWatchBtnClick"
        />
      </ul>
      </van-list> -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(casual,index) in homecasual" :key="index">
         <img :src="casual.imgurl" alt="" width="100%">
      </van-swipe-item>
    </van-swipe>
    <!--2.中间导航 -->
    <HotNav/>
    <!--3.广告位-->
    <div class="hot-ad">
      <img src="./../../imgs/hot_ad/home_ad.gif" alt="" width="100%">
    </div>
    <!--4.商品列表-->
    <HotShopList/>
     </van-pull-refresh>
    
  </div>
</template>

<script>
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'

  import {
    mapState
  } from 'vuex'
  export default {
    name: "Hot",
    data() {
      return {
          isLoading: false
      }
    },
    methods:{
     hotRefresh() {
       setTimeout(() => {
         this.$toast.success('刷新成功');
         this.isLoading = false
       },2000)
     }
    },
    components: {
      HotNav,
      HotShopList
    },
    mounted() {
      // 1. 获取首页的轮播图
      this.$store.dispatch('reqHomeCasual')
      // 2. 获取首页nav
      this.$store.dispatch('reqHomeNav')
      // 3. 获取首页商品列表数据
      this.$store.dispatch('reqShopList')
    },
    computed: {
      ...mapState(['homecasual'])
    },
  }
</script>

<style scoped lang="stylus">
  .hot
    padding-top 43px
    width 100%
    background #f5f5f5
    .my-swipe
      padding-bottom 38.4%
      height 0
    .hot-ad
      margin 8px 0
      padding 5px
      background #fff
</style>
