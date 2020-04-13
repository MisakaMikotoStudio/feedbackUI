import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import Dashboard from './modules/Dashboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    Dashboard,
  },
  getters
})

export default store
