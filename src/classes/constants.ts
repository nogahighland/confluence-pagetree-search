import { DOMUtils } from './utils'

export class Constants {
  static ROOT_ID: string = DOMUtils.rootId
  static TREE_URL: string = DOMUtils.treeUrl

  // 特に何もしない。staticフィールドを初期化されるためにimportして呼ぶだけ。
  static init(): void {
    console.log('init')
  }
}
