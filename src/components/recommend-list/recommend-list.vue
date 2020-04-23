<template>
  <div class="play_list">
    <h1>每日推荐歌单</h1>
    <ul>
      <router-link
        :to="{ path: '/music_list', query: { id: item.id } }"
        append
        tag="li"
        class="item"
        v-for="(item, index) in recommend_list"
        :key="index"
      >
        <div class="icon">
          <img :src="item.picUrl" />
        </div>
        <div class="text">
          <h2 class="name">{{ item.name | brackets }}</h2>
          <p class="desc">{{ item.creator.nickname }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { recommend } from '@/api/axios.js'
export default {
  data() {
    return {
      recommend_list: []
    }
  },
  mounted() {
    recommend().then(res => {
      this.recommend_list = res.data.recommend
    })
  },
  filters: {
    brackets: function(value) {
      return value
    }
  },
  methods: {
    // toSongList(id) {
    //   this.$router.push({ path: '/home/recommend', params: { id: id } })
    // }
  }
}
</script>

<style lang="stylus" scoped>
.play_list
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
    .text
      display flex
      flex-direction column
      justify-content center
      line-height 1.25rem
      overflow hidden
      font-size 10px
      .name
        margin-bottom: 10px
</style>
