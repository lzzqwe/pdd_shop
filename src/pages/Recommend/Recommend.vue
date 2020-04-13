<template>
  <div class="recommend-wrapper">
    <scroll
      v-if="recommendshoplist.length>0 && userInfo._id"
      class="recommend-container"
      :data="recommendshoplist"
      :probeType="probeType"
      :pullup="pullup"
      @scrollToEnd="loadMore"
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
    </scroll>
    <SelectLogin v-else />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ShopList from '@/components/ShopList/ShopList'
  import Scroll from '@/base/scroll/scroll'
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
        pullup:true
      }
    },
    components: {
      ShopList,
      SelectLogin,
      Scroll
    },
    created() {
      this._getRecommendList()
    },
    methods: {
      _getRecommendList() {
        this.$toast.loading({
        message: "加载中...",
        forbidClick: true //是否禁止背景点击
      });
      // 获取推荐数据列表
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page, count: this.count, callback: () => {
          this.$toast.clear()
        }
      })
      },
      loadMore() {
       if(!this.hasMore) {
          this.$toast.clear();
          return
       }
       this.page += 1;
       this._getRecommendList();
      },
      // 监听商品点击
      async dealWatchBtnClick(goods) {
        // 1. 发送请求
        let result = await addGoods2Car(this.userInfo._id,goods.goods_id,goods.goods_name,goods.thumb_url,goods.price);
        if(result) {
          this.$toast.success('已加入购物车')
        } 
      }
    },
    computed: {
      ...mapState(['recommendshoplist','userInfo','hasMore'])
    }
  }
</script>

<style scoped lang="stylus">
.recommend-wrapper {
  width: 100%;
  height: 100%;
  .recommend-container {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    overflow: hidden;

  .recommend {
    padding-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f5;
  }
}
}

</style>
