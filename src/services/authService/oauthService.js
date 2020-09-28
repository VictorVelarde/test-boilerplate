import api from '../api'
import { getAuth, setAuth, removeAuth, setLogin, logout, isLoggedIn } from './utils'

const oauthService = {
  refreshConfig: {
    gapMs: 5000,
    timeoutId: null
  },
  getAuth,
  setAuth,
  removeAuth,
  login (payload) {
    setLogin(payload, {
      refreshConfig: this.refreshConfig,
      refreshToken,
      getDefaultModel
    })
  },
  logout,
  isLoggedIn () {
    return isLoggedIn(this.refreshConfig.gapMs)
  }
}

export default oauthService

const getDefaultModel = auth => ({
  user: auth.user,
  token: auth.token,
  expireTime: parseInt(auth.expireTime)
})

async function refreshToken () {
  const res = await api.get('/auth/refresh')
  const newExpireTime = (res.data.expires_in + res.data.__timestamp__)

  setLogin({
    user: res.data.user_info.username,
    token: res.data.access_token,
    expires_in: newExpireTime
  }, {
    refreshConfig: oauthService.refreshConfig,
    refreshToken,
    getDefaultModel
  })
}
