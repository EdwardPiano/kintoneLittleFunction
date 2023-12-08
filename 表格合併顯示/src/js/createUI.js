/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
import { Grid } from 'ag-grid-community'
import '../css/index.css'

const createLookupWindow = () => {
  // 建立一個新的 div 元素
  // const popupwindowSpace = kintone.app.record.getSpaceElement('popupwindowSpace')
  const eGrid = document.createElement('div')
  eGrid.setAttribute('id', 'myGrid')
  eGrid.setAttribute('class', 'ag-theme-alpine')
  eGrid.style.height = '600px'
  eGrid.style.width = '600px'
  // popupwindowSpace.appendChild(eGrid)

  // function onSelectionChanged() {
  //   const selectedRows = gridOptions.api.getSelectedRows()
  //   console.log(selectedRows)
  // }

  const columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
  ]

  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]

  const gridOptions = {
    columnDefs,
    rowData,
    rowSelection: 'single',
    onSelectionChanged() {
      const selectedRows = gridOptions.api.getSelectedRows()
      console.log(selectedRows)
    },
  }

  // 建立對話視窗
  const dialog = document.createElement('div')
  dialog.id = 'myDialog'
  dialog.style.position = 'fixed'
  dialog.style.top = '50%'
  dialog.style.left = '50%'
  dialog.style.transform = 'translate(-50%, -50%)'
  dialog.style.backgroundColor = 'white'
  dialog.style.padding = '20px'
  dialog.style.borderRadius = '10px'
  dialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'
  dialog.style.display = 'none' // 這行會讓對話框一開始是隱藏的

  // 在對話框最上方加入一段文字
  const text = document.createElement('p')
  text.textContent = '選擇出差申請單'
  dialog.appendChild(text)

  new Grid(eGrid, gridOptions)
  // 在對話框中建立一個 div
  dialog.appendChild(eGrid)

  // 在對話框最下方加入兩個按鈕
  // 建立按鈕容器
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'button-container'
  dialog.appendChild(buttonContainer)

  // 在對話框最下方加入兩個按鈕
  const confirmButton = document.createElement('button')
  confirmButton.textContent = '確認'
  confirmButton.className = 'confirm'
  buttonContainer.appendChild(confirmButton)

  const cancelButton = document.createElement('button')
  cancelButton.textContent = '取消'
  cancelButton.className = 'cancel'
  buttonContainer.appendChild(cancelButton)

  // 將對話框加入到 body 中
  document.body.appendChild(dialog)

  // 在某個時刻顯示對話框
  dialog.style.display = 'block'
}

export { createLookupWindow }
