import { setStore } from '@/utils/store.js'

const mutations = {
  SET_LOGIN: function(state, LOGIN) {
    state.singer = LOGIN
  },
  SET_USER_INFO: function(state, UserInfo) {
    state.user_info = UserInfo
  },
  SET_SONGER_LIST: function(state, list) {
    setStore('songer_list', list)
  },
  SET_SEARCH_HISTORY: function(state, list) {
    setStore('search_history', list)
  },
  SET_FULL_SCREEN: function(state, flag) {
    state.full_screen = flag
  },
  SET_PLAYING_STATE: function(state, flag) {
    state.playing = flag
  },
  SET_CURRENT_INDEX: function(state, index) {
    state.current_index = index
  }
}

export default mutations
