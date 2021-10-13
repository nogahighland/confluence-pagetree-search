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
import { TreeUtils } from '@/classes/utils/tree-utils'
import { store } from '@/store'
import { Root, Tree } from '@/types'

@Module({ dynamic: true, store, name: 'page-tree', namespaced: true })
class PageTree extends VuexModule {
  private _root: Root | null = null
  private _syncReady = false

  @Action({ rawError: true })
  async restoreTree(): Promise<void> {
    const restoredData = await ChromeUtils.getStoredData()
    if (restoredData) {
      if (
        moment()
          .add(-10, 'm')
          .isAfter(moment(restoredData.timestamp))
      ) {
        console.info('restored data is old')
        this.forceSyncTree()
      } else {
        console.info('restored data is fresh')
        this.setTree(restoredData)
      }
    } else {
      console.info('no data restored')
      this.forceSyncTree()
    }
  }

  @Action({ rawError: true })
  async forceSyncTree(): Promise<void> {
    console.info('fetching')
    this.setSyncing()
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
  private setSyncing(): void {
    this._syncReady = false
  }

  @Mutation
  private setTree(root: Root): void {
    this._root = root
    ChromeUtils.storeData(root)
    this._syncReady = true
  }

  get root(): Root | null {
    return this._root
  }

  get allNodeList(): Tree[] {
    if (this._root) {
      return TreeUtils.extractNodeList(this._root)
    } else {
      return []
    }
  }

  get syncReady(): boolean {
    return this._syncReady
  }
}

export const pageTree = getModule(PageTree)
