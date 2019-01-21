import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'

function App() {
  return (
    <div className={styles.App}>
      <h1>Hello Electron</h1>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
