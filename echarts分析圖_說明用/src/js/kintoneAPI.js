/* eslint-disable import/prefer-default-export */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const client = new KintoneRestAPIClient({
  // Use API token authentication
  auth: { apiToken: 'CAK5f26WyZNlkRJp6ug6Py53gvsh0bztF3gcukgk' },
})

export const getPersonData = async () => {
  // 網紅姓名、追蹤數、按讚數、CPE
  const echartsData = []
  const type = '美食'
  const resp = await client.record.getRecords({
    app: kintone.app.getId(),
    query: `類型 in ("${type}")`,
  })
  resp.records.forEach((record) => {
    echartsData.push({ value: Number(record['IG平均按讚數'].value), name: record['IG名稱'].value })
  })
  console.log(echartsData)
  return echartsData
}
