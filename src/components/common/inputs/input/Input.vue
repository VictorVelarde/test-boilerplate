/**
 *  Input.vue
**/
/* template import */
<template src="./input.html"></template>
/* style import */
<style scoped lang="scss" src="./input.scss"></style>
<script>
import style from '@/mixins/style'
import { validate } from '../utils'

export default {
  name: 'Input',
  mixins: [style],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    large: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: false
    },
    value: {
      type: [String, Number],
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    pattern: {
      type: RegExp,
      required: false
    },
    maxLength: {
      type: String,
      required: false
    },
    minLength: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    error: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      active: false,
      focus: false,
      fieldError: null
    }
  },
  computed: {
  },
  mounted () {
    const val = this.value || this.defaultValue
    if (val) {
      this.$emit('input', { target: { name: this.name, value: val } })
      this.active = true
    }
  },
  methods: {
    onFocus () {
      this.focus = true
      this.active = true
      this.$refs.input.focus()
    },
    onBlur () {
      this.focus = false
      if (!this.value) {
        this.active = false
      }
    },
    onInput (event) {
      this.$emit('input', event)
    },
    clear () {
      this.$nextTick(() => {
        this.$emit('input', { target: { name: this.name, value: '' } })
        this.$refs.input.focus()
      })
    },
    getError () {
      if (this.error) {
        return this.error
      }

      const input = this.$refs.input
      return validate(input, { required: this.required, pattern: this.pattern, maxLength: this.maxLength, minLength: this.minLength })
    }
  },
  watch: {
    value () {
      if (this.value !== this.$refs.input.value) {
        this.$refs.input.value = this.value
      }
      if (!this.active) {
        this.active = true
      }
      this.fieldError = this.getError()
    }
  }
}
</script>
