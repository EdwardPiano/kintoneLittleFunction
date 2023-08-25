import { setUI } from './UISetting'

const mainProcess = () => {
  setUI()
}
kintone.events.on(['app.record.index.show'], mainProcess)
