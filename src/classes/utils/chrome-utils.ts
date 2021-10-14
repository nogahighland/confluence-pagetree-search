import { CompressingUtils } from './compressing-utils'

import { Constants } from '../constants'

import { Root } from '@/types'

const chromeStorage = window.chrome.storage.local

export class ChromeUtils {
  // TODO もっと汎用的にする
  static async getStoredData(): Promise<Root | undefined> {
    return new Promise(resolve => {
      chromeStorage.get(Constants.ROOT_ID, data => {
        const buffer: string | undefined = data[Constants.ROOT_ID]
        if (buffer) {
          const root = CompressingUtils.inflate(buffer)
          resolve(root)
        } else {
          resolve(undefined)
        }
      })
    })
  }

  // TODO もっと汎用的にする
  static storeData(root: Root): void {
    const data: { [key: string]: string } = {}
    data[Constants.ROOT_ID] = CompressingUtils.deflate(root)
    chromeStorage.set(data)
  }
}
