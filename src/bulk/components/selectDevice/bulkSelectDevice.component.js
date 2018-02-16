;(function() {
  angular.module('odin.bulk').component('bulkSelectDevice', {
    templateUrl: 'bulk/components/selectDevice/bulkSelectDevice.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      endpointType: '<',
      accessDeviceEndpoint: '<',
      trunkAddressing: '<',
      onUpdate: '&'
    }
  })

  function Controller(EventEmitter) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.complete = complete
    ctrl.canComplete = canComplete
    ctrl.updateEndpoint = updateEndpoint
    ctrl.onUpdateDevice = onUpdateDevice

    function onChanges(change) {
      ctrl.endpointType = change.endpointType.currentValue || 'none'
    }

    function updateEndpoint() {
      if (ctrl.endpointType === 'none') {
        delete ctrl.accessDeviceEndpoint
        delete ctrl.trunkAddressing
      } else if (ctrl.endpointType === 'accessDeviceEndpoint') {
        delete ctrl.trunkAddressing
      } else if (ctrl.endpointType === 'trunkAddressing') {
        delete ctrl.accessDeviceEndpoint
      }
    }

    function onUpdateDevice(event) {
      ctrl.accessDeviceEndpoint = event.accessDeviceEndpoint
    }

    function canComplete() {
      if (ctrl.endpointType === 'none') {
        return true
      } else if (ctrl.endpointType === 'accessDeviceEndpoint') {
        return (
          ctrl.accessDeviceEndpoint &&
          ctrl.accessDeviceEndpoint.linePort &&
          ctrl.accessDeviceEndpoint.accessDevice &&
          ctrl.accessDeviceEndpoint.accessDevice.deviceName &&
          ctrl.accessDeviceEndpoint.accessDevice.deviceType
        )
      } else if (ctrl.endpointType === 'trunkAddressing') {
        var endpoint = _.get(ctrl.trunkAddressing, 'trunkGroupDeviceEndpoint')
        return endpoint && endpoint.name ? endpoint.linePort : true
      }
    }

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          endpointType: ctrl.endpointType,
          accessDeviceEndpoint: ctrl.accessDeviceEndpoint,
          trunkAddressing: ctrl.trunkAddressing
        })
      )
    }
  }
})()
