/* eslint-disable no-param-reassign */
import Swal from 'sweetalert2'
import constant from './constant'

// 獲取目標審核人userCode
const getTargetUserCode = (event) => {
  const { record } = event // 按鈕執行前的狀態
  const status = record['狀態'].value

  const targetStatus = constant.processStatus.filter((element) => {
    if (element.nextStatus === status) {
      return element
    }
  })
  // 若沒有配對的則返回null
  if (targetStatus.length <= 0) {
    return null
  }
  // length應該為1
  return targetStatus[0]
}

// 獲取fileKey(獲取印章的檔案key)
const getUserStampKey = async (userCode) => {
  const resp = await constant.client.record.getRecords({
    app: constant.stampMasterAppId,
    query: `員工姓名 in("${userCode}")`,
    totalCount: true,
  })
  if (Number(resp.totalCount) <= 0) {
    return null
  }
  const { name, fileKey: downloadFileKey } = resp.records[0].stamp.value[0]
  const parts = name.split('.')
  const fileExtension = parts[parts.length - 1]
  const buffer = await constant.client.file.downloadFile({
    fileKey: downloadFileKey,
  })
  const fileObj = {
    name: `印章.${fileExtension}`,
    data: buffer,
  }
  const { fileKey } = await constant.client.file.uploadFile({
    file: fileObj,
  })
  return fileKey
}

const updateStamp = async (stampFieldCode, fileKey) => {
  const params = {
    app: kintone.app.getId(),
    id: kintone.app.record.getId(),
    record: {
      [stampFieldCode]: {
        value: [
          {
            fileKey,
          },
        ],
      },
    },
  }
  await constant.client.record.updateRecord(params)
}

// 審核事件
const processStart = async (event) => {
  try {
    const { record } = event
    //  獲取目標審核人userCode
    const targetStatus = getTargetUserCode(event)
    // 確認是否有匹配的狀態
    if (targetStatus) {
      const { targetFieldCode, stampFieldCode } = targetStatus
      const stampAlreadyUpload = record[stampFieldCode].value.length > 0
      // 沒有審核人，返回
      if (record[targetFieldCode].value.length <= 0 || stampAlreadyUpload) {
        return event
      }
      // 有審核人
      const userCode = record[targetFieldCode].value[0].code
      // 獲取印章圖片fileKey
      const fileKey = await getUserStampKey(userCode)
      if (!fileKey) {
        throw new Error('印章圖檔不存在')
      }

      record[stampFieldCode].value = [
        {
          fileKey,
        },
      ]
      await updateStamp(stampFieldCode, fileKey)
      window.location.reload()
    }
  } catch (err) {
    console.log(err.message)
    Swal.fire('警告', err.message, 'warning')
  }
  return event
}

kintone.events.on(['app.record.detail.show'], processStart)
