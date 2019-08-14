import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('selectServiceProvider', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = ['Alert', 'ServiceProviderService', 'EventEmitter', 'HashService', '$scope']
function controller(Alert, ServiceProviderService, EventEmitter, HashService, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.loading = true
    Alert.modal.open(ctrl.modalId)
    loadServiceProviders()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadServiceProviders() {
    return ServiceProviderService.index().then(function(data) {
      ctrl.serviceProviders = data
    })
  }

  function select(serviceProvider) {
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ serviceProviderId: serviceProvider.serviceProviderId }))
  }

  $scope.$on('selectServiceProvider:load', function(event, data) {
    ctrl.filter = data
    open()
  })
}
