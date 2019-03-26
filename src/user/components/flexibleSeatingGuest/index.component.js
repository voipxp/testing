;(function() {
  angular.module('odin.user').component('userFlexibleSeatingGuestIndex', {
    templateUrl: 'user/components/flexibleSeatingGuest/index.component.html',
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
