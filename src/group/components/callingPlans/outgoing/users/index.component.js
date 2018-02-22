;(function() {
  angular.module('odin.group').component('groupOutgoingCallingPlanUsers', {
    templateUrl:
      'group/components/callingPlans/outgoing/users/index.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route, GroupServiceService) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.$onInit = onInit

    function onInit() {
      GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(
        function(assigned) {
          ctrl.hasCallMeNow = assigned['Call Me Now']
        }
      )
    }

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
