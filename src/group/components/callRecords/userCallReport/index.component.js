;(function() {
  angular.module('odin.group').component('groupUserCallReportIndex', {
    templateUrl:
      'group/components/callRecords/userCallReport/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
