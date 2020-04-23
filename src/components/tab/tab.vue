<template>
  <div class="tab">
    <router-link
      class="tab-item"
      tag="div"
      v-for="(item, index) in tab_router"
      :key="index"
      :to="item[1]"
    >
      <span class="tab-link">{{ item[0] }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab_router: [
        ['推荐', 'recommend'],
        ['歌手', 'singer'],
        ['排行', 'rank'],
        ['搜索', 'search']
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
.tab
  display flex
  height 2.75rem
  line-height 2.75rem
  justify-content space-around
  .tab_item
    flex 1
</style>
