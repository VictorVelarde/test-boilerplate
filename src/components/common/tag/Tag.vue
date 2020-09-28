/**
 *  Tag.vue
**/
/* template import */
<template src="./tag.html"></template>
/* style import */
<style scoped lang="scss" src="./tag.scss"></style>
<script>
import style from '@/mixins/style'

export default {
  name: 'Tag',
  mixins: [style],
  props: {
    type: {
      type: String,
      default: 'toggle',
      required: false,
      validator (value) {
        const types = [
          'info',
          'toggle',
          'toggle-close'
        ]
        return types.indexOf(value) !== -1
      }
    },
    name: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    },
    text: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      required: false
    },
    backgroundColor: {
      type: String,
      default: null,
      required: false
    },
    border: {
      type: String,
      default: null,
      required: false
    },
    textColor: {
      type: String,
      default: null,
      required: false
    },
    tooltipText: {
      type: String,
      required: false
    },
    tooltipPosition: {
      type: String,
      default: 'top',
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    iconFill: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: this.active
    }
  },
  computed: {
    background () {
      return { 'background-color': this.color }
    }
  },
  methods: {
    toggle (event) {
      if (this.type !== 'info') {
        if (!this.disabled) {
          this.isActive = !this.isActive
        }

        if (!this.name) {
          // eslint-disable-next-line no-console
          console.error('[Tag] You need specify a name')
        } else {
          this.$emit('toggle', { name: this.name, state: this.isActive })
        }
      }
    }
  },
  watch: {
    active (state) {
      this.isActive = state
    }
  }
}
</script>
