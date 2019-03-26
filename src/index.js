// DEPS
import angular from 'angular'
import 'angular-animate'
import 'angular-cache'
import 'angular-chart.js'
import 'angular-color-picker'
import 'angular-color-picker/angular-color-picker.css'
import 'angular-jwt'
import 'angular-route'
import 'angular-sanitize'
import 'angular-truncate-2'
import 'animate.css/animate.css'
import 'ng-idle'
import './index.css'
import './index.scss'

// MODULES
import './app'
import './branding'
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
    'odin.common',
    'odin.app',
    'odin.branding',
    'odin.system',
    'odin.UI'
  ])
  .config(routes)
  .config(config.locationConfig)
  .config(config.httpSyncConfig)
  .config(config.deleteHttpConfig)
  .config(config.authInterceptorConfig)
  .config(config.jwtInterceptorConfig)
  .config(config.cacheFactoryConfig)
  .config(config.idleConfig)
  .run(config.rootScope)

angular
  .element(document.getElementById('odin'))
  .ready(() => angular.bootstrap(document, ['odin']))
