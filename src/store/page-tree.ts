import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'

import { store } from '@/store'

@Module({ dynamic: true, store, name: 'page-tree', namespaced: true })
class PageTree extends VuexModule {
  private _query: string | null = 'aaaaa'
  private _openNodeId: string | null = null
  private _currentNodeId: string | null = null

  @Action({ rawError: true })
  setQuery(query: string): void {
    this._setQuery(query)
  }

  @Action({ rawError: true })
  setOpenNodeId(nodeId: string): void {
    this._setOpenNodeId(nodeId)
  }

  @Action({ rawError: true })
  setCurrentNodeId(nodeId: string): void {
    this._setCurrentNodeId(nodeId)
  }

  @Mutation
  private _setQuery(query: string): void {
    this._query = query
  }

  @Mutation
  private _setOpenNodeId(nodeId: string): void {
    this._openNodeId = nodeId
  }

  @Mutation
  private _setCurrentNodeId(nodeId: string): void {
    this._currentNodeId = nodeId
  }

  get queryRegexp(): RegExp | undefined {
    if (this._query) {
      return new RegExp(this._query.split(' ').join('.*'), 'i')
    }
  }

  get query(): string | null {
    return this._query
  }
  get openNodeId(): string | null {
    return this._openNodeId
  }
  get currentNodeId(): string | null {
    return this._currentNodeId
  }
}

export const pageTree = getModule(PageTree)
