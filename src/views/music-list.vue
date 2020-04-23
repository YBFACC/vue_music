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
      <div class="filter" ref="filter"></div>
    </div>

    <ul>
      <li class="item" v-for="(item, index) in tracks" :key="index">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc"></p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { playlist_detail } from '@/api/axios.js'
import loginVue from './login.vue'
export default {
  data() {
    return {
      playlist_name: 'default',
      tracks: [],
      coverImgUrl: ''
    }
  },
  mounted() {
    playlist_detail(this.$route.query.id).then(res => {
      this.playlist_name = res.data.playlist.name
      this.tracks = res.data.playlist.tracks
      this.coverImgUrl = res.data.playlist.coverImgUrl
    })
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.coverImgUrl})`
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
</style>
