<template>
  <div class="play" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen" @click="back"></div>
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

    <audio :src="song_url" ref="audio" loop></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      song_url: '',
      song_pic: ''
    }
  },
  mounted() {
    this.song_url = this.$route.query.song_url
    this.song_pic = this.$route.query.song_pic
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
    ...mapGetters(['playlist'])
  },
  watch: {
    playing: {
      handler() {
        console.log('触发')
      },
      immediate: true,
      deep: true
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
  .normal-player
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    bottom 0
    right 0
    background: red
    z-index 1000
</style>
