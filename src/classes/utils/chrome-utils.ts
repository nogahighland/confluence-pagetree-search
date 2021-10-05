import { DOMUtils } from './dom-utils'

import { Root } from '@/types'

export class ChromeUtils {
  // TODO もっと汎用的にする
  static async getStoredData(): Promise<Root | undefined> {
    return new Promise(resolve => {
      window.chrome.storage.local.get(DOMUtils.rootId, data => {
        resolve(data[DOMUtils.rootId])
      })
    })
  }

  // TODO もっと汎用的にする
  static storeData(root: Root): void {
    const data: { [key: string]: Root } = {}
    data[DOMUtils.rootId] = root
    window.chrome.storage.local.set(data)
  }
}
