import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderGroupsIndex', {
  template,
  bindings: { serviceProviderId: '<' }
})
