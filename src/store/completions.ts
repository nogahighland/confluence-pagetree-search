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
  private _increment = false
  private _focus = 0
  private _selectIndex = 0

  @Action
  changeQuery(query: string): void {
    this.setQuery(query)
    this.createNodeList()
  }

  @Action
  setFocus(focus: boolean): void {
    if (focus) {
      this.changeFocus()
    } else {
      this.setSelectIndex0()
    }
  }

  @Action
  incrementSelectIndex(): void {
    this.changeSelectIndex(1)
  }

  @Action
  decrementSelectIndex(): void {
    this.changeSelectIndex(-1)
  }

  @Action
  resetSelectIndex(): void {
    this.setSelectIndex0()
  }

  @Mutation
  setQuery(query: string): void {
    this._query = query
    this._increment = query.length > this._query.length
  }

  @Mutation
  createNodeList(): void {
    const query = this._query
    if (!query) {
      this._nodeList = []
      return
    }

    let sourceNodeList: Tree[]

    if (this._nodeList.length && this._increment) {
      sourceNodeList = this._nodeList
    } else {
      sourceNodeList = pageTree.allNodeList
    }

    this._nodeList = SuggestionUtils.getSuggestions(sourceNodeList, query)
  }

  @Mutation
  changeFocus(): void {
    // app.vueのfocus()を呼び出すために値を替える
    this._focus = Math.random()
  }

  @Mutation
  changeSelectIndex(amount: number): void {
    this._selectIndex += amount
  }

  @Mutation
  setSelectIndex0(): void {
    this._selectIndex = 0
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

  get focus(): number {
    return this._focus
  }

  get selectIndex(): number {
    if (this._selectIndex > 0) {
      return this._selectIndex % this.nodeList.length
    } else {
      return (
        Math.abs(this.nodeList.length + this._selectIndex) %
        this.nodeList.length
      )
    }
  }
}

export const completions = getModule(Completions)
