import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupFlexibleSeatingHostDevice', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    flexibleSeatingHost: '<',
    serviceUserId: '<'
  }
})

controller.$inject = [
  'Alert',
  '$scope',
  'ACL',
  'Module',
  '$q',
  'GroupFlexibleSeatingHostService',
  'GroupPolicyService',
  'ServiceProviderPolicyService'
]
function controller(
  Alert,
  $scope,
  ACL,
  Module,
  $q,
  GroupFlexibleSeatingHostService,
  GroupPolicyService,
  ServiceProviderPolicyService
) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.select = select

  ctrl.createDevice = createDevice
  ctrl.selectDevice = selectDevice
  ctrl.updateDevice = updateDevice
  ctrl.onDeviceUpdate = onDeviceUpdate
  ctrl.onDeviceSelect = onDeviceSelect
  ctrl.onSetLinePort = onSetLinePort

  ctrl.endpointTypes = {
    accessDeviceEndpoint: 'Identity/Device Profile',
    none: 'None'
  }

  function onInit() {
    ctrl.loading = true
    $q.all([
      Module.load(),
      loadUser(),
      GroupPolicyService.load(),
      ServiceProviderPolicyService.load()
    ])
      .then(function() {
        if (ACL.has('Reseller')) {
          ctrl.canEdit = true
        } else if (ACL.is('Group')) {
          ctrl.canEdit = GroupPolicyService.accessDeviceUpdate()
        } else if (ACL.is('Service Provider')) {
          ctrl.canEdit = ServiceProviderPolicyService.accessDeviceUpdate()
        } else if(ACL.is('Group Department')) {
          ctrl.canEdit = true
        }
        // ctrl.canEdit = ACL.has('Group') && Module.update('Provisioning')
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadUser() {
    return GroupFlexibleSeatingHostService.show(ctrl.serviceUserId).then(
      function(data) {
        ctrl.flexibleSeatingHost = data
        if (
          ctrl.flexibleSeatingHost.accessDeviceEndpoint &&
          ctrl.flexibleSeatingHost.accessDeviceEndpoint.accessDevice &&
          ctrl.flexibleSeatingHost.accessDeviceEndpoint.accessDevice.deviceName
        )
          ctrl.flexibleSeatingHost.endpointType = 'accessDeviceEndpoint'
      }
    )
  }

  function updateEndpointType(flexibleSeatingHost) {
    var type = flexibleSeatingHost.endpointType
    if (type === 'accessDeviceEndpoint') {
      delete flexibleSeatingHost.trunkAddressing
    } else if (type === 'none') {
      delete flexibleSeatingHost.accessDeviceEndpoint
      delete flexibleSeatingHost.trunkAddressing
    }
  }

  function createDevice() {
    $scope.$broadcast('deviceCreate:load')
  }

  function selectDevice() {
    $scope.$broadcast('deviceSelect:load')
  }

  function updateDevice() {
    $scope.$broadcast('deviceUpdate:load', {
      deviceName:
        ctrl.flexibleSeatingHost.accessDeviceEndpoint.accessDevice.deviceName,
      deviceLevel:
        ctrl.flexibleSeatingHost.accessDeviceEndpoint.accessDevice.deviceLevel
    })
  }

  function onDeviceUpdate(event) {
    _.set(
      ctrl.editFlexibleSeatingHost,
      'accessDeviceEndpoint.accessDevice',
      event.device
    )
  }

  function onDeviceSelect(event) {
    _.set(
      ctrl.editFlexibleSeatingHost,
      'accessDeviceEndpoint.accessDevice',
      event.device
    )
  }

  function onSetLinePort(event) {
    _.set(
      ctrl.editFlexibleSeatingHost,
      'accessDeviceEndpoint.linePort',
      event.userId
    )
  }

  function select() {
    ctrl.editFlexibleSeatingHost = angular.copy(ctrl.flexibleSeatingHost)
    Alert.modal.open('flexibleSeatingHostDeviceSelectModal', function onSave(
      close
    ) {
      update(ctrl.editFlexibleSeatingHost, close)
    })
  }

  function update(flexibleSeatingHost, callback) {
    updateEndpointType(flexibleSeatingHost)
    Alert.spinner.open()
    return GroupFlexibleSeatingHostService.update(flexibleSeatingHost)
      .then(onInit)
      .then(function() {
        Alert.notify.success('Device Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
