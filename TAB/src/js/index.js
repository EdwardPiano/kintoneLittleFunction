/* eslint-disable no-param-reassign */
import { createUI } from './UISetting'
import constant from './constant'

// 設定按鈕顯示欄位
const splitLayout = (layout) => {
  constant.layoutSort.forEach((chunk) => {
    chunk.rowIndex.forEach((rowIndex) => {
      const layoutCodes = layout[rowIndex].fields.map((field) => {
        return field.code
      })
      chunk.showFieldCode = chunk.showFieldCode.concat(layoutCodes)
    })
  })
}

const processStart = async (event) => {
  try {
    // 修改所有space的高度
    // const elements = document.getElementsByClassName('control-etc-gaia control-spacer-field-gaia')
    // for (let i = 0; i < elements.length; i++) {
    //   const element = elements[i]
    //   element.style.minHeight = '0px'
    // }
    // 獲取欄位設定
    const layout = await constant.getFormLayout()
    constant.setNotShown(layout)
    // 建立按鈕
    createUI('buttonSpace', layout)
    console.log(layout)
    // 區分隱藏欄位
    splitLayout(layout)
  } catch (err) {
    event.error = err.message
  }
  return event
}

kintone.events.on(['app.record.detail.show', 'app.record.create.show', 'app.record.edit.show'], processStart)
