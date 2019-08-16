import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmSelectDevice', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = ['Alert', 'VdmDeviceTypeService', 'HashService', 'EventEmitter', '$scope']
function controller(Alert, VdmDeviceTypeService, HashService, EventEmitter, $scope) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function loadDevices() {
    return VdmDeviceTypeService.index().then(function(data) {
      ctrl.devices = data
    })
  }

  function load() {
    ctrl.loading = true
    Alert.modal.open(ctrl.modalId)
    return loadDevices()
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

  $scope.$on('vdmSelectDevice:load', load)
}
