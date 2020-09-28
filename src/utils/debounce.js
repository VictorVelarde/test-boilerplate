export function debounce (fn, wait = 0, options = {}) {
  let timeout

  return (...args) => {
    const immediate = 'immediate' in options ? !!options.immediate : options.immediate
    const later = () => {
      timeout = null
      if (!immediate) fn.apply(this, args)
    }
    const now = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (now) fn.apply(this, args)
  }
}
