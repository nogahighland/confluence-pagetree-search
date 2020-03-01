import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: null,
    openNodeId: null,
    currentNodeId: null,
  },

  actions: {
    setQuery(store, payload) {
      store.commit('setQuery', payload);
    },
    setOpenNodeId(store, payload) {
      store.commit('setOpenNodeId', payload);
    },
    setCurrentNodeId(store, payload) {
      store.commit('setCurrentNodeId', payload);
    },
  },

  mutations: {
    setQuery(state, payload) {
      state.query = payload.query;
    },
    setOpenNodeId(state, payload) {
      state.openNodeId = payload.openNodeId;
    },
    setCurrentNodeId(state, payload) {
      state.currentNodeId = payload.currentNodeId;
    },
  },

  getters: {
    queryRegexp(state) {
      if (state.query) {
        return new RegExp(state.query.split(' ').join('.*'), 'i');
      }
    }
  }
});
