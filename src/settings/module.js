import angular from 'angular'
import routes from './routes'

angular
  .module('odin.settings', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
