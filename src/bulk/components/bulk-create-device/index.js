import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkCreateDevice', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = [
  'Alert',
  'SystemDeviceTypeService',
  'HashService',
  '$scope',
  'EventEmitter',
  'BulkCreateDeviceService'
]
function controller(
  Alert,
  SystemDeviceTypeService,
  HashService,
  $scope,
  EventEmitter,
  BulkCreateDeviceService
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function loadDevices() {
    return SystemDeviceTypeService.index().then(function(data) {
      ctrl.devices = data
    })
  }

  function open() {
    Alert.spinner.open()
    loadDevices()
      .then(function() {
        Alert.modal.open(ctrl.modalId, function(close) {
          create(ctrl.device, close)
        })
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function select(device) {
    ctrl.device = BulkCreateDeviceService.generate(device)
  }

  function create(device, callback) {
    sendUpdate(device)
    if (_.isFunction(callback)) callback()
  }

  function sendUpdate(device) {
    device.deviceLevel = 'Group'
    return ctrl.onUpdate(EventEmitter({ device: device }))
  }

  $scope.$on('bulkDeviceCreate:load', open)
}
