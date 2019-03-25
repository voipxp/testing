// DEPS
import angular from 'angular'
import 'angular-animate'
import 'angular-sanitize'
import 'angular-route'
import 'angular-jwt'
import 'ng-idle'
import 'angular-cache'
import 'angular-color-picker'
import 'angular-truncate-2'
import 'angular-chart.js'
import 'angular-color-picker/angular-color-picker.css'
import 'animate.css/animate.css'
import './index.css'
import './index.scss'

// MODULES
import './app'
import './common'
import './system'
import './UI'

// CONFIGS
import routes from './routes'
import * as config from './config'

angular
  .module('odin', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ngIdle',
    'angular-jwt',
    'angular-cache',
    'mp.colorPicker',
    'truncate',
    'chart.js',
    'odin.app',
    'odin.common',
    'odin.system',
    'odin.UI'
  ])
  .constant('APP', config.app)
  .config(routes)
  .config(config.locationConfig)
  .config(config.httpSyncConfig)
  .config(config.deleteHttpConfig)
  .config(config.authInterceptorConfig)
  .config(config.jwtInterceptorConfig)
  .config(config.cacheFactoryConfig)
  .config(config.idleConfig)
  .run(config.run)

angular
  .element(document.getElementById('odin'))
  .ready(() => angular.bootstrap(document, ['odin']))
