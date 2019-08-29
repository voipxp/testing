import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceResetButton', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceName: '<'
  }
})

controller.$inject = ['Alert', 'GroupDeviceService']
function controller(Alert, GroupDeviceService) {
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
      'Are you sure you want to ' + type + ' this device?'
    )
  }

  function sendUpdate(message) {
    Alert.notify.success(message + ' command sent to device')
    ctrl.isActive = false
  }

  function rebuildDevice() {
    return GroupDeviceService.rebuild(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceName
    )
  }

  function resetDevice() {
    return GroupDeviceService.reset(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceName
    )
  }
}
