import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import Constants from './constants'

const client = new KintoneRestAPIClient({
  auth: { apiToken: Constants.SCANNERGUN_TOKEN },
})

export default class kintoneAPI {
  // 獲取記錄資料
  static getRecords = async (APP_ID, QUERY) => {
    const resp = await client.record.getRecords({
      app: APP_ID,
      query: QUERY,
      totalCount: true,
    })
    return resp
  }

  // 獲取應用欄位資訊
  static getAppFields = async (APP_ID) => {
    const resp = await client.app.getFormFields({ app: APP_ID })
    return resp
  }

  // 更新多筆記錄資料
  static updateRecords = async (APP_ID, records) => {
    const params = {
      app: APP_ID,
      records,
    }
    const resp = await client.record.updateRecords(params)
    return resp
  }
}
