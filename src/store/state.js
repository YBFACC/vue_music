import { getStore } from '@/utils/store.js'

const state = {
  login: true,
  user_info: {},
  singer: {},
  playing: false,
  playlist: [],
  songer_list: getStore('songer_list')
}

export default state
