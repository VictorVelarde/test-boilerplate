export function copy (text) {
  try {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else if (window.clipboardData) { // IE
      window.clipboardData.setData('text', text)
    } else { // other browsers, iOS, Mac OS
      const el = document.createElement('input')
      el.innerHTML = text
      copyToClipboard(el)
    }
  } catch (e) {
    throw new Error(e) // copy failed.
  }
}

function copyToClipboard (el) {
  const oldContentEditable = el.contentEditable
  const oldReadOnly = el.readOnly

  try {
    el.contentEditable = 'true' // specific to iOS
    el.readOnly = false
    copyNodeContentsToClipboard(el)
  } finally {
    el.contentEditable = oldContentEditable
    el.readOnly = oldReadOnly
  }
}

function copyNodeContentsToClipboard (el) {
  const range = document.createRange()
  const selection = window.getSelection()
  range.selectNodeContents(el)
  selection.removeAllRanges()

  selection.addRange(range)
  el.setSelectionRange(0, 999999)

  document.execCommand('copy')
}
