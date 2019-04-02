;(function() {
  angular.module('odin.user').component('userCallingPlansNav', {
    templateUrl: 'user/components/callingPlans/navigation.component.html',
    controller: Controller,
    bindings: { callingPlan: '@' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.open = open

    function open(callingPlan) {
      Route.open(
        'users',
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.userId,
        'callingPlans',
        callingPlan
      ).hash(null)
    }
  }
})()
