/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { Table, Text, TextArea, DatePicker, Dropdown } from 'kintone-ui-component'
import '../css/index.css'
import { createLookupWindow } from './createUI'

const setMergeTable = () => {
  // 模板
  const renderText = (cellData, disabled, keydownEvent) => {
    const text = new Text({
      value: cellData,
      textAlign: 'left',
      className: 'options-class',
      id: 'kuc_text',
      disabled,
    })
    if (keydownEvent) {
      text.addEventListener('keydown', keydownEvent)
    }

    return text
  }

  const renderDropdown = (items) => {
    const dropdown = new Dropdown({
      items,
      className: 'options-class',
      id: 'kuc_dropdown',
      visible: true,
      disabled: false,
    })
    return dropdown
  }
  // 實際欄位
  const renderPreApForm = (cellData) => {
    return renderText(cellData, false, (event) => {
      if (event.key === 'Enter') {
        const td = event.target.closest('td')
        const { rowIndex } = td.parentNode // 获取行位置
        const { cellIndex } = td
        console.log(`Row: ${rowIndex}, Cell: ${cellIndex}`)
        console.log(event.target.value)
        createLookupWindow()
      }
    })
  }

  const renderEstTotalCost = (cellData) => {
    return renderText(cellData, true)
  }

  const renderTotalAmountPaid = (cellData) => {
    return renderText(cellData, true)
  }

  const renderTotalApFee = (cellData) => {
    return renderText(cellData, true)
  }

  const renderReasonCost = (cellData) => {
    const textarea = new TextArea({
      className: 'options-class',
      id: 'options-id',
      visible: true,
      disabled: false,
    })
    return textarea
  }

  const renderInnerTable = (cellData) => {
    const renderDateExpenseIncurred = () => {
      const datePicker = new DatePicker({
        language: 'auto',
        className: 'options-class',
        id: 'options-id',
        visible: true,
        disabled: false,
      })
      return datePicker
    }

    const renderOptions = () => {
      return renderDropdown([
        { label: '交通', value: '交通' },
        { label: '住宿', value: '住宿' },
        { label: '每日津貼', value: '每日津貼' },
        { label: '雜費', value: '雜費' },
      ])
    }

    const renderCurrency = () => {
      return renderDropdown([
        { label: 'NTD', value: 'NTD' },
        { label: 'USD', value: 'USD' },
        { label: 'JPY', value: 'JPY' },
        { label: 'EUR', value: 'EUR' },
      ])
    }

    const renderOrgCurrency = (cellData) => {
      return renderText(cellData, false)
    }

    const renderExchangeRate = (cellData) => {
      return renderText(cellData, false)
    }

    const renderTaiwanDollars = (cellData) => {
      return renderText(cellData, true)
    }

    const columnsSubTable = [
      {
        title: '費用發生日期',
        field: 'DateExpenseIncurred',
        render: renderDateExpenseIncurred,
      },
      {
        title: '項目',
        field: 'Options',
        render: renderOptions,
      },
      {
        title: '幣值',
        field: 'Currency',
        render: renderCurrency,
      },
      {
        title: '原幣金額',
        field: 'OrgCurrency',
        render: renderOrgCurrency,
      },
      {
        title: '匯率',
        field: 'ExchangeRate',
        render: renderExchangeRate,
      },
      {
        title: '台幣金額',
        field: 'TaiwanDollars',
        render: renderTaiwanDollars,
      },
    ]

    const dataSubTable = [
      {
        TaiwanDollars: '10000',
      },
      {
        TaiwanDollars: '30000',
      },
    ]
    // for (let i = 0; i < cellData.split(',').length; i++) {
    //   dataSubTable.push({ dropdown: cellData.split(',')[i] })
    // }
    const subTable = new Table({
      columns: columnsSubTable,
      data: dataSubTable,
    })
    subTable.addEventListener('change', (subTableEvent) => {
      const _dataSubTable = subTableEvent.detail.data
      let countries = ''
      for (let i = 0; i < _dataSubTable.length; i++) {
        countries += _dataSubTable[i].dropdown
        if (i !== _dataSubTable.length - 1) {
          countries += ','
        }
      }
      subTableEvent.detail.value = countries
    })
    return subTable
  }

  const columns = [
    {
      title: '事前申請單',
      field: 'PreApForm',
      render: renderPreApForm,
    },
    {
      title: '預估費用總計',
      field: 'EstTotalCost',
      render: renderEstTotalCost,
    },
    {
      title: '已付費用總計',
      field: 'TotalAmountPaid',
      render: renderTotalAmountPaid,
    },
    {
      title: '申請費用總計',
      field: 'TotalApFee',
      render: renderTotalApFee,
    },
    {
      title: '費用超支原因',
      field: 'ReasonCost',
      render: renderReasonCost,
    },
    {
      title: '詳細',
      field: 'Detail',
      render: renderInnerTable,
    },
  ]

  const data = [
    {
      PreApForm: '17',
      EstTotalCost: '7334',
      TotalAmountPaid: '5334',
      TotalApFee: '40000',
      Detail: '',
    },
  ]

  const table = new Table({ columns, data })
  const mergeTableSpace = kintone.app.record.getSpaceElement('cusTableSpace')
  if (!mergeTableSpace) {
    return
  }
  mergeTableSpace.appendChild(table)
}
kintone.events.on(['app.record.edit.show'], setMergeTable)
