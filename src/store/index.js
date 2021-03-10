import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'chalk',
    parentId:''
  },
  mutations: {
    changeTheme (state) {
      if (state.theme === 'chalk') {
        state.theme = 'vintage'
      } else {
        state.theme = 'chalk'
      }
    },
    SAVEPARENTID (state, id) {
      console.log('store里面的id',id);
      state.parentId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
