import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './root'
import './style/index.scss'
import 'animate.css/animate.css'
import './angular'

ReactDOM.render(<Root />, document.querySelector('#root'))
