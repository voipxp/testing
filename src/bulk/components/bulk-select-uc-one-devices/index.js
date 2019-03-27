import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUcOneDevices', {
  template,
  controller,
  bindings: { devices: '<', onUpdate: '&' }
})

controller.$inject = ['EventEmitter', 'Alert', 'UcOneService']
function controller(EventEmitter, Alert, UcOneService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.next = next
  ctrl.toggle = toggle
  ctrl.isSelected = isSelected

  function onInit() {
    ctrl.loading = true
    ctrl.devices = ctrl.devices || []
    loadDevices()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function isSelected(device) {
    return _.find(ctrl.devices, { deviceType: device.deviceType })
  }

  function toggle(device) {
    if (isSelected(device)) {
      _.remove(ctrl.devices, device)
    } else {
      ctrl.devices.push(device)
    }
  }

  function loadDevices() {
    return UcOneService.devices().then(function(data) {
      ctrl.deviceTypes = data
    })
  }

  function next() {
    ctrl.onUpdate(EventEmitter({ devices: ctrl.devices }))
  }
}
