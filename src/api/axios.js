import axios from 'axios'

const api = new axios.create({
  timeout: 5000
})

export const banner = () => api.get('/banner?type=2')

export const recommend = () => api.get('/recommend/resource')

export const login = (phone, password) => {
  let data = {
    phone,
    password
  }
  return api.post('/login/cellphone', data)
}

export const playlist_detail = id => api.get('/playlist/detail?id=' + id)


export const song_url = song_id => api.get('/song/url?id=' + song_id)
