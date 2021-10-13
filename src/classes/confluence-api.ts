import axios, { AxiosResponse } from 'axios'

import { DOMUtils } from '@/classes/utils/'

export class ConfluenceApi {
  static async request(): Promise<AxiosResponse<string>> {
    return axios.get(DOMUtils.treeUrl)
  }
}
