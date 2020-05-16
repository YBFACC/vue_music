<template>
  <div class="listview">
    <Scroll ref="scroll" class="warp" :data="songer_list">
      <ul>
        <li v-for="(char, index) in songer_list" :key="index">
          <h2 class="title">{{ char.title }}</h2>
          <ul>
            <li
              v-for="(songer, index) in char.items"
              :key="index"
              class="songer_item"
            >
              <img :src="songer.picUrl + '?param=64y64'" class="songer_imge" />
              <span class="songer_name">{{ songer.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from '@/components/scroll/scroll.vue'
export default {
  computed: {
    ...mapGetters(['songer_list'])
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
.listview
  position fixed
  top 5.5rem
  bottom 0
  width 100%
  .warp
    height 100%
    overflow hidden
    .title
      width 100%
      height: 1.8rem
      line-height: 1.8rem
      padding-left: 1.25rem
      box-sizing border-box
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .songer_item
      width 100%
      height 4.3rem
      display flex
      align-items center
      box-sizing border-box
      padding-left 1.8rem
      .songer_name
        color: $color-text-l
        margin-left 1.2rem
      .songer_imge
        width: 3.1rem
        height 3.1rem
        border-radius: 50%
</style>
