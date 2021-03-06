import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.vdm').component('vdmCreateDevice', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = [
  'Alert',
  '$q',
  'SystemDeviceTypeService',
  'VdmDeviceTypeService',
  'HashService',
  'EventEmitter',
  '$scope'
]
function controller(
  Alert,
  $q,
  SystemDeviceTypeService,
  VdmDeviceTypeService,
  HashService,
  EventEmitter,
  $scope
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function loadSystemDevices() {
    return SystemDeviceTypeService.index().then(function(data) {
      ctrl.systemDevices = data
    })
  }

  function loadVdmDevices() {
    return VdmDeviceTypeService.index().then(function(data) {
      ctrl.vdmDevices = data
    })
  }

  function filterDevices() {
    ctrl.devices = _.filter(ctrl.systemDevices, function(device) {
      return !_.find(ctrl.vdmDevices, { deviceType: device.deviceType })
    })
  }

  function load() {
    ctrl.loading = true
    Alert.modal.open(ctrl.modalId)
    return $q
      .all([loadSystemDevices(), loadVdmDevices()])
      .then(filterDevices)
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function select(device) {
    ctrl.search = ''
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ device: device }))
  }

  $scope.$on('vdmCreateDevice:load', load)
}
