import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { Router } from 'wouter'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
