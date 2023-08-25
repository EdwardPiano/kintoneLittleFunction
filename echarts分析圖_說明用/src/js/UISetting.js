/* eslint-disable import/prefer-default-export */
import { Button } from 'kintone-ui-component'
import { getPersonData } from './kintoneAPI'
import { setEcharts } from './setEcharts'

export const setUI = async () => {
  const menuSpace = kintone.app.getHeaderMenuSpaceElement()
  const currentDom = document.getElementById('options-id')
  if (currentDom) {
    return
  }
  // 按鈕(開始統計、顯示圖表)
  const button = new Button({
    text: '統計',
    type: 'submit',
    className: 'kuc-button',
    id: 'options-id',
  })
  menuSpace.appendChild(button)

  button.addEventListener('click', async () => {
    const chartsData = await getPersonData()
    setEcharts(chartsData)
  })
}
