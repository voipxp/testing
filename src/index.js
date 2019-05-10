import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { App } from '@/components/app'
import { store, loadInitialState } from '@/store'
import api from '@/api'
import { ReduxProvider } from 'reactive-react-redux'
import { clearSession } from '@/store/session'
import './index.scss'
import 'animate.css/animate.css'
import './angular'

api.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 401 || error.status === 403) {
      store.dispatch(clearSession())
      return Promise.reject(new Error('Please Login'))
    }
    return Promise.reject(error)
  }
)

loadInitialState()

ReactDOM.render(
  <ReduxProvider store={store}>
    <HashRouter hashType="hashbang">
      <App />
    </HashRouter>
  </ReduxProvider>,
  document.querySelector('#root')
)
