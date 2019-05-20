import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/components/app'
import { store, loadInitialState } from '@/store'
import { ReduxProvider } from 'reactive-react-redux'
import { HashRouter } from 'react-router-dom'
import api from '@/api'
import { clearSession } from '@/store/session'
import './index.scss'
import 'animate.css/animate.css'
import './angular'

api.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 401 || error.status === 403) {
      store.dispatch(clearSession())
    }
    return Promise.reject(error)
  }
)

const Root = hot(() => (
  <ReduxProvider store={store}>
    <HashRouter hashType="hashbang">
      <App />
    </HashRouter>
  </ReduxProvider>
))

ReactDOM.render(<Root />, document.querySelector('#root'))

loadInitialState()
