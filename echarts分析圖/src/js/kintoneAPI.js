import { KintoneRestAPIClient } from "@kintone/rest-api-client"
const client = new KintoneRestAPIClient({
  // Use API token authentication
  auth: { apiToken: 'ZIjhmtsTPZSwTZbxi4An4XmwR0kVx3wB27h697QU' }

});
// 取所有網紅類型(下拉選單選項)
export const getAllTypes = async () => {
  const formFields = await client.app.getFormFields({ app: kintone.app.getId() })
  return Object.keys(formFields.properties['類型'].options).map((kye) => {
    return {
      label: kye,
      value: kye
    }
  })
}

// 取前N名網紅資料(統計圖顯示用)
export const getNumOfPersonData = async (type, num, order) => {
  // 網紅姓名、追蹤數、按讚數、CPE
  const result = { name: [], follow: [], like: [], CPE: [] }
  const resp = await client.record.getRecords({
    app: kintone.app.getId(),
    query: `類型 in ("${type}") order by ${order} desc limit ${num} `,
  })
  resp.records.forEach((record) => {
    result.name.push(record['IG名稱'].value)
    result.follow.push(record['IG觸及數'].value)
    result.like.push(record['IG平均按讚數'].value)
    result.CPE.push(record['CPE'].value)
  })
  console.log(result)
  return result
}
