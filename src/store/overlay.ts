import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'

import { store } from '@/store'

@Module({ dynamic: true, store, name: 'overlay', namespaced: true })
class Overlay extends VuexModule {
  private _display = false
  @Action
  setDisplay(display: boolean): void {
    this.changeDisplay(display)
  }

  @Mutation
  changeDisplay(display: boolean): void {
    this._display = display
  }

  get display(): boolean {
    return this._display
  }
}
export const overlay = getModule(Overlay)
