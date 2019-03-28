import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderDevices', { template, controller })

controller.$inject = ['$routeParams']
function controller($routeParams) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
}
