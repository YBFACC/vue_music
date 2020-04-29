import axios from 'axios'

const api = new axios.create({
  timeout: 5000
})

export const banner = () => api.get('/banner?type=2')

export const login = (phone, password) => {
  let data = {
    phone,
    password
  }
  return api.post('/login/cellphone', data)
}

//获取每日推荐歌单
export const recommend = () => api.get('/recommend/resource')

//获取歌单详情
export const playlist_detail = id => api.get('/playlist/detail?id=' + id)

//获取歌曲播放url
export const song_url = ids => api.get('/song/url?id=' + ids)

//获取歌曲详情
export const song_detail = ids => api.get('/song/detail?ids=' + ids)

//热门歌手
export const hot_songer = () => api.get('/top/artists?offset=0&limit=10')

//按首字母请求歌手列表
export const song_list = char => api.get('/artist/list?type=-1&area=-1&limit=5&initial='+char)
