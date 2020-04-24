import { login } from '@/api/axios.js'

const actions = {
  LOGIN({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login(phone, password)
        .then(response => {
          const { data } = response
          commit('SET_USER_INFO',data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default actions
