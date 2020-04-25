<template>
  <div>
    play
    <audio :src="song_url" ref="audio"  autoplay loop></audio>
    <button @click="play()">play</button>
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
    play(){
      this.$refs.audio.play()
    }
  },
}
</script>
