import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import createStore from './store/createStore'

Vue.config.productionTip = false

const http = Axios.create({
  baseURL: 'https://swapi.co/api/'
})

new Vue({
  router,
  store: createStore(http),
  render: h => h(App)
}).$mount('#app')
