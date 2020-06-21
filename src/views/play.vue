<template>
  <div class="play" v-if="current_url && current_song">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <header>
          <div @click="back" class="back">
            <i class="icon-back"></i>
          </div>
          <div class="title">{{ current_song.song_name }}</div>
          <div class="subtitle">{{ current_song.songer_name }}</div>
        </header>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img :src="current_song.song_picUrl + '?param=300y300'" />
              </div>
            </div>
          </div>
          <div class="middle-r"></div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i @click="togglePlaying()" :class="playIcon()"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-paly" @click="open" v-show="!fullScreen">
        <img class="icon" :src="current_song.song_picUrl + '?param=70y40'" />
        <div class="text">
          <h2 class="name">{{ current_song.song_name }}</h2>
          <p class="desc">{{ current_song.songer_name }}</p>
        </div>
        <div class="contral" @click.stop="togglePlaying()">
          <i :class="miniIcon()"></i>
        </div>
        <div class="contral">
          <i class="icon-playlist"></i>
        </div></div
    ></transition>

    <audio :src="current_url.url" ref="audio" loop></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { song_url } from '@/api/axios.js'
export default {
  data() {
    return {}
  },
  methods: {
    open() {
      this.$store.commit('SET_FULL_SCREEN', true)
    },
    back() {
      this.$store.commit('SET_FULL_SCREEN', false)
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    togglePlaying() {
      this.$store.commit('SET_PLAYING_STATE', !this.playing)
    }
  },
  computed: {
    ...mapGetters(['playing', 'fullScreen', 'current_url']),
    ...mapGetters(['playlist', 'current_song'])
  },
  watch: {
    current_song: {
      handler(newSong, oldSong) {
        if (!newSong) return
        if (oldSong && newSong.song_id === oldSong.song_id) {
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
        }, 1000)
      }
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable"
@import "~@/assets/stylus/mixin"
.play
  .mini-paly
    position fixed
    bottom 0
    left 0
    right 0
    width 100%
    height 3.75rem
    background: $color-highlight-background
    z-index 180
    display flex
    align-items center
    .text
      flex 1
    .icon
      width 2.5rem
      height 2.5rem
      padding 0 10px 0 20px
    .contral
      width 1.8rem
      font-size: 30px
      color: $color-theme-d
      padding 0 10px
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
  .normal-player
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    bottom 0
    right 0
    background: $color-background
    z-index 150
    header
      width 100%
      height 2.5rem
      text-align center
      .back
        position absolute
        left 0.5rem
        i
          padding 0.5rem
          display: block
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 1.25rem
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position fixed
      top 5rem
      bottom 10.6rem
      width 100%
      white-space: nowrap
      overflow auto
      .middle-l
        width 100%
        display inline-block
        height 100%
        vertical-align top
        position: relative
        .cd-wrapper
          width 80%
          margin 0 auto
          .cd
            width 100%
            border-radius 50%
            img
              width 100%
              height 100%
              border-radius 50%
      .middle-r
        display inline-block
        background-color red
        width 100%
        height 100%
        overflow auto
        vertical-align top

    .bottom
      position: absolute
      bottom 50px
      width: 100%
      height 100px
      .operators
        display flex
        justify-content space-around
        align-items center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
</style>
