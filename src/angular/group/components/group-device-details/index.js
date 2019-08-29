import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceDetails', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', deviceName: '<' }
})

controller.$inject = ['Alert', 'Route', 'GroupDeviceService', '$scope', 'Module']
function controller(Alert, Route, GroupDeviceService, $scope, Module) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.onUpdate = onUpdate
  ctrl.onDelete = onDelete

  function onInit() {
    ctrl.loading = true
    ctrl.canDelete = Module.delete('Provisioning')
    ctrl.canUpdate = Module.update('Provisioning')
    loadDevice()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadDevice() {
    return GroupDeviceService.show(ctrl.serviceProviderId, ctrl.groupId, ctrl.deviceName).then(
      data => {
        ctrl.device = data
      }
    )
  }

  function edit() {
    $scope.$broadcast('deviceUpdate:load', {
      deviceName: ctrl.device.deviceName,
      deviceLevel: ctrl.device.deviceLevel,
      canDelete: ctrl.canDelete
    })
  }

  function onUpdate($event) {
    ctrl.device = $event.device
    loadDevice()
  }

  function onDelete() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'devices')
  }
}
