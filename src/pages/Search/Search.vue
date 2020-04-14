<template>
  <div class="search">
    <!--搜索导航-->
    <SearchNav
      :isShowSearchPanel="isShowSearchPanel"
    />
    <!--联动列表-->
    <div class="shop">
      <!--Left-->
      <scroll
      ref="menu"
      :data='searchgoods'
      :probeType="probeType" 
      class="menu-wrapper" 
      v-if="searchgoods.length > 0"
      >
        <ul>
          <li class="menu-item"
              v-for="(item, index) in searchgoods" :key="index"
              :class="{current: index === curIndex}"
              @click="clickLeftItem(index)"
              ref="menuList"
          >{{item.name}}
          </li>
        </ul>
      </scroll>

      <!--Right-->
      <scroll 
      class="shop-wrapper"
      ref='goods'
      :data='searchgoods'
      :probeType="probeType"
      :listenScroll='listenScroll'
      @onscroll='onScroll' 
      v-if="searchgoods.length > 0"
      >
        <ul class="shop-list" ref="shopMenu">
          <li class="shops-li" v-for="(item,shopNum) in searchgoods" :key="shopNum" ref="shopList">
            <div class="shop-title">
              <p>{{item.name}}</p>
              <a>查看更多></a>
            </div>
            <ul class="shop-item">
              <li class="shop-inner"
                  v-for="(list,goodNum) in item.items"
                  :key="goodNum"
              >
                <img :src="list.icon" alt="">
                <p>{{list.title}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <!--搜索面板-->
    <SearchPanel
      v-if="isShow"
      :isShowSearchPanel="isShowSearchPanel"
    />
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import SearchPanel from './children/SearchPanel'
  import Scroll from '@/base/scroll/scroll'
  import {mapState} from 'vuex'
  export default {
    name: "Search",
    data() {
      return {
        scrollY: 0,
        rightTops: [],
        isShow: false,
        probeType:3,
        listenScroll:true
      }
    },
    components: {
      SearchNav,
      SearchPanel,
      Scroll
    },
    //1.发起数据请求
    mounted() {
      this.$store.dispatch('reqSearchGoods')
    },
    //2.获取数据
    computed: {
      ...mapState(['searchgoods']),
      /*6.绑定索引值*/
      curIndex() {
        const {scrollY, rightTops} = this
        return rightTops.findIndex((el, index) => {
          this._initLeftScroll(index)
          return scrollY >= el && scrollY < rightTops[index + 1]
        })
      }
    },
    methods: {
<<<<<<< HEAD
      /* 3.初始化滚动*/
      _initBScroll() {
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true
        })
        this.rightScroll = new BScroll('.shop-wrapper', {
          probeType: 3 // 6.1 监听滚动事件
        })
        /* 6.监听右侧滑动事件 */
        this.rightScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y)
        })
=======
      onScroll(pos) {
       this.scrollY = Math.abs(pos.y)
>>>>>>> dev
      },
      /* 5.计算rightTops高度值*/
      _initRightLiTops() {
        const tempArr = []
        let top = 0
        tempArr.push(top)
        // 3. 取出所有的li
        let allLis = this.$el.getElementsByClassName('shops-li');
        Array.prototype.slice.call(allLis).forEach((li, index) => {
          // 判断
          if(index === allLis.length - 1){
             li.style.paddingBottom =`${window.innerHeight - li.clientHeight - 100}px`;
          }
          top += li.clientHeight;
          tempArr.push(top);
        });
        this.rightTops = tempArr
      },
      /* 6.点击左侧切换右侧*/
      clickLeftItem(index) {
        console.log('aa')
        console.log(index)
        this.scrollY = this.rightTops[index]
        this.$refs.goods.scrollTo(0,-this.scrollY,300)
      },
      /* 7.左右联动*/
      _initLeftScroll(index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        this.$refs.menu.scrollToElement(el, 0, 0, -100)
      },
      /* 设置搜索面板的显示*/
      isShowSearchPanel(flag) {
        this.isShow = flag
      }
    },
    watch: {
      /* 4.监听滚动*/
      searchgoods() {
        this.$nextTick(() => {
          this._initRightLiTops()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  // @import "~common/stylus/mixins.styl"
  .search
    width: 100%
    height: 100%
    background #f5f5f5
    .shop
      display flex
      position absolute
      top 60px
      bottom 50px
      width 100%
      overflow hidden
      .menu-wrapper
        flex 0 0 80px
        background #f5f5f5
        .menu-item
          height 50px
          display flex
          justify-content center
          align-items center
          color #666
          background #f5f5f5
          font-size 16px
          &.current
            position relative
            color #d8050a
            background #fff
            &:before
              position absolute
              content ''
              left 0
              width 4px
              height 26px
              background #d8050a
      .shop-wrapper
        flex 1
        background #fff
        .shop-title
          padding 0 5px
          display flex
          justify-content space-between
          align-items center
          color #666
          height 40px
          font-size 14px
        .shop-tag
          display flex
          flex-wrap wrap
          justify-content center
          align-items center
          li
            width 33.3%
            text-align: center
            margin 5px 0
            img
              width 80%
          // border-bottom-1px(#ccc)
        .shop-item
          padding-bottom 10px
          display flex
          flex-wrap wrap
          justify-content center
          align-items center
          .shop-inner
            padding 5px
            width 98px
            text-align center
            box-sizing border-box
            img
              width 62px
              height 62px
              margin-bottom 5px
            p
              color #555
              font-size 14px
</style>
