import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('groupDevices', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupDeviceService', '$scope', 'Route']
function controller(Alert, GroupDeviceService, $scope, Route) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.create = create
  ctrl.onDeviceUpdate = () => onInit()

  function onInit() {
    ctrl.loading = true
    return loadGroupDevices()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroupDevices() {
    return GroupDeviceService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      data => {
        ctrl.devices = data
      }
    )
  }

  function create() {
    $scope.$broadcast('deviceCreate:load')
  }

  function edit(device) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'groupDevices',
      device.deviceName
    )
  }
}
