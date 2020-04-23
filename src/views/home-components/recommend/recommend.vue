<template>
  <div>
    <Swiper />
    <RecommendList />
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
