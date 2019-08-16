import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemNetworkClassOfServiceUsage', {
  template,
  controller,
  bindings: { name: '<' }
})

controller.$inject = ['Alert', 'SystemNetworkClassOfServiceService', 'Route']
function controller(Alert, SystemNetworkClassOfServiceService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.loading = true
    loadUsage()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadUsage() {
    return SystemNetworkClassOfServiceService.usage(ctrl.name).then(function(data) {
      ctrl.usage = data
    })
  }

  function open(serviceProvider) {
    Route.open('serviceProviders', serviceProvider.serviceProviderId)
  }
}
