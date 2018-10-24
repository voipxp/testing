;(function() {
  angular.module('odin.group').component('groupDeviceTypeFiles', {
    templateUrl: 'group/components/deviceTypes/files.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      deviceType: '<'
    }
  })

  function Controller(Alert, GroupDeviceTypeFileService, $scope) {
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
})()
