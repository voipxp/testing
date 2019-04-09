import angular from 'angular'
import routes from './routes'

angular
  .module('odin.group', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
