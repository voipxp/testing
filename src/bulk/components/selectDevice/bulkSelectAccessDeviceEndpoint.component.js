;(function() {
  angular.module('odin.bulk').component('bulkSelectAccessDeviceEndpoint', {
    templateUrl:
      'bulk/components/selectDevice/bulkSelectAccessDeviceEndpoint.component.html',
    controller: Controller,
    bindings: { accessDeviceEndpoint: '=', onUpdate: '&' }
  })

  function Controller(Alert, EventEmitter, $scope) {
    var ctrl = this
    ctrl.createDevice = createDevice
    ctrl.onCreateDevice = onCreateDevice
    ctrl.complete = complete

    function createDevice() {
      $scope.$broadcast('bulkDeviceCreate:load')
    }

    function onCreateDevice(event) {
      _.set(ctrl, 'accessDeviceEndpoint.accessDevice', event.device)
    }

    function complete() {
      return ctrl.onUpdate(
        EventEmitter({ accessDeviceEndpoint: ctrl.accessDeviceEndpoint })
      )
    }
  }
})()
