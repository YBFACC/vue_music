<template>
  <div class="rank">
    <ul>
      <li class="item" v-for="(item, index) in rank_list" :key="index">
        <img :src="item.coverImgUrl + '?param=100y100'" class="item_img" />
        <ul class="item-rank">
          <li
            v-for="(track, index) in item.tracks"
            :key="index"
            class="item-desc"
          >
            <span> {{ track | track_filter(index) }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { top_list_detail } from '@/api/axios.js'
export default {
  data() {
    return {
      rank_list: []
    }
  },
  mounted() {
    top_list_detail().then(res => {
      console.log(res.data)

      this.rank_list = res.data.list
    })
  },
  filters: {
    track_filter(track, index) {
      return index + '.' + track.first + track.second
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
  @import "~@/assets/stylus/mixin"
.rank
  .item
    height 6.25rem
    width 100%
    box-sizing border-box
    padding 0 1.25rem
    display flex
    margin-top 1.25rem
    .item_img
      width 6.25rem
      height 100%
    .item-rank
      display flex
      flex-direction column
      background: $color-highlight-background
      color: $color-text-d
      font-size: $font-size-small
      width 70%
      box-sizing border-box
      padding 0 1.25rem
      .item-desc
        flex 1
        display flex
        align-items center
</style>
