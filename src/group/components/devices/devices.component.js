;(function() {
  angular.module('odin.group').component('groupDevices', {
    templateUrl: 'group/components/devices/devices.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
  }
})()
