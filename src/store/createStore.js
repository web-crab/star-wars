import Vue from 'vue'
import Vuex from 'vuex'
import createListModule from './createListModule'

Vue.use(Vuex)

export default (http) => {
  Vuex.Store.prototype.$http = http

  return new Vuex.Store({
    modules: {
      people: createListModule({ endpoint: 'people' }),
      films: createListModule({ endpoint: 'films' })
    }
  })
}
