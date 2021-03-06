import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('deviceCreate', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', onUpdate: '&' }
})

controller.$inject = [
  'Alert',
  'GroupDeviceService',
  'ServiceProviderDeviceService',
  'SystemDeviceService',
  'SystemDeviceTypeService',
  'HashService',
  '$scope',
  'EventEmitter'
]
function controller(
  Alert,
  GroupDeviceService,
  ServiceProviderDeviceService,
  SystemDeviceService,
  SystemDeviceTypeService,
  HashService,
  $scope,
  EventEmitter
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.select = select
  ctrl.toggleOptional = toggleOptional

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function activate() {
    Alert.spinner.open()
    return loadDevices()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadDevices() {
    return SystemDeviceTypeService.index().then(function(data) {
      ctrl.devices = data
      return data
    })
  }

  function load() {
    ctrl.device = null
    activate().then(function() {
      Alert.modal.open(ctrl.modalId, function(close) {
        create(ctrl.device, close)
      })
    })
  }

  function select(device) {
    ctrl.device = angular.copy(device)
    if (ctrl.device.protocolChoice) {
      ctrl.device.protocol = ctrl.device.protocolChoice[0]
    }
    ctrl.device.useCustomUserNamePassword = false
    ctrl.device.transportProtocol = 'UDP'
  }

  function create(device, callback) {
    Alert.spinner.open()
    var action
    if (ctrl.serviceProviderId && ctrl.groupId) {
      action = createGroup
    } else if (ctrl.serviceProviderId) {
      action = createServiceProvider
    } else {
      action = createSystem
    }
    return action(device)
      .then(function() {
        Alert.notify.success('Device Created')
        callback()
        sendUpdate(device)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function createSystem(device) {
    return SystemDeviceService.store(device)
  }

  function createServiceProvider(device) {
    device = { ...device, serviceProviderId: ctrl.serviceProviderId }
    return ServiceProviderDeviceService.store(ctrl.serviceProviderId, device)
  }

  function createGroup(device) {
    device = {
      ...device,
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    return GroupDeviceService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      device
    )
  }

  function sendUpdate(device) {
    if (ctrl.serviceProviderId && ctrl.groupId) {
      device.deviceLevel = 'Group'
    } else if (ctrl.serviceProviderId) {
      device.deviceLevel = 'Service Provider'
    } else {
      device.deviceLevel = 'System'
    }
    return ctrl.onUpdate(EventEmitter({ device: device }))
  }

  function toggleOptional() {
    ctrl.showOptional = !ctrl.showOptional
  }

  $scope.$on('deviceCreate:load', load)
}
