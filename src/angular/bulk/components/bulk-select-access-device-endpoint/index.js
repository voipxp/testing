import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectAccessDeviceEndpoint', {
  template,
  controller,
  bindings: { accessDeviceEndpoint: '=', onUpdate: '&' }
})

controller.$inject = ['EventEmitter', '$scope']
function controller(EventEmitter, $scope) {
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
    return ctrl.onUpdate(EventEmitter({ accessDeviceEndpoint: ctrl.accessDeviceEndpoint }))
  }
}
