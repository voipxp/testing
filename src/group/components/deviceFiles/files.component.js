;(function() {
  angular.module('odin.group').component('groupDeviceFiles', {
    templateUrl: 'group/components/deviceFiles/files.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      deviceName: '<'
    }
  })

  function Controller(Alert, GroupDeviceFileService, $scope) {
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
      return GroupDeviceFileService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceName
      ).then(function(data) {
        ctrl.files = data
      })
    }

    function onUpdate() {
      loadFiles()
    }
  }
})()
