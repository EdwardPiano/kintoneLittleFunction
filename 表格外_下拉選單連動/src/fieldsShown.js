/* eslint-disable import/prefer-default-export */
const setFieldShown = (fieldCode, isShown, isMobile) => {
  if (isMobile) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown)
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown)
  }
}

const fieldsShown = (isMobile) => {
  setFieldShown('原使用品項', false, isMobile)
}

export { fieldsShown }
