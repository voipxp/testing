import angular from 'angular'
import routes from './routes'

angular
  .module('odin.serviceProvider', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
