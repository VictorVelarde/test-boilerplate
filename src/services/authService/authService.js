import api from '../api'
import { getAuth, setAuth, removeAuth, setLogin, logout, isLoggedIn } from './utils'

const authService = {
  refreshConfig: {
    gapMs: 5000,
    timeoutId: null
  },
  getAuth,
  setAuth,
  removeAuth,
  login,
  async logout () {
    await api.get('/auth/logout')
    logout()
  },
  isLoggedIn () {
    return isLoggedIn(this.refreshConfig.gapMs)
  }
}

export default authService

const getDefaultModel = auth => ({
  user: auth.user,
  token: auth.token,
  expireTime: parseInt(auth.expireTime)
})

async function login (payload) {
  let response
  if (payload) {
    response = await api.post('/auth/login', payload)
    response = response.data
    response.expires_in = response.exp
  }

  setLogin(response, {
    refreshConfig: authService.refreshConfig,
    refreshToken,
    getDefaultModel
  })
}

async function refreshToken () {
  const res = await api.get('/auth/refresh')

  setLogin({
    user: res.data.user_info.username,
    token: res.data.access_token,
    expires_in: res.data.exp
  }, {
    refreshConfig: authService.refreshConfig,
    refreshToken,
    getDefaultModel
  })
}
