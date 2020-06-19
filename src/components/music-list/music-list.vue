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
      <Scroll ref="scroll" class="item_content" :data="tracks">
        <ul>
          <li
            class="item"
            v-for="(item, index) in tracks"
            :key="index"
            @click="selectItem(index)"
          >
            <div class="content">
              <h2 class="name">{{ item.name }}</h2>
              <p class="desc">{{ item.ar | merge_songer }}</p>
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
import filter_tracks from '@/obj/tracks.js'
export default {
  data() {
    return {
      playlist_name: 'default',
      tracks: [],
      coverImgUrl: '',
      songer: ''
    }
  },
  components: {
    Scroll
  },
  mounted() {
    playlist_detail(this.$route.params.id).then(res => {
      this.playlist_name = res.data.playlist.name
      this.tracks = res.data.playlist.tracks
      this.coverImgUrl = res.data.playlist.coverImgUrl
    })
  },
  methods: {
    back() {
      this.$router.back()
    },
    selectItem(index) {
      let filter_list = []
      let ids = []
      for (let i = 0; i < this.tracks.length; i++) {
        let _track = new filter_tracks(this.tracks[i].al, this.tracks[i].ar[0])
        filter_list.push(_track)
        ids.push(_track.song_id)
      }
      this.$store.dispatch('SELECT_PLAY', { filter_list, index, ids })
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
        .content
          padding-left 10%
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
