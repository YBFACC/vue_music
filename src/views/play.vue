<template>
  <div class="play" v-if="current_song">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <header>
          <div @click="back" class="back">
            <i class="icon-back"></i>
          </div>
          <div class="title">{{ current_song.song_name }}</div>
          <div class="subtitle">{{ current_song.songer_name }}</div>
        </header>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper">
              <div class="cd" :class="cdCls">
                <img :src="current_song.song_picUrl + '?param=300y300'" />
              </div>
            </div>
          </div>
          <scroll
            class="middle-r"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="index"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left" @click.stop="prev">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" @click.stop="next">
              <i class="icon-next"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-paly" @click="open" v-show="!fullScreen">
        <img
          class="icon"
          :class="cdCls"
          :src="current_song.song_picUrl + '?param=70y40'"
        />
        <div class="text">
          <h2 class="name">{{ current_song.song_name }}</h2>
          <p class="desc">{{ current_song.songer_name }}</p>
        </div>
        <div class="contral" @click.stop="togglePlaying">
          <i :class="miniIcon"></i>
        </div>
        <div class="contral">
          <i class="icon-playlist"></i>
        </div></div
    ></transition>

    <audio :src="current_song.url" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { song_url } from '@/api/axios.js'
import Lyric from 'lyric-parser'
import Scroll from '@/components/scroll/scroll'
import { prefixStyle } from '@/obj/dom.js'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: ''
    }
  },
  methods: {
    open() {
      this.$store.commit('SET_FULL_SCREEN', true)
    },
    back() {
      this.$store.commit('SET_FULL_SCREEN', false)
    },
    togglePlaying() {
      this.$store.commit('SET_PLAYING_STATE', !this.playing)
    },
    prev() {
      try {
        let temp = 1
        if (this.current_index - temp < 0) {
          temp = this.current_index - this.playlist.length + 1
        }
        while (!this.playlist[this.current_index - temp].url) {
          temp++
          if (this.current_index - temp < 0) {
            temp = this.current_index - this.playlist.length + 1
          }
        }
        this.$store.commit('SET_CURRENT_INDEX', this.current_index - temp)
      } catch (error) {
        console.log('切换上一首歌' + error)
      }
    },
    next() {
      try {
        let temp = 1
        if (this.current_index + temp >= this.playlist.length) {
          temp = -this.current_index
        }
        while (!this.playlist[this.current_index + temp].url) {
          temp++
          if (this.current_index + temp >= this.playlist.length) {
            temp = -this.current_index
          }
        }
        this.$store.commit('SET_CURRENT_INDEX', this.current_index + temp)
      } catch (error) {
        console.log('切换下一首歌' + error)
      }
    },
    getLyric() {
      this.current_song
        .getLyric()
        .then(lyric => {
          if (this.current_song.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          console.log(this.currentLyric)

          if (this.playing) {
            this.currentLyric.play()
          }
        })
        .catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      // 用来判断是否是一次移动
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    }
  },
  computed: {
    ...mapGetters(['playing', 'fullScreen', 'current_url']),
    ...mapGetters(['playlist', 'current_song', 'current_index']),
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    }
  },
  created() {
    this.touch = {}
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
          this.getLyric()
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
  },
  components: {
    Scroll
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
      border-radius 50%
      &.play
        animation: rotate 20s linear infinite
      &.pause
        animation-play-state: paused
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
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            img
              width 100%
              height 100%
              border-radius 50%
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text

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
@keyframes rotate
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
</style>
