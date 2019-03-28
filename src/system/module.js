import angular from 'angular'
import routes from './routes'

angular
  .module('odin.system', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
