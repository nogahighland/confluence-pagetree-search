import Vue from 'vue'
import Vuex from 'vuex'

import { completions } from '@/store/completions'
import { overlay } from '@/store/overlay'
import { pageTree } from '@/store/page-tree'

Vue.use(Vuex)

interface RootState {
  PageTree: typeof pageTree
  Completions: typeof completions
  Overlay: typeof overlay
}

export const store = new Vuex.Store<RootState>({})
