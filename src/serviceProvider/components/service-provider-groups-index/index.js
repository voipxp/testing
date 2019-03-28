import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderGroupsIndex', { template, controller })

controller.$inject = ['$routeParams']
function controller($routeParams) {
  this.serviceProviderId = $routeParams.serviceProviderId
}
