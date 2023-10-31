/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unreachable */
import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from '../Component/Header/Header'

const App = function () {
  return (
    <div className="app">
      <Header />
    </div>
  )
}

kintone.events.on('app.record.index.show', (event) => {
  const container = kintone.app.getHeaderMenuSpaceElement()
  const root = createRoot(container)
  root.render(<App />)
  return event
})
