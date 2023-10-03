/* eslint-disable import/prefer-default-export */
import kintoneAPI from './reference/kintoneAPI'
import Constant from './reference/constant'

const getOptions = async (itemsCode) => {
  if (itemsCode !== '') {
    const query = `料號_forAPI = "${itemsCode}" order by $id asc`
    const resp = await kintoneAPI.getRecords(Constant.PRODUCT_OPTION_APPID, query)
    const options = resp.records.map((record) => {
      const { 商品名: orgProduct } = record
      return { label: orgProduct.value, value: orgProduct.value }
    }, [])
    return options
  }
  return []
}

export { getOptions }
