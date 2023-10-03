/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import { Combobox } from 'kintone-ui-component'
import SweetAlert from './reference/sweetAlert'
import { getOptions } from './getOptions'
import { fieldsShown } from './fieldsShown'

const createComboBox = async (event) => {
  try {
    // 若combobox已存在則返回
    if (document.getElementById('productOption')) {
      return event
    }
    // 獲取放置compobox的空白欄
    let space = null
    const isMobile = event.type.includes('mobile')
    if (isMobile) {
      space = kintone.mobile.app.record.getSpaceElement('comboboxSpace')
    } else {
      space = kintone.app.record.getSpaceElement('comboboxSpace')
    }
    if (!space) {
      throw new Error('未找到空白欄位，請確認應用程式後台設定')
    }
    // 隱藏欄位
    fieldsShown(isMobile)
    // 定義
    const { record } = event
    const itemsCode = record['料號'].value || '' // 大分類
    const orgItemsCode = record['商品名'].value || '' // 小分類
    const options = await getOptions(itemsCode)

    // 獲取選項(從應用程式中抓取欄位選項)
    const combobox = new Combobox({
      label: '商品名',
      items: options,
      value: orgItemsCode,
      className: 'options-class',
      id: 'productOption',
      visible: true,
      disabled: false,
    })
    combobox.addEventListener('change', (e) => {
      const records = isMobile ? kintone.mobile.app.record.get() : kintone.app.record.get() // 獲取kintone
      records.record['商品名'].value = e.detail.value
      isMobile ? kintone.mobile.app.record.set(records) : kintone.app.record.set(records) // 附值給kintone
    })
    space.appendChild(combobox)
    // 抽取key，用於檢查當前「商品名」是否包含在「下拉選單連動Master」中
    const checkIsExistList = options.map((option) => {
      return option.value
    }, [])
    if (!checkIsExistList.includes(orgItemsCode) && orgItemsCode !== '') {
      SweetAlert.showNotice(
        'warning',
        `「${orgItemsCode}」不存在，請取消編輯或重新選擇後保存`,
        `「下拉選單連動Master」中不存在此選項「${orgItemsCode}」，請先將選項加入「下拉選單連動Master」應用程式中`,
      )
    }
  } catch (err) {
    console.error(err)
    SweetAlert.showNotice('error', '發生錯誤，請聯絡系統廠商', err)
  }
}

const setOptions = (event) => {
  const { record } = event
  const itemsCode = record['料號'].value || '' // 大分類
  record['商品名'].value = '' // 初始化kintone欄位
  getOptions(itemsCode).then((options) => {
    const combobox = document.getElementById('productOption')
    combobox.items = options
    combobox.value = '' // 初始化客製欄位
  })
  return event
}

kintone.events.on(
  ['app.record.create.show', 'app.record.edit.show', 'mobile.app.record.create.show', 'mobile.app.record.edit.show'],
  createComboBox,
)
kintone.events.on(
  [
    'app.record.create.change.料號',
    'app.record.edit.change.料號',
    'mobile.app.record.create.change.料號',
    'mobile.app.record.edit.change.料號',
  ],
  setOptions,
)
