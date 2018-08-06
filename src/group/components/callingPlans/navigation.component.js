;(function() {
  angular.module('odin.group').component('groupCallingPlansNav', {
    templateUrl: 'group/components/callingPlans/navigation.component.html',
    controller: Controller,
    bindings: { callingPlan: '@', module: '<' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open

    function open(callingPlan) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'callingPlans',
        callingPlan
      ).hash(null)
    }
  }
})()
