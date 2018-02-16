;(function() {
  angular.module('odin.group').component('groupOutgoingCallingPlanDigitPlan', {
    templateUrl: 'group/components/callingPlans/digitPlan/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
