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
import 'checklist-model'
import 'ng-idle'
import './index.css'
import './index.scss'

// LIBS
import './common/lib/date'

// MODULES
import './api'
import './app'
import './branding'
import './bulk'
import './common'
import './events'
import './group'
import './service-provider'
import './settings'
import './system'
import './ui'
import './user'
import './vdm'

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
    'checklist-model',
    'truncate',
    'chart.js',
    'odin.api',
    'odin.common',
    'odin.app',
    'odin.branding',
    'odin.bulk',
    'odin.events',
    'odin.group',
    'odin.serviceProvider',
    'odin.settings',
    'odin.system',
    'odin.ui',
    'odin.user',
    'odin.vdm'
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
  .element(document.querySelector('#odin'))
  .ready(() => angular.bootstrap(document, ['odin'], { strictDi: true }))
