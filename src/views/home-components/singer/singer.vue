<template>
  <div class="listview">
    <ul>
      <li v-for="(char, index) in list" :key="index">
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
import { hot_songer, song_list } from '@/api/axios.js'
import Singer from '@/utils/singer.js'
export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    let hot = {
      title: '热门',
      items: []
    }
    await hot_songer().then(res => {
      res.data.artists.forEach(item => {
        hot.items.push(new Singer(item.id, item.name, item.picUrl))
      })
    })
    this.list.push(hot)

    for (let i = 97; i < 123; i++) {
      const key = String.fromCharCode(i)
      let temp = {
        title: key.toUpperCase(),
        items: []
      }
      await song_list(key).then(res => {
        res.data.artists.forEach(item => {
          temp.items.push(new Singer(item.id, item.name, item.picUrl))
        })
      })

      this.list.push(temp)
      console.log(this.list)
    }
  }
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
