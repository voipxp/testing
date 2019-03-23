/* globals process */

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
import routes from './routes'
import * as config from './config'

// MODULES
import '../common'
import '../system'
import '../UI'

angular
  .module('odin.app', [
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
    'odin.system',
    'odin.UI'
  ])
  .constant('APP', {
    apiURL: process.env.API_URL || '/',
    loginURL: '/login',
    sessionKey: 'odin:session'
  })
  .config(routes)
  .config(config.locationConfig)
  .config(config.httpSyncConfig)
  .config(config.deleteHttpConfig)
  .config(config.authInterceptorConfig)
  .config(config.jwtInterceptorConfig)
  .config(config.cacheFactoryConfig)
  .config(config.idleConfig)
  .run([
    '$rootScope',
    function($rootScope) {
      $rootScope.apiURL = process.env.API_URL || '/'
    }
  ])

// 'odin.config',
// 'odin.UI',
// 'odin.branding',
// 'odin.bulk',
// 'odin.events',
// 'odin.group',
// 'odin.serviceProvider',
// 'odin.settings',
// 'odin.system',
// 'odin.tasks',
// 'odin.user',
// 'odin.vdm',

// import 'sugar-date'
// import 'mustache'
// import 'clipboard'
// import 'chart.js'
// import 'angular-chart.js'
// import 'rrule'
// import 'checklist-model'
// import 'marked'
// import 'angular-marked'
// import 'socket.io-client'
// import '@microsoft/teams-js'
