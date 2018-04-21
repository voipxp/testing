;(function() {
  angular.module('odin.user').component('userAnonymousCallRejectionIndex', {
    templateUrl: 'user/components/anonymousCallRejection/index.component.html',
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
