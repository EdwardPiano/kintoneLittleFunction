/* eslint-disable import/no-extraneous-dependencies */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import Constant from './constants'

const client = new KintoneRestAPIClient({
  // Use API token authentication
  auth: { apiToken: `${Constant.BUDGET_TOKEN}` },
})

export default class kintoneAPI {
  static getAllRecords = (app, condition, orderBy) => {
    const resp = client.record.getAllRecords({ app, condition, orderBy })
    return resp
  }
}
