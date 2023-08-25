/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { Button } from 'kintone-ui-component'
import constant from './constant'

export const createUI = (spaceId, AppLayout) => {
  const btnSpace = kintone.app.record.getSpaceElement(spaceId)
  // 建立按鈕
  const buttons = constant.layoutSort.map((chunk) => {
    const button = new Button({
      text: chunk.btnName,
      type: 'normal',
    })
    button.addEventListener('click', () => {
      // 變更按鈕顏色
      buttons.forEach((btn) => {
        btn.type = btn === button ? 'submit' : 'normal'
      })
      // 隱藏共用以外欄位
      constant.setNotShown(AppLayout)
      // 顯示目標區塊欄位
      chunk.showFieldCode.forEach((fieldCode) => {
        kintone.app.record.setFieldShown(fieldCode, true)
      })
    })
    return button
  })
  buttons.forEach((button) => {
    btnSpace.appendChild(button)
  })
}
