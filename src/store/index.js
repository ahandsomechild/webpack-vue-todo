import Vuex from 'vuex'
import Vue from 'vue'

import list from './vuex/note_list'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    list
  }
})