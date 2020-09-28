/**
 *  Components.vue
**/
/* template import */
<template src="./components.html"></template>
/* style import */
<style scoped lang="scss" src="./components.scss"></style>
<script>
import { mapActions } from 'vuex'
import { MODULE_NAME_EXAMPLE, ACTIONS_EXAMPLE } from '@/store/example'
import layerService from '@/services/layerService'
import { EXAMPLE_LAYER } from '@/layers'
import style from '@/mixins/style'
export default {
  name: 'Components',
  mixins: [
    style
  ],
  components: {
    ToggleButton: () => import('@/components/common/toggle-button/ToggleButton.vue'),
    Checkbox: () => import('@/components/common/checkbox/Checkbox.vue'),
    RadioGroup: () => import('@/components/common/radio-group/RadioGroup.vue'),
    ToggleSwitch: () => import('@/components/common/toggle-switch/ToggleSwitch.vue'),
    Select: () => import('@/components/common/select/Select.vue'),
    DatePicker: () => import('@/components/common/date-picker/DatePicker.vue'), // NOTE: remove when new
    Datepicker: () => import('@/components/common/datepicker/Datepicker.vue'), // NOTE: new datepicker
    Loading: () => import('@/components/common/loading/Loading.vue'),
    Table: () => import('@/components/common/table/Table.vue'),
    Tabs: () => import('@/components/common/tabs/Tabs.vue'),
    Tab: () => import('@/components/common/tabs/tab/Tab.vue'),
    Tag: () => import('@/components/common/tag/Tag.vue'),
    Input: () => import('@/components/common/inputs/input/Input.vue'),
    TextArea: () => import('@/components/common/inputs/text-area/TextArea.vue'),
    InputFile: () => import('@/components/common/inputs/input-file/InputFile.vue'),
    RangeSlider: () => import('@/components/common/range-slider/RangeSlider.vue'),
    Modal: () => import('@/components/common/modal/Modal.vue'),
    Tree: () => import('@/components/common/tree/Tree.vue'),
    Ramp: () => import('@/components/common/ramp/Ramp.vue'),
    MapComponent: () => import('@/components/map-component/MapComponent')
  },
  data () {
    return {
      toggleButtons: {
        default: [
          { id: 0, name: 'Impresiones', active: true },
          { id: 1, name: 'Clicks' },
          { id: 2, name: 'CTR' },
          { id: 3, name: 'Visitas' }
        ],
        textIcon: [
          {
            id: 0,
            name: 'Impresiones',
            active: true,
            icon: {
              name: 'icon-calendar.svg',
              size: '20px',
              fill: '#222222'
            }
          },
          {
            id: 1,
            name: 'Clicks',
            icon: {
              name: 'icon-alert.svg',
              size: '20px',
              fill: '#222222'
            }
          },
          {
            id: 2,
            name: 'CTR',
            icon: {
              name: 'icon-delete-line.svg',
              size: '20px',
              fill: '#222222'
            }
          },
          {
            id: 3,
            name: 'Visitas',
            icon: {
              name: 'icon-upload-file.svg',
              size: '20px',
              fill: '#222222'
            }
          }
        ],
        disabled: [
          { id: 0, name: 'Impresiones', disabled: true },
          { id: 1, name: 'Clicks' },
          { id: 2, name: 'CTR' },
          { id: 3, name: 'Visitas', active: true }
        ]
      },
      checkbox: {
        default: false,
        active: true,
        disabled: false
      },
      radio: {
        list: [
          { label: 'label 1', value: 'one' },
          { label: 'label 2', value: 'two' },
          { label: 'label 3', value: 'three', disabled: true }
        ],
        vertical: 'one',
        horizontal: 'two'
      },
      toggle: {
        left: true,
        right: false
      },
      select: {
        list: [
          { id: 0, name: 'Select option 1' },
          { id: 1, name: 'Select option 2' },
          { id: 2, name: 'Select option 3' },
          { id: 3, name: 'Select option 4' },
          { id: 4, name: 'Select option 5' }
        ],
        basic: {
          selected: null
        },
        multiselect: {
          select: null
        },
        search: {
          select: null
        },
        tools: {
          select: null
        }
      },
      table: {
        list: [
          {
            id: 0,
            name: 'Aroa Gallego Aparicio',
            bird: '20 mayo',
            company: 'CARTO',
            occupation: 'Design Lead'
          },
          {
            id: 1,
            name: 'Jose Alberto Medina Zurita',
            bird: '6 agosto',
            company: 'CARTO',
            occupation: 'Senior Designer'
          },
          {
            id: 2,
            name: 'Alberto Acuña Gallego',
            bird: '23 enero',
            company: 'CARTO',
            occupation: 'UI Developer'
          },
          {
            id: 3,
            name: 'Javier Gil Domínguez',
            bird: '13 julio',
            company: 'CARTO',
            occupation: 'Designer'
          },
          {
            id: 4,
            name: 'Jose Gil Galiano',
            bird: '4 enero',
            company: 'CARTO',
            occupation: 'Principal Designer'
          },
          {
            id: 5,
            name: 'Mireya Díaz Rico',
            bird: '20 abril',
            company: 'CARTO',
            occupation: 'Product Designer'
          },
          {
            id: 6,
            name: 'Edgar Bermejo Piera',
            bird: '22 diciembre',
            company: 'CARTO',
            occupation: 'UI Developer'
          }
        ]
      },
      inputs: {
        default: {
          basic: '',
          required: '',
          disabled: '',
          pattern: '',
          length: '',
          type: '',
          large: ''
        },
        file: {
          basic: '',
          disabled: '',
          multiple: ''
        },
        mailRegExp: new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/)
      },
      textarea: {
        basic: '',
        required: '',
        disabled: '',
        length: ''
      },
      range: {
        basic: { name: 'basic', value: 50 },
        double: { name: 'double', value: [20, 50] },
        threshold: { name: 'threshold', value: [20, 50], min: 10, max: 60 },
        tooltip: { name: 'tooltip', value: 50 },
        step: { name: 'step', value: 50, step: 10 },
        stepdouble: { name: 'stepdouble', value: [20, 70], step: 10 }
      },
      modal: {
        basic: false,
        background: false,
        nobackground: false
      },
      listTree: [
        { id: 0, name: 'All competitors' },
        {
          id: 1,
          name: 'Hamburger restaurants',
          children: [
            { id: 10, name: 'McDonalds' },
            {
              id: 11,
              name: 'Burger King',
              children: [
                { id: 110, name: 'test 01 texto largo' },
                { id: 111, name: 'test 02' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Pizza restaurants',
          children: [
            { id: 20, name: 'Dominos Pizza' },
            { id: 21, name: 'Pizza Hut' }
          ]
        }
      ],
      listTreeSelected: null,
      ramp: {
        title: 'Linear ramp',
        min: 120,
        max: 120000,
        colors: ['#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5']
      },
      navigation: [
        { id: 0, hash: '#pois-summary', icon: 'icon-alert.svg' },
        { id: 1, hash: '#whitespace-summary', icon: 'icon-alert.svg' },
        { id: 2, hash: '#demographics-summary', icon: 'icon-alert.svg' },
        { id: 3, hash: '#pois-list', icon: 'icon-alert.svg' }
      ],
      selectedDate: '2020-09-08T00:00:00.000Z',
      selectedDateRange: ['2020-04-30T00:00:00.000Z', '2020-10-10T00:00:00.000Z']
    }
  },
  created () {
    this[ACTIONS_EXAMPLE.LOAD_LAYER]()
  },
  mounted () {
    this.$emit('loaded', this.$refs)
  },
  beforeDestroy () {
    layerService.removeLayer(EXAMPLE_LAYER)
  },
  methods: {
    ...mapActions(MODULE_NAME_EXAMPLE, [
      ACTIONS_EXAMPLE.LOAD_LAYER
    ]),
    onToggleButtonsSelect (event) {
      // eslint-disable-next-line
      console.log(event);
    },
    onCheckboxChange (event) {
      this.checkbox[event.target.name] = !this.checkbox[event.target.name]
    },
    onRadioChange (event) {
      this.radio[event.target.name] = event.target.value
    },
    onToggleChange (event) {
      this.toggle[event.target.name] = !this.toggle[event.target.name]
    },
    setSelect (options) {
      this.select[options.name].selected = options.option
    },
    onTableItemClick (item) {
      // eslint-disable-next-line
      console.log(item)
    },
    toggleTag (tab) {
      // eslint-disable-next-line
      console.log(tab)
    },
    onInputChange (event) {
      this.inputs.default[event.target.name] = event.target.value
    },
    onTextAreaChange (event) {
      this.textarea[event.target.name] = event.target.value
    },
    onInputFileUploaded (files) {
      // eslint-disable-next-line
      console.log(files)
    },
    onDatepickerChange (date) {
      this.selectedDate = date
    },
    onDatepickerRangeChange (date) {
      this.selectedDateRange = date
    },
    openModal (modal) {
      this.modal[modal] = true
    },
    closeModal (modal) {
      this.modal[modal] = false
    },
    onRangeSliderChange (opts) {
      this.range[opts.name].value = opts.value
    },
    onSelectTree (opt) {
      this.listTreeSelected = opt
    }
  }
}
</script>
