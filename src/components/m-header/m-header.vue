<template>
  <div class="m-header">
    <h1 class="text">Just For You</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>


<style scoped lang="stylus">
.m-header
  position relative
  height 2.75rem
  text-align center
  .text
    display inline-block
    line-height 2.75rem
  .mine
    position absolute
    display inline-block
    top 0
    right 0
    .icon-mine
      display: inline-block
      padding: 12px
      font-size: 20px
</style>
