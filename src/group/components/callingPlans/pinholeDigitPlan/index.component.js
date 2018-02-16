;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanPinholeDigitPlan', {
      templateUrl:
        'group/components/callingPlans/pinholeDigitPlan/index.component.html',
      controller: Controller
    })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
