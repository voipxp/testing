import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceTypes', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupDeviceTypeService', 'Route']
function controller(Alert, GroupDeviceTypeService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.loading = true
    loadDevices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDevices() {
    return GroupDeviceTypeService.index(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.devices = data
    })
  }

  function open(deviceType) {
    if (deviceType) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'deviceTypes',
        'deviceType'
      ).search({ deviceType })
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'deviceTypes')
    }
  }
}
