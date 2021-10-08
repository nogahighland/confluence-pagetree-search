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
    if (!query || encodeURI(query.trim()).split(/%..|./).length - 1 < 3) {
      this._nodeList = []
      return
    }

    let sourceNodeList: Tree[]

    if (this._nodeList.length) {
      sourceNodeList = this._nodeList
    } else {
      sourceNodeList = pageTree.allNodeList
    }

    const regexp = SuggestionUtils.createFilterRegexp(query)

    if (!sourceNodeList.some(node => regexp.test(node.linkText))) {
      this._nodeList = []
      return
    }

    let count = 0
    for (const node of sourceNodeList) {
      if (regexp.test(node.linkText) && !this._nodeList.includes(node)) {
        this._nodeList.push(node)
        count++
      }
      if (count >= 10) {
        break
      }
    }
  }

  get query(): string | null {
    return this._query
  }

  get nodeList(): Tree[] {
    return this._nodeList
  }
}

export const completions = getModule(Completions)
