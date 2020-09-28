/**
 *  InputFile.vue
**/
/* template import */
<template src="./input-file.html"></template>
/* style import */
<style scoped lang="scss" src="./input-file.scss"></style>
<script>
import style from '@/mixins/style'

export default {
  name: 'InputFile',
  mixins: [style],
  props: {
    // NOTE: needed if has multiple inputs
    name: {
      type: String,
      default: 'input-file',
      required: false
    },
    label: {
      type: String,
      default: 'Select',
      required: false
    },
    noFileText: {
      type: String,
      default: 'No file selected',
      required: false
    },
    multipleText: {
      type: String,
      default: 'files selected',
      required: false
    },
    uploadButtonTooltip: {
      type: String,
      default: 'Upload file',
      required: false
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
    fileTypes: {
      type: Array,
      default: () => ['image/*'],
      required: false
    },
    multiple: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      files: [],
      uploading: false
    }
  },
  computed: {
    getTypes () {
      return this.fileTypes.join()
    }
  },
  methods: {
    previewFiles () {
      this.files = this.$refs.input.files
    },
    upload () {
      this.$emit('uploaded', this.files)
      this.files = []
    }
  }
}
</script>
