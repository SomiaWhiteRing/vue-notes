import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: []
  },
  mutations: {
    addItem (state, value) {
      state.lists.push(value)
    },
    deleteItem (state, value) {
      state.lists.splice(value.index, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
