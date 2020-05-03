<template>
  <div class="search">
    <div class="search_box_warpper">
      <search-box></search-box>
    </div>

    <div class="shortcut_wapper">
      <div>
        <h1 class="title">热门搜索</h1>
        <ul class="key">
          <li
            v-for="(item, index) in hot_key"
            :key="index"
            class="key_item"
            @click="addQuery(item.first)"
          >
            <span>{{ item.first }}</span>
          </li>
        </ul>
      </div>

      <div class="search_history">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
        <search-history :history="search_history"></search-history>
      </div>
    </div>
  </div>
</template>

<script>
import { search_hot } from '@/api/axios.js'
import SearchBox from '@/components/search-box/search-box.vue'
import SearchHistory from '@/components/search-history/search-history.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      hot_key: []
    }
  },
  computed: {
    ...mapGetters(['search_history'])
  },
  methods: {
    addQuery(query) {
      
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    }
  },
  components: {
    SearchBox,
    SearchHistory
  },
  mounted() {
    search_hot().then(res => (this.hot_key = res.data.result.hots))
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable"
@import "~@/assets/stylus/mixin"
.search
  .search_box_warpper
    width 100%
    height 5rem
    padding 1.25rem
    box-sizing border-box
  .shortcut_wapper
    box-sizing border-box
    width 100%
    padding 0 1.25rem 0 1.25rem
    .title
      font-size: $font-size-medium
      color: $color-text-l
    .key
      margin-top 0.8rem
      display flex
      flex-wrap wrap
      .key_item
        background: $color-highlight-background
        font-size: $font-size-medium
        color: $color-text-d
        box-sizing border-box
        padding 5px 10px
        border-radius 5px
        margin 5px 20px 10px 0
    .search_history
      margin-top 1rem
      .title
        box-sizing border-box
        width 100%
        display flex
        justify-content space-between
        .text
          font-size: $font-size-medium
          color: $color-text-l
</style>
