/* eslint-disable import/no-extraneous-dependencies */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import Constants from './constants'

const client = new KintoneRestAPIClient({
  // Use API token authentication
  auth: { apiToken: `${Constants.PDF_TOKEN}` },
})

export default class kintoneAPI {
  static downloadFile = async (fileKey) => {
    const data = await client.file.downloadFile({
      fileKey,
    })
    return data
  }
}
