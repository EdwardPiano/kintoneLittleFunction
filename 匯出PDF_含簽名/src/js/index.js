/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */

import { Button } from 'kintone-ui-component'
import SweetAlert from '../reference/sweetAlert'
import { set_kitoneDataOnPDF } from './set_kintoneData'

// 設定匯出pdf按鈕
const setExportBtn = (event) => {
  const header = kintone.app.record.getHeaderMenuSpaceElement()

  const button = new Button({
    text: '產生PDF',
    type: 'submit',
  })
  button.addEventListener('click', async () => {
    try {
      SweetAlert.showLoading()
      // 建立pdf檔案，回傳連結
      const href = await set_kitoneDataOnPDF()
      SweetAlert.sweetAlertClose()
      // ---------查看---------
      window.open(href)
      // ---------下載---------
      // const link = document.createElement('a')
      // link.download = 'newFile.pdf'
      // link.href = URL.createObjectURL(
      //   new Blob([pdfBytes], {
      //     type: 'application/pdf',
      //   }),
      // )
      // link.click()
      // URL.revokeObjectURL(link.href)
    } catch (err) {
      SweetAlert.showNotice('error', '發生錯誤', err.toString())
    }
  })
  header.appendChild(button)
  return event
}

kintone.events.on('app.record.detail.show', setExportBtn)
