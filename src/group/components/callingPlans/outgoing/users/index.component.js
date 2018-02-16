;(function() {
  angular.module('odin.group').component('groupOutgoingCallingPlanUsers', {
    templateUrl:
      'group/components/callingPlans/outgoing/users/index.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open

    function open(plan) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callingPlans',
        plan
      )()
    }
  }
})()
