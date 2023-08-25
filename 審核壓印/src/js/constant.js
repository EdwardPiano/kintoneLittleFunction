// eslint-disable-next-line import/no-extraneous-dependencies
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export default class constant {
  static processStatus = [
    {
      status: '業務確認',
      nextStatus: '部長確認',
      targetFieldCode: '業務',
      stampFieldCode: '業務印章',
    },
    { status: '部長確認', nextStatus: '完成', targetFieldCode: '部長', stampFieldCode: '部長印章' },
  ]

  static stampMasterAppId = 81

  static client = new KintoneRestAPIClient({
    // Use API token authentication
    auth: { apiToken: 'FcA41ElD0ueezx8dbiEsXmEL3dTDRC6Vugftzk6W,KLf5Zvs3GyK7VXxQofslxGVzkmekq3HNqIdy9Sdq' },
  })
}
