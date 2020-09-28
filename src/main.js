import Vue from 'vue'
import AppShell from './app-shell/AppShell.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/style.scss'
import authService from './services/authService/authService'

Vue.config.productionTip = false

// Ignore Airship components
Vue.config.ignoredElements = [/as-\w+/]

// Error handler
window.onerror = (message, source, lineno, colno, error) => {
  // message: error message (string). Available as event (sic!) in HTML onerror="" handler.
  // source: URL of the script where the error was raised (string)
  // lineno: Line number where error was raised (number)
  // colno: Column number for the line where the error occurred (number)
  // error: Error Object (object)
  onError({
    err: message,
    source,
    info: `in line ${lineno}:${colno}`
  })
}

Vue.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  onError({
    err,
    source: vm,
    info
  })
}

const requireComponent = require.context(
  './components/common/global',
  true,
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')
  // Register component globally
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

authService.login()

new Vue({
  router,
  store,
  render: h => h(AppShell)
}).$mount('#app')

function onError ({ err, source, info }) {
  /* eslint-disable */
  console.error('Error: ', err)
  console.error('Source: ', source)
  console.error('Extra info: ', info)
  /* eslint-enable */
}
