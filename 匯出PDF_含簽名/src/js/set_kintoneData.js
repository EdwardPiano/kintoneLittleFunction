/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

// 創建和修改PDF文件
import { degrees, PDFDocument, rgb, StandardFonts, PDFTextField } from 'pdf-lib'
// 用於處理字體的庫
import fontkit from '@pdf-lib/fontkit'
// kintone SDK
import kintoneAPI from '../reference/kintoneAPI'
// 常量
import Constants from '../reference/constants'

// 獲取PDF檔案
const getPDF_File = async (event) => {
  const { record } = event
  const files = record[`${Constants.fileCode}`].value
  // 判斷附件中是否有檔案
  if (files.length <= 0) {
    return undefined
  }
  // 獲取附件中第一個檔案
  const { fileKey } = files[0]
  // 下載附件檔案
  const arrayBuffer = await kintoneAPI.downloadFile(fileKey)
  return arrayBuffer
}

// 獲取簽名檔案
const getSign_File = async (event) => {
  const { record } = event
  const files = record[`${Constants.signCode}`].value
  // 判斷附件中是否有檔案
  if (files.length <= 0) {
    return undefined
  }
  // 獲取附件中第一個檔案
  const { fileKey } = files[0]
  // 下載附件檔案
  const arrayBuffer = await kintoneAPI.downloadFile(fileKey)
  return arrayBuffer
}

// 設定kintone資料到pdf中，並保存
const set_kitoneDataOnPDF = async () => {
  // 1.取的kintone record資料
  const event = kintone.app.record.get()
  // 2.下載PDF模板
  const pdfArrayBuffer = await getPDF_File(event)
  // 3.下載簽名檔
  const signArrayBuffer = await getSign_File(event)
  if (!pdfArrayBuffer) {
    throw new Error('附件中無檔案，請上傳pdf附件後重新嘗試')
  }
  // 使用 pdf-lib 讀取PDF模板
  const pdfDoc = await PDFDocument.load(pdfArrayBuffer)
  // 建立 pdf-lib 字體(本身不支援中文、日文、韓文 等) 將Fontkit庫註冊到PDF-lib中
  pdfDoc.registerFontkit(fontkit)

  // 加载自定義字體
  const fontBytes = await fetch(Constants.fontUrl).then((res) => res.arrayBuffer())
  // 將字體嵌入到 pdfDoc 對象中
  const customFont = await pdfDoc.embedFont(fontBytes)

  // 取得pdf表、欄位(PDF檔案必須為經過扁平化)
  const form = pdfDoc.getForm() // 獲取表單
  const fields = form.getFields() // 獲取字段(包含label、按鈕等等)
  // 將獲取到的動態欄位循環(前提:欄位的name和kintone的欄位代碼一致)
  fields.forEach((field) => {
    const name = field.getName()
    const targetField = event.record[name]
    if (targetField && targetField.value && targetField.value.length > 0 && field instanceof PDFTextField) {
      const textField = form.getTextField(name) // 只獲取文本字段
      const value = targetField.type === 'USER_SELECT' ? targetField.value[0].name : targetField.value
      textField.setText(value)
      textField.setFontSize(9)
      textField.updateAppearances(customFont)
    }
  })
  // PDF加上簽名(不是取得PDF元素的方式添加，而是直接壓在指定的X,Y上)
  if (signArrayBuffer) {
    const pngImage = await pdfDoc.embedPng(signArrayBuffer)
    const page = pdfDoc.getPage(0)
    const pngDims = pngImage.scale(0.4)
    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - pngDims.width / 2 + 180,
      y: page.getHeight() / 2 - pngDims.height + 230,
      width: pngDims.width,
      height: pngDims.height,
    })
  }
  // pdf扁平化(不可逆，將不可再操作動態欄位數據)
  form.flatten()
  // 將更新後的檔案保存後轉url
  const pdfBytes = await pdfDoc.save() // 將PDF文檔保存為二進制數據
  // 創建PDF文檔二進制數據的URL
  const href = URL.createObjectURL(
    new Blob([pdfBytes], {
      type: 'application/pdf',
    }),
  )
  return href
}

export { set_kitoneDataOnPDF }
