import { setUI } from './setUI'

const mainProcess = (event) => {
  console.log(event)
  setUI()
}

kintone.events.on(['app.record.index.show'], mainProcess)
