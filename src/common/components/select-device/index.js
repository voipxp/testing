import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectDevice', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    ngRequired: '<',
    ngModel: '='
  }
})

controller.$inject = ['Alert', 'GroupDeviceServices']
function controller(Alert, GroupDeviceService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    console.log('ctrl.ngModel', ctrl.ngModel)
    loadDevices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDevices() {
    return GroupDeviceService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.devices = data
        return data
      }
    )
  }
}
