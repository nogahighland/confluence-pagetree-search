import { DOMUtils } from './utils/dom-utils'

import axios, { AxiosResponse } from 'axios'
export class ConfluenceApi {
  static async request(): Promise<AxiosResponse> {
    return axios.get(DOMUtils.treeUrl)
  }
}
