/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { Table, Text, DatePicker, Dropdown } from 'kintone-ui-component'
import '../css/index.css'

const setMergeTable = () => {
  const renderBsTrip = (cellData, rowIndex) => {
    console.log('rowIndex', rowIndex)
    const text = new Text({
      label: '單號',
      value: '',
      textAlign: 'left',
      className: 'options-class',
      id: 'options-id',
      disabled: false,
    })
    text.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        console.log(text.value)
      }
    })
    return text
  }

  const renderCountry = (cellData) => {
    const renderSubTable = (cellDataSubTable) => {
      const dropdown = new Dropdown({
        items: [
          { label: 'Japan', value: 'japan' },
          { label: 'Viet Nam', value: 'vietnam' },
        ],
        value: cellDataSubTable,
      })
      return dropdown
    }

    const columnsSubTable = [
      {
        title: 'Sub Table',
        field: 'dropdown',
        render: renderSubTable,
      },
    ]

    const dataSubTable = []
    for (let i = 0; i < cellData.split(',').length; i++) {
      dataSubTable.push({ dropdown: cellData.split(',')[i] })
    }
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
      field: 'BsTrip',
      render: renderBsTrip,
    },
    {
      title: 'Country',
      field: 'country',
      render: renderCountry,
    },
  ]

  const data = [
    {
      country: 'japan',
    },
  ]

  const table = new Table({ columns, data })
  // table.addEventListener('change', (event) => {
  //   console.log(event)
  // })
  const mergeTableSpace = kintone.app.record.getSpaceElement('cusTableSpace')
  if (!mergeTableSpace) {
    return
  }
  mergeTableSpace.appendChild(table)
}
kintone.events.on(['app.record.edit.show'], setMergeTable)
