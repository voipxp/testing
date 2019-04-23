;(function() {
  angular.module('odin.user').component('userCallForwardingBusyIndex', {
    templateUrl: 'user/components/callForwardingBusy/index.component.html',
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