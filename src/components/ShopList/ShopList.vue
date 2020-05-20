<template>
  <li @click="handleSet(item)" class="recommend-item">
    <img v-lazy="item.img" alt="" width="100%" v-if="item.img">
    <h4 class="item-title">{{item.title}}</h4>
    <div class="item-bottom">
      <span class="item-price">¥{{item.price}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn" @click.stop="clickCellBtn(item)">加入购物车</button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "ShopList",
    props: {
      item: Object,
      clickCellBtn: {
        type: Function,
        default: () =>{}
      }
    },
    methods:{
      handleSet(item) {
        this.$router.push(`/goods?id=${item.tradeItemId}`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recommend-item
    padding-bottom 6px
    margin-bottom 3px
    width 185.6px
    background #f5f5f5
    &:nth-child(2n-1)
      margin-right 1%
    .item-title
      margin 5px 0
      padding 0 5px
      height 20px
      line-height 20px
      font-size 13px
      font-weight height 
      overflow hidden
    .item-bottom
      padding 0 6px
      align-items center
      display flex
      .item-price
        flex 2
        color red
        font-size 12px
        font-weight bolder
      .item-sales
        flex 4
        font-size 10px
        color #666
      .item-btn
        flex 4
        height 26px
        border-radius 5px
        background transparent
        color red
        font-size: 12px
        border 1px solid orangered
      .item-user
        img
          width 30px
          border-radius 50%
          &:nth-child(2)
            margin-left -8px
</style>
