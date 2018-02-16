;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlanDigitPlan', {
    templateUrl:
      'user/components/callingPlans/digitPlan/digitPlan.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
