import Vue from 'vue'
import Vuex from 'vuex'

import { pageTree } from '@/store/page-tree'

Vue.use(Vuex)

interface RootState {
  PageTree: typeof pageTree
}

export const store = new Vuex.Store<RootState>({})
