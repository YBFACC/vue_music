<template>
  <div>
    <Mheader />
    <Tab />
    <router-view></router-view>
  </div>
</template>

<script>
import Mheader from '@/components/m-header/m-header.vue'
import Tab from '@/components/tab/tab.vue'

export default {
  name: 'Home',
  components: {
    Mheader,
    Tab
  },
  created() {
    if (!this.$store.getters.songer_list) {
      this.$store.dispatch('SONGER_LIST')
    }
  }
}
</script>
