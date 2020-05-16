<template>
  <div class="play_list">
    <Scroll ref="scroll" class="recommend-content" :data="recommend_list">
      <div>
        <h1>每日推荐歌单</h1>
        <ul>
          <router-link
            :to="{ path: `/recommend/${item.id}` }"
            tag="li"
            class="item"
            v-for="(item, index) in recommend_list"
            :key="index"
          >
            <div class="icon">
              <img :src="item.picUrl + '?param=64y64'" />
            </div>
            <div class="text">
              <h2 class="name">{{ item.name }}</h2>
              <p class="desc">{{ item.creator.nickname }}</p>
            </div>
          </router-link>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { recommend } from '@/api/axios.js'
import Scroll from '@/components/scroll/scroll.vue'
export default {
  data() {
    return {
      recommend_list: []
    }
  },
  mounted() {
    recommend().then(res => {
      console.log(res)

      this.recommend_list = res.data.recommend
    })
  },
  filters: {
    brackets: function(value) {
      return value
    }
  },
  methods: {
    select(song_list_id) {}
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
.play_list
  position: fixed
  width: 100%
  top: 14.5rem
  bottom: 0
  .recommend-content
    height 100%
    overflow hidden
    h1
      text-align center
      height 4rem
      line-height 4rem
    .item
      display flex
      align-items center
      box-sizing border-box
      padding 0 1.25rem 1.25rem 1.25rem
      .icon
        img
          width 4rem
          height 4rem
          margin-right 1.25rem
          animation cril 5s  infinite
      .text
        display flex
        flex-direction column
        justify-content center
        line-height 1.25rem
        overflow hidden
        font-size 10px
        .name
          margin-bottom: 10px
@keyframes cril {
  100%{
    transform rotate(360deg)
  }
}
</style>
