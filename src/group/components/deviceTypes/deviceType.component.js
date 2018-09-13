;(function() {
  angular.module('odin.group').component('groupDeviceType', {
    templateUrl: 'group/components/deviceTypes/deviceType.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupDeviceTypeService, $routeParams, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.deviceType = $routeParams.deviceType
    ctrl.back = back

    function onInit() {
      ctrl.loading = true
      loadDevice()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevice() {
      return GroupDeviceTypeService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceType
      ).then(function(data) {
        ctrl.device = data
      })
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'deviceTypes')
    }
  }
})()
