<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fixed"
    ></ly-tab>
    <!-- <transition name='fade'>
      <router-view></router-view>
    </transition>   -->
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {
        selectedId: 0,
        items: [
          {label: '热门'},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '后端'},
          {label: '百货'},
          {label: '产品'},
          {label: '内衣'},
          {label: '设计'}
        ],
        options: {
          activeColor: '#e9232c'  // 设置选中的颜色
        },
        // 二级路由路径
        subRouterUrl:[
          '/home/hot','/home/dress','/home/box','/home/man','/home/ele','/home/food','/home/general','/home/mbaby','/home/shirt'
        ]
      }
    },
    methods: {
      handleChange(item, index) {
        this.$router.replace(this.subRouterUrl[index])
      }
    }
  }
</script>

<style scoped lang="stylus">
  .home
    width: 100%
    height 100%
    background #f5f5f5
    .fixed
      position fixed
      left 0
      top 0
      z-index 998
    .fade-enter
      opacity 0
      transform translateX(100%)
    .fade-leave-to
      opacity 0
      transform translateX(-100%)
    .fade-enter-active,.fade-leave-active
      transition all 0.4s ease      
</style>
