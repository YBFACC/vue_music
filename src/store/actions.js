import { login, hot_songer, song_list } from '@/api/axios.js'
import Singer from '@/obj/singer.js'

import { getStore } from '@/utils/store.js'

const actions = {
  LOGIN({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login(phone, password)
        .then(response => {
          const { data } = response
          commit('SET_USER_INFO', data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  SONGER_LIST({ commit }) {
    new Promise(async (resolve, reject) => {
      let list = []

      let hot = {
        title: '热门',
        items: []
      }
      await hot_songer().then(res => {
        console.log(res)
        res.data.artists.forEach(item => {
          hot.items.push(new Singer(item.id, item.name, item.picUrl))
        })
      })
      list.push(hot)

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
        list.push(temp)
      }
      resolve(list)
    }).then(list => commit('SET_SONGER_LIST', list))
  },
  SEARCH_HISTORY({ commit }, query) {
    let list = getStore('search_history') || []
    list.push(query)
    commit('SET_SEARCH_HISTORY', list)
  },
  SELECT_PLAY({ commit, state }, { filter_list, index }) {
    state.playlist = filter_list.slice()
    state.current_index = index
    commit('SET_FULL_SCREEN', true) //全屏播放=>true
    commit('SET_PLAYING_STATE', true) //播放状态=>true
  }
}

export default actions
