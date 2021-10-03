import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface RootState {}

export const store = new Vuex.Store<RootState>({})
