;(function() {
  angular.module('odin.group').component('groupCallCenterCallRecords', {
    templateUrl: 'group/components/callRecords/callCenter/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
