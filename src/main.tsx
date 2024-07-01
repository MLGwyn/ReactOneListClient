import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { Router } from 'wouter'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
