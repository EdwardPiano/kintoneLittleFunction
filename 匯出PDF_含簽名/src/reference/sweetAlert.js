import Swal from 'sweetalert2'

export default class SweetAlert {
  static showNotice = (icon, title, text) => {
    Swal.fire(title, text, icon)
  }

  static showConfirm = async (icon, title, text) => {
    const result = await Swal.fire({
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '確認',
      denyButtonText: `取消`,
    })
    return result.isConfirmed
  }

  static showLoading = () => {
    Swal.fire({
      title: 'PDF產生中...',
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  static sweetAlertClose = () => {
    Swal.close()
  }
}
