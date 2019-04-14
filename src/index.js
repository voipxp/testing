import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'why-did-you-update-redux'

import App from './components/app'
import store from './store'
import { Provider } from 'react-redux'
import './index.scss'
import './angular'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="hashbang">
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
)
