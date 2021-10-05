import axios, { AxiosResponse } from 'axios'

import { DOMUtils } from '@/classes/utils/'

export class ConfluenceApi {
  static async request(): Promise<AxiosResponse> {
    return axios.get(DOMUtils.treeUrl)
  }
}
