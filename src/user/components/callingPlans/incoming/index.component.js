;(function() {
  angular.module('odin.user').component('userIncomingCallingPlanIndex', {
    templateUrl: 'user/components/callingPlans/incoming/index.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
