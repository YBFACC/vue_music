<template>
  <div class="music-list">
    <header>
      <div class="back" @click="back()">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{ playlist_name }}</h1>
      <div class="back"></div>
    </header>

    <div class="bg-image" :style="bgStyle">
      <div class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="item_warp">
      <Scroll ref="scroll" class="item_content" :data="filter_list">
        <ul>
          <li
            class="item"
            v-for="(item, index) in filter_list"
            :key="index"
            @click="item.url ? selectItem(index) : null"
          >
            <div class="content_warp">
              <div class="vip">{{ item.url ? '' : 'vip' }}</div>
              <div class="content">
                <h2 class="name">{{ item.song_name }}</h2>
                <p class="desc">{{ item.songer_name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script>
import { playlist_detail, song_url, song_detail } from '@/api/axios.js'
import Scroll from '@/components/scroll/scroll.vue'
import { create_filter_tracks } from '@/obj/tracks.js'
export default {
  data() {
    return {
      playlist_name: 'default',
      coverImgUrl: '',
      filter_list: [],
      ids: []
    }
  },
  components: {
    Scroll
  },
  async created() {
    let temp_playlist_detail = await playlist_detail(this.$route.params.id)
    let playlist = temp_playlist_detail.data.playlist
    this.playlist_name = playlist.name
    this.coverImgUrl = playlist.coverImgUrl

    for (const item of playlist.tracks) {
      this.filter_list.push(
        create_filter_tracks(item.id, item.name, item.al, item.ar[0])
      )
      this.ids.push(item.id)
    }
    let temp_url = await song_url(this.ids.join(','))
    let url_list = temp_url.data.data

    for (const item of this.filter_list) {
      for (let i = 0; i < url_list.length; i++) {
        if (item.song_id === url_list[i].id) {
          item.setUrl(url_list[i].url)
          break
        }
      }
    }
  },

  methods: {
    back() {
      this.$router.back()
    },
    selectItem(index) {
      let _this = this
      this.$store.dispatch('SELECT_PLAY', {
        filter_list: _this.filter_list,
        index
      })
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.coverImgUrl})`
    }
  },
  filters: {
    merge_songer(item) {
      return item.reduce((pre, curr) => pre + curr.name, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable"
@import "~@/assets/stylus/mixin"
.music-list
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background: $color-background
  header
    display flex
    line-height: 2.5rem
    z-index 150
    .back
      flex 1
      .icon-back
        line-height: 2.5rem
        display block
        text-align center
    .title
      line-height: 2.5rem
      flex 5
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      text-align center
      color: $color-text

  .bg-image
    width 100%
    padding-top: 17.5rem
    transform-origin: top
    position: relative
    background-size: cover
  .item_warp
    position fixed
    top 22rem
    bottom 0
    left 0
    right 0
    .item_content
      overflow hidden
      height 100%
      .item
        width 100%
        font-size: $font-size-medium
        .content_warp
          display flex
          align-items center
          padding-left 3%
          .vip
            color red
          .content
            padding-left 6%
            height 4rem
            line-height 4rem
            display flex
            flex-direction column
            justify-content space-evenly
            .name
              height 1rem
              line-height 1rem
              justify-content center
            .desc
              color: $color-text-d
              height 1rem
              line-height 1rem
              justify-content center
</style>
