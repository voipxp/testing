;(function() {
  angular.module('odin.group').component('groupCallCenterDnisInstance', {
    templateUrl:
      'group/components/callCenters/callCenter/advanced/dnisInstance.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.dnisId = $routeParams.dnisId
  }
})()
