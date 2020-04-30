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
  }
}

export default mutations
