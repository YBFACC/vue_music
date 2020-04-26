<template>
  <div>
    <audio :src="song_url" ref="audio" loop></audio>
    <button @click="play()" style="">play</button>
    <button @click="display()">pause</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song_url: ''
    }
  },
  mounted() {
    this.song_url = this.$route.query.song_url
  },
  methods: {
    play() {
      this.$refs.audio.play()
    },
    display() {
      this.$refs.audio.pause()
    }
  }
}
</script>

<style lang="stylus" scoped>
button
  font-size  20px
  display block
  width 100%
  color #fff
  height 30px
</style>