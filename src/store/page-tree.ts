import moment from 'moment'
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
import { Root } from '@/types'

@Module({ dynamic: true, store, name: 'page-tree', namespaced: true })
class PageTree extends VuexModule {
  private _root: Root | null = null

  @Action({ rawError: true })
  async restoreTree(): Promise<void> {
    const storedData = await ChromeUtils.getStoredData()
    if (storedData) {
      if (
        moment()
          .add(-10, 'm')
          .isAfter(moment(storedData.timestamp))
      ) {
        console.log('restored data is old')
        this.forceSyncTree()
      } else {
        console.log('restored data is fresh')
        this.setTree(storedData)
      }
    } else {
      this.forceSyncTree()
    }
  }

  @Action({ rawError: true })
  async forceSyncTree(): Promise<void> {
    console.log('fetching')
    const response = await ConfluenceApi.request()
    const treeDom = new DOMParser().parseFromString(response.data, 'text/html')
      .body.firstChild as HTMLUListElement
    const nodes = DOMUtils.parseTree(treeDom)
    if (nodes) {
      const tree = { children: nodes, timestamp: new Date().getTime() } as Root
      this.setTree(tree)
    }
  }

  @Mutation
  private setTree(root: Root): void {
    this._root = root
    const storedData: { [key: string]: Root } = {}
    storedData[DOMUtils.rootId] = root
    ChromeUtils.storeData(root)
  }

  get root(): Root | null {
    return this._root
  }
}

export const pageTree = getModule(PageTree)
