import Vue from 'vue'
import Vuex from 'vuex'

import { completions } from '@/store/completions'
import { pageTree } from '@/store/page-tree'

Vue.use(Vuex)

interface RootState {
  PageTree: typeof pageTree
  Completions: typeof completions
}

export const store = new Vuex.Store<RootState>({})
