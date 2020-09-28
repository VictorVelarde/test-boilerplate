/**
 *  RangeSlider.vue
**/
/* template import */
<template src="./range-slider.html"></template>
/* style import */
<style scoped lang="scss" src="./range-slider.scss"></style>
<script>
export default {
  name: 'RangeSlider',
  props: {
    name: {
      type: String,
      default: 'range-slider',
      required: false
    },
    value: {
      type: [Number, Array],
      required: false,
      default: 0
    },
    min: {
      default: 0,
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false,
      default: 100
    },
    double: {
      type: Boolean,
      default: false,
      required: false
    },
    step: {
      type: Number,
      required: false,
      default: 1
    },
    tooltip: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      active: false,
      currentX: 0,
      initialX: 0,
      right: 0,
      transformMin: 0,
      transformMax: 0,
      xOffsetMin: 0,
      xOffsetMax: 0,
      style: 0,
      currentValueMin: 0,
      currentValueMax: 0,
      currentTarget: null
    }
  },
  mounted () {
    setTimeout(() => this.set(), 10)

    this.$el.addEventListener('touchstart', this.dragStart, false)
    this.$el.addEventListener('mousedown', this.dragStart, false)
  },
  methods: {
    set () {
      this.right = this.$el.offsetWidth - this.$refs.thumbMax.offsetWidth

      if (this.double) {
        this.currentValueMin = this.value[0]
        this.currentValueMax = this.value[1]
        this.currentTarget = 'min'
        this.setTranslate(this.percentageToPixels(this.valueToPercentage(this.currentValueMin)))
        this.currentTarget = 'max'
        this.setTranslate(this.percentageToPixels(this.valueToPercentage(this.currentValueMax)))
      } else {
        this.currentValueMax = this.value
        this.currentTarget = 'max'
        this.setTranslate(this.percentageToPixels(this.valueToPercentage(this.currentValueMax)))
      }
    },
    dragStart (event) {
      if (event.target === this.$refs.bar) {
        this.currentTarget = null
      } else {
        this.currentTarget = event.target === this.$refs.thumbMax ? 'max' : 'min'
      }

      if (event.type === 'touchstart') {
        this.initialX = event.touches[0].clientX - (this.currentTarget === 'max' ? this.xOffsetMax : this.xOffsetMin)
      } else {
        this.initialX = event.clientX - (this.currentTarget === 'max' ? this.xOffsetMax : this.xOffsetMin)
      }

      if (this.currentTarget !== null) {
        this.active = true
      }

      document.addEventListener('touchmove', this.drag, false)
      document.addEventListener('mousemove', this.drag, false)

      document.addEventListener('mouseup', this.dragEnd, false)
      document.addEventListener('touchend', this.dragEnd, false)
    },
    dragEnd () {
      document.removeEventListener('touchmove', this.drag, false)
      document.removeEventListener('mousemove', this.drag, false)

      document.removeEventListener('mouseup', this.dragEnd, false)
      document.removeEventListener('touchend', this.dragEnd, false)

      this.initialX = this.currentX
      this.active = false
      this.eventEmit('end')
    },
    drag (event) {
      if (this.active) {
        event.preventDefault()

        if (event.type === 'touchmove') {
          this.currentX = event.touches[0].clientX - this.initialX
        } else {
          this.currentX = event.clientX - this.initialX
        }

        this.setTranslate(this.currentX)
        this.eventEmit('change')
      }
    },
    setTranslate (xPos) {
      if (xPos <= 0) {
        this.currentX = 0
      } else if (xPos >= this.right) {
        this.currentX = this.right
      } else {
        this.currentX = xPos
      }

      if (this.currentTarget === 'max') {
        this.xOffsetMax = this.currentX
      } else {
        this.xOffsetMin = this.currentX
      }

      if (this.currentTarget === 'max') {
        this.currentValueMax = Math.round(this.pixelsToValue(this.currentX) / this.step) * this.step
        if (this.currentValueMax < this.currentValueMin + this.step) {
          this.currentValueMax = this.currentValueMin + this.step
          return
        }
        this.transformMax = `transform: translate3d(${this.getNormalizedPosition(this.currentValueMax)}px, 0, 0)`
      } else {
        this.currentValueMin = Math.round(this.pixelsToValue(this.currentX) / this.step) * this.step
        if (this.currentValueMin > this.currentValueMax - this.step) {
          this.currentValueMin = this.currentValueMax - this.step
          return
        }
        this.transformMin = `transform: translate3d(${this.getNormalizedPosition(this.currentValueMin)}px, 0, 0)`
      }

      if (this.double) {
        this.style = `
          width: ${this.valueToPercentage(this.currentValueMax - 3) - this.valueToPercentage(this.currentValueMin - 2)}%;
          margin-left: ${this.valueToPercentage(this.currentValueMin)}%
        `
      } else {
        this.style = `width: ${this.getNormalizedPosition(this.currentValueMax) + 2}px; margin-left: 0px`
      }
    },
    onBarClick (event) {
      if (!this.double) {
        this.currentTarget = 'max'
        const position = event.offsetX - (this.$refs.thumbMax.offsetWidth / 2)
        this.xOffsetMax = position
        this.setTranslate(position)
        this.eventEmit('end')
      } else {
        this.currentTarget = null
      }
    },
    getNormalizedPosition (position) {
      return this.percentageToPixels(this.valueToPercentage(position))
    },
    percentageToPixels (percentage) {
      return this.right * (percentage / 100)
    },
    pixelsToValue (px) {
      return Math.round(((px / this.right) * (this.max - this.min)) + this.min)
    },
    valueToPercentage (value) {
      return ((value - this.min) / (this.max - this.min)) * 100
    },
    eventEmit (type) {
      if (this.double) {
        let reset = false
        if (this.currentValueMax >= this.max && this.currentValueMin <= this.min) {
          reset = true
        }
        this.$emit(type, { name: this.name, reset, value: [this.currentValueMin, this.currentValueMax] })
      } else {
        this.$emit(type, { name: this.name, value: this.currentValueMax })
      }
    }
  },
  watch: {
    min () {
      this.set()
    },
    max () {
      this.set()
    }
  }
}
</script>
