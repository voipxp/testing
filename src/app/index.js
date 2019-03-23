import angular from 'angular'
import './module'
import './components'
import './services'

// Bootstrap app
angular
  .element(document.getElementById('odin.app'))
  .ready(() => angular.bootstrap(document, ['odin.app']))
