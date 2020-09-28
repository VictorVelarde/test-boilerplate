/**
 *  Styleguide.vue
**/
/* template import */
<template src="./styleguide.html"></template>
/* style import */
<style lang="scss" src="./styleguide.scss"></style>
<script>
import style from '@/mixins/style'

/**
 * TODO: Select and Table components remote filter
 * TODO: Select slots examples
 */
export default {
  name: 'Styleguide',
  mixins: [style],
  components: {
    Theme: () => import('./components/theme/Theme'),
    Typography: () => import('./components/typography/Typography'),
    Buttons: () => import('./components/buttons/Buttons'),
    Components: () => import('./components/components/Components'),
    Charts: () => import('./components/charts/Charts')
  },
  props: {},
  data () {
    return {
      sections: []
    }
  },
  mounted () {
    this.loadSidebar()
  },
  methods: {
    loadSidebar (refs) {
      this.sections = []

      const links = document.querySelectorAll('section')
      links.forEach(link => {
        if (link.id) {
          const sublinks = document.querySelectorAll('#' + link.id + ' > h2')
          const subsections = []

          if (sublinks.length) {
            sublinks.forEach(sublink => {
              if (sublink.id) {
                subsections.push({
                  href: sublink.id,
                  name: sublink.id.replace(link.id + '-', '').replace(/-/g, ' ').replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
                })
              }
            })
          }

          this.sections.push({
            href: link.id,
            name: link.id.replace(/-/g, ' ').replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1'),
            subsections
          })
        }
      })

      if (refs) {
        this.$refs = {
          ...this.$refs,
          ...refs
        }
      }
    },
    scrollTo (anchor) {
      const element = this.$refs[anchor]
      const top = element.offsetTop

      window.scrollTo(0, top)
    }
  }
}
</script>
