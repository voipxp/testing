import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('deviceList', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'SystemDeviceService',
  'ServiceProviderDeviceService',
  'GroupDeviceService',
  '$scope'
]
function controller(
  Alert,
  SystemDeviceService,
  ServiceProviderDeviceService,
  GroupDeviceService,
  $scope
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.create = create
  ctrl.onDeviceUpdate = onDeviceUpdate

  function onInit() {
    ctrl.loading = true
    return loadDevices()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSystemDevices() {
    return SystemDeviceService.index()
  }

  function loadServiceProviderDevices() {
    return ServiceProviderDeviceService.index(ctrl.serviceProviderId)
  }

  function loadGroupDevices() {
    return GroupDeviceService.index(ctrl.serviceProviderId, ctrl.groupId)
  }

  function loadDevices() {
    var action
    if (ctrl.serviceProviderId && ctrl.groupId) {
      action = loadGroupDevices
    } else if (ctrl.serviceProviderId) {
      action = loadServiceProviderDevices
    } else {
      action = loadSystemDevices
    }
    return action().then(function(data) {
      ctrl.devices = data
      return data
    })
  }

  function create() {
    $scope.$broadcast('deviceCreate:load')
  }

  function edit(device) {
    $scope.$broadcast('deviceUpdate:load', {
      deviceName: device.deviceName,
      deviceLevel: device.deviceLevel
    })
  }

  function onDeviceUpdate() {
    onInit()
  }
}
