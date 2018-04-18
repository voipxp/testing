;(function() {
  angular.module('odin.group').component('groupCallRecordIndex', {
    templateUrl: 'group/components/callRecords/group/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
