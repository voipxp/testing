;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanPinholeDigitPlan', {
      templateUrl:
        'user/components/callingPlans/pinholeDigitPlan/pinholeDigitPlan.component.html',
      controller: Controller
    })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
