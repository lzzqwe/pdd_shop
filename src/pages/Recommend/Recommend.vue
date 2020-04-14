<template>
  <div class="recommend-wrapper">
    <div
      v-if="recommendshoplist.length>0 && userInfo._id"
      class="recommend-container"
    >
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <van-list
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
      </van-list>
     </van-pull-refresh>
     
    </div>
     <SelectLogin v-else />
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import ShopList from '@/components/ShopList/ShopList'
  // import Scroll from '@/base/scroll/scroll'
  import SelectLogin from '@/pages/Me/Login/SelectLogin'
  import {addGoods2Car} from "@/api/index"

  export default {
    name: "Recommend",
    data() {
      return {
        page: 1,
        count: 10,
        top: 0,
        status: true,
        probeType:3,
        pullup:true,
        list: [],
      loading: false,
      finished: false,
      isLoading: false
      }
    },
    components: {
      ShopList,
      SelectLogin,
      // Scroll
    },
    created() {
      this._getRecommendList()
    },
    methods: {
       onRefresh() {
       setTimeout(() => {

        this.$store.dispatch('reqPullFresh')
      this._getRecommendList()
      this.$toast.success('刷新成功');
      this.isLoading = false
       },2000)
       
    },
      onLoad() {
      setTimeout(() => {
       this.loadMore()
      },2000)
      
    },
      _getRecommendList() {
      // 获取推荐数据列表
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page, count: this.count
      })
      },
      loadMore() {
       if(!this.hasMore) {
          this.finished = true;
          return
       }
       this.loading = false;
       this.page += 1;
       this._getRecommendList();
      },
      // 监听商品点击
      async dealWatchBtnClick(goods) {
        // 1. 发送请求
        let result = await addGoods2Car(this.userInfo._id,goods.goods_id,goods.goods_name,goods.thumb_url,goods.price);
        if(result) {
          // this.$toast.success('已加入购物车')
          this.$notify({ type: 'success', message: '已加入购物车' })
        } 
      },
       ...mapMutations(['SET_LOADING'])
    },
    computed: {
      ...mapState(['recommendshoplist','userInfo','hasMore','isFlag'])
    }
  }
</script>

<style scoped lang="stylus">
.recommend-wrapper {
  position fixed
  top 0
  bottom 50px
  left 0
  right 0
  .recommend-container {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    overflow: auto;

  .recommend {
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f5;
  }  
  .loading-container {
    text-align center
  }
}
}

</style>
