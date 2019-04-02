;(function() {
  angular
    .module('odin.user')
    .component('userCommunicationBarringAuthorizationCodesIndex', {
      templateUrl:
        'user/components/communicationBarringAuthorizationCodes/index.component.html',
      controller: Controller,
      bindings: { module: '<' }
    })

  function Controller(Alert, $routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
  }
})()
