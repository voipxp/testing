;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenusIndex', {
    templateUrl:
      'group/components/autoAttendants/submenus/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.open = open

    function open(serviceUserId) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants'
      )(serviceUserId)
    }
  }
})()
