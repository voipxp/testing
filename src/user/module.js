import angular from 'angular'
import routes from './routes'

angular.module('odin.user', []).config(['PbsRouteProvider', P => P.set(routes)])
