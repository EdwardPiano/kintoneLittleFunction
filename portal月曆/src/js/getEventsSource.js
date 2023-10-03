import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import Constants from './constants'

const client = new KintoneRestAPIClient()

export default function getCalendarData() {
  // 取得kintone行事曆資料
  return (
    client.record
      .getAllRecords({
        app: Constants.targetAppId,
        condition: '申請人 in (LOGINUSER())',
      })
      // 將資料調整為Fullcalendar格式
      .then((resp) => {
        return resp.map((record) => {
          return {
            title: record['標題'].value,
            start: record['起算時間'].value,
            end: record['結束時間'].value,
            color: Constants.colorObj[record['請假類別'].value],
            url: `https://liaoyuche.cybozu.com/k/1799/show#record=${record.$id.value}`,
            extendedProps: {
              status: record['請假類別'].value,
              description: record['原因說明'].value,
            },
          }
        })
      })
  )
}
