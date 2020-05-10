<template>
  <div id="app">
    <Mheader />
    <Tab />
    <router-view></router-view>
    <Play></Play>
  </div>
</template>

<script>
import Mheader from '@/components/m-header/m-header.vue'
import Tab from '@/components/tab/tab.vue'
import Play from '@/views/play.vue'

export default {
  name: 'Home',
  components: {
    Mheader,
    Tab,
    Play
  },
  created() {
    if (!this.$store.getters.songer_list) {
      this.$store.dispatch('SONGER_LIST')
    }
  }
}
</script>
