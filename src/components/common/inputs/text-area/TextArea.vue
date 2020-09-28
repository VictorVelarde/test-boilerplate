/**
 *  TextArea.vue
**/
/* template import */
<template src="./text-area.html"></template>
/* style import */
<style scoped lang="scss" src="./text-area.scss"></style>
<script>
import { validate } from '../utils'

export default {
  name: 'TextArea',
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: [String, Number],
      required: false
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
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
      fieldError: null
    }
  },
  computed: {
  },
  methods: {
    onInput (event) {
      this.$emit('input', event)
    },
    getError () {
      if (this.error) {
        return this.error
      }

      const textarea = this.$refs.textarea
      return validate(textarea, { required: this.required, maxLength: this.maxLength, minLength: this.minLength })
    }
  },
  watch: {
    value () {
      if (this.value !== this.$refs.textarea.value) {
        this.$refs.textarea.value = this.value
      }
      this.fieldError = this.getError()
    }
  }
}
</script>
