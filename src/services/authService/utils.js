import { setToken } from '../api'

const pkgName = process.env.VUE_APP_NAME
const AUTH_KEY = pkgName ? `${pkgName}_auth` : 'auth'

export function getAuth () {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || '{}')
}

export function setAuth (auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export function removeAuth () {
  localStorage.removeItem(AUTH_KEY)
}

export function setLogin (auth, { refreshConfig, refreshToken, getDefaultModel }) {
  let local = getAuth()
  local = auth || getDefaultModel(local)

  if (!local.token || (local.expireTime && isExpired(refreshConfig.gapMs))) {
    return
  }

  if (local.expires_in && !local.expireTime) {
    local.expireTime = Date.now() + (local.expires_in * 1000)
  }

  setAuth(local)

  setToken(local.token)

  const refreshTime = local.expireTime - refreshConfig.gapMs
  if (refreshConfig.timeoutId) {
    clearTimeout(refreshConfig.timeoutId)
  }
  refreshConfig.timeoutId = setTimeout(
    () => refreshToken(),
    refreshTime - Date.now()
  )
}

export async function logout () {
  this.removeAuth()

  window.location.reload()
}

export function isLoggedIn (refreshGapMs) {
  const local = getAuth()
  const token = local.token

  return token && !isExpired(refreshGapMs)
}

export function isExpired (refreshGapMs) {
  const local = getAuth()
  const expireTime = parseInt(local.expireTime)
  return (Date.now() - expireTime) > refreshGapMs
}
