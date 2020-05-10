<template>
  <div>
    <Swiper />
    <RecommendList />
    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from '@/components/swiper/swiper.vue'
import RecommendList from '@/components/recommend-list/recommend-list.vue'
export default {
  components: {
    Swiper,
    RecommendList
  }
}
</script>
