export default function getElementInWindow (elemnts, scrollPosition, offset) {
  let currentElement

  elemnts.forEach((element, index) => {
    const isFirstElement = index === 0
    const targetOffsetTop = element.offsetTop

    if (isFirstElement) {
      currentElement = element
    }

    if (scrollPosition >= targetOffsetTop - offset) {
      currentElement = element
    }
  })

  return currentElement
}
