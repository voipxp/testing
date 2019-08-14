import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceFiles', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceName: '<'
  }
})

controller.$inject = ['Alert', 'GroupDeviceFileService', '$scope']
function controller(Alert, GroupDeviceFileService, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.onUpdate = onUpdate

  function onInit() {
    ctrl.loading = true
    loadFiles()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function open(file) {
    $scope.$broadcast('groupDeviceFileUpdate:load', file)
  }

  function loadFiles() {
    return GroupDeviceFileService.index(ctrl.serviceProviderId, ctrl.groupId, ctrl.deviceName).then(
      function(data) {
        ctrl.files = data
      }
    )
  }

  function onUpdate() {
    loadFiles()
  }
}
