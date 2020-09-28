/**
 *  Layer.vue
**/
<script>
export default {
  name: 'Layer',
  inject: ['getMap'],
  props: {
    layer: {
      type: Object,
      required: true,
      validator: function (value) {
        return Object.prototype.hasOwnProperty.call(value, 'id')
      }
    }
  },
  created () {
    this.getMap((map, params) => {
      this.layer.init(map, params)
    })
  },
  beforeDestroy () {
    this.layer.destroy()
  },
  render () {
    return null
  }
}
</script>
