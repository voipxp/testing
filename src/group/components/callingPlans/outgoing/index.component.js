;(function() {
  angular.module('odin.group').component('groupOutgoingCallingPlan', {
    templateUrl: 'group/components/callingPlans/outgoing/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
