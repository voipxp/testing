;(function() {
  angular.module('odin.common').component('deviceUpdate', {
    templateUrl: 'common/components/deviceUpdate/deviceUpdate.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      canDelete: '<',
      onUpdate: '&',
      onDelete: '&'
    }
  })

  function Controller(
    Alert,
    SystemDeviceService,
    ServiceProviderDeviceService,
    GroupDeviceService,
    HashService,
    $scope,
    EventEmitter
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.toggleOptional = toggleOptional

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function loadDevice(deviceName, deviceLevel) {
      var action
      if (deviceLevel === 'Group') {
        action = loadGroup
      } else if (deviceLevel === 'Service Provider') {
        action = loadServiceProvider
      } else {
        action = loadSystem
      }
      return action(deviceName).then(function(data) {
        ctrl.device = data
      })
    }

    function loadSystem(deviceName) {
      return SystemDeviceService.show(deviceName)
    }

    function loadServiceProvider(deviceName) {
      return ServiceProviderDeviceService.show(
        ctrl.serviceProviderId,
        deviceName
      )
    }

    function loadGroup(deviceName) {
      return GroupDeviceService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        deviceName
      )
    }

    function loadModal() {
      var deleteAction
      if (ctrl.canDelete) {
        deleteAction = function(close) {
          Alert.confirm
            .open('Are you sure you want to Delete this device?')
            .then(function() {
              remove(close)
            })
        }
      }
      Alert.modal.open(
        ctrl.modalId,
        function onSave(close) {
          update(close)
        },
        deleteAction
      )
    }

    function update(callback) {
      var password = _.get(ctrl.device, 'accessDeviceCredentials.password')
      if (!password) delete ctrl.device.accessDeviceCredentials
      Alert.spinner.open()
      var action
      if (ctrl.device.deviceLevel === 'Group') {
        action = updateGroup
      } else if (ctrl.device.deviceLevel === 'Service Provider') {
        action = updateServiceProvider
      } else {
        action = updateSystem
      }
      action(ctrl.device)
        .then(function() {
          Alert.notify.success('Device Updated')
          callback()
          sendUpdate(ctrl.device)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function updateGroup(device) {
      return GroupDeviceService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device
      )
    }

    function updateServiceProvider(device) {
      return ServiceProviderDeviceService.update(ctrl.serviceProviderId, device)
    }

    function updateSystem(device) {
      return SystemDeviceService.update(device)
    }

    function remove(callback) {
      Alert.spinner.open()
      var action
      if (ctrl.device.deviceLevel === 'Group') {
        action = removeGroup
      } else if (ctrl.device.deviceLevel === 'Service Provider') {
        action = removeServiceProvider
      } else {
        action = removeSystem
      }
      action(ctrl.device)
        .then(function() {
          Alert.notify.success('Device Removed')
          callback()
          sendDelete()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function removeGroup(device) {
      return GroupDeviceService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device
      )
    }

    function removeServiceProvider(device) {
      return ServiceProviderDeviceService.destroy(
        ctrl.serviceProviderId,
        device.deviceName
      )
    }

    function removeSystem(device) {
      return SystemDeviceService.destroy(device.deviceName)
    }

    function sendUpdate(device) {
      ctrl.showOptional = false
      return ctrl.onUpdate(EventEmitter({ device: device }))
    }

    function sendDelete(device) {
      ctrl.showOptional = false
      return ctrl.onDelete(EventEmitter({ device: device }))
    }

    function toggleOptional() {
      ctrl.showOptional = !ctrl.showOptional
    }

    $scope.$on('deviceUpdate:load', function(event, data) {
      Alert.spinner.open()
      loadDevice(data.deviceName, data.deviceLevel)
        .then(loadModal)
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    })
  }
})()
