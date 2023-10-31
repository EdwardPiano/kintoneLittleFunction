import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Input, notification } from 'antd'
import kintoneAPI from '../../reference/kintoneAPI'
import Constants from '../../reference/constants'

// 初始資料
const initialData = [
  {
    key: '1',
    code: '',
    name: '',
    location: '',
    status: '',
  },
]

// 設備掃描顯示table
function EquipmentTable() {
  const [data, setData] = useState(initialData) // 需呈現的數據
  const [nextKey, setNextKey] = useState(2) // 每一行的key(因為初始資料已經有1了，所以從2開始)
  const [focusLastRow, setFocusLastRow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // 當前表格顯示哪頁(預設從第一頁開始)
  const inputRef = useRef(null) // 鼠標focus

  // 監聽data變化，如果有變化，就將滑鼠指定到追加的那行
  useEffect(() => {
    if (focusLastRow && inputRef.current) {
      inputRef.current.focus()
      // 以防修改input也執行所以設定setFocusLastRow為false
      setFocusLastRow(false)
    }
  }, [focusLastRow, data])

  // 處理input change事件
  const handleCodeChange = (e, record) => {
    const newData = [...data]
    const index = newData.findIndex((item) => record.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, code: e.target.value })
    setData(newData)
  }

  // 處理新增行(按Enter)
  const handlePressEnter = async (record) => {
    try {
      // 搜尋此設備的資訊，並帶入表格中，不存在時報錯
      const query = `設備代碼 = "${record.code}"`
      const resp = await kintoneAPI.getRecords(Constants.SCANNERGUN_APPID, query)

      if (resp.totalCount === '0') {
        throw new Error(`設備代碼[${record.code}]不存在，請重新確認。`)
      }
      const newData = [...data] // 取得當前data，為了避免直接修改，所以重新附值
      const index = newData.findIndex((item) => record.key === item.key)
      const { 設備代碼: code, 設備名稱: name, 設備位置: location, 設備狀態: status } = resp.records[0]
      const newItem = {
        code: code.value,
        name: name.value,
        location: location.value,
        status: status.value,
      }
      // 先刪掉此筆，並重新新增
      newData.splice(index, 1, { ...record, ...newItem })
      setData([
        ...newData,
        {
          key: `${nextKey}`,
          code: '',
          name: '',
          location: '',
          status: '',
        },
      ])
      setCurrentPage(Math.ceil((data.length + 1) / 5))
      setNextKey(nextKey + 1)
      setFocusLastRow(true)
    } catch (error) {
      notification.error({
        message: '發生錯誤',
        description: error.message,
        placement: 'bottomRight',
        duration: null,
      })
    }
  }

  // 處理刪除行
  const handleDelete = (key) => {
    // 獲取刪除以外的所有紀錄
    const newData = data.filter((item) => item.key !== key)
    // 重新附值
    setData(newData)
    // 調整頁數
    setCurrentPage(Math.ceil(newData.length / 5))
  }

  // 表格架構
  const columns = [
    {
      title: '設備代碼',
      dataIndex: 'code',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleCodeChange(e, record)}
          onPressEnter={() => handlePressEnter(record)}
          ref={record.key === `${nextKey - 1}` ? inputRef : null} // 最後一行加上focus
        />
      ),
    },
    {
      title: '設備名稱',
      dataIndex: 'name',
    },
    {
      title: '設備位置',
      dataIndex: 'location',
    },
    {
      title: '設備狀態',
      dataIndex: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => <Button onClick={() => handleDelete(record.key)}>刪除</Button>,
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      style={{ width: '100%' }}
      pagination={{
        current: currentPage,
        pageSize: 5,
        onChange: (page) => {
          setCurrentPage(page)
        },
      }}
    />
  )
}

export default EquipmentTable
