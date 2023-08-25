import { Dropdown, Text, Button } from 'kintone-ui-component'
import { getAllTypes, getNumOfPersonData } from './kintoneAPI'
import Swal from 'sweetalert2'
import '../css/app.css'
import { setEcharts } from './serEcharts'

export const setUI = async () => {
  console.log('setUI in')
  const types = await getAllTypes()
  console.log(types)
  // 獲取空白位子
  const menuSpace = kintone.app.getHeaderMenuSpaceElement();

  // 下拉選單(選擇類型)
  const type = new Dropdown({
    label: '類型',
    items: types,
    selectedIndex: -1,
    className: 'kuc-dropdown',
    id: 'options-id',
  });

  // 文字方塊(指定圖表顯示max數量)
  const text = new Text({
    label: '統計數',
    value: '10',
    suffix: '位',
    textAlign: 'left',
    className: 'kuc-text',
    id: 'options-id',
  });

  // 下拉選單(排序依據)
  const orderby = new Dropdown({
    label: '排序依據',
    items: [
      {
        label: 'IG觸及數',
        value: 'IG觸及數'
      },
      {
        label: 'IG平均按讚數',
        value: 'IG平均按讚數'
      },
      {
        label: 'CPE',
        value: 'CPE'
      }
    ],
    selectedIndex: -1,
    className: 'kuc-dropdown',
    id: 'options-id',
  });

  // 按鈕(開始統計、顯示圖表)
  const button = new Button({
    text: '統計',
    type: 'submit',
    className: 'kuc-button',
    id: 'options-id',
  });

  menuSpace.appendChild(type);
  menuSpace.appendChild(text);
  menuSpace.appendChild(orderby);
  menuSpace.appendChild(button);

  text.addEventListener('change', event => {
    if (isNaN(parseInt(text.value)) || parseInt(text.value) > 30) {
      Swal.fire({
        icon: 'error',
        title: '輸入錯誤',
        text: '只能輸入數值，最大為30',
      })
      text.value = ''
    }
  });

  button.addEventListener('click', async () => {
    if (!text.value || !type.value || !orderby.value) {
      Swal.fire({
        icon: 'error',
        title: '未填寫完整',
        text: '請填寫完整後再嘗試',
      })
      return
    }
    const chartsData = await getNumOfPersonData(type.value, parseInt(text.value), orderby.value)
    await setEcharts(chartsData)
  });
}
