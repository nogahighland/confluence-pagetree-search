import { pageTree } from './page-tree'

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'

import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { store } from '@/store'
import { Tree } from '@/types'

export const COMPLETION_LIMIT = 10

@Module({ dynamic: true, store, name: 'completions', namespaced: true })
class Completions extends VuexModule {
  private _query: string | null = null
  private _nodeList: Tree[] = []
  private increment = false

  @Action
  changeQuery(query: string): void {
    this.setQuery(query)
    this.createNodeList()
  }

  @Mutation
  setQuery(query: string): void {
    this._query = query
    this.increment = query.length > this._query.length
  }

  @Mutation
  createNodeList(): void {
    const query = this._query
    // https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
    if (!query) {
      this._nodeList = []
      return
    }

    let sourceNodeList: Tree[]

    if (this._nodeList.length && this.increment) {
      sourceNodeList = this._nodeList
    } else {
      sourceNodeList = pageTree.allNodeList
    }

    const regexp = SuggestionUtils.createFilterRegexp(query)

    this._nodeList = sourceNodeList.filter(n => regexp.test(n.linkText))
  }

  get query(): string | null {
    return this._query
  }

  get nodeList(): Tree[] {
    return this._nodeList.slice(0, COMPLETION_LIMIT)
  }

  get allNodeListCount(): number {
    return this._nodeList.length
  }
}

export const completions = getModule(Completions)
