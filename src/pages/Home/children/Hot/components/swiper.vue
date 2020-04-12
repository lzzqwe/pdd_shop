<template>
  <div class="swiper">
    <swiper :options="swiperOption"  v-if="showSwiper">
      <swiper-slide v-for="item in list" :key="item.id">
        <img @load="loadImage" :src="item.imgurl" class="img-swiper needsclick">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HotSwiper',
  props:{
      list:Array
  },
  data() {
      return {
        swiperOption: {
           pagination: '.swiper-pagination',
           loop: true,
           autoplay:3000,
           speed:300,
           autoplayDisableOnInteraction : false 
        }
      }
  },
  computed: {
      showSwiper() {
          return this.list.length
      }
  },
  methods: {
    loadImage() {
      this.$emit('func')
    }
  }
  
}
</script>

<style lang="stylus" scoped>
// @import '~common/stylus/variable'
.swiper
  width 100%
  height 0
  padding-bottom 40%
  overflow hidden
  .img-swiper
    width 100% 
</style>

