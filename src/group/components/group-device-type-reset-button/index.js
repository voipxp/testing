import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceTypeResetButton', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceType: '<'
  }
})

controller.$inject = ['Alert', 'GroupDeviceTypeService']
function controller(Alert, GroupDeviceTypeService) {
  var ctrl = this
  ctrl.rebuild = rebuild
  ctrl.reset = reset
  ctrl.both = both

  function rebuild() {
    confirm('Rebuild')
      .then(function() {
        Alert.spinner.open()
      })
      .then(rebuildDevice)
      .then(function() {
        sendUpdate('Rebuild')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function reset() {
    confirm('Reset')
      .then(function() {
        Alert.spinner.open()
      })
      .then(resetDevice)
      .then(function() {
        sendUpdate('Reset')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function both() {
    confirm('Rebuild and Reset')
      .then(function() {
        Alert.spinner.open()
      })
      .then(rebuildDevice)
      .then(resetDevice)
      .then(function() {
        sendUpdate('Rebuild and Reset')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function confirm(type) {
    return Alert.confirm.open(
      'Are you sure you want to ' + type + ' this device type?'
    )
  }

  function sendUpdate(message) {
    Alert.notify.success(message + ' command sent to device')
    ctrl.isActive = false
  }

  function rebuildDevice() {
    return GroupDeviceTypeService.rebuild(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType
    )
  }

  function resetDevice() {
    return GroupDeviceTypeService.reset(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType
    )
  }
}
