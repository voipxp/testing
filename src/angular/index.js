import { setInjector } from './injector'

// DEPS
import angular from 'angular'
import 'angular-animate'
import 'angular-chart.js'
import 'angular-color-picker'
import 'angular-color-picker/angular-color-picker.css'
import 'angular-jwt'
import 'angular-sanitize'
import 'angular-truncate-2'
import 'checklist-model'

// CSS
import './index.css'

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
import * as config from './config'

angular
  .module('odin', [
    'ngAnimate',
    'ngSanitize',
    'angular-jwt',
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
  .config(config.locationConfig)
  .config(config.httpSyncConfig)
  .config(config.deleteHttpConfig)
  .config(config.authInterceptorConfig)
  .config(config.jwtInterceptorConfig)
  .run(config.rootScope)
  .run(['$injector', i => setInjector(i)])

angular
  .element(document.querySelector('#odin'))
  .ready(() => angular.bootstrap(document, ['odin'], { strictDi: true }))
