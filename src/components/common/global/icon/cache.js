const CACHE = {}
const EXPIRE_TIME = {}
const WAIT = 10000
const DELAY = 5000
let interval
let dirty = false

export function getCache (key) {
  setTime(key)
  return CACHE[key]
}

export function setCache (key, value) {
  CACHE[key] = value
  setTime(key)

  if (!dirty) {
    initClearCache()
  }
}

function initClearCache () {
  dirty = true

  const later = () => {
    clearCache()

    if (!Object.keys(CACHE).length) {
      dirty = false
      clearInterval(interval)
    }
  }

  interval = setInterval(later, WAIT)
}

function setTime (key) {
  EXPIRE_TIME[key] = Date.now() + DELAY
}

function clearCache () {
  Object.entries(EXPIRE_TIME).forEach(values => {
    const [key, value] = values
    if (value < Date.now()) {
      delete CACHE[key]
      delete EXPIRE_TIME[key]
    }
  })
}
