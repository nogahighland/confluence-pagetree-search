import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'

import { ConfluenceApi } from '@/classes/confluence-api'
import { ChromeUtils, DOMUtils } from '@/classes/utils/'
import { store } from '@/store'
import { Root, Tree } from '@/types'

@Module({ dynamic: true, store, name: 'page-tree', namespaced: true })
class PageTree extends VuexModule {
  private _root: Root | null = null

  @Action({ rawError: true })
  async fetchTree(): Promise<void> {
    const response = await ConfluenceApi.request()
    const treeDom = new DOMParser().parseFromString(response.data, 'text/html')
      .body.firstChild as HTMLUListElement
    const nodes = DOMUtils.parseTree(treeDom)
    if (nodes) {
      const tree = { children: nodes }
      this.setTree(tree)
    }
  }

  @Mutation
  private setTree(root: Root): void {
    this._root = root
  }

  get root(): Root | null {
    return this._root
  }
}

export const pageTree = getModule(PageTree)
