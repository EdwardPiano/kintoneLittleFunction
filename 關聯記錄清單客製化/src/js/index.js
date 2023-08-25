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
      storeData.push(targetRow[0].value)
    }
  })

  // 將資料整理成[關聯紀錄清單]的格式
  const relatedTableData = storeData.map((sotreRecord) => {
    return {
      year: sotreRecord['年'].value,
      road: sotreRecord['通路'].value,
      storeCode: sotreRecord['店櫃'].value,
      _1month: sotreRecord['_1月'].value,
      _2month: sotreRecord['_2月'].value,
      _3month: sotreRecord['_3月'].value,
      _4month: sotreRecord['_4月'].value,
      _5month: sotreRecord['_5月'].value,
      _6month: sotreRecord['_6月'].value,
      _7month: sotreRecord['_7月'].value,
      _8month: sotreRecord['_8月'].value,
      _9month: sotreRecord['_9月'].value,
      _10month: sotreRecord['_10月'].value,
      _11month: sotreRecord['_11月'].value,
      _12month: sotreRecord['_12月'].value,
      total: sotreRecord['合計'].value,
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
