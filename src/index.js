import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/app'
import store from './store'
import { ReduxProvider } from 'reactive-react-redux'
import './index.scss'
import 'animate.css/animate.css'
import './angular'

ReactDOM.render(
  <ReduxProvider store={store}>
    <HashRouter hashType="hashbang">
      <App />
    </HashRouter>
  </ReduxProvider>,
  document.querySelector('#root')
)
