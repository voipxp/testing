;(function() {
  angular.module('odin.group').component('groupDeviceType', {
    templateUrl: 'group/components/deviceTypes/deviceType.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupDeviceTypeService, $routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.deviceType = $routeParams.deviceType
    ctrl.back = back
    ctrl.onLoad = onLoad

    function onLoad(event) {
      ctrl.device = event.device
    }

    function back() {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'deviceTypes'
      )()
    }
  }
})()
