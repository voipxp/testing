;(function() {
  angular.module('odin.vdm').component('vdmDashboard', {
    templateUrl: 'vdm/components/dashboard/dashboard.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
