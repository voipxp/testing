import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceType', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupDeviceTypeService', 'Route', '$location']
function controller(Alert, GroupDeviceTypeService, Route, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.back = back

  function onInit() {
    ctrl.deviceType = $location.search().deviceType
    ctrl.loading = true
    loadDevice()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDevice() {
    return GroupDeviceTypeService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType
    ).then(function(data) {
      ctrl.device = data
    })
  }

  function back() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'deviceTypes')
  }
}
