import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectNetworkClassOfService', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    ngRequired: '<',
    ngModel: '='
  }
})

controller.$inject = ['Alert', 'GroupNetworkClassOfServiceService']
function controller(Alert, GroupNetworkClassOfServiceService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadNetworkClasses()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadNetworkClasses() {
    return GroupNetworkClassOfServiceService.show(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.services = data.services
        return data
      }
    )
  }
}
