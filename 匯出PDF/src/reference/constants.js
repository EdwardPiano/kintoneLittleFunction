/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export default class Constants {
  static fontUrl = 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/Mono/NotoSansMonoCJKtc-Regular.otf'

  static PDF_APPID = 1835

  static PDF_TOKEN = 'L6yebmNIct2o8dfPkWai3QrKomLWJOb0OuAUEFwC'

  static PDF_TEMP_APPID = 1842

  static PDF_TEMP_TOKEN = '90FomCj6dnrA86WaKckT0HuJz0ynmgaKXiqkQIfW'

  static PDF_TEMP_FILECODE = '模板附件'

  static PDF_TEMP_NAMECODE = '模板名稱'

  static PDF_TEMP_TARGET_NAME = '報價單'

  static formatObject = (obj) => {
    let result = ''
    for (const key in obj) {
      let { value } = obj[key]
      if (!isNaN(value)) {
        value = Number(value).toLocaleString()
      }
      result += value.padEnd(14, ' ')
      // if (obj.hasOwnProperty(key) && obj[key].value !== '') {
      //   console.log(key)

      // }
    }
    return `${result.trim()}\n`
  }
}
