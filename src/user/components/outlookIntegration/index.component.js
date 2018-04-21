;(function() {
  angular.module('odin.user').component('userOutlookIntegrationIndex', {
    templateUrl: 'user/components/outlookIntegration/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
