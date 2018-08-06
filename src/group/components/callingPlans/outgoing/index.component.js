;(function() {
  angular.module('odin.group').component('groupOutgoingCallingPlan', {
    templateUrl: 'group/components/callingPlans/outgoing/index.component.html',
    controller: Controller
  })

  function Controller($routeParams, GroupServiceService, Module) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.$onInit = onInit

    function onInit() {
      Module.show('Outgoing Calling Plan').then(function(module) {
        ctrl.module = module
      })
      GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(
        function(assigned) {
          ctrl.hasCallMeNow = assigned['Call Me Now']
        }
      )
    }
  }
})()
