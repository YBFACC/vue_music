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

    <ul>
      <li
        class="item"
        v-for="(item, index) in tracks"
        :key="index"
        @click="selectItem()"
      >
        <div class="content">
          <h2 class="name">{{ item.name }}</h2>
          <p class="desc">{{ item.ar | merge_songer }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { playlist_detail, song_url } from '@/api/axios.js'
import loginVue from './login.vue'
export default {
  data() {
    return {
      playlist_name: 'default',
      tracks: [],
      coverImgUrl: '',
      songer: '',
      id: '',
      url: ''
    }
  },
  mounted() {
    playlist_detail(this.$route.query.id).then(res => {
      console.log(res)
      this.id = res.data.playlist.trackIds[0].id
      this.playlist_name = res.data.playlist.name
      this.tracks = res.data.playlist.tracks
      this.coverImgUrl = res.data.playlist.coverImgUrl
    })
  },
  methods: {
    back() {
      this.$router.back()
    },
    async selectItem(song_id) {
      //console.log(song_id)

      await song_url(this.id).then(res => {
        console.log(res)
        this.url = res.data.data[0].url
        console.log(this.url)
      })
      this.$router.push({ path: 'play', query: { song_url: this.url } })
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
  header
    display flex
    line-height: 2.5rem
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
    padding-top: 70%
    transform-origin: top
    position: relative
    background-size: cover
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
