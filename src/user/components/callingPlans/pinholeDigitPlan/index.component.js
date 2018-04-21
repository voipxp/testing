;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanPinholeDigitPlanIndex', {
      templateUrl:
        'user/components/callingPlans/pinholeDigitPlan/index.component.html',
      controller: Controller
    })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
