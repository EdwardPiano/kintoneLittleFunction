/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
// import * as SignaturePad from 'signature_pad'
import Constants from './constants'

const signCommit = (signData, imageData, sp) => {
  // 限制签名
  if (sp.points.length === 0) {
    alert('簽名為空無法保存！')
    return
  }

  const data = sp.toDataURL()
  const png = new Image()
  png.src = data

  const bin = window.atob(png.src.split('base64,')[1])
  const len = bin.length
  const barr = new window.Uint8Array(len)

  let i = 0
  while (i < len) {
    barr[i] = bin.charCodeAt(i)
    i++
  }
  const blob = new Blob([barr.buffer])

  const xmlhttp = new XMLHttpRequest()

  xmlhttp.open('POST', '/k/v1/file.json')
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      const record = {}
      record.signData = {
        value: sp.toDataURL(),
      }
      record.signImage = {
        value: [
          {
            fileKey: JSON.parse(this.responseText).fileKey,
          },
        ],
      }

      kintone.api(
        '/k/v1/record',
        'PUT',
        {
          app: kintone.app.getId(),
          id: kintone.app.record.getId(),
          record,
        },
        function () {
          alert('簽收完成')
          document.location.reload()
        },
        function (resp) {
          alert(JSON.stringify(resp))
        },
      )
    }
  }

  xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  const formData = new FormData()
  formData.append('__REQUEST_TOKEN__', kintone.getRequestToken())
  formData.append('file', blob, 'canvas.png')

  xmlhttp.send(formData)
}

/* eslint-disable radix */
function makeSignarea(record, signarea, buttonarea, signspace, signature, signdata, signimage) {
  let sp = null
  // sign area
  if ($(signarea).size() === 0) {
    const elSpace = kintone.app.record.getSpaceElement(signspace)
    const elSignature = document.createElement('canvas')
    $(elSignature).attr({ id: signature, name: signature })

    // const width = `${parseInt(document.body.clientWidth) * 0.7}px`
    // const height = `${elSpace.offsetParent.clientHeight}px`
    elSignature.setAttribute('style', `position: absolute; border: solid 5px #FF9912; width: 300px; height:130px`)

    elSpace.appendChild(elSignature)

    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    elSignature.width = elSignature.offsetWidth * ratio
    elSignature.height = elSignature.offsetHeight * ratio

    console.log(elSignature.offsetWidth)

    const ctx = elSignature.getContext('2d')
    ctx.scale(ratio, ratio)
    const img = new Image()
    img.src = 'canvas.gif'
    ctx.drawImage(img, 0, 0)

    sp = new SignaturePad(elSignature, Constants.options)
    sp.fromDataURL(record[signdata].value)
  }
  if ($(buttonarea).size() === 0) {
    const elSpace = kintone.app.record.getSpaceElement(Constants.BUTTON_SPACE)
    let btnEl = document.createElement('button')

    $(btnEl).attr({ id: 'saveButton' })
    $(btnEl).text('確認')
    $(btnEl).css({
      width: '100px',
      height: '40px',
      padding: '8px 0 8px 0',
      color: '#000000',
    })
    $(btnEl).click(function () {
      signCommit(signdata, signimage, sp)
    })
    elSpace.appendChild(btnEl)

    btnEl = document.createElement('button')

    $(btnEl).attr({ id: 'clearButton' })
    $(btnEl).text('清除')
    $(btnEl).css({
      width: '100px',
      height: '40px',
      padding: '8px 0 8px 0',
      color: '#000000',
    })
    $(btnEl).click(function () {
      if (sp) {
        if (!sp.isEmpty()) {
          sp.clear()
        }
      }
    })
    elSpace.appendChild(btnEl)
  }
}

const detailShow = (event) => {
  const { record } = event
  if (record.signImage.value.length === 0) {
    makeSignarea(
      record,
      '#signature',
      'saveButton',
      Constants.SIGN_SPACE,
      'signature',
      Constants.SIGN_DATA,
      Constants.SIGN_IMAGE,
    )
  }
  return event
}

kintone.events.on(['app.record.detail.show'], detailShow)
