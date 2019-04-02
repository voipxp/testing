;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanTransferNumbersIndex', {
      templateUrl:
        'user/components/callingPlans/transferNumbers/index.component.html',
      controller: Controller
    })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
