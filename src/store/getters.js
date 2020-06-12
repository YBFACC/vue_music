const getters = {
  user_info: state => state.user_info,
  songer_list: state => state.songer_list,
  search_history: state => state.search_history,
  playlist: state => state.playlist,
  playing: state => state.playing,
  fullScreen: state => state.full_screen,
  current_song: state => state.playlist[state.current_index]
}
export default getters
