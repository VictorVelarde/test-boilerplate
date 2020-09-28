const CACHE = {}

export function getCache (key) {
  return CACHE[key]
}

export function setCache (key, value) {
  CACHE[key] = value
}

export function removeRequest (key) {
  delete CACHE[key]
}
