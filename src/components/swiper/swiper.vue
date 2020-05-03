<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide
      v-for="(item, index) in banner_list"
      :key="index"
      class="swiper_wapper"
    >
      <img :src="item.pic+'?param=375y145'" alt="" srcset="" class="banner_img"/>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { banner } from '@/api/axios.js'

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      banner_list: []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
    banner().then(res => {

      this.banner_list = res.data.banners
    })
  }
}
</script>

<style lang="stylus" scoped>
.swiper_wapper
  width 100%
  height 9rem
  .banner_img
    height 100%
    width 100%
</style>
