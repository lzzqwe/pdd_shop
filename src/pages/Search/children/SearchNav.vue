<template>
  <div class="search-nav">
    <a class="search-nav-icon" @click.prevent="isShowSearchPanel(true)">
      <img src="../images/search.png" alt="" width="25">
      <span>撩课学院</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "SearchNav",
    props: {
      isShowSearchPanel: Function
    }
  }
</script>

<style scoped lang="stylus">
  // @import './../../../common/stylus/mixins.styl'
  .search-nav
    position fixed
    top: 0
    left: 0
    z-index: 998
    width 100%
    height 60px
    background-color: #fff;
    // border-bottom-1px(#ccc)
    display: flex
    justify-content center
    align-items center
    .search-nav-icon
      display: flex
      justify-content center
      align-items center
      width 90%
      height 70%
      background-color: #f8f8f8;
      border-radius 10px
      span
        margin-left 6px
        font-size 18px
        color #999
        font-weight lighter
</style>
