/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { ReadOnlyTable } from 'kintone-ui-component'
import kintoneAPI from '../reference/kintoneAPI'
import Constant from '../reference/constants'
import '../css/style.css'

// 建立關聯紀錄清單表頭
const relatedTableColumns = () => {
  const colums = [
    {
      title: '年',
      field: 'year',
    },
    {
      title: '預算編列分類',
      field: 'budgetClass',
    },
    {
      title: '通路',
      field: 'road',
    },
    {
      title: '店櫃',
      field: 'storeCode',
    },
  ]
  for (let month = 1; month < 13; month++) {
    colums.push({
      title: `${month}月`,
      field: `_${month}month`,
    })
  }
  colums.push({
    title: `合計`,
    field: `total`,
  })
  return colums
}

// 獲取資料
const getRelatedData = async (event) => {
  const { record } = event
  const storeData = []
  const storeCode = record['店櫃代號'].value
  const salesRoad = record['通路'].value
  const query = `通路 in ("${salesRoad}") and 店櫃 in ("${storeCode}")`
  const orderby = `年 desc`
  const resp = await kintoneAPI.getAllRecords(Constant.BUDGET_APPID, query, orderby)
  // 循環取得的每筆紀錄
  resp.forEach((budgetRecord) => {
    // 獲取表格、記錄年份
    const table = budgetRecord['預算表格'].value
    const budgetYaer = budgetRecord['年'].value
    const budgetRoad = budgetRecord['通路'].value
    const budgetClass = budgetRecord['預算編列分類'].value
    // 過濾每筆資料中的table，找出同[店櫃代號]的資料
    const targetRow = table.filter((row) => {
      const {
        value: {
          店櫃: { value: storeNum },
        },
      } = row
      if (storeCode === storeNum) {
        return row.value
      }
    })
    if (targetRow.length > 0) {
      // 將年份資料加入(因為本來年在表格外)
      targetRow[0].value['年'] = { value: budgetYaer }
      targetRow[0].value['通路'] = { value: budgetRoad }
      targetRow[0].value['預算編列分類'] = { value: budgetClass }
      storeData.push(targetRow[0].value)
    }
  })

  // 將數字加上進位符
  const changeMoneyStr = (str) => {
    const number = Number(str)
    const formattedNumber = number.toLocaleString()
    return formattedNumber
  }

  // 將資料整理成[關聯紀錄清單]的格式
  const relatedTableData = storeData.map((sotreRecord) => {
    return {
      year: sotreRecord['年'].value,
      budgetClass: sotreRecord['預算編列分類'].value,
      road: sotreRecord['通路'].value,
      storeCode: sotreRecord['店櫃'].value,
      _1month: changeMoneyStr(sotreRecord['_1月'].value),
      _2month: changeMoneyStr(sotreRecord['_2月'].value),
      _3month: changeMoneyStr(sotreRecord['_3月'].value),
      _4month: changeMoneyStr(sotreRecord['_4月'].value),
      _5month: changeMoneyStr(sotreRecord['_5月'].value),
      _6month: changeMoneyStr(sotreRecord['_6月'].value),
      _7month: changeMoneyStr(sotreRecord['_7月'].value),
      _8month: changeMoneyStr(sotreRecord['_8月'].value),
      _9month: changeMoneyStr(sotreRecord['_9月'].value),
      _10month: changeMoneyStr(sotreRecord['_10月'].value),
      _11month: changeMoneyStr(sotreRecord['_11月'].value),
      _12month: changeMoneyStr(sotreRecord['_12月'].value),
      total: changeMoneyStr(sotreRecord['合計'].value),
    }
  })
  return relatedTableData
}

const setRelatedTable = async (event) => {
  try {
    const relatedTableData = await getRelatedData(event)
    const relatedTableSpace = kintone.app.record.getSpaceElement('relatedTableSpace')
    const readOnlyTable = new ReadOnlyTable({
      label: '客製化關聯紀錄清單',
      columns: relatedTableColumns(),
      data: relatedTableData,
      className: 'sample-class',
      id: 'sample-id',
      visible: true,
      pagination: true,
    })
    relatedTableSpace.appendChild(readOnlyTable)
  } catch (err) {
    event.error = err.toString()
    console.error(err)
  }
}

kintone.events.on(['app.record.edit.show', 'app.record.create.show', 'app.record.detail.show'], setRelatedTable)
