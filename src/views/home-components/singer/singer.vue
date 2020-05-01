<template>
  <div class="listview">
    <ul>
      <li v-for="(char, index) in songer_list" :key="index">
        <h2 class="title">{{ char.title }}</h2>
        <ul>
          <li
            v-for="(songer, index) in char.items"
            :key="index"
            class="songer_item"
          >
            <img :src="songer.picUrl" class="songer_imge" />
            <span class="songer_name">{{ songer.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['songer_list'])
  },
  
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
.listview
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
