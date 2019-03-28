import angular from 'angular'
import routes from './routes'

angular.module('odin.vdm', []).config(['PbsRouteProvider', P => P.set(routes)])
