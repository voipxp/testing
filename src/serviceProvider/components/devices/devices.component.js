;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderDevices', {
    templateUrl: 'serviceProvider/components/devices/devices.component.html',
    controller: Controller
  })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
  }
})()
