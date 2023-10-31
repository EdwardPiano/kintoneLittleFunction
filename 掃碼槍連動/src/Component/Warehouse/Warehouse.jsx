/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import kintoneAPI from '../../reference/kintoneAPI'
import Constants from '../../reference/constants'

const { Option } = Select

function WarehouseSelect({ onChange }) {
  const [options, setOptions] = useState([])
  const [selectedValue, setSelectedValue] = useState(null)

  useEffect(() => {
    async function getData() {
      const resp = await kintoneAPI.getAppFields(Constants.SCANNERGUN_APPID)
      return resp.properties
    }
    getData().then((properties) => {
      console.log(properties)
      const optionsData = Object.keys(properties[Constants.WAREHOUSE_FIELD_CODE].options).map((option) => {
        return properties[Constants.WAREHOUSE_FIELD_CODE].options[option].label
      })
      setOptions(optionsData)
    })
  }, [])

  const handleChange = (value) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <Select onChange={handleChange} value={selectedValue} placeholder="倉庫位置">
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  )
}

export default WarehouseSelect
