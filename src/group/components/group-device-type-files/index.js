import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceTypeFiles', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceType: '<'
  }
})

controller.$inject = ['Alert', 'GroupDeviceTypeFileService', '$scope']
function controller(Alert, GroupDeviceTypeFileService, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.loading = true
    loadFiles()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function open(file) {
    $scope.$broadcast('groupDeviceTypeFileUpdate:load', file)
  }

  function loadFiles() {
    return GroupDeviceTypeFileService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType
    ).then(function(data) {
      ctrl.files = data
    })
  }
}
