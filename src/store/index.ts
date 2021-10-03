import { pageTree } from './page-tree'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface RootState {
  PageTree: typeof pageTree
}

export const store = new Vuex.Store<RootState>({})
