;(function() {
  angular.module('odin.group').component('groupCallPark', {
    templateUrl: 'group/components/callPark/callPark.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, GroupCallParkService, $routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
