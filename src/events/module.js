import angular from 'angular'
import routes from './routes'

angular
  .module('odin.events', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
