import angular from 'angular'
import routes from './routes'

angular
  .module('odin.branding', [])
  .config(['PbsRouteProvider', P => P.set(routes)])
