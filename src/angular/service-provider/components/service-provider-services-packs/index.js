import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderServicePacks', {
    template,
    bindings: { serviceProviderId: '<' }
  })
