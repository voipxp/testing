;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderServicePacks', {
      templateUrl:
        'serviceProvider/components/servicePacks/index.component.html',
      controller: Controller
    })

  function Controller($routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
  }
})()
