import { pageTree } from './page-tree'

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'

import { store } from '@/store'
import { Tree } from '@/types'

@Module({ dynamic: true, store, name: 'completions', namespaced: true })
class Completions extends VuexModule {
  private _query: string | null = null
  private _nodeList: Tree[] = []

  @Action
  changeQuery(query: string): void {
    this.setQuery(query)
    this.createNodeList()
  }

  @Mutation
  setQuery(query: string): void {
    this._query = query
  }

  @Mutation
  createNodeList(): void {
    const query = this._query
    // https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
    if (!query || encodeURI(query).split(/%..|./).length - 1 < 3) {
      this._nodeList = []
      return
    }
    let sourceNodeList: Tree[]
    if (this._nodeList.length) {
      sourceNodeList = this._nodeList
    } else {
      sourceNodeList = pageTree.allNodeList
    }
    const regexp = new RegExp(query.split(' ').join('.*'), 'i')
    this._nodeList = sourceNodeList.filter(n => regexp.test(n.linkText))
  }

  get query(): string | null {
    return this._query
  }

  get queryGlobalRegexp(): RegExp | undefined {
    if (!this._query) {
      return
    }
    return new RegExp(`(${this._query.split(' ').join('|')}`, 'gi')
  }

  get nodeList(): Tree[] {
    return this._nodeList
  }
}
export const completions = getModule(Completions)
