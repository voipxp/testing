import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUcOneEndpoints', {
  template,
  controller,
  bindings: { devices: '<', endpoints: '<', onUpdate: '&' }
})

controller.$inject = ['EventEmitter', 'Alert']
function controller(EventEmitter, Alert) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.canComplete = canComplete
  ctrl.next = next
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    ctrl.devices = ctrl.devices || []
    ctrl.endpoints = ctrl.endpoints || []
    buildEndpoints()
  }

  // build default endpoints based on devices
  // then remove any that are extras (going back in wizard)
  function buildEndpoints() {
    ctrl.devices.forEach(function(device) {
      if (!endpointHasDevice(device)) {
        ctrl.endpoints.push(buildEndpoint(device))
      }
    })
    cleanEndpoints()
  }

  function endpointHasDevice(device) {
    return _.find(ctrl.endpoints, function(endpoint) {
      return _.get(endpoint, 'accessDevice.deviceType') === device.deviceType
    })
  }

  function buildEndpoint(device) {
    device.useCustomUserNamePassword = false
    device.deviceLevel = device.deviceLevel || 'Group'
    return {
      accessDevice: device,
      deviceName: device.deviceName,
      deviceLevel: device.deviceLevel,
      linePort: null,
      isActive: true,
      allowOrigination: true,
      allowTermination: true
    }
  }

  function cleanEndpoints() {
    ctrl.endpoints = _.filter(ctrl.endpoints, function(endpoint) {
      var deviceType = _.get(endpoint, 'accessDevice.deviceType')
      return _.find(ctrl.devices, { deviceType: deviceType })
    })
  }

  function canComplete() {
    if (ctrl.endpoints.length === 0) return false
    return _.every(ctrl.endpoints, function(endpoint) {
      return (
        _.get(endpoint, 'accessDevice.deviceType') &&
        _.get(endpoint, 'accessDevice.deviceName') &&
        endpoint.linePort
      )
    })
  }

  function edit(endpoint) {
    ctrl.editEndpoint = angular.copy(endpoint)
    Alert.modal.open('userSharedCallAppearanceEndpointModal', function onSave(
      close
    ) {
      Object.assign(endpoint, ctrl.editEndpoint)
      endpoint.deviceName = _.get(endpoint, 'accessDevice.deviceName')
      endpoint.deviceLevel = _.get(endpoint, 'accessDevice.deviceLevel')
      close()
    })
  }

  function next() {
    ctrl.onUpdate(EventEmitter({ endpoints: ctrl.endpoints }))
  }
}
