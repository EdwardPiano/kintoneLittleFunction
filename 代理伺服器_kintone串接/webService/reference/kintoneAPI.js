const { KintoneRestAPIClient } = require("@kintone/rest-api-client");
const Constants = require('../constants/constants')

const client = new KintoneRestAPIClient({
  baseUrl: Constants.DOMAIN,
  auth: { apiToken: `${Constants.Announce_APP_TOKEN},${Constants.USER_APP_TOKEN},${Constants.REPAIRE_APP_TOKEN}` }
});

class KintoneAPI {
  //獲取紀錄(上限500筆)
  static getRecords = async (App_ID, query) => {
    const resp = await client.record.getRecords({
      app: App_ID,
      query: query,
    })
    return resp
  }

  //新增一筆紀錄
  static addRecord = async (APP_ID, record) => {
    const resp = await client.record.addRecord({ app: APP_ID, record })
    return resp
  }

  //獲取所有多筆數據(無上限)
  static getAllRecords = async (APP_ID, query) => {
    const resp = await client.record.getAllRecords({
      app: APP_ID,
      condition: query,
    })
    return resp
  }
}

module.exports = KintoneAPI 