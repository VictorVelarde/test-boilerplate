/**
 *  Scrollbar.vue
**/
/* template import */
<template src="./scrollbar.html"></template>
/* style import */
<style scoped lang="scss" src="./scrollbar.scss"></style>
<script>
import { debounce } from '@/utils/debounce'

const isMobile = () => {
  if (typeof window.orientation !== 'undefined') {
    return true
  } else {
    return false
  }
}

export default {
  name: 'app-Scrollbar',
  props: {
    horizontalScroll: {
      type: Boolean,
      default: undefined,
      required: false
    },
    verticalScroll: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      scroller: null,
      horizontal: false,
      vertical: true,
      childrenWidth: 0,
      draggingX: false,
      draggingY: false,
      isScrolling: false,
      isMobile: isMobile()
    }
  },
  mounted () {
    this.scroller = this.$slots.default[0].elm
    this.vertical = this.verticalScroll

    this.calcChildrenWidth()

    if (this.childrenWidth > this.scroller.offsetWidth && this.horizontalScroll !== false) {
      this.horizontal = true
    }

    this.$nextTick(() => {
      this.addEventListeners()

      if (this.horizontal) this.resizeScrollbarX()
      if (this.vertical) this.resizeScrollbarY()
    })
  },
  methods: {
    addEventListeners () {
      this.scroller.addEventListener('scroll', this.handleScroll)

      if (this.horizontal) this.$refs.thumbX.addEventListener('mousedown', this.onThumbXMouseDown)
      if (this.vertical) this.$refs.thumbY.addEventListener('mousedown', this.onThumbYMouseDown)
      window.addEventListener('mouseup', this.onThumbDragStop)

      if (this.horizontal) this.$refs.thumbX.addEventListener('touchstart', this.onThumbXMouseDown)
      if (this.vertical) this.$refs.thumbY.addEventListener('touchstart', this.onThumbYMouseDown)
      window.addEventListener('touchend', this.onThumbDragStop)

      window.addEventListener('resize', debounce(this.update, 360), false)
    },
    handleScroll () {
      if (!this.$refs.container) return

      const lastX = (this.scroller.scrollLeft / this.scroller.scrollWidth) * 100
      const lastY = (this.scroller.scrollTop / this.scroller.scrollHeight) * 100

      this.$refs.container.classList.add('scrolling')
      window.clearTimeout(this.isScrolling)
      this.isScrolling = window.setTimeout(() => {
        this.$refs.container.classList.remove('scrolling')
      }, 66)

      window.requestAnimationFrame(() => {
        if (this.horizontal) this.moveScrollbarX(lastX)
        if (this.vertical) this.moveScrollbarY(lastY)
        this.$emit('onScroll', { x: this.scroller.scrollLeft, y: this.scroller.scrollTop })
      })
    },
    moveScrollbarX (newX) {
      this.$refs.thumbX.style.left = `${newX}%`
    },
    moveScrollbarY (newY) {
      this.$refs.thumbY.style.top = `${newY}%`
    },
    resizeScrollbarX () {
      const percentWidth = this.$refs.container.offsetWidth / this.scroller.scrollWidth
      const width = this.$refs.container.offsetWidth * percentWidth
      this.$refs.thumbX.style.width = `${width}px`

      if (this.childrenWidth <= this.$refs.container.offsetWidth) {
        this.$refs.scrollbarX.style.display = 'none'
      } else {
        this.$refs.scrollbarX.style.display = 'inherit'
      }
    },
    resizeScrollbarY () {
      const percentHeight = this.$refs.container.offsetHeight / this.scroller.scrollHeight
      const height = this.$refs.container.offsetHeight * percentHeight
      this.$refs.thumbY.style.height = `${height}px`

      if (this.scroller.scrollHeight <= this.$refs.container.offsetHeight) {
        this.$refs.scrollbarY.style.display = 'none'
      } else {
        this.$refs.scrollbarY.style.display = 'inherit'
      }
    },
    onThumbXMouseDown () {
      this.draggingX = true
      this.$refs.container.classList.add('dragging')

      const left = this.$refs.thumbX.style.left ? this.$refs.thumbX.style.left : '0%'
      const perc = parseFloat(left.slice(0, -1)) / 100
      const posX = this.$refs.container.offsetWidth * perc
      const clientX =
        event.clientX || event.clientX === 0
          ? event.clientX
          : event.touches[0].clientX
      const offset = clientX - posX

      window.addEventListener('mousemove', this.onThumbXDragStart.bind(this, offset))
      window.addEventListener('touchmove', this.onThumbXDragStart.bind(this, offset))

      event.stopPropagation()
    },
    onThumbYMouseDown () {
      this.draggingY = true
      this.$refs.container.classList.add('dragging')

      const top = this.$refs.thumbY.style.top ? this.$refs.thumbY.style.top : '0%'
      const perc = parseFloat(top.slice(0, -1)) / 100
      const posY = this.$refs.container.offsetHeight * perc
      const clientY =
        event.clientY || event.clientY === 0
          ? event.clientY
          : event.touches[0].clientY
      const offset = clientY - posY

      window.addEventListener('mousemove', this.onThumbYDragStart.bind(this, offset))
      window.addEventListener('touchmove', this.onThumbYDragStart.bind(this, offset))

      event.stopPropagation()
    },
    onThumbXDragStart (offset, event) {
      if (this.draggingX && offset) {
        const perc = ((event.clientX - offset) / this.$refs.container.offsetWidth)
        const posX = this.scroller.scrollWidth * perc
        this.scroller.scrollLeft = posX
      }
    },
    onThumbYDragStart (offset, event) {
      if (this.draggingY && offset) {
        const perc = ((event.clientY - offset) / this.$refs.container.offsetHeight)
        const posY = this.scroller.scrollHeight * perc
        this.scroller.scrollTop = posY
      }
    },
    onThumbDragStop () {
      this.draggingX = false
      this.draggingY = false
      this.$refs.container && this.$refs.container.classList.remove('dragging')

      window.removeEventListener('mousemove', this.onThumbXDragStart)
      window.removeEventListener('mousemove', this.onThumbYDragStart)
    },
    calcChildrenWidth () {
      Array.from(this.scroller.children).forEach(child => {
        if (this.childrenWidth <= child.offsetWidth) {
          this.childrenWidth = child.offsetWidth
        }
      })
    },
    /**
     * @public
     */
    update () {
      if (!this.$refs.container) return

      this.calcChildrenWidth()

      if (this.horizontal) this.resizeScrollbarX()
      if (this.vertical) this.resizeScrollbarY()

      this.handleScroll()
    },
    /**
     * @public
     */
    scrollTo (x = 0, y = 0) {
      this.scroller.scrollTo({ left: x, top: y, behavior: 'smooth' })
    }
  }
}
</script>
