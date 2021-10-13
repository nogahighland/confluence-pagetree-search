import { Constants } from './constants'

import axios, { AxiosResponse } from 'axios'

export class ConfluenceApi {
  static async request(): Promise<AxiosResponse<string>> {
    return axios.get(Constants.TREE_URL)
  }
}
