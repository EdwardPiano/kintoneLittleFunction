import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export default class constant {
  static client = new KintoneRestAPIClient({
    // Use API token authentication
    auth: { apiToken: 'vRNsLcsNnHezqWj3NriRYIXw0M7u0Rltt3vlHzl8' },
  })

  static alwaysShowIndex = [0, 1, 2]

  static setNotShown = (AppLayout) => {
    for (let i = 0; i < AppLayout.length; i++) {
      if (!constant.alwaysShowIndex.includes(i)) {
        AppLayout[i].fields.forEach((field) => {
          if (field.code) {
            kintone.app.record.setFieldShown(field.code, false)
          }
        })
      }
    }
  }

  static getFormLayout = async () => {
    const resp = await constant.client.app.getFormLayout({ app: kintone.app.getId() })
    return resp.layout
  }

  static layoutSort = [
    { btnName: '基本值', rowIndex: [5, 6], showFieldCode: [] },
    { btnName: '尿素', rowIndex: [8], showFieldCode: [] },
    { btnName: '血液檢測', rowIndex: [10], showFieldCode: [] },
  ]
}
