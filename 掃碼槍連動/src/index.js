import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'

const App = function () {
  return (
    <div className="app">
      <h1>Hello, kintone!</h1>
    </div>
  )
}

kintone.events.on('app.record.index.show', (event) => {
  ReactDOM.render(<App />, kintone.app.getHeaderSpaceElement())
  return event
})
