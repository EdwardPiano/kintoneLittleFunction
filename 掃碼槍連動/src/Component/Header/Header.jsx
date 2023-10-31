/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { ScanOutlined } from '@ant-design/icons'
import { FloatButton, Modal } from 'antd'
import EquipmentTable from '../Table/Table'
import WarehouseSelect from '../Warehouse/Warehouse'

function Header() {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)

  // 按下按鈕打開彈跳視窗
  const handleClick = () => {
    setOpen(true)
  }

  // 送出資料
  const handleSubmit = () => {
    console.log(selectedValue)
  }

  // 關閉視窗
  const handleClose = () => {
    setOpen(false)
    console.log('handleClose', open)
  }

  return (
    <>
      <FloatButton icon={<ScanOutlined />} onClick={handleClick} />
      <Modal
        title="設備位置調整"
        width={900}
        open={open}
        maskClosable={false} // 禁止點方塊以外的部分關閉視窗
        closable // 顯示關閉按鈕
        okText="確認"
        onCancel={handleClose} // 點擊關閉按鈕時關閉視窗
        onOk={handleSubmit}
      >
        <WarehouseSelect onChange={setSelectedValue} />
        <EquipmentTable />
      </Modal>
    </>
  )
}

export default Header
