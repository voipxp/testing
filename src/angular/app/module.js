import angular from 'angular'
import routes from './routes'

angular.module('odin.app', []).config(['PbsRouteProvider', P => P.set(routes)])
