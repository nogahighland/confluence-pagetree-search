import { CompressingUtils } from './compressing-utils'
import { DOMUtils } from './dom-utils'

import { Root } from '@/types'

const chromeStorage = window.chrome.storage.local

export class ChromeUtils {
  // TODO もっと汎用的にする
  static async getStoredData(): Promise<Root | undefined> {
    return new Promise(resolve => {
      chromeStorage.get(DOMUtils.rootId, data => {
        const buffer = data[DOMUtils.rootId]
        const root = CompressingUtils.inflate(buffer)
        resolve(root)
      })
    })
  }

  // TODO もっと汎用的にする
  static storeData(root: Root): void {
    const data: { [key: string]: string } = {}
    data[DOMUtils.rootId] = CompressingUtils.deflate(root)
    chromeStorage.set(data)
  }
}
