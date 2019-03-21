;(function() {
  angular.module('odin.common').component('selectDevice', {
    templateUrl: 'common/components/selectDevice/selectDevice.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      ngRequired: '<',
      ngModel: '='
    }
  })

  function Controller(Alert, GroupDeviceService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      console.log('ctrl.ngModel', ctrl.ngModel)
      loadDevices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevices() {
      return GroupDeviceService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.devices = data
        return data
      })
    }
  }
})()
