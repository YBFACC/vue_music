import { getStore } from '@/utils/store.js'

const state = {
  login: true,
  user_info: {},
  singer: {},
  playing: false,
  full_screen: false,
  playlist: [],

  current_index: -1,
  songer_list: getStore('songer_list'),
  search_history: getStore('search_history'),
  mode: 'sequence' //顺序、随机播放
}

export default state
