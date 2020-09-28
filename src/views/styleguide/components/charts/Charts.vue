/**
 *  Charts.vue
**/
/* template import */
<template src="./charts.html"></template>
/* style import */
<style scoped lang="scss" src="./charts.scss"></style>
<script>
import style from '@/mixins/style'
export default {
  name: 'Charts',
  mixins: [
    style
  ],
  components: {
    PercentBars: () => import('@/components/common/charts/percent-bars/PercentBars.vue')
  },
  data () {
    return {
      charts: {
        percentBars: {
          simple: [
            {
              id: 0,
              name: 'This is a title',
              data: [{ id: 0, value: 45 }]
            },
            {
              id: 1,
              name: 'This is a title',
              data: [{ id: 0, value: 85 }]
            },
            {
              id: 2,
              name: 'This is a title',
              data: [{ id: 0, value: 23 }]
            },
            {
              id: 3,
              name: 'This is a title',
              data: [{ id: 0, value: 23 }]
            }
          ],
          multiple: [
            {
              id: 0,
              name: 'This is a title',
              data: [
                { id: 0, value: 45 },
                { id: 1, value: 40 },
                { id: 2, value: 36 }
              ]
            },
            {
              id: 1,
              name: 'This is a title',
              data: [
                { id: 0, value: 85 },
                { id: 1, value: 62 },
                { id: 2, value: 88 }
              ]
            },
            {
              id: 2,
              name: 'This is a title',
              data: [
                { id: 0, value: 23 },
                { id: 1, value: 56 },
                { id: 2, value: 92 }
              ]
            },
            {
              id: 3,
              name: 'This is a title',
              data: [
                { id: 0, value: 23 },
                { id: 1, value: 56 },
                { id: 2, value: 92 }
              ]
            }
          ],
          filterable: [
            {
              id: 0,
              name: 'This is a title',
              data: [{ id: 0, value: 45 }],
              active: true
            },
            {
              id: 1,
              name: 'This is a title',
              data: [{ id: 0, value: 85 }],
              active: true
            },
            {
              id: 2,
              name: 'This is a title',
              data: [{ id: 0, value: 23 }],
              active: true
            },
            {
              id: 3,
              name: 'This is a title',
              data: [{ id: 0, value: 23 }],
              active: true
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.$emit('loaded', this.$refs)
  },
  methods: {
    onPercentBarSelect (id) {
      const selected = this.charts.percentBars.filterable.find(bar => bar.id === id)
      selected.active = !selected.active
    }
  }
}
</script>
