/* eslint-disable import/no-extraneous-dependencies */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import Constant from './constant'

const client = new KintoneRestAPIClient({
  // Use API token authentication
  auth: {
    apiToken: `${Constant.PRODUCT_OPTION_TOKEN},${Constant.RESTAURANT_SUCCESS_TOKEN}`,
  },
})

export default class kintoneAPI {
  // 獲取大量資料(無上限)GET
  static getAllRecords = async (appId, queryString) => {
    const resp = await client.record.getAllRecords({
      app: appId,
      condition: queryString,
    })
    return resp
  }

  // 獲取500筆內的資料
  static getRecords = async (appId, queryString) => {
    const resp = await client.record.getRecords({
      app: appId,
      query: queryString,
      totalCount: true,
    })
    return resp
  }

  // 新增一筆紀錄POST
  static addRecord = async (appId, params) => {
    const resp = await client.record.addRecord({ app: appId, record: params })
    return resp
  }

  // 獲取應用程式欄位
  static getAppFeilds = async (APP_ID) => {
    const resp = await client.app.getFormFields({ app: APP_ID })
    return resp
  }

  // 更新一筆紀錄PUT
  static updateRecord = async (appId, recordId, params) => {
    const resp = await client.record.updateRecord({ app: appId, id: recordId, record: params })
    return resp
  }
}
