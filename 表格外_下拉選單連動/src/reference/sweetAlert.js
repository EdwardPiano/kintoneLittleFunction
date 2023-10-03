/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2'

export default class SweetAlert {
  // 顯示loading
  static showLoading = (title, text) => {
    Swal.fire({
      title,
      text,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  // 提示
  static showNotice = async (icon, title, text) => {
    const resp = Swal.fire({
      icon,
      title,
      text,
    })
    return resp
  }

  // 確認/取消
  static showConfirm = async (title, text, icon) => {
    const resp = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確認',
    })
    return resp.isConfirmed
  }

  // 關閉
  static closeAlert = () => {
    Swal.close()
  }
}
