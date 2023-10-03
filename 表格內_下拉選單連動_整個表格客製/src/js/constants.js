/* eslint-disable import/no-extraneous-dependencies */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export default class Constants {
  static TYPE_MASTER_APPID = 1685

  static client = new KintoneRestAPIClient({
    // Use API token authentication
    auth: { apiToken: 'UmCMVWyW09bEb4TphybH4JSdukD6LHYxa76y1Dzd' },
  })
}
