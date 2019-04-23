;(function() {
  angular
    .module('odin.bulk')
    .component('bulkSelectSharedCallAppearanceEndpoints', {
      templateUrl:
        'bulk/components/user.sharedcallappearance.update/bulkSelectSharedCallAppearanceEndpoints.component.html',
      controller: Controller,
      bindings: { endpoints: '<', onUpdate: '&' }
    })

  function Controller(Alert, $scope, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.selectDevice = selectDevice
    ctrl.onSelectDevice = onSelectDevice
    ctrl.next = next

    function onInit() {
      ctrl.endpoints = ctrl.endpoints || []
    }

    function edit(endpoint) {
      var isNew
      if (!endpoint) {
        ctrl.editEndpoint = {
          linePort: '',
          isActive: true,
          allowOrigination: true,
          allowTermination: true
        }
        isNew = true
      } else {
        ctrl.editEndpoint = angular.copy(endpoint)
        isNew = false
      }

      var deleteAction = null

      if (!isNew) {
        deleteAction = function onDelete(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Endpoint?')
            .then(function() {
              _.remove(ctrl.endpoints, endpoint)
              console.log('endpoints', ctrl.endpoints)
              close()
            })
        }
      }

      ctrl.modalTitle = isNew
        ? 'New Endpoint'
        : 'Edit ' + ctrl.editEndpoint.accessDevice.deviceName

      Alert.modal.open(
        'userSharedCallAppearanceEndpointModal',
        function onSave(close) {
          if (isNew) {
            ctrl.endpoints.push(ctrl.editEndpoint)
          } else {
            endpoint = ctrl.editEndpoint
          }
          console.log('endpoints', ctrl.endpoints)
          close()
        },
        deleteAction
      )
    }

    function selectDevice(device) {
      $scope.$broadcast('bulkDeviceCreate:load', device)
    }

    function onSelectDevice(event) {
      console.log('onSelectDevice', event)
      var device = event.device || {}
      ctrl.editEndpoint.accessDevice = device
      ctrl.editEndpoint.deviceName = device.deviceName
      ctrl.editEndpoint.deviceLevel = device.deviceLevel
    }

    function next() {
      ctrl.onUpdate(EventEmitter({ endpoints: ctrl.endpoints }))
    }
  }
})()