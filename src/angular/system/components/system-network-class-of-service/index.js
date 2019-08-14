import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemNetworkClassOfService', { template, controller })

controller.$inject = ['$location', 'Route']
function controller($location, Route) {
  var ctrl = this
  ctrl.back = back
  ctrl.$onInit = function() {
    ctrl.name = $location.search().name
  }

  function back() {
    Route.open('system', 'networkClassOfServices')
  }
}
