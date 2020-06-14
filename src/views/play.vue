<template>
  <div class="play" v-show="playlist.length > 0">
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
          <div class="middle-l"></div>
        </div>
      </div>
      <div class="bottom"></div>
    </transition>

    <transition name="mini">
      <div class="mini-paly" @click="open" v-show="!fullScreen">
        <img class="icon" />
        <div class="text">
          <h2 class="name">232323</h2>
          <p class="desc">232323</p>
        </div>
        <div class="contral" @click="switch_play()">
          <i class="icon-play-mini"></i>
        </div>
        <div class="contral">
          <i class="icon-playlist"></i>
        </div></div
    ></transition>

    <audio :src="current_song_url" ref="audio" loop></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { song_url } from '@/api/axios.js'
export default {
  data() {
    return {
      current_song_url: '',
      current_song_pic: ''
    }
  },

  methods: {
    open() {
      this.$store.commit('SET_FULL_SCREEN', true)
    },
    back() {
      this.$store.commit('SET_FULL_SCREEN', false)
    }
  },
  computed: {
    ...mapGetters(['playing', 'fullScreen']),
    ...mapGetters(['playlist', 'current_song'])
  },
  watch: {
    // current_song: {
    //   handler(newSong, oldSong) {
    //     if (!newSong) return
    //     if ((newSong.song_id = oldSong.song_id)) {
    //       return
    //     }
    //     console.log(newSong)
    //     song_url(newSong.song_id).then(res => {
    //       console.log(res)
    //       this.current_song_url = res.data
    //     })
    //   },
    //   immediate: true
    // }
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
</style>
