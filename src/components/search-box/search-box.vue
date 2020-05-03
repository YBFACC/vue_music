<template>
  <div class="search_box">
    <i class="icon-search"></i>
    <input type="text" placeholder="搜索歌曲、歌手" class="search_input" />
    <i class="icon-dismiss"></i>
  </div>
</template>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable"
@import "~@/assets/stylus/mixin"

.search_box
  height 2.5rem
  width 100%
  background: $color-highlight-background
  border-radius 5px
  display flex
  align-items center
  justify-content space-between
  box-sizing border-box
  padding 0 5px
  .search_input
    background: $color-highlight-background
    color: $color-text
    font-size: $font-size-medium
    flex 1rem
    outline none
    &::placeholder
      color: $color-text-d
    &::focus
      outline none
  .icon-search
    font-size: 24px
    color: $color-background
</style>
