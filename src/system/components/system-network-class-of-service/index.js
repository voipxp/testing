import angular from 'angular'
import template from './index.html'

angular
  .module('odin.system')
  .component('systemNetworkClassOfService', { template, controller })

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.name = $routeParams.name
  ctrl.back = back

  function back() {
    Route.open('system', 'networkClassOfServices')
  }
}
